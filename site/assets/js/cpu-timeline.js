/* 内容保留在 HTML；脚本仅增强筛选、检索、显示密度与窄屏年份定位。 */
(() => {
  const root = document.querySelector('[data-cpu-chronicle]');
  if (!root) return;
  const events = [...root.querySelectorAll('.event')];
  const sections = [...root.querySelectorAll('tbody[data-year]')];
  const controls = root.querySelector('[data-controls]');
  const input = root.querySelector('[data-search]');
  const status = root.querySelector('[data-status]');
  const empty = root.querySelector('[data-empty]');
  const buttons = [...root.querySelectorAll('[data-kind]')];
  let activeKind = 'all';

  function filter() {
    const query = input.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const event of events) {
      const kinds = event.dataset.tags.split(' ');
      const typeMatches = activeKind === 'all' || kinds.includes(activeKind) ||
        (activeKind === 'release' && kinds.includes('adoption'));
      const rowDate = event.closest('.month-row')?.querySelector('th')?.textContent || '';
      const matches = typeMatches &&
        `${rowDate} ${event.textContent}`.toLocaleLowerCase().includes(query);
      event.hidden = !matches;
      if (matches) visible++;
    }
    // 按整行、整年移除空白；保留厂商列位，避免筛选后破坏时间对照关系。
    for (const section of sections) {
      let hasEvents = false;
      for (const row of section.querySelectorAll('.month-row')) {
        const hasVisible = [...row.querySelectorAll('.event')].some(event => !event.hidden);
        row.hidden = !hasVisible;
        if (hasVisible) hasEvents = true;
      }
      section.hidden = !hasEvents;
    }
    status.textContent = `显示 ${visible} / ${events.length} 条记录`;
    empty.hidden = visible !== 0;
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      activeKind = button.dataset.kind;
      for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
      filter();
    });
  }
  input.addEventListener('input', filter);
  root.querySelector('[data-compact]').addEventListener('change', event => {
    root.classList.toggle('compact', event.target.checked);
  });
  root.querySelector('[data-expand]').addEventListener('change', event => {
    for (const detail of root.querySelectorAll('.event details')) detail.open = event.target.checked;
  });
  for (const link of root.querySelectorAll('.era-nav a')) {
    link.addEventListener('click', () => {
      // 跳转年份前重置筛选，使原生锚点始终能定位到可见年份。
      activeKind = 'all';
      input.value = '';
      for (const item of buttons) item.setAttribute('aria-pressed', String(item.dataset.kind === 'all'));
      filter();
    });
  }
  controls.hidden = false;
  filter();
})();
