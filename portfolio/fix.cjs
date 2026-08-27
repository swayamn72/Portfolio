const fs = require('fs');

try {
  let html = fs.readFileSync('original_index.html', 'utf8');

  // 1. Fix hero tag and CGPA
  html = html.replace(
    '<p class="hero-tag">COMPUTER ENGINEERING · KJSSE · MUMBAI · 8.7 CGPA</p>',
    '<p class="hero-tag" style="letter-spacing: 2px;">B.TECH · KJSSE · 8.9 CGPA</p>'
  );
  html = html.replace('<strong>8.7 CGPA</strong>', '<strong>8.9 CGPA</strong>');
  html = html.replace('<div class="edu-score">8.7 CGPA</div>', '<div class="edu-score">8.9 CGPA</div>');

  // 2. Add VISIT PROFILE ↗ to cp cards
  // We match the rating row and insert right after it, before the closing </div></a>
  html = html.replace(
    /(\s*<div class="cp-rating-row">[\s\S]*?<\/div>)\s*(<\/div>\s*<\/a>)/g,
    `$1\n              <div style="margin-top: 15px; text-align: right; font-size: 0.75rem; font-family: 'Share Tech Mono'; letter-spacing: 2px; opacity: 0.7;">VISIT PROFILE ↗</div>\n            $2`
  );

  // 3. Swap Experience and CP sections
  const expStart = html.indexOf('<section id="experience">');
  const expEnd = html.indexOf('</section>', expStart) + 10;
  const expSection = html.substring(expStart, expEnd);

  const cpStart = html.indexOf('<section id="cp">');
  const cpEnd = html.indexOf('</section>', cpStart) + 10;
  let cpSection = html.substring(cpStart, cpEnd);

  // Remove CP from old location
  let newHtml = html.substring(0, cpStart) + html.substring(cpEnd);
  // Remove Experience from old location
  newHtml = newHtml.replace(expSection, '');

  // Insert CP then Experience before Projects
  const insertPos = newHtml.indexOf('<!-- PROJECTS -->');
  newHtml = newHtml.substring(0, insertPos) + cpSection + '\n\n  <!-- EXPERIENCE -->\n  ' + expSection + '\n\n  ' + newHtml.substring(insertPos);

  // 4. Update section numbering
  newHtml = newHtml.replace('// 04 — COMPETITIVE PROGRAMMING', '// 02 — PROBLEM SOLVING');
  newHtml = newHtml.replace('// 02 — EXPERIENCE', '// 03 — EXPERIENCE');
  newHtml = newHtml.replace('// 03 — PROJECTS', '// 04 — PROJECTS');
  newHtml = newHtml.replace('// 05 — SKILLS', '// 05 — SKILLS');
  newHtml = newHtml.replace('// 06 — EDUCATION', '// 06 — EDUCATION');
  newHtml = newHtml.replace('// 07 — ACHIEVEMENTS', '// 07 — ACHIEVEMENTS');
  newHtml = newHtml.replace('// 08 — CERTIFICATIONS', '// 08 — CERTIFICATIONS');

  fs.writeFileSync('index.html', newHtml, 'utf8');
  fs.writeFileSync('index2.html', newHtml, 'utf8');
  console.log('Successfully restored and updated index.html!');
} catch (e) {
  console.error(e);
}
