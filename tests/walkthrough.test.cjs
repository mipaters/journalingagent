const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createApp() {
  const elements = new Map();
  const element = (id) => {
    if (!elements.has(id)) elements.set(id, {
      innerHTML: "", textContent: "", value: "",
      addEventListener() {}, focus() {},
      classList: { toggle() {}, contains() { return false; }, add() {} },
      append() {}
    });
    return elements.get(id);
  };
  const context = vm.createContext({
    document: {
      getElementById: element, querySelector: element, querySelectorAll: () => [],
      addEventListener() {}, createElement: element
    },
    localStorage: { getItem() { return null; } },
    window: { setTimeout() {}, scrollTo() {} },
    console
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8"), context);
  return {
    run: (script) => vm.runInContext(script, context),
    markup: () => element("overlay-root").innerHTML
  };
}

test("launcher shows six tiles with the first step selected", () => {
  const app = createApp();
  app.run("openWalkthrough()");
  assert.equal((app.markup().match(/data-tile=/g) || []).length, 6);
  assert.match(app.markup(), /data-tile="1" aria-pressed="true"/);
  assert.match(app.markup(), /STEP 1 OF 6/);
});

test("every tile shows its stage and actions stay inside the walkthrough", () => {
  const app = createApp();
  app.run("openWalkthrough()");
  const journalSnapshot = app.run("JSON.stringify({journals, auditEvents})");
  const expected = [
    /Close delays/,
    /94%/,
    /Error · Missing cost center/,
    /64210 · Telecommunications/,
    /POSTED · NS-883421/,
    /80% FASTER/
  ];
  for (let step = 1; step <= 6; step++) {
    app.run(`selectDemoStep(${step}); runDemoStep()`);
    assert.match(app.markup(), /id="walkthrough-overlay"/);
    assert.equal((app.markup().match(/data-tile=/g) || []).length, 6);
    assert.match(app.markup(), expected[step - 1]);
    assert.match(app.markup(), /role="status"/);
    assert.doesNotMatch(app.markup(), /workspace-drawer/);
  }
  assert.equal(app.run("JSON.stringify({journals, auditEvents})"), journalSnapshot);
});

test("posting requires human acceptance and supports out-of-order exploration", () => {
  const app = createApp();
  app.run("openWalkthrough(); selectDemoStep(5); runDemoStep()");
  assert.equal(app.run("state.walkthroughTile"), 4);
  assert.equal(app.run("state.walkthroughPosted"), false);
  assert.equal(app.run("state.walkthroughResults.includes(5)"), false);
  app.run("runDemoStep(); selectDemoStep(5); runDemoStep()");
  assert.equal(app.run("state.walkthroughCorrected"), true);
  assert.ok(app.run("state.walkthroughPosted"));
  assert.match(app.markup(), /Timestamped audit record/);
});

test("Back and Next remain bounded and reopening resets the demo", () => {
  const app = createApp();
  app.run("openWalkthrough(); doAction('demo-back')");
  assert.equal(app.run("state.walkthroughTile"), 1);
  app.run("doAction('demo-next')");
  assert.equal(app.run("state.walkthroughTile"), 2);
  app.run("selectDemoStep(6); doAction('demo-next')");
  assert.equal(app.run("state.walkthroughTile"), 6);
  app.run("selectDemoStep(4); runDemoStep(); runDemoStep()");
  assert.equal(app.run("state.walkthroughResults.length"), 1);
  app.run("openWalkthrough()");
  assert.equal(app.run("state.walkthroughResults.length"), 0);
  assert.equal(app.run("state.walkthroughCorrected"), false);
  assert.equal(app.run("state.walkthroughPosted"), false);
  assert.equal(app.run("state.walkthroughTile"), 1);
});
