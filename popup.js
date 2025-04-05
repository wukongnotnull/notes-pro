// 引入marked库用于Markdown渲染
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
document.head.appendChild(script);

let editor;
let statusEl;
let saveTimeout;
let isDragging = false;
let startWidth;
let startHeight;

// 初始化编辑器
function initEditor() {
  editor = document.getElementById('editor');
  statusEl = document.getElementById('status');
  const resizeHandle = document.getElementById('resize-handle');

  // 从storage加载保存的内容和窗口大小
  chrome.storage.sync.get(['notes', 'windowSize'], (result) => {
    if (result.notes) {
      editor.value = result.notes;
    }
    if (result.windowSize) {
      document.body.style.width = result.windowSize.width + 'px';
      document.body.style.height = result.windowSize.height + 'px';
    }
  });

  // 初始化拖动缩放功能
  resizeHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    startWidth = document.body.offsetWidth;
    startHeight = document.body.offsetHeight;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const newWidth = startWidth + (e.clientX - startWidth);
    const newHeight = startHeight + (e.clientY - startHeight);
    
    // 设置最小尺寸
    document.body.style.width = Math.max(300, newWidth) + 'px';
    document.body.style.height = Math.max(200, newHeight) + 'px';
    
    // 保存新的窗口大小
    chrome.storage.sync.set({
      windowSize: {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight
      }
    });
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // 监听输入事件，实现自动保存
  editor.addEventListener('input', () => {
    statusEl.textContent = '正在保存...';
    
    // 防抖：延迟1秒后保存
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveNotes, 1000);
  });

  // 支持Tab键缩进
  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 2;
    }
  });
}

// 保存笔记内容
function saveNotes() {
  const content = editor.value;
  chrome.storage.sync.set({ notes: content }, () => {
    statusEl.textContent = '已保存';
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initEditor);