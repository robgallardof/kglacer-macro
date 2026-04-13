import { saveScreenshot } from './saver';
import './style.css';

(() => {
  const app = document.createElement("div");
  document.body.append(app);
  return app;
})().innerHTML = `
<div class="wplace-saver-widget hidden" id="wplace-saver-widget">
    <div class="wplace-saver-header" id="wplace-saver-header">
        <h1>Wplace Saver</h1>
        <button class="btn btn-sm btn-circle" id="ws-close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
        </button>
    </div>
    
    <div class="wplace-saver-content" id="wplace-saver-content">
        <div class="coordinate-group">
            <h3>Upper left ↖ corner coordinates</h3>
            <div class="input-row">
                <input type="number" id="group1-tlx" class="input number-input" placeholder="Tl X" min="1" />
                <input type="number" id="group1-tly" class="input number-input" placeholder="Tl Y" min="1" />
                <input type="number" id="group1-pxx" class="input number-input" placeholder="Px X" min="1" max="1000" />
                <input type="number" id="group1-pxy" class="input number-input" placeholder="Px Y" min="1" max="1000" />
            </div>
        </div>
        <div class="coordinate-group">
            <h3>Lower right ↘ corner coordinates</h3>
            <div class="input-row">
                <input type="number" id="group2-tlx" class="input number-input" placeholder="Tl X" min="1" />
                <input type="number" id="group2-tly" class="input number-input" placeholder="Tl Y" min="1" />
                <input type="number" id="group2-pxx" class="input number-input" placeholder="Px X" min="1" max="1000" />
                <input type="number" id="group2-pxy" class="input number-input" placeholder="Px Y" min="1" max="1000" />
            </div>
        </div>
        <div class="flex justify-center">
          <button id="save-btn" type="button" class="btn btn-primary">Save</button>
        </div>
    </div>
</div>

<div class="ws-toggle">
  <button title="Toggle Wplace saver" class="btn btn-lg btn-square sm:btn-xl z-30 shadow-md text-base-content/80" id="ws-toggle">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z"/></svg>
  </button>
</div>
`;

// 添加事件监听器
function setupEventListeners() {
  // 保存按钮事件
  document.getElementById('save-btn')?.addEventListener('click', () => saveScreenshot());

  setupDrag();  
  setupToggleVisibility();
  setupInputValidation();
  
  // 加载保存的位置
  loadWidgetPosition();
}

// 设置输入验证
function setupInputValidation() {
  const inputs = document.querySelectorAll('.input-row input[type="number"]') as NodeListOf<HTMLInputElement>;
  
  inputs.forEach(input => {
    input.addEventListener('input', validateInput);
    input.addEventListener('blur', validateInput);
  });
}

// 验证输入值
function validateInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = parseFloat(input.value);
  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  
  if (!isNaN(value)) {
    if (value < min) {
      input.value = min.toString();
    } else if (value > max) {
      input.value = max.toString();
    }
  }
}

// 设置拖动功能
function setupDrag() {
  const widget = document.getElementById('wplace-saver-widget') as HTMLElement;
  const header = document.getElementById('wplace-saver-header') as HTMLElement;
  const closeBtn = document.getElementById('ws-close') as HTMLElement;
  
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  
  header.addEventListener('mousedown', (e) => {
    if (closeBtn.contains(e.target as Node) || e.target === closeBtn) {
      return; // 如果是关闭按钮，不启动拖动
    }
    
    isDragging = true;
    widget.classList.add('dragging');
    
    const rect = widget.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    
    // 确保组件不会被拖到屏幕外
    const maxX = window.innerWidth - widget.offsetWidth;
    const maxY = window.innerHeight - widget.offsetHeight;
    
    const finalX = Math.max(0, Math.min(x, maxX));
    const finalY = Math.max(0, Math.min(y, maxY));
    
    widget.style.left = finalX + 'px';
    widget.style.top = finalY + 'px';
    widget.style.right = 'auto'; // 取消右对齐
    
    e.preventDefault();
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      widget.classList.remove('dragging');
      
      // 保存位置
      saveWidgetPosition();
    }
  });
}

function setupToggleVisibility() {
  const toggleBtn = document.getElementById('ws-toggle') as HTMLElement;
  const closeBtn = document.getElementById('ws-close') as HTMLElement;
  const widget = document.getElementById('wplace-saver-widget') as HTMLElement;

  toggleBtn.addEventListener('click', () => {
    widget.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', () => {
    widget.classList.toggle('hidden');
  });
}

// 保存组件位置
function saveWidgetPosition() {
  const widget = document.getElementById('wplace-saver-widget') as HTMLElement;
  const rect = widget.getBoundingClientRect();
  
  const position = {
    left: rect.left,
    top: rect.top
  };
  
  localStorage.setItem('wplace-saver-widget-position', JSON.stringify(position));
}

// 加载组件位置
function loadWidgetPosition() {
  const saved = localStorage.getItem('wplace-saver-widget-position');
  if (saved) {
    try {
      const position = JSON.parse(saved);
      const widget = document.getElementById('wplace-saver-widget') as HTMLElement;
      
      widget.style.left = position.left + 'px';
      widget.style.top = position.top + 'px';
      widget.style.right = 'auto';
    } catch (error) {
      console.error('加载组件位置失败:', error);
    }
  }
}

// 页面加载完成后设置事件监听器
document.addEventListener('DOMContentLoaded', setupEventListeners);
// 如果页面已经加载完成，立即设置事件监听器
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupEventListeners);
} else {
  setupEventListeners();
}