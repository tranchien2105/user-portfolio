import assert from "node:assert/strict";
import { test } from "node:test";
import { projects, projectUrl } from "../src/data/projects.ts";
import { caseStudies } from "../src/data/caseStudies.ts";
import { resolveRoute } from "../src/lib/routes.ts";
import { commandItems, searchCommands } from "../src/lib/commandSearch.ts";
import { pageMetadata } from "../src/lib/pageMetadata.ts";

test("all project routes resolve directly, with trailing slash and index.html variants", () => {
  for (const project of projects) {
    for (const path of [
      projectUrl(project),
      `/projects/${project.slug}`,
      `/projects/${project.slug}/index.html`,
    ]) {
      assert.deepEqual(resolveRoute(path), {
        kind: "case-study",
        slug: project.slug,
      });
    }
    for (const language of ["vi", "en"] as const) {
      const meta = pageMetadata(resolveRoute(projectUrl(project)), language);
      assert.ok(meta.title.includes(project.name));
      assert.equal(meta.description, project.summary[language]);
    }
  }
  for (const path of [
    "/projects/missing/",
    "/projects/technest/extra/",
    "/unknown",
  ])
    assert.equal(resolveRoute(path).kind, "not-found");
  assert.equal(
    pageMetadata(resolveRoute("/unknown"), "vi").robots,
    "noindex,follow",
  );
});

test("architecture edges only connect existing, distinct, positioned nodes and include evidence", () => {
  let graphs = 0;
  for (const project of projects) {
    const study = caseStudies[project.slug];
    assert.ok(study.references.length);
    if (!study.architecture) continue;
    graphs++;
    const graph = study.architecture;
    const ids = new Set(graph.nodes.map((node) => node.id));
    assert.equal(ids.size, graph.nodes.length);
    assert.equal(
      new Set(graph.nodes.map((node) => `${node.column},${node.row}`)).size,
      graph.nodes.length,
    );
    assert.ok(graph.source);
    for (const node of graph.nodes) {
      assert.ok(node.column >= 0 && node.column <= 2);
      assert.ok(node.description.vi && node.description.en);
    }
    for (const edge of graph.edges) {
      assert.ok(ids.has(edge.from) && ids.has(edge.to));
      assert.notEqual(edge.from, edge.to);
    }
  }
  assert.equal(graphs, 6);
  assert.equal(caseStudies["dms-system"].architecture, undefined);
  assert.equal(caseStudies.vtech.architecture, undefined);
});

test("command search covers every project and technology, accepts Vietnamese and ranks exact names", () => {
  const items = commandItems();
  assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  for (const project of projects) {
    assert.equal(
      searchCommands(items, project.name)[0].href,
      projectUrl(project),
    );
  }
  assert.equal(searchCommands(items, "LIEN HE")[0].href, "/#contact");
  assert.equal(searchCommands(items, "Redis")[0].href, "/projects/?tech=Redis");
  assert.equal(
    searchCommands(items, "Express 5")[0].href,
    "/projects/technest/#stack",
  );
  assert.equal(searchCommands(items, "zzzz-nonexistent").length, 0);
  assert.ok(items.every((item) => item.href.startsWith("/")));
});
