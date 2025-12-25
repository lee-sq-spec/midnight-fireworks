// ------------------ 全局 ------------------
const countdownEl = document.getElementById('countdown');
const blessForm = document.getElementById('blessForm');
const adminPopup = document.getElementById('adminPopup');
const blessList = document.getElementById('blessList');
const onlineStatus = document.getElementById('onlineStatus');

let isAdmin = false;
let onlineCount = 0;

// ------------------ 倒数计时 ------------------
function updateCountdown() {
  const now = new Date();
  const target = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
  const diff = target - now;
  const h = String(Math.floor(diff / 1000 / 3600)).padStart(2,'0');
  const m = String(Math.floor(diff / 1000 / 60 % 60)).padStart(2,'0');
  const s = String(Math.floor(diff / 1000 % 60)).padStart(2,'0');
  countdownEl.textContent = `${h}:${m}:${s}`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ------------------ 管理员入口 ------------------
document.getElementById('adminBtn').addEventListener('click', () => {
  adminPopup.classList.remove('hidden');
});

// ------------------ 弹窗提交 ------------------
document.getElementById('submitBless').addEventListener('click', () => {
  const nick = document.getElementById('nickname').value.trim();
  const thanks = document.getElementById('thankContent').value.trim();
  const wish = document.getElementById('newYearWish').value.trim();
  if (!wish) { alert('请填写新年祝福'); return; }

  const li = document.createElement('li');
  li.textContent = `🎉 ${nick||'匿名'}: ${wish} (${thanks})`;
  blessList.prepend(li);

  blessForm.classList.add('hidden');
  onlineCount++;
  onlineStatus.textContent = `当前在线人数：${onlineCount}`;
});

// ------------------ 管理员验证黑盒 ------------------
document.getElementById('adminSubmit').addEventListener('click', () => {
  // 黑盒逻辑，真实密码由站点私下配置
  const keyword = document.getElementById('adminKeyword').value.trim();
  const secret = document.getElementById('adminSecret').value.trim();
  const password = document.getElementById('adminPassword').value.trim();

  if (keyword && secret && password) {
    isAdmin = true;
    alert('管理员验证成功，调试仓已开启');
    adminPopup.classList.add('hidden');
  } else {
    alert('验证失败，无权限访问调试功能');
  }
});

// ------------------ 祝福表单弹窗 ------------------
document.getElementById('tetrisBtn').addEventListener('click', () => {
  alert('俄罗斯方块游戏弹窗（示意）');
});
