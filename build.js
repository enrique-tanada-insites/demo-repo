// TW#27022015 test build: writes one page into dist/, stamped with the commit it was built from,
// so the deployed page shows GitHub Actions built it.
const fs = require('fs');
const path = require('path');
const sha = (process.env.GITHUB_SHA || 'local').slice(0, 7);
const out = path.join('dist', 'app', 'views', 'pages');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'tw27022015-built.liquid'),
  `---\nslug: tw27022015-built\n---\n<h1>TW#27022015: built by GitHub Actions from ${sha}</h1>\n<p>built-by=${process.env.GITHUB_ACTIONS ? 'github-actions' : 'elsewhere'}</p>\n`);
console.log(`built dist/ from ${sha}`);
// TW#27022015 rollback test: a staging-only drill page, so the deploy is failed and rolled back.
fs.writeFileSync(path.join(out, '__rollback-drill__tw27022015-actions.liquid'), '<h1>drill: must be rolled back</h1>\n');
fs.writeFileSync(path.join(out, 'tw27022015-built.liquid'),
  `---\nslug: tw27022015-built\n---\n<h1>TW#27022015: built by GitHub Actions from ${sha} (this build must be rolled back)</h1>\n<p>built-by=${process.env.GITHUB_ACTIONS ? 'github-actions' : 'elsewhere'}</p>\n`);
