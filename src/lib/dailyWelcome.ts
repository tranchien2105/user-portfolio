import { dailyWishes } from "../data/dailyWishes.ts";

export const DAILY_WELCOME_KEY = "portfolio:daily-welcome:last-date";
const LEASE_KEY = "portfolio:daily-welcome:lease";
const LOCK_NAME = "portfolio:daily-welcome";
export const WELCOME_ENTER_MS = 400;
export const WELCOME_HOLD_MS = 3500;
export const WELCOME_EXIT_MS = 500;
type WelcomeStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** A calendar date in the visitor's timezone, never the UTC date of the instant. */
export function localDayKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function wishForDate(date = new Date()) {
  // UTC is used only to number local calendar fields, so DST cannot change the sequence.
  const day = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000,
  );
  return dailyWishes[
    ((day % dailyWishes.length) + dailyWishes.length) % dailyWishes.length
  ];
}

export function millisecondsUntilNextLocalDay(date = new Date()): number {
  return (
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
    ).getTime() - date.getTime()
  );
}

/** Must run inside the cross-tab lock/lease. Unavailable persistence means no toast. */
export function claimWelcomeDate(
  storage: WelcomeStorage,
  day: string,
): boolean {
  try {
    if (storage.getItem(DAILY_WELCOME_KEY) === day) return false;
    storage.setItem(DAILY_WELCOME_KEY, day);
    return storage.getItem(DAILY_WELCOME_KEY) === day;
  } catch {
    return false;
  }
}

function settleLease(signal: AbortSignal): Promise<boolean> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve(false);
      return;
    }
    const finish = (ready: boolean) => {
      clearTimeout(timer);
      signal.removeEventListener("abort", abort);
      resolve(ready);
    };
    const abort = () => finish(false);
    const timer = setTimeout(() => finish(true), 100);
    signal.addEventListener("abort", abort, { once: true });
  });
}

interface WelcomePeers {
  hasSeen: (day: string) => boolean;
  elect: (day: string, owner: string) => Promise<boolean>;
  remember: (day: string) => void;
  finish: () => void;
}
const peerSessions = new WeakMap<AbortSignal, WelcomePeers>();

/** Keep a responder alive for this app shell, including tabs that already showed a wish. */
function welcomePeers(signal: AbortSignal): WelcomePeers {
  const previous = peerSessions.get(signal);
  if (previous) return previous;
  let channel: BroadcastChannel | undefined;
  let seenDay = "";
  let activeDay = "";
  let activeOwner = "";
  const contenders = new Set<string>();
  const remember = (day: string) => {
    seenDay = day;
    try {
      if (window.localStorage.getItem(DAILY_WELCOME_KEY) !== day) {
        window.localStorage.setItem(DAILY_WELCOME_KEY, day);
      }
    } catch {
      /* A peer can still suppress duplicates if persistence becomes unavailable. */
    }
  };
  const hasSeen = (day: string) => {
    if (seenDay === day) return true;
    try {
      return window.localStorage.getItem(DAILY_WELCOME_KEY) === day;
    } catch {
      return false;
    }
  };
  try {
    channel = new BroadcastChannel(LOCK_NAME);
    channel.onmessage = (event: MessageEvent<unknown>) => {
      if (!event.data || typeof event.data !== "object") return;
      const message = event.data as {
        kind?: string;
        day?: string;
        owner?: string;
      };
      if (message.day !== localDayKey()) return;
      if (message.kind === "seen") {
        remember(message.day);
        return;
      }
      if (message.kind !== "probe" && message.kind !== "candidate") return;
      if (hasSeen(message.day)) {
        channel?.postMessage({ kind: "seen", day: message.day });
        return;
      }
      if (activeDay === message.day && typeof message.owner === "string") {
        contenders.add(message.owner);
        if (message.kind === "probe") {
          channel?.postMessage({
            kind: "candidate",
            day: activeDay,
            owner: activeOwner,
          });
        }
      }
    };
  } catch {
    /* Older/restricted browsers use the storage lease alone. */
  }
  const peers: WelcomePeers = {
    hasSeen,
    remember,
    async elect(day, owner) {
      if (!channel) return true;
      activeDay = day;
      activeOwner = owner;
      contenders.clear();
      contenders.add(owner);
      channel.postMessage({ kind: "probe", day, owner });
      if (!(await settleLease(signal)) || hasSeen(day)) return false;
      return [...contenders].sort()[0] === owner;
    },
    finish() {
      activeDay = "";
      activeOwner = "";
      contenders.clear();
    },
  };
  peerSessions.set(signal, peers);
  signal.addEventListener(
    "abort",
    () => {
      channel?.close();
      peerSessions.delete(signal);
    },
    { once: true },
  );
  return peers;
}

/** Client-only. Peer election prevents stale tab snapshots; Web Locks serialize the final claim. */
export async function requestDailyWelcome(
  signal: AbortSignal,
  isVisible: () => boolean,
  onClaim: (date: Date) => void,
): Promise<void> {
  // Defer ownership until StrictMode has had a chance to cancel its first setup.
  await Promise.resolve();
  if (signal.aborted || !isVisible()) return;
  const peers = welcomePeers(signal);
  let storage: Storage;
  try {
    storage = window.localStorage;
    if (peers.hasSeen(localDayKey())) return;
  } catch {
    return;
  }
  const owner = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const claim = () => {
    if (signal.aborted || !isVisible()) return;
    const date = new Date();
    const day = localDayKey(date);
    if (!peers.hasSeen(day) && claimWelcomeDate(storage, day)) {
      peers.remember(day);
      onClaim(date);
    }
  };
  try {
    if (!(await peers.elect(localDayKey(), owner))) return;
    if (navigator.locks?.request) {
      try {
        await navigator.locks.request(LOCK_NAME, { signal }, claim);
        return;
      } catch {
        if (signal.aborted) return;
        // Some restricted contexts expose the API but deny lock requests.
      }
    }
    try {
      const existing = JSON.parse(storage.getItem(LEASE_KEY) ?? "null") as {
        expiresAt?: number;
      } | null;
      if (existing?.expiresAt && existing.expiresAt > Date.now()) return;
      storage.setItem(
        LEASE_KEY,
        JSON.stringify({ owner, expiresAt: Date.now() + 1500 }),
      );
      if (!(await settleLease(signal))) return;
      const current = JSON.parse(storage.getItem(LEASE_KEY) ?? "null") as {
        owner?: string;
      } | null;
      if (current?.owner === owner) claim();
    } catch {
      // Never show an untracked greeting when storage is blocked or full.
    } finally {
      try {
        const current = JSON.parse(storage.getItem(LEASE_KEY) ?? "null") as {
          owner?: string;
        } | null;
        if (current?.owner === owner) storage.removeItem(LEASE_KEY);
      } catch {
        /* Storage can become unavailable while waiting. */
      }
    }
  } finally {
    peers.finish();
  }
}
