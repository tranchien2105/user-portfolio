import { useMemo, useState } from 'react'
import { useClock } from '../../hooks/useClock'

function hcmParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh', hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
  }).formatToParts(date)
  return Object.fromEntries(parts.map(({ type, value }) => [type, Number(value)])) as Record<string, number>
}

function solarElevation(year: number, month: number, day: number, hour: number, minute: number) {
  const dayOfYear = Math.round((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 86400000)
  const angle = 2 * Math.PI * (dayOfYear - 81) / 364
  const equation = 9.87 * Math.sin(2 * angle) - 7.53 * Math.cos(angle) - 1.5 * Math.sin(angle)
  const declination = 23.44 * Math.PI / 180 * Math.sin(2 * Math.PI * (dayOfYear - 81) / 365)
  const solarTime = hour * 60 + minute + 4 * (106.69 - 105) + equation
  const hourAngle = (solarTime / 60 - 12) * 15 * Math.PI / 180
  const latitude = 10.787 * Math.PI / 180
  return Math.asin(Math.sin(latitude) * Math.sin(declination) + Math.cos(latitude) * Math.cos(declination) * Math.cos(hourAngle)) * 180 / Math.PI
}

function getSunTimes(parts: Record<string, number>) {
  let rise = '--:--', set = '--:--', previous = solarElevation(parts.year, parts.month, parts.day, 0, 0)
  for (let minute = 1; minute < 1440; minute += 1) {
    const elevation = solarElevation(parts.year, parts.month, parts.day, Math.floor(minute / 60), minute % 60)
    const formatted = `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`
    if (previous < 0 && elevation >= 0 && rise === '--:--') rise = formatted
    if (previous >= 0 && elevation < 0 && set === '--:--') set = formatted
    previous = elevation
  }
  return { rise, set }
}

export function ClockWidget() {
  const now = useClock()
  const [visible, setVisible] = useState(() => {
    try { return localStorage.getItem('clock') !== 'off' } catch { return true }
  })
  const [expanded, setExpanded] = useState(false)
  const parts = hcmParts(now)
  const sun = useMemo(() => getSunTimes(parts), [parts.year, parts.month, parts.day])
  const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).format(now)
  const date = new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' }).format(now)
  const hourAngle = (parts.hour % 12) * 30 + parts.minute * .5
  const minuteAngle = parts.minute * 6 + parts.second * .1
  const secondAngle = parts.second * 6
  const toggleVisibility = () => setVisible((current) => {
    const next = !current
    try { localStorage.setItem('clock', next ? 'on' : 'off') } catch { /* Storage is optional. */ }
    return next
  })

  return <div className="clock-controls"><time className="clock" dateTime={now.toISOString()}>{time} ICT</time><button className="language-button clock-switch" type="button" onClick={toggleVisibility} aria-pressed={visible} aria-label={visible ? 'Tắt đồng hồ' : 'Bật đồng hồ'} title={visible ? 'Tắt đồng hồ' : 'Bật đồng hồ'}>🕐</button>
    {visible && <aside className={`clock-widget${expanded ? ' is-open' : ''}`}>
      <button className="clock-summary" type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} aria-label="Đồng hồ TP.HCM, bấm để xem chi tiết">
        <span aria-hidden="true">🕐</span><time dateTime={now.toISOString()}>{time}</time><span className="clock-caret" aria-hidden="true">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && <div className="clock-details"><svg className="analog-clock" viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" /><path d="M30 5v4M55 30h-4M30 55v-4M5 30h4" /><line className="clock-hour-hand" x1="30" y1="30" x2="30" y2="16" transform={`rotate(${hourAngle} 30 30)`} /><line className="clock-minute-hand" x1="30" y1="30" x2="30" y2="9" transform={`rotate(${minuteAngle} 30 30)`} /><line className="clock-second-hand" x1="30" y1="34" x2="30" y2="7" transform={`rotate(${secondAngle} 30 30)`} /><circle className="clock-hub" cx="30" cy="30" r="2.2" /></svg><div><p>{date}</p><p>🌅 {sun.rise}　🌇 {sun.set}</p><p className="clock-weather">Thời tiết trực tuyến chưa được bật.</p></div></div>}
    </aside>}
  </div>
}
