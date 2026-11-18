# Journal Entry Operations Agent

A responsive, self-contained executive demo of AI-assisted journal intake, validation, correction, approvals, simulated ERP posting, and auditability. The experience is implemented with browser-native HTML, CSS, and JavaScript; no package installation or build step is required.

## Run locally

Open `index.html` in a modern browser, or serve the repository root with any static web server.

## Demo interactions

- Use the sidebar to switch between Executive Overview, Processing Center, Approvals Center, Audit & Compliance, and Solution Architecture.
- Select a journal to review extracted fields, validation results, correction recommendations, and its lifecycle. Accepted corrections and approval/posting actions update the demo data and audit trail.
- Upload an `.xlsx`, `.xls`, `.pdf`, or `.csv` file to simulate a new submission. Document extraction and ERP posting are represented as demo workflow states, not live integrations.
- Open **Executive Demo Walkthrough** to explore six clickable tiles. Each stage shows its inputs, results, and human controls inside the walkthrough; use **Back** and **Next step** or select any tile. Accept the correction in step 4 before simulating manager approval and posting in step 5. The walkthrough uses an isolated simulation and does not change the journal queue or audit log. Reopening it resets the simulation.
- Toggle the moon icon for dark mode. Journal exports download as CSV.

## Walkthrough regression tests

With Node.js installed, run `node --test tests\walkthrough.test.cjs`. These dependency-free tests cover all six stages, navigation, approval gating, repeat runs, and isolation from journal data.
