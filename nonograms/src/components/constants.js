export const baseLayout = `<div class="container">
<header class="header">
  <div class="header__container">
    <h1 class="header__container__title">
      Nonograms<span class="header__title_small"> by <a href="https://github.com/40iq" class="header__title_link" target="_blank">40iq</a></span>
    </h1>
  </div>
</header>
<main class="main">
  <div class="main__container"></div>
</main>
<footer class="footer">
  <div class="footer__container">
    <a href="https://github.com/40iq" class="footer__link footer__link_git" target="_blank">GitHub: 40iq</a
    ><span class="footer__container_date">Jan 2024</span
    ><a href="https://rs.school/" class="footer__link footer__link_rss" target="_blank">RS-school</a>
  </div>
</footer>
</div>
`;

export const numberOfLevels = 10;

export const DEFAULTSETTINGS = {
  selectedDiff: 'easy',
  selectedLevel: 'level_11',
};
