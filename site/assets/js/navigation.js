// 筛选只隐藏静态卡片；没有 JavaScript 时全部入口仍可访问。
const filterBar = document.querySelector('[data-topic-filters]');
if (filterBar) {
  const cards = [...document.querySelectorAll('[data-topic]')];
  filterBar.hidden = false;
  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    for (const control of filterBar.querySelectorAll('button')) {
      control.setAttribute('aria-pressed', String(control === button));
    }
    for (const card of cards) {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.topic !== button.dataset.filter;
    }
    const status = document.querySelector('[data-filter-status]');
    if (status) status.textContent = `显示 ${cards.filter((card) => !card.hidden).length} 个系列`;
  });
}
