// 目录链接预写在 HTML 中；这里只根据屏幕宽度调整展开状态。
const toc = document.querySelector('.article-toc');
if (toc) {
  const desktop = window.matchMedia('(min-width: 1001px)');
  const adjust = () => { toc.open = desktop.matches; };
  adjust();
  desktop.addEventListener('change', adjust);
}
// 复制按钮为增强功能，失败时保留可手动选择的代码。
if (navigator.clipboard && window.isSecureContext) {
  for (const block of document.querySelectorAll('.article-body pre')) {
    const code = block.querySelector('code');
    if (!code) continue;
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.type = 'button';
    button.textContent = '复制代码';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = '已复制';
      } catch {
        button.textContent = '请手动选择并复制';
      }
      setTimeout(() => { button.textContent = '复制代码'; }, 2000);
    });
    const heading = block.closest('.code-panel')?.querySelector('.code-heading');
    if (heading) heading.append(button);
    else block.prepend(button);
  }
}
