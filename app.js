const icon = (name) => {
  const paths = {
    calendar: '<rect x="3" y="5" width="14" height="12" rx="2"/><path d="M6 2.5v5M14 2.5v5M3 9h14"/>',
    clock: '<circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 2"/>',
    trend: '<path d="m3 14 4.5-4.5 3 3L17 6"/><path d="M12 6h5v5"/>',
    coins: '<circle cx="10" cy="10" r="7.5"/><path d="M12.5 7.5c-.5-.7-1.3-1-2.4-1-1.4 0-2.3.7-2.3 1.7 0 2.6 5.3 1.2 5.3 4 0 1.1-1 2-2.7 2-1.2 0-2.2-.4-2.9-1.2M10 5v10"/>',
    bolt: '<path d="m11.5 2-7 9h5l-1 7 7-10h-5l1-6Z"/>',
    file: '<path d="M5 2.5h6l4 4v11H5z"/><path d="M11 2.5v4h4M7.5 11h5M7.5 14h5"/>',
    upload: '<path d="M10 13V3m0 0L6 7m4-4 4 4"/><path d="M3 12.5v4h14v-4"/>',
    download: '<path d="M10 3v10m0 0 4-4m-4 4L6 9"/><path d="M3 14v3h14v-3"/>',
    search: '<circle cx="8.8" cy="8.8" r="5.8"/><path d="m13.2 13.2 4 4"/>'
  };
  return `<svg viewBox="0 0 20 20" aria-hidden="true">${paths[name] || paths.file}</svg>`;
};

const now = () => new Date();
const timeAgo = (minutes) => new Date(Date.now() - minutes * 60000).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const journals = [
  { id: "JE-2025-0847", title: "Telecom accrual — North America", type: "Expense accrual", amount: 24850, entity: "Northstar US", period: "Sep 2025", status: "Needs review", validation: "Error", confidence: 94, owner: "Priya Shah", initials: "PS", age: "12 min ago", source: "telecom_accrual_sep.xlsx", account: "64290 · Telecom expense", costCenter: "Not assigned", description: "Monthly mobile and data services accrual for the North America sales organization.", issues: ["Missing cost center", "Unsupported account code"], recommendation: "Use account 64210 · Telecommunications and cost center CC-410 · Sales Operations. Both align with the approved North America telecom policy.", stage: "Validation complete", priority: "High", timeline: [{ label: "Submission received", actor: "Journal Intake Agent", at: "Today, 9:42 AM" }, { label: "Document data extracted · 94% confidence", actor: "Journal Intake Agent", at: "Today, 9:43 AM" }, { label: "Validation exceptions detected", actor: "Validation Agent", at: "Today, 9:44 AM" }] },
  { id: "JE-2025-0846", title: "Cloud infrastructure true-up", type: "Accrual adjustment", amount: 87600, entity: "Northstar Global", period: "Sep 2025", status: "Pending approval", validation: "Warning", confidence: 98, owner: "Daniel Kim", initials: "DK", age: "38 min ago", source: "cloud_costs_q3.pdf", account: "64120 · Hosting expense", costCenter: "CC-220 · Engineering", description: "Quarterly cloud usage true-up based on provider invoice and consumption report.", issues: ["Value exceeds $75,000 approval threshold"], recommendation: "Amounts tie to the provider invoice. Controller approval is required under FIN-204.", stage: "Awaiting manager approval", priority: "High", timeline: [{ label: "Submission received", actor: "Journal Intake Agent", at: "Today, 9:10 AM" }, { label: "Validation passed with approval threshold warning", actor: "Validation Agent", at: "Today, 9:11 AM" }, { label: "Routed to Daniel Kim for approval", actor: "ERP Posting Agent", at: "Today, 9:12 AM" }] },
  { id: "JE-2025-0845", title: "EMEA travel expense reclass", type: "Reclassification", amount: 12840, entity: "Northstar UK", period: "Sep 2025", status: "Pending approval", validation: "Passed", confidence: 97, owner: "Marta Ruiz", initials: "MR", age: "1 hr ago", source: "travel_reclass.csv", account: "73100 · Travel expense", costCenter: "CC-530 · EMEA Sales", description: "Reclassification of travel expenses from the corporate cost center to EMEA Sales.", issues: [], recommendation: "Debit and credit lines balance. The coding matches the submitted travel detail.", stage: "Awaiting manager approval", priority: "Normal", timeline: [{ label: "Submission received", actor: "Journal Intake Agent", at: "Today, 8:34 AM" }, { label: "All validation checks passed", actor: "Validation Agent", at: "Today, 8:35 AM" }, { label: "Routed to manager for approval", actor: "ERP Posting Agent", at: "Today, 8:36 AM" }] },
  { id: "JE-2025-0844", title: "Facilities depreciation adjustment", type: "Estimate adjustment", amount: 43750, entity: "Northstar US", period: "Sep 2025", status: "Needs review", validation: "Warning", confidence: 89, owner: "Jordan Lee", initials: "JL", age: "2 hrs ago", source: "depr_schedule_sep.xlsx", account: "68100 · Depreciation", costCenter: "CC-120 · Facilities", description: "Monthly estimate adjustment based on the revised fixed-asset depreciation schedule.", issues: ["Supporting approval memo not attached"], recommendation: "The calculated amount is within the expected monthly range. Attach the approved estimate memo before routing.", stage: "Validation complete", priority: "Normal", timeline: [{ label: "Submission received", actor: "Journal Intake Agent", at: "Today, 7:48 AM" }, { label: "Validation warning: missing approval memo", actor: "Validation Agent", at: "Today, 7:49 AM" }] },
  { id: "JE-2025-0843", title: "Intercompany services allocation", type: "Intercompany", amount: 132000, entity: "Northstar Germany", period: "Sep 2025", status: "Posted", validation: "Passed", confidence: 99, owner: "Sofia Weber", initials: "SW", age: "Yesterday", source: "ic_services_sep.pdf", account: "48100 · Shared services", costCenter: "CC-900 · Corporate", description: "September shared services allocation across European entities.", issues: [], recommendation: "Allocation percentages and intercompany accounts reconcile.", stage: "Posted to ERP", priority: "Normal", timeline: [{ label: "Submission received", actor: "Journal Intake Agent", at: "Sep 29, 8:15 AM" }, { label: "All validation checks passed", actor: "Validation Agent", at: "Sep 29, 8:16 AM" }, { label: "Approved by Alex Morgan", actor: "Manager approval", at: "Sep 29, 9:02 AM" }, { label: "Posted · ERP document NS-883104", actor: "ERP Posting Agent", at: "Sep 29, 9:03 AM" }] },
  { id: "JE-2025-0842", title: "Marketing campaign accrual", type: "Expense accrual", amount: 32900, entity: "Northstar US", period: "Sep 2025", status: "Posted", validation: "Passed", confidence: 96, owner: "Erin Walsh", initials: "EW", age: "Yesterday", source: "campaign_accrual.xlsx", account: "72100 · Marketing expense", costCenter: "CC-330 · Marketing", description: "Accrual for September digital campaign activity based on agency delivery report.", issues: [], recommendation: "Supporting evidence agrees to the accrued amount.", stage: "Posted to ERP", priority: "Normal", timeline: [{ label: "Submission received", actor: "Journal Intake Agent", at: "Sep 29, 8:05 AM" }, { label: "All validation checks passed", actor: "Validation Agent", at: "Sep 29, 8:06 AM" }, { label: "Approved by Alex Morgan", actor: "Manager approval", at: "Sep 29, 8:21 AM" }, { label: "Posted · ERP document NS-883097", actor: "ERP Posting Agent", at: "Sep 29, 8:22 AM" }] },
  { id: "JE-2025-0841", title: "Duplicate: recruiting services", type: "Expense accrual", amount: 18600, entity: "Northstar Canada", period: "Sep 2025", status: "Rejected", validation: "Error", confidence: 91, owner: "Noah Bell", initials: "NB", age: "Sep 28", source: "recruiting_invoice.pdf", account: "61200 · Professional services", costCenter: "CC-240 · People", description: "Accrual for recruiting agency services in September.", issues: ["Possible duplicate of JE-2025-0839"], recommendation: "An existing journal for the same vendor, period, and amount was found. Review the duplicate before resubmitting.", stage: "Rejected", priority: "Normal", timeline: [{ label: "Possible duplicate identified", actor: "Validation Agent", at: "Sep 28, 2:14 PM" }, { label: "Rejected — duplicate journal", actor: "Alex Morgan", at: "Sep 28, 2:35 PM" }] }
];

