const fs = require('fs');

try {
  let html = fs.readFileSync('index.html', 'utf8');

  // 1. Projects Grid columns
  html = html.replace('grid-template-columns: repeat(2, 1fr);', 'grid-template-columns: repeat(3, 1fr);');

  // 2. Hero CSS
  const originalHeroInnerCSS = `    .hero-inner {
      position: relative;
      z-index: 10;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 64px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }`;

  const newHeroInnerCSS = `    .hero-inner {
      position: relative;
      z-index: 10;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 64px;
      height: 100vh;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
    }
    .hero-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }`;

  html = html.replace(originalHeroInnerCSS, newHeroInnerCSS);

  // 3. Hero HTML
  const originalHeroHTML = `    <div class="hero-inner">
      <p class="hero-tag" style="letter-spacing: 2px;">B.TECH · KJSSE · 8.9 CGPA</p>
      <h1 class="hero-name">
        SWAYAM<br>
        <span class="accent-word" data-text="NAKTE">NAKTE</span>
      </h1>
      <p class="hero-desc">
        <strong>Full-stack developer</strong> and <strong>competitive programmer</strong> studying Computer Engineering
        at K.J. Somaiya School Of Engineering. I build production-grade apps, solve hard algorithmic problems, and
        obsess over clean code.
      </p>
      <div class="hero-chips">
        <span class="chip chip-red">C++ · RUST · JS</span>
        <span class="chip chip-blue">MERN STACK</span>
        <span class="chip chip-green">FLUTTER · DART</span>
        <span class="chip chip-gold">AWS · DOCKER</span>
        <span class="chip chip-red">CF SPECIALIST</span>
      </div>
      <div class="hero-cta">
        <a href="#contact" class="btn btn-filled">GET IN TOUCH</a>
        <a href="#projects" class="btn btn-outline">VIEW PROJECTS</a>
      </div>
    </div>`;

  const newHeroHTML = `    <div class="hero-inner">
      <div class="hero-left">
        <p class="hero-tag" style="letter-spacing: 2px;">B.TECH · KJSSE · 8.9 CGPA</p>
        <h1 class="hero-name">
          SWAYAM<br>
          <span class="accent-word" data-text="NAKTE">NAKTE</span>
        </h1>
        <p class="hero-desc">
          <strong>Full-stack developer</strong> and <strong>competitive programmer</strong> studying Computer Engineering
          at K.J. Somaiya School Of Engineering. I build production-grade apps, solve hard algorithmic problems, and
          obsess over clean code.
        </p>
        <div class="hero-chips">
          <span class="chip chip-red">C++ · RUST · JS</span>
          <span class="chip chip-blue">MERN STACK</span>
          <span class="chip chip-green">FLUTTER · DART</span>
          <span class="chip chip-gold">AWS · DOCKER</span>
          <span class="chip chip-red">CF SPECIALIST</span>
        </div>
        <div class="hero-cta">
          <a href="#contact" class="btn btn-filled">GET IN TOUCH</a>
          <a href="#projects" class="btn btn-outline">VIEW PROJECTS</a>
        </div>
      </div>
      <div class="hero-right">
        <img src="./src/assets/pfp.jpg" alt="Swayam Nakte" style="width: 380px; height: 380px; border-radius: 50%; object-fit: cover; border: 4px solid var(--red); box-shadow: 0 0 40px rgba(232,0,45,0.5);" />
      </div>
    </div>`;

  html = html.replace(originalHeroHTML, newHeroHTML);

  fs.writeFileSync('index.html', html, 'utf8');
  fs.writeFileSync('index2.html', html, 'utf8');
  console.log('Successfully re-applied hero and grid layout fixes!');
} catch (e) {
  console.error(e);
}
