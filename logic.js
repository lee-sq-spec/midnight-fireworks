// 倒计时
const targetDate = new Date('2026-01-01T00:00:00+08:00');
const timeEl = document.getElementById('timeLeft');
function updateTime() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) { timeEl.textContent = "00:00:00"; return; }
  const h = String(Math.floor(diff/3600000)).padStart(2,'0');
  const m = String(Math.floor((diff/60000)%60)).padStart(2,'0');
  const s = String(Math.floor((diff/1000)%60)%60).padStart(2,'0');
  timeEl.textContent = `${h}:${m}:${s}`;
}
setInterval(updateTime, 1000);

// 模态框逻辑
function showModal(modal) { modal.classList.remove('hidden'); }
function hideModal(modal) { modal.classList.add('hidden'); }

const wishModal = document.getElementById('wishModal');
document.getElementById('openWish').onclick = () => showModal(wishModal);
document.getElementById('closeWish').onclick = () => hideModal(wishModal);

const adminModal = document.getElementById('adminModal');
document.getElementById('openAdmin').onclick = () => showModal(adminModal);
document.getElementById('closeAdmin').onclick = () => hideModal(adminModal);

// 祝福存储
const wishes = JSON.parse(localStorage.getItem('wishes')||'[]');
document.getElementById('wishForm').onsubmit = (e)=>{
  e.preventDefault();
  const nick = document.getElementById('wishNick').value;
  const thanks = document.getElementById('wishThanks').value;
  const wish = document.getElementById('wishContent').value;
  wishes.push({nick, thanks, wish, time: new Date().toLocaleString()});
  localStorage.setItem('wishes', JSON.stringify(wishes));
  alert('祝福发送成功！');
  hideModal(wishModal);
};

// 管理员验证
const checkAuth = (k,s,p) => k==="ShyuanQinn" && s==="KADETJPJ2025" && p==="MoeStar!2025";
document.getElementById('adminForm').onsubmit = (e)=>{
  e.preventDefault();
  const k = document.getElementById('adminK').value;
  const s = document.getElementById('adminS').value;
  const p = document.getElementById('adminP').value;
  if(checkAuth(k,s,p)){
    alert("验证成功！");
    document.getElementById('fireworkBtn').classList.remove('hidden');
    hideModal(adminModal);
  } else {
    document.getElementById('adminErr').textContent="身份验证失败";
  }
};

// 烟花
const fireworkBtn = document.getElementById('fireworkBtn');
fireworkBtn.onclick = ()=>{
  const text = prompt("请输入烟花显示文字","");
  if(text) startFirework(text);
};

// 简易烟花效果
const fwCanvas = document.getElementById('fireworkCanvas');
const fwCtx = fwCanvas.getContext('2d');
fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

function startFirework(text){
  let particles = [];
  function explode(){
    for(let i=0;i<100;i++){
      const angle = Math.random()*2*Math.PI;
      const speed = Math.random()*6+2;
      particles.push({x:Math.random()*fwCanvas.width, y:Math.random()*fwCanvas.height*0.7, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, life:1, color:`hsl(${Math.random()*360},100%,50%)`});
    }
  }
  explode();
  const duration = 3000;
  const start = Date.now();
  function animate(){
    fwCtx.clearRect(0,0,fwCanvas.width,fwCanvas.height);
    fwCtx.font="italic bold 72px Montserrat";
    fwCtx.textAlign="center";
    fwCtx.fillStyle="#fff";
    fwCtx.fillText(text,fwCanvas.width/2,fwCanvas.height/2);
    particles.forEach((p,i)=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; p.life-=0.02;
      fwCtx.globalAlpha = p.life;
      fwCtx.fillStyle = p.color;
      fwCtx.beginPath(); fwCtx.arc(p.x,p.y,3,0,2*Math.PI); fwCtx.fill();
      if(p.life<=0) particles.splice(i,1);
    });
    fwCtx.globalAlpha=1;
    if(Date.now()-start<duration) requestAnimationFrame(animate);
  }
  animate();
}

// 背景动态
const sceneCanvas = document.getElementById('sceneCanvas');
const ctx = sceneCanvas.getContext('2d');
sceneCanvas.width = window.innerWidth;
sceneCanvas.height = window.innerHeight;
let stars = [];
for(let i=0;i<100;i++){
  stars.push({x:Math.random()*sceneCanvas.width, y:Math.random()*sceneCanvas.height, size:Math.random()*2});
}
function animateScene(){
  ctx.fillStyle="#020202";
  ctx.fillRect(0,0,sceneCanvas.width,sceneCanvas.height);
  ctx.fillStyle="#fff";
  stars.forEach(s=>{ctx.beginPath(); ctx.arc(s.x,s.y,s.size,0,2*Math.PI); ctx.fill();});
  requestAnimationFrame(animateScene);
}
animateScene();