const auditEvents = [
  { icon: "✦", title: "Validation exception flagged", desc: "JE-2025-0847 · Unsupported account code 64290 and missing cost center. Confidence 94%.", actor: "Validation Agent", mins: 12 },
  { icon: "↗", title: "Journal routed for approval", desc: "JE-2025-0846 · $87,600 cloud infrastructure true-up routed to Daniel Kim.", actor: "ERP Posting Agent", mins: 38 },
  { icon: "✓", title: "Journal posted to ERP", desc: "JE-2025-0843 · ERP document NS-883104 · September 2025.", actor: "ERP Posting Agent", mins: 1450 },
  { icon: "⇧", title: "Supporting file ingested", desc: "JE-2025-0845 · travel_reclass.csv extracted into 2 journal lines.", actor: "Journal Intake Agent", mins: 60 }
];

const state = { page: "overview", filter: "All journals", search: "", activeJournal: null, editing: false, walkthroughTile: 0 };
const pageNames = { overview: "Executive overview", processing: "Processing center", approvals: "Approvals center", audit: "Audit & compliance", architecture: "Solution architecture" };
const currency = (value) => "$" + Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 });
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const slug = (value) => value.toLowerCase().replaceAll(" ", "-");

function setPage(page) {
  state.page = page;
  document.querySelectorAll(".nav-item[data-page]").forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  document.getElementById("page-crumb").textContent = pageNames[page];
  renderPage();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function statusPill(status) {
  const className = { "Needs review": "review", "Pending approval": "approval", Posted: "posted", Rejected: "rejected", "Information requested": "info", Approved: "approved" }[status] || "info";
  return `<span class="status-pill status-${className}">${escapeHtml(status)}</span>`;
}
function validationPill(status) { return `<span class="validation-pill validation-${status === "Error" ? "error" : status === "Warning" ? "warning" : "passed"}">${escapeHtml(status)}</span>`; }
function findJournal(id) { return journals.find((journal) => journal.id === id); }

function pageHeading(kicker, title, subtitle, actions = "") {
  return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div><div class="heading-actions">${actions}</div></div>`;
}

function dashboardPage() {
  const actions = `<button class="btn" data-action="upload">${icon("upload")} Upload journal</button><button class="btn demo-cta" data-action="walkthrough"><span class="spark">✦</span> Executive Demo Walkthrough</button>`;
  const attentionItems = [
    ...journals.filter((journal) => journal.status === "Needs review").map((journal) => ({ journal, title: `${journal.issues[0] || "Review journal details"} · ${journal.id}`, detail: `${journal.title} · Suggested fix ready`, urgent: journal.validation === "Error" })),
    ...journals.filter((journal) => journal.status === "Pending approval" && journal.amount >= 75000).map((journal) => ({ journal, title: `High-value approval · ${currency(journal.amount)}`, detail: journal.title, urgent: false }))
  ].slice(0, 3);
  const metrics = [
    ["Journals submitted today", "42", `${icon("trend")}<span class="trend-up">+12%</span> vs. last business day`, "file"],
    ["Approval backlog", String(journals.filter((j) => j.status === "Pending approval").length).padStart(2, "0"), `<span class="trend-warn">3 due today</span> · 1 high value`, "clock"],
    ["Automation rate", "78%", `<span class="trend-up">↑ 8.4%</span> this quarter`, "bolt"],
    ["Avg. processing time", "4.2h", `<span class="trend-up">↓ 31%</span> vs. 6.1h baseline`, "calendar"],
    ["Estimated cost savings", "$184K", `<span class="trend-up">↑ 22%</span> annualized`, "coins"]
  ];
  return `${pageHeading("SEPTEMBER CLOSE · DAY 4 OF 5", "Good morning, Alex", "Here’s what’s happening across your journal operations.", actions)}
    <section class="metric-grid">${metrics.map(([label, value, footer, glyph]) => `<button class="metric-card" data-action="metric" data-metric="${escapeHtml(label)}"><span class="metric-top">${label}<span class="metric-icon">${icon(glyph)}</span></span><span class="metric-value">${value}</span><span class="metric-footer">${footer}</span></button>`).join("")}</section>
    <section class="dashboard-grid">
      <article class="panel"><div class="panel-head"><div><h2 class="panel-title">Journal throughput</h2><p class="panel-subtitle">Submission volume and touchless processing over time</p></div><select class="period-select" aria-label="Chart period"><option>Last 7 days</option><option>Last 30 days</option><option>This quarter</option></select></div>
        <div class="chart-wrap"><svg class="chart-svg" viewBox="0 0 600 170" preserveAspectRatio="none" role="img" aria-label="Journal throughput trending up through the week"><defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6a88ef" stop-opacity=".20"/><stop offset="1" stop-color="#6a88ef" stop-opacity="0"/></linearGradient></defs>
          <line class="chart-grid" x1="38" y1="20" x2="590" y2="20"/><line class="chart-grid" x1="38" y1="60" x2="590" y2="60"/><line class="chart-grid" x1="38" y1="100" x2="590" y2="100"/><line class="chart-grid" x1="38" y1="140" x2="590" y2="140"/>
          <text class="chart-label" x="3" y="23">50</text><text class="chart-label" x="3" y="63">35</text><text class="chart-label" x="3" y="103">20</text><text class="chart-label" x="3" y="143">5</text>
          <path class="chart-area" d="M40 121 C80 110 85 104 125 108 S185 88 220 95 S280 70 315 79 S375 54 410 63 S470 40 505 52 S560 24 588 30 L588 145 L40 145Z"/>
          <path class="chart-line" d="M40 121 C80 110 85 104 125 108 S185 88 220 95 S280 70 315 79 S375 54 410 63 S470 40 505 52 S560 24 588 30"/>
          <circle class="chart-point" cx="40" cy="121" r="3.5"/><circle class="chart-point" cx="125" cy="108" r="3.5"/><circle class="chart-point" cx="220" cy="95" r="3.5"/><circle class="chart-point" cx="315" cy="79" r="3.5"/><circle class="chart-point" cx="410" cy="63" r="3.5"/><circle class="chart-point" cx="505" cy="52" r="3.5"/><circle class="chart-point" cx="588" cy="30" r="3.5"/>
          <text class="chart-label" x="34" y="164">Thu</text><text class="chart-label" x="120" y="164">Fri</text><text class="chart-label" x="216" y="164">Mon</text><text class="chart-label" x="311" y="164">Tue</text><text class="chart-label" x="405" y="164">Wed</text><text class="chart-label" x="500" y="164">Thu</text><text class="chart-label" x="579" y="164">Today</text></svg></div>
        <div class="chart-legend"><span><i class="legend-dot"></i>Journals processed</span><span><i class="legend-dot green"></i>Touchless rate: 78%</span><span style="margin-left:auto">↑ 18% vs. prior week</span></div>
      </article>
      <article class="panel"><div class="panel-head"><div><h2 class="panel-title">Agent activity</h2><p class="panel-subtitle">AI agents working across your queue</p></div><span class="status-pill status-posted">All systems active</span></div><div class="agent-summary">
        <div class="agent-row"><span class="agent-symbol">✦</span><span class="agent-info"><strong>Journal Intake Agent</strong><small>Extracting · 6 documents today</small></span><span class="agent-number">42<small>processed</small></span></div>
        <div class="agent-row"><span class="agent-symbol">◎</span><span class="agent-info"><strong>Validation Agent</strong><small>Reviewing · 3 exceptions</small></span><span class="agent-number">39<small>validated</small></span></div>
        <div class="agent-row"><span class="agent-symbol">⌁</span><span class="agent-info"><strong>Correction Agent</strong><small>Recommendations · 2 ready</small></span><span class="agent-number">8<small>assisted</small></span></div>
        <div class="agent-row"><span class="agent-symbol">↗</span><span class="agent-info"><strong>ERP Posting Agent</strong><small>Posting · Oracle Fusion demo</small></span><span class="agent-number">27<small>posted</small></span></div>
      </div></article>
    </section>
    <section class="lower-grid">
      <article class="panel"><div class="panel-head"><div><h2 class="panel-title">Recent journal activity</h2><p class="panel-subtitle">Latest submissions and workflow status</p></div><button class="text-link" data-page="processing">View processing center →</button></div>${journalTable(journals.slice(0, 5), false)}</article>
      <article class="panel"><div class="panel-head"><div><h2 class="panel-title">Needs your attention</h2><p class="panel-subtitle">Items requiring finance team action</p></div><span class="nav-count alert">${attentionItems.length}</span></div><div class="priority-list">
        ${attentionItems.length ? attentionItems.map(({ journal, title, detail, urgent }) => `<div class="priority-item" data-open="${escapeHtml(journal.id)}"><i class="priority-mark ${urgent ? "red" : ""}"></i><span class="priority-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(detail)}</small></span><span class="priority-time">${escapeHtml(journal.age)}</span></div>`).join("") : `<div class="empty-state" style="padding:20px 8px"><span>✓</span><h3>Nothing needs attention</h3><p>Your journal queue is up to date.</p></div>`}
      </div></article>
    </section><div class="kpi-footer"><div><strong>Close-cycle impact</strong><p>You're on track to close 1.5 days faster than last quarter.</p></div><span class="impact-chip">−1.5 days</span></div>`;
}

function journalTable(items, includeValidation = true) {
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Journal</th><th>Amount</th><th>Entity / period</th>${includeValidation ? "<th>Validation</th>" : ""}<th>Status</th><th>Submitted</th></tr></thead><tbody>${items.map((j) => `<tr data-open="${escapeHtml(j.id)}"><td><span class="journal-id">${escapeHtml(j.id)}</span><span class="journal-title">${escapeHtml(j.title)}</span><span class="journal-sub">${escapeHtml(j.type)}</span></td><td class="amount">${currency(j.amount)}</td><td>${escapeHtml(j.entity)}<span class="journal-sub" style="display:block;margin-top:4px">${escapeHtml(j.period)}</span></td>${includeValidation ? `<td>${validationPill(j.validation)}</td>` : ""}<td>${statusPill(j.status)}</td><td>${escapeHtml(j.age)}</td></tr>`).join("") || `<tr><td colspan="6"><div class="empty-state"><span>✓</span><h3>No journals found</h3><p>Try changing your filters or search term.</p></div></td></tr>`}</tbody></table></div>`;
}

function processingPage() {
  const filtered = journals.filter((journal) => {
    const matchesFilter = state.filter === "All journals" || (state.filter === "Needs review" && journal.status === "Needs review") || (state.filter === "Pending approval" && journal.status === "Pending approval") || (state.filter === "Posted" && journal.status === "Posted");
    const haystack = `${journal.id} ${journal.title} ${journal.entity} ${journal.owner}`.toLowerCase();
    return matchesFilter && haystack.includes(state.search.toLowerCase());
  });
  return `${pageHeading("JOURNAL OPERATIONS", "Journal processing center", "Review submissions, validation results, and approval progress.", `<button class="btn" data-action="download">${icon("download")} Export</button><button class="btn btn-primary" data-action="upload">${icon("upload")} New journal</button>`)}
    <article class="panel"><div class="toolbar"><div class="filter-tabs">${["All journals", "Needs review", "Pending approval", "Posted"].map((name) => `<button class="filter-tab ${state.filter === name ? "active" : ""}" data-filter="${name}">${name}<span style="opacity:.65"> · ${name === "All journals" ? journals.length : journals.filter((j) => j.status === name).length}</span></button>`).join("")}</div><div class="toolbar-right"><label class="inline-search">${icon("search")}<input id="table-search" value="${escapeHtml(state.search)}" placeholder="Search journals..." /></label><select class="filter-select" aria-label="Filter by period"><option>All periods</option><option>Sep 2025</option><option>Aug 2025</option></select></div></div>${journalTable(filtered)}<div class="table-foot"><span>Showing ${filtered.length} of ${journals.length} journal entries</span><span>Last updated just now&nbsp; · &nbsp;Auto-refresh on</span></div></article>`;
}

function approvalsPage() {
  const items = journals.filter((journal) => journal.status === "Pending approval");
  return `${pageHeading("MANAGER WORKSPACE", "Approvals center", "Review high-value journals, policy exceptions, and time-sensitive entries.", `<button class="btn" data-action="walkthrough"><span style="color:#7258c5">✦</span> See approval demo</button>`)}
    <div class="metric-grid" style="grid-template-columns:repeat(3,1fr);max-width:800px"><button class="metric-card"><span class="metric-top">Pending my approval<span class="metric-icon">${icon("clock")}</span></span><span class="metric-value">${String(items.length).padStart(2, "0")}</span><span class="metric-footer"><span class="trend-warn">1 high value</span> · 2 due today</span></button><button class="metric-card"><span class="metric-top">Average decision time<span class="metric-icon">${icon("trend")}</span></span><span class="metric-value">2.1h</span><span class="metric-footer"><span class="trend-up">↓ 42%</span> this quarter</span></button><button class="metric-card"><span class="metric-top">Approved this month<span class="metric-icon">${icon("file")}</span></span><span class="metric-value">184</span><span class="metric-footer"><span class="trend-up">96% within SLA</span></span></button></div>
    <div class="eyebrow" style="margin:22px 0 10px">REQUIRES YOUR DECISION <span style="color:#c68a2a">· ${items.length} JOURNALS</span></div><div class="approval-grid">${items.map((j) => `<article class="approval-card" data-open="${escapeHtml(j.id)}"><div class="approval-top"><div><h3>${escapeHtml(j.title)}</h3><span class="meta">${escapeHtml(j.id)} · ${escapeHtml(j.entity)}</span></div>${validationPill(j.validation)}</div><div class="approval-amount">${currency(j.amount)}</div><div class="approval-lines">${escapeHtml(j.type)} · ${escapeHtml(j.period)}<br>${escapeHtml(j.description.slice(0, 100))}${j.description.length > 100 ? "…" : ""}</div><div class="approval-owner"><span class="mini-avatar">${escapeHtml(j.initials)}</span>Submitted by ${escapeHtml(j.owner)}<time>${escapeHtml(j.age)}</time></div><div class="card-actions"><button class="btn btn-success" data-approve="${escapeHtml(j.id)}">✓ Approve</button><button class="btn btn-soft" data-open="${escapeHtml(j.id)}">Review details</button></div></article>`).join("")}</div>${items.length ? "" : `<article class="panel"><div class="empty-state"><span>✓</span><h3>All caught up</h3><p>There are no journals awaiting your approval.</p></div></article>`}`;
}

function auditPage() {
  const eventRows = [...auditEvents, ...journals.slice(0, 4).map((j) => ({ icon: "✦", title: `Journal received · ${j.id}`, desc: `${j.title} · ${currency(j.amount)} · ${j.entity}`, actor: "Journal Intake Agent", mins: 75 }))];
  return `${pageHeading("GOVERNANCE & CONTROLS", "Audit & compliance", "A complete, timestamped record of journal decisions and agent activity.", `<button class="btn" data-action="download">${icon("download")} Export audit log</button>`)}
    <div class="metric-grid" style="grid-template-columns:repeat(4,1fr)"><button class="metric-card"><span class="metric-top">Audit coverage<span class="metric-icon">${icon("trend")}</span></span><span class="metric-value">100%</span><span class="metric-footer"><span class="trend-up">All lifecycle steps captured</span></span></button><button class="metric-card"><span class="metric-top">Control checks<span class="metric-icon">${icon("file")}</span></span><span class="metric-value">12 / 12</span><span class="metric-footer"><span class="trend-up">No control gaps detected</span></span></button><button class="metric-card"><span class="metric-top">AI decisions logged<span class="metric-icon">${icon("bolt")}</span></span><span class="metric-value">1,284</span><span class="metric-footer">Reasoning and confidence recorded</span></button><button class="metric-card"><span class="metric-top">Retention policy<span class="metric-icon">${icon("clock")}</span></span><span class="metric-value">7 years</span><span class="metric-footer">Aligned to FIN-REC-01</span></button></div>
    <section class="section-grid"><article class="panel"><div class="panel-head"><div><h2 class="panel-title">Recent audit trail</h2><p class="panel-subtitle">Immutable workflow events · newest first</p></div><button class="text-link" data-action="download">Download log</button></div>${eventRows.map((event) => `<div class="audit-item"><span class="audit-icon">${event.icon}</span><div><strong>${escapeHtml(event.title)}</strong><p>${escapeHtml(event.desc)}</p><p style="margin-top:4px">${escapeHtml(event.actor)}</p></div><time>${timeAgo(event.mins)}</time></div>`).join("")}</article>
      <article class="panel"><div class="panel-head"><div><h2 class="panel-title">Control framework</h2><p class="panel-subtitle">Active controls for journal operations</p></div><span class="status-pill status-posted">Compliant</span></div>${[["Segregation of duties", "Prevents submitter self-approval"], ["Approval thresholds", "Routes high-value journals to controller"], ["Period & entity controls", "Validates open periods and legal entities"], ["Evidence retention", "Links original source documents"], ["AI decision traceability", "Records model, confidence, and rationale"], ["ERP posting authorization", "Requires human approval before posting"]].map(([title, detail]) => `<div class="control-row"><span class="control-icon">✓</span><span><strong>${title}</strong><small>${detail}</small></span><span class="control-pass">Enforced</span></div>`).join("")}</article></section>`;
}

function architecturePage() {
  const agents = [
    ["Requestor", "Person"], ["Journal Intake Agent", "Extract"], ["Validation Agent", "Validate"], ["Correction Agent", "Recommend"], ["Manager approval", "Human gate"], ["ERP Posting Agent", "Post"], ["Audit repository", "Record"]
  ];
  const stack = [["CS", "Copilot Studio", "Agent orchestration"], ["AI", "Azure AI Foundry", "Model lifecycle"], ["◎", "Azure OpenAI", "Reasoning & generation"], ["DI", "AI Document Intelligence", "Document extraction"], ["F", "Microsoft Fabric", "Analytics & insights"], ["D", "Microsoft Dataverse", "Operational data"], ["T", "Microsoft Teams", "Approvals & alerts"], ["P", "Power Apps", "Finance workspace"], ["⚡", "Power Automate", "Workflow orchestration"], ["ID", "Microsoft Entra ID", "Identity & access"], ["P", "Microsoft Purview", "Governance & audit"]];
  const phases = [
    ["01", "Discovery and Process Mapping", ["Journal process assessment", "ERP integration assessment", "Control evaluation", "Success metrics definition"]],
    ["02", "MVP Build", ["Journal Intake Agent", "Validation Agent", "Approval workflow", "Pilot with finance team"]],
    ["03", "Advanced Automation", ["Correction Agent", "ERP integration", "Policy automation", "Operational analytics"]],
    ["04", "Production Rollout", ["Monitoring & governance", "Operational support", "Change management", "Continuous optimization"]]
  ];
  return `${pageHeading("SOLUTION BLUEPRINT", "Solution architecture", "A governed, human-centered AI workflow built on Microsoft cloud technologies.", `<button class="btn" data-action="walkthrough"><span style="color:#7258c5">✦</span> Executive demo</button>`)}
    <section class="architecture-hero"><div class="eyebrow">JOURNAL ENTRY OPERATIONS AGENT</div><h2>From unstructured request to trusted ERP posting.</h2><p>Four purpose-built AI agents coordinate a transparent workflow, with human approval before every posting.</p><div class="flow">${agents.map(([name, role], index) => `${index ? `<span class="flow-arrow">→</span>` : ""}<div class="flow-node"><span class="flow-icon">${["♙", "✦", "◎", "⌁", "✓", "↗", "▤"][index]}</span><strong>${name}<br><small style="font-weight:400;color:#aab8d3">${role}</small></strong></div>`).join("")}</div></section>
    <section class="panel" style="margin-bottom:15px"><div class="panel-head"><div><h2 class="panel-title">Microsoft technology stack</h2><p class="panel-subtitle">Secure, composable platform services across the journal lifecycle</p></div><span class="status-pill status-approval">Microsoft cloud</span></div><div class="stack-grid">${stack.map(([mark, name, use]) => `<div class="stack-item"><span class="stack-logo">${mark}</span><span><strong>${name}</strong><small>${use}</small></span></div>`).join("")}</div></section>
    <div class="eyebrow" style="margin:21px 0 10px">DELIVERY ROADMAP</div><div class="phase-grid">${phases.map(([num, title, items]) => `<article class="phase-card"><div class="phase-number">${num}</div><h3>${title}</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}</div>`;
}

function renderPage() {
  const content = document.getElementById("page-content");
  content.innerHTML = ({ overview: dashboardPage, processing: processingPage, approvals: approvalsPage, audit: auditPage, architecture: architecturePage })[state.page]();
  document.getElementById("nav-backlog").textContent = journals.filter((j) => j.status === "Needs review").length;
  document.getElementById("nav-approvals").textContent = journals.filter((j) => j.status === "Pending approval").length;
}

function openJournal(id) {
  const journal = findJournal(id);
  if (!journal) return;
  state.activeJournal = journal.id;
  state.editing = false;
  renderWorkspace();
}

function renderWorkspace() {
  const journal = findJournal(state.activeJournal);
  if (!journal) return;
  const issues = journal.issues.length ? journal.issues.map((issue, index) => `<div class="validation-entry"><span class="issue-icon ${journal.validation === "Error" ? "error" : "warn"}">${journal.validation === "Error" ? "!" : "i"}</span><span><strong>${escapeHtml(issue)}</strong><p>${index === 0 ? "Review this attribute before routing the journal for approval." : "This journal does not meet the configured finance policy."}</p></span></div>`).join("") : `<div class="validation-entry"><span class="issue-icon ok">✓</span><span><strong>All validation checks passed</strong><p>Account, entity, period, supporting evidence, and duplicate checks are clear.</p></span></div>`;
  const editControl = state.editing ? `<button class="btn btn-soft" data-action="save-edits">Save changes</button>` : `<button class="text-link" data-action="edit">Edit fields</button>`;
  const modal = `<div class="overlay" id="workspace-overlay"><section class="workspace-drawer" role="dialog" aria-modal="true" aria-label="Journal workspace">
    <header class="drawer-header"><div><div class="eyebrow" style="margin-bottom:5px">${escapeHtml(journal.id)} · ${escapeHtml(journal.type)}</div><h2>${escapeHtml(journal.title)}</h2><p>Submitted by ${escapeHtml(journal.owner)} · ${escapeHtml(journal.age)}</p></div><div class="drawer-head-actions">${statusPill(journal.status)}<button class="close-button" data-action="close-overlay" aria-label="Close">×</button></div></header>
    <div class="drawer-body"><div class="workspace-banner"><div class="confidence-ring"><span>${journal.confidence}%</span></div><div><strong>Intake confidence · ${journal.confidence >= 95 ? "High confidence" : "Good confidence"}</strong><small>Journal Intake Agent extracted and structured this submission. Human review is required for corrections and approvals.</small></div></div>
      <div class="workspace-columns"><div>
        <article class="workspace-card"><div class="workspace-card-head"><h3>Journal details</h3>${editControl}</div><div class="field-grid"><div class="field"><label>Legal entity</label><input data-field="entity" value="${escapeHtml(journal.entity)}" ${state.editing ? "" : "readonly"} /></div><div class="field"><label>Accounting period</label><input data-field="period" value="${escapeHtml(journal.period)}" ${state.editing ? "" : "readonly"} /></div><div class="field"><label>Account code</label><input data-field="account" value="${escapeHtml(journal.account)}" ${state.editing ? "" : "readonly"} /></div><div class="field"><label>Cost center</label><input data-field="costCenter" value="${escapeHtml(journal.costCenter)}" ${state.editing ? "" : "readonly"} /></div><div class="field"><label>Journal amount</label><input value="${currency(journal.amount)}" readonly /></div><div class="field"><label>Workflow stage</label><input value="${escapeHtml(journal.stage)}" readonly /></div></div><table class="journal-lines"><thead><tr><th>Account</th><th>Debit</th><th>Credit</th></tr></thead><tbody><tr><td>${escapeHtml(journal.account)}</td><td>${currency(journal.amount)}</td><td>—</td></tr><tr><td>Accrued expenses</td><td>—</td><td>${currency(journal.amount)}</td></tr></tbody></table></article>
        <article class="workspace-card"><div class="workspace-card-head"><h3>Validation report</h3>${validationPill(journal.validation)}</div><div class="validation-list">${issues}</div></article>
      </div><div>
        <article class="workspace-card"><div class="workspace-card-head"><h3>Original submission</h3><small>Received ${timeAgo(12)}</small></div><div class="evidence-row"><span class="file-icon">${journal.source.split(".").pop().toUpperCase()}</span><span><strong>${escapeHtml(journal.source)}</strong><small>Supporting evidence · 184 KB</small></span><button class="text-link" data-action="preview-file">Preview</button></div></article>
        <article class="workspace-card"><div class="workspace-card-head"><h3>Correction recommendation</h3><small>Correction Agent</small></div><div class="recommendation"><div class="recommendation-top">✦ AI-ASSISTED RECOMMENDATION</div><p>${escapeHtml(journal.recommendation)}</p>${journal.issues.length ? `<button class="btn btn-soft" data-action="accept-recommendation">✓ Accept recommendation</button>` : `<span class="status-pill status-posted">No correction needed</span>`}</div></article>
        <article class="workspace-card"><div class="workspace-card-head"><h3>Journal lifecycle</h3><small>Complete audit history</small></div><div class="timeline">${journal.timeline.map((event) => `<div class="timeline-entry"><i class="timeline-dot"></i><span><strong>${escapeHtml(event.label)}</strong><small>${escapeHtml(event.actor)} · ${escapeHtml(event.at)}</small></span></div>`).join("")}</div></article>
      </div></div>
    </div>
    <footer class="drawer-footer"><button class="btn btn-danger" data-action="reject">Reject</button><div class="footer-actions"><button class="btn" data-action="request-info">Request information</button>${journal.status === "Pending approval" ? `<button class="btn btn-primary" data-action="approve">Approve &amp; post</button>` : journal.status === "Approved" ? `<button class="btn btn-primary" data-action="post">Post to ERP</button>` : `<button class="btn btn-primary" data-action="route-approval">Accept &amp; route for approval</button>`}</div></footer>
  </section></div>`;
  document.getElementById("overlay-root").innerHTML = modal;
}

function addAudit(journal, label, actor) {
  const entry = { label, actor, at: now().toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) };
  journal.timeline.push(entry);
  auditEvents.unshift({ icon: "✓", title: `${label} · ${journal.id}`, desc: `${journal.title} · ${currency(journal.amount)} · ${journal.entity}`, actor, mins: 0 });
}

function doAction(action, id = state.activeJournal, metric) {
  if (action === "run-demo-step") { runDemoStep(); return; }
  if (action === "metric") {
    if (metric === "Approval backlog") setPage("approvals");
    else { state.filter = "All journals"; setPage("processing"); }
    return;
  }
  const journal = findJournal(id);
  if (action === "walkthrough") { openWalkthrough(); return; }
  if (action === "upload") { document.getElementById("upload-file").click(); return; }
  if (action === "download") { exportJournals(); return; }
  if (action === "close-overlay") { document.getElementById("overlay-root").innerHTML = ""; state.activeJournal = null; return; }
  if (action === "preview-file") { toast("Supporting document preview is simulated in this demo."); return; }
  if (!journal) return;
  if (action === "edit") { state.editing = true; renderWorkspace(); return; }
  if (action === "save-edits") {
    document.querySelectorAll("[data-field]").forEach((input) => { journal[input.dataset.field] = input.value.trim(); });
    addAudit(journal, "Journal details edited", "Alex Morgan");
    state.editing = false; toast("Journal details saved and recorded in the audit trail."); renderWorkspace(); return;
  }
  if (action === "accept-recommendation") {
    journal.account = "64210 · Telecommunications";
    journal.costCenter = "CC-410 · Sales Operations";
    journal.issues = [];
    journal.validation = "Passed";
    journal.recommendation = "Recommended coding has been applied. The journal now passes all account and cost center checks.";
    journal.stage = "Correction accepted · Ready for approval";
    addAudit(journal, "Human accepted AI correction recommendation", "Alex Morgan");
    toast("Correction accepted. The journal is ready to route for approval.");
  } else if (action === "route-approval") {
    journal.status = "Pending approval"; journal.stage = "Awaiting manager approval";
    addAudit(journal, "Journal routed for manager approval", "ERP Posting Agent");
    toast("Journal routed to the Accounting Manager for approval.");
  } else if (action === "approve") {
    journal.status = "Posted"; journal.stage = "Posted to ERP";
    addAudit(journal, "Journal approved by Alex Morgan", "Accounting Manager");
    addAudit(journal, "Posted · ERP document NS-" + Math.floor(883200 + Math.random() * 799), "ERP Posting Agent");
    toast("Approved and posted to the ERP simulation.");
  } else if (action === "post") {
    journal.status = "Posted"; journal.stage = "Posted to ERP";
    addAudit(journal, "Posted · ERP document NS-" + Math.floor(883200 + Math.random() * 799), "ERP Posting Agent");
    toast("Journal posted to the ERP simulation.");
  } else if (action === "reject") {
    journal.status = "Rejected"; journal.stage = "Rejected";
    addAudit(journal, "Journal rejected by Alex Morgan", "Accounting Manager");
    toast("Journal rejected. The decision is recorded in the audit trail.");
  } else if (action === "request-info") {
    journal.status = "Information requested"; journal.stage = "Waiting for requestor information";
    addAudit(journal, "Additional information requested", "Alex Morgan");
    toast("Information request sent to the journal requestor.");
  }
  renderPage(); renderWorkspace();
}

function openWalkthrough() {
  state.walkthroughTile = 0;
  renderWalkthrough();
}

const walkthrough = [
  { title: "The Challenge", icon: "◌", summary: "Thousands of requests. One close deadline.", detail: "Finance teams receive journal requests through email, spreadsheets, and service tickets. Manual review creates close delays, repetitive effort, and control risk.", action: "Explore the challenge" },
  { title: "Journal Intake Agent", icon: "✦", summary: "A telecom accrual arrives as a spreadsheet.", detail: "The Intake Agent reads telecom_accrual_sep.xlsx, extracts the amount and entity, structures the journal, and identifies September 2025 as the accounting period. Confidence: 94%.", action: "View extracted journal" },
  { title: "Validation Agent", icon: "◎", summary: "Two policy issues surface before approval.", detail: "The Validation Agent detects an unsupported account code (64290) and a missing cost center. The exceptions are visible in the validation report.", action: "Inspect validation report" },
  { title: "Correction Agent", icon: "⌁", summary: "A human reviews and accepts a suggested fix.", detail: "The Correction Agent recommends account 64210 · Telecommunications and CC-410 · Sales Operations, with a policy-based explanation. The agent suggests; a person accepts.", action: "Accept suggested correction" },
  { title: "ERP Posting Agent", icon: "↗", summary: "Manager approval, then simulated ERP posting.", detail: "The Accounting Manager approves the corrected journal. The ERP Posting Agent creates a posting package, simulates an Oracle Fusion post, and records the ERP reference in the audit trail.", action: "Approve & post journal" },
  { title: "Business Impact", icon: "▤", summary: "A faster close with stronger controls.", detail: "The demo outcome: 80% faster journal processing, 60% less manual effort, fewer coding errors, a faster month-end close, and a complete audit trail.", action: "View executive dashboard" }
];

function renderWalkthrough() {
  const root = document.getElementById("overlay-root");
  root.innerHTML = `<div class="overlay centered" id="walkthrough-overlay"><section class="walkthrough-modal" role="dialog" aria-modal="true" aria-label="Executive Demo Walkthrough"><header class="walkthrough-header"><div><div class="eyebrow">JOURNAL ENTRY OPERATIONS AGENT</div><h2>Executive Demo Walkthrough</h2><p>Follow one journal from an unstructured request to a controlled ERP posting.</p></div><button class="close-button" data-action="close-overlay" aria-label="Close walkthrough">×</button></header><div class="walkthrough-content"><div class="walkthrough-grid">${walkthrough.map((tile, index) => `<button class="walk-tile ${state.walkthroughTile === index + 1 ? "selected" : ""}" data-tile="${index + 1}"><span class="walk-num">0${index + 1} / 06</span><span class="walk-icon">${tile.icon}</span><h3>${tile.title}</h3><p>${tile.summary}</p><span class="walk-more">${tile.detail}${index === 5 ? `<div class="impact-comparison"><div class="impact-compare-group"><strong>PROCESSING TIME</strong><div class="impact-bars"><div class="impact-bar before" style="width:100%">Before · 20h</div><div class="impact-bar after" style="width:20%">With AI · 4h</div></div></div><div class="impact-compare-group"><strong>MANUAL EFFORT</strong><div class="impact-bars"><div class="impact-bar before" style="width:100%">Before · 100%</div><div class="impact-bar after" style="width:40%">With AI · 40%</div></div></div></div>` : ""}</span></button>`).join("")}</div><div class="walk-bottom"><span>Click a tile to explore each stage of the journey.</span><button class="btn btn-primary" data-action="run-demo-step">${walkthrough[state.walkthroughTile ? state.walkthroughTile - 1 : 0].action} →</button></div></div></section></div>`;
}

function runDemoStep() {
  const step = state.walkthroughTile || 1;
  const journal = findJournal("JE-2025-0847");
  if (step === 1) { toast("Manual review, close delays, and control risk — addressed by four focused agents."); }
  if (step === 2) { journal.status = "Needs review"; journal.validation = "Error"; journal.stage = "Intake complete · Validation complete"; addAudit(journal, "Telecom accrual extracted · 94% confidence", "Journal Intake Agent"); document.getElementById("overlay-root").innerHTML = ""; setPage("processing"); openJournal(journal.id); return; }
  if (step === 3) { journal.validation = "Error"; journal.issues = ["Missing cost center", "Unsupported account code"]; journal.status = "Needs review"; addAudit(journal, "Validation exceptions detected", "Validation Agent"); document.getElementById("overlay-root").innerHTML = ""; openJournal(journal.id); return; }
  if (step === 4) { document.getElementById("overlay-root").innerHTML = ""; openJournal(journal.id); doAction("accept-recommendation", journal.id); return; }
  if (step === 5) {
    journal.account = "64210 · Telecommunications"; journal.costCenter = "CC-410 · Sales Operations"; journal.issues = []; journal.validation = "Passed"; journal.status = "Posted"; journal.stage = "Posted to ERP";
    addAudit(journal, "Human accepted AI correction recommendation", "Alex Morgan"); addAudit(journal, "Approved by Accounting Manager", "Accounting Manager"); addAudit(journal, "Posted · ERP document NS-883421", "ERP Posting Agent");
    document.getElementById("overlay-root").innerHTML = ""; renderPage(); openJournal(journal.id); toast("Demo journal approved and POSTED to the ERP simulation."); return;
  }
  if (step === 6) { document.getElementById("overlay-root").innerHTML = ""; setPage("overview"); toast("Walkthrough complete. Explore the dashboard and audit trail."); return; }
}

function exportJournals() {
  const rows = [["Journal ID", "Title", "Amount", "Entity", "Period", "Validation", "Status", "Owner"], ...journals.map((j) => [j.id, j.title, j.amount, j.entity, j.period, j.validation, j.status, j.owner])];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); link.download = "journal-operations-export.csv"; link.click(); URL.revokeObjectURL(link.href);
  toast("Journal export downloaded.");
}

function toast(message) {
  const region = document.getElementById("toast-region");
  const item = document.createElement("div"); item.className = "toast"; item.innerHTML = `<span>✓</span>${escapeHtml(message)}`; region.append(item);
  window.setTimeout(() => item.remove(), 3600);
}

function handleUpload(file) {
  if (!file) return;
  const supported = /\.(xlsx?|pdf|csv)$/i.test(file.name);
  if (!supported) { toast("Choose an Excel, PDF, or CSV journal submission."); return; }
  const journal = { id: `JE-2025-${String(848 + journals.length).padStart(4, "0")}`, title: file.name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " "), type: "New submission", amount: 0, entity: "Pending extraction", period: "Pending extraction", status: "Needs review", validation: "Warning", confidence: 0, owner: "Alex Morgan", initials: "AM", age: "Just now", source: file.name, account: "Pending extraction", costCenter: "Pending extraction", description: "A newly uploaded journal submission is queued for document extraction.", issues: ["Awaiting document extraction"], recommendation: "The Journal Intake Agent will extract the journal attributes and supporting evidence. Review the proposed values before validation.", stage: "Queued for intake", priority: "Normal", timeline: [{ label: "Submission received · queued for extraction", actor: "Journal Intake Agent", at: now().toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) }] };
  journals.unshift(journal);
  state.search = ""; state.filter = "All journals";
  if (state.page === "processing") renderPage();
  toast(`${file.name} received. Journal Intake Agent is ready to extract the submission.`);
}

