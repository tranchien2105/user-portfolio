import assert from "node:assert/strict";
import { test } from "node:test";
import {
  projects,
  featuredProjects,
  projectUrl,
} from "../src/data/projects.ts";
import {
  defaultFilters,
  filterProjects,
  projectTechnologies,
  readProjectFilters,
  technologyFamily,
} from "../src/lib/projectFilters.ts";

test("the complete archive includes every requested project and unique stable slugs", () => {
  for (const slug of [
    "technest",
    "taskflow",
    "papertrail",
    "payflow",
    "subflow",
    "teamflow",
    "dms-system",
    "vtech",
  ]) {
    assert.ok(
      projects.some((project) => project.slug === slug),
      slug,
    );
  }
  assert.equal(
    new Set(projects.map((project) => project.slug)).size,
    projects.length,
  );
  assert.ok(
    projects.every((project) =>
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug),
    ),
  );
  assert.ok(featuredProjects.length >= 2 && featuredProjects.length <= 4);
  assert.ok(projects.every((project) => project.sources.length > 0));
});

test("an unfiltered archive never imposes a four-project limit", () => {
  assert.equal(
    filterProjects(projects, defaultFilters).length,
    projects.length,
  );
  const extra = { ...projects[0], slug: "new-project", name: "New project" };
  assert.equal(
    filterProjects([...projects, extra], defaultFilters).length,
    projects.length + 1,
  );
});

test("search is case-insensitive and accepts Vietnamese without diacritics", () => {
  const results = filterProjects(projects, {
    ...defaultFilters,
    query: "TAI LIEU",
  });
  assert.ok(results.some((project) => project.slug === "papertrail"));
  assert.ok(
    filterProjects(projects, {
      ...defaultFilters,
      query: "MoMo idempotency",
    }).some((project) => project.slug === "payflow"),
  );
});

test("discipline, technology and search combine with AND semantics", () => {
  const results = filterProjects(projects, {
    query: "MoMo",
    category: "Backend",
    technology: "NestJS",
  });
  assert.deepEqual(
    results.map((project) => project.slug),
    ["payflow"],
  );
  assert.equal(
    filterProjects(projects, {
      query: "MoMo",
      category: "Fullstack",
      technology: "NestJS",
    }).length,
    0,
  );
});

test("technology filters combine versioned and unversioned stacks", () => {
  assert.equal(technologyFamily("NestJS 11"), "NestJS");
  assert.equal(technologyFamily("Node.js"), "Node.js");
  const technologies = projectTechnologies(projects);
  assert.equal(technologies.filter((item) => item === "NestJS").length, 1);
  assert.ok(!technologies.includes("NestJS 11"));
  const results = filterProjects(projects, {
    ...defaultFilters,
    technology: "NestJS",
  });
  assert.ok(results.some((project) => project.slug === "technest"));
  assert.ok(results.some((project) => project.slug === "taskflow"));
});

test("invalid URL facets reset safely, valid filters round-trip", () => {
  const technologies = projectTechnologies(projects);
  assert.deepEqual(
    readProjectFilters("?category=bad&tech=missing", technologies),
    defaultFilters,
  );
  assert.deepEqual(
    readProjectFilters("?q=MoMo&category=Backend&tech=NestJS", technologies),
    { query: "MoMo", category: "Backend", technology: "NestJS" },
  );
  assert.equal(projectUrl({ slug: "payflow" }), "/projects/#payflow");
});
