// card_couple.js
function initCoupleWidget(config) {
  // 生成完整结构
  const template = `
    <div class="container">
      <div class="row">
        <div class="col-12 position-relative">
          <div class="sidebar-box couple">
            <div class="couple-avatars">
              <img class="pic" src="${config.avatar.jingluo}" alt="星" 
                   onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LXNpemU9IjEyIj7mmJ/mmJ88L3RleHQ+PC9zdmc+'">
              <img class="couple-love" src="${config.avatar.love}" alt="爱心"
                   onerror="this.style.display='none'">
              <img class="pic" src="${config.avatar.haiyong}" alt="翰"
                   onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LXNpemU9IjEyIj7nv7Dnv7A8L3RleHQ+PC9zdmc+'">
            </div>
            
            <div id="our-company" data-start="${config.startDate}">
              <span class="time-number">0</span>年
              <span class="time-number">0</span>月
              <span class="time-number">0</span>天
              <span class="time-number">0</span>时
              <span class="time-number">0</span>分
              <span class="time-number">0</span>秒
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 插入DOM
  const container = document.getElementById('couple-content');
  container.innerHTML = template;

  // 时间计算函数
  function calculateTime() {
    const start = new Date(config.startDate);
    const now = new Date();
    
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    
    // 处理负数情况
    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return {
      years,
      months,
      days,
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    };
  }

  // 更新时间显示
  function updateTimer() {
    const times = calculateTime();
    const timeNumbers = container.querySelectorAll('.time-number');
    const values = [times.years, times.months, times.days, times.hours, times.minutes, times.seconds];
    
    timeNumbers.forEach((el, index) => {
      if (values[index] !== undefined) {
        el.textContent = values[index];
      }
    });
  }

  // 初始化计时器
  updateTimer();
  setInterval(updateTimer, 1000);
}