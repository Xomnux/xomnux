const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
function replaceRequired(text, before, after) {
  if (!text.includes(before)) throw new Error(`Missing expected source: ${before}`);
  return text.replace(before, () => after);
}

let script = replaceRequired(read('src/app.js'), "import './style.css';", '');
// Pages has no Node API. Empty payment configuration retains the existing
// localized unavailable messages without requesting nonexistent endpoints.
script = replaceRequired(script,
  "fetch('/api/config').then(r=>r.json()).then(x=>config=x).catch(()=>{});", '');
new vm.Script(script); // Check the generated browser script before writing.
const css = read('src/style.css');
let html = replaceRequired(read('src/index.html'),
  '<script src="https://js.stripe.com/v3/"></script>', '');
html = replaceRequired(html, '</head>',
  `<style>\n${css.replace(/<\/style/gi, '<\\/style')}\n</style></head>`);
html = replaceRequired(html, '</body>',
  `<script>\n${script.replace(/<\/script/gi, '<\\/script')}\n</script></body>`);
const output = path.join(root, 'github-pages', 'index.html');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, html, 'utf8');
console.log(`Created ${output} (${Buffer.byteLength(html)} bytes)`);