document.addEventListener("click", (event) => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) { event.preventDefault(); setPage(pageButton.dataset.page); return; }
  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) { state.filter = filterButton.dataset.filter; renderPage(); return; }
  const tile = event.target.closest("[data-tile]");
  if (tile) { state.walkthroughTile = Number(tile.dataset.tile); renderWalkthrough(); return; }
  const approveButton = event.target.closest("[data-approve]");
  if (approveButton) { event.stopPropagation(); doAction("approve", approveButton.dataset.approve); return; }
  const openButton = event.target.closest("[data-open]");
  if (openButton) { openJournal(openButton.dataset.open); return; }
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) { doAction(actionButton.dataset.action, state.activeJournal, actionButton.dataset.metric); return; }
  if (event.target.id === "workspace-overlay" || event.target.id === "walkthrough-overlay") { document.getElementById("overlay-root").innerHTML = ""; state.activeJournal = null; }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "table-search") { state.search = event.target.value; const position = event.target.selectionStart; renderPage(); const replacement = document.getElementById("table-search"); replacement.focus(); replacement.setSelectionRange(position, position); }
  if (event.target.id === "global-search") {
    state.search = event.target.value;
    if (state.page !== "processing") setPage("processing"); else renderPage();
    const replacement = document.getElementById("table-search");
    if (replacement) { replacement.value = state.search; replacement.focus(); replacement.setSelectionRange(state.search.length, state.search.length); }
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.getElementById("global-search").focus(); }
  if (event.key === "Escape") { document.getElementById("overlay-root").innerHTML = ""; state.activeJournal = null; }
  if (event.key === "Enter" && event.target.matches(".global-search input")) { setPage("processing"); document.getElementById("table-search")?.focus(); }
  if (event.key === "Enter" && document.getElementById("walkthrough-overlay")) runDemoStep();
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("journalops-theme", document.body.classList.contains("dark") ? "dark" : "light");
});
document.getElementById("upload-file").addEventListener("change", (event) => { handleUpload(event.target.files[0]); event.target.value = ""; });
document.querySelector(".notification-button").addEventListener("click", () => toast("You’re all caught up on notifications."));
document.querySelector(".help-link").addEventListener("click", () => toast("Contact your Finance Operations administrator for support."));

if (localStorage.getItem("journalops-theme") === "dark") document.body.classList.add("dark");
renderPage();
