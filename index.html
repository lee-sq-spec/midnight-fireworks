import React, { useState, useEffect, useRef, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { 
  Gamepad2, MessageCircle, ChevronRight, X, Shield, Users, Key, Activity, Send, Star, Cloud, Sun, Moon, Wind, Zap
} from 'lucide-react';

/**
 * 【工程级配置：动态景色增强版】
 * 1. 实时光影映射（基于马六甲时间）
 * 2. 物理天气粒子（雨、雷、云、星）
 * 3. 严格分区布局，禁止 UI 遮挡
 */

const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'malacca-2026-strict-v2';

const TARGET_DATE = new Date('2026-01-01T00:00:00+08:00');
const LAYERS = { BACKGROUND: 0, GRID: 1, MODULES: 2, MODAL: 100 };

const getMYTime = () => new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kuala_Lumpur"}));

const checkAuth = (k, s, p) => (k === "ShyuanQinn" && s === "KADETJPJ2025" && p === "MoeStar!2025");

export default function App() {
  const [view, setView] = useState('welcome');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [onlineCount, setOnlineCount] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState(localStorage.getItem('wish_sent') === 'true');
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [weather, setWeather] = useState('clear'); // 'clear' | 'cloudy' | 'rain' | 'storm'
  const [activeModal, setActiveModal] = useState(null);
  const [syncFireworkText, setSyncFireworkText] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();
    const unsubAuth = onAuthStateChanged(auth, setUser);

    if (!user) return;

    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'wishes'), orderBy('timestamp', 'desc'));
    const unsubWishes = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setWishes(data);
      setOnlineCount(Math.max(1, snapshot.size));
      if (data.length > wishes.length && wishes.length > 0) {
        setNotification({ name: data[0].nickname });
        setTimeout(() => setNotification(null), 5000);
      }
    });

    const unsubCmd = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'commands'), (snapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          const cmd = change.doc.data();
          if (cmd.type === 'firework' && (Date.now() - cmd.localTime) < 10000) {
            setSyncFireworkText(cmd.text);
            setTimeout(() => setSyncFireworkText(""), 8000);
          }
          if (cmd.type === 'weather') setWeather(cmd.val);
        }
      });
    });

    return () => { unsubAuth(); unsubWishes(); unsubCmd(); };
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = TARGET_DATE - getMYTime();
      if (diff <= 0) setTimeLeft({ h: 0, m: 0, s: 0 });
      else setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const canAccessMain = useMemo(() => {
    if (isAdmin) return true;
    const now = getMYTime();
    return hasSubmitted && now >= new Date(TARGET_DATE.getTime() - 3600000);
  }, [hasSubmitted, isAdmin]);

  const triggerSyncFirework = async (text) => {
    if (!isAdmin) return;
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'commands'), {
      type: 'firework', text, localTime: Date.now(), timestamp: serverTimestamp()
    });
  };

  const runNameSequence = async () => {
    const names = ["AQEEL HARIS TAM", "BRYAN LIM", "CHRONUS SIM", "DECLAN YOONG", "DERRICK HOE", "LIM YU HONG", "LIM WEI FENG", "LYE JUN FENG", "TEO JUAN KIT", "YONG KAI MING", "还有我", "跨年快乐，新年快乐"];
    for (const name of names) {
      await triggerSyncFirework(name);
      await new Promise(r => setTimeout(r, 8500));
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-['Montserrat'] overflow-hidden selection:bg-[#FF6600]">
      
      {/* LAYER 0: 动态景色引擎 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: LAYERS.BACKGROUND }}>
        <SceneEngine time={getMYTime()} weather={weather} />
        <FireworkEngine active={syncFireworkText !== ""} text={syncFireworkText} />
      </div>

      {/* LAYER 1: 页面框架 */}
      <div className="relative min-h-screen grid grid-rows-[120px_1fr_120px] px-[32px] py-[24px] gap-[24px]" style={{ zIndex: LAYERS.GRID }}>
        
        {/* Header: 倒计时与通知 */}
        <header className="bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center relative shadow-2xl">
          <div className="text-center">
            <div className="text-[12px] font-bold tracking-[0.4em] text-[#FFD966] opacity-60 uppercase mb-1">Malacca 2026 Countdown</div>
            <div className="text-[48px] font-black text-[#FFD966] drop-shadow-[0_0_20px_rgba(255,217,102,0.5)] tracking-tighter">
              {String(timeLeft.h).padStart(2, '0')} : {String(timeLeft.m).padStart(2, '0')} : {String(timeLeft.s).padStart(2, '0')}
            </div>
          </div>
          
          {view === 'main' && notification && (
            <div className="absolute top-[140px] left-1/2 -translate-x-1/2 w-[300px] bg-black/80 border border-[#FF6600] rounded-2xl flex flex-col items-center justify-center p-4 animate-in fade-in slide-in-from-top-6 duration-700">
              <Star className="text-[#FFD966] mb-1 animate-spin-slow" size={20}/>
              <p className="text-[#FFD966] font-bold">🎉 {notification.name} 已入场</p>
              <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">Connecting from Malacca</p>
            </div>
          )}
        </header>

        {/* Main: 互动区 */}
        <main className="grid grid-cols-1 md:grid-cols-[400px_1fr_400px] gap-[32px] items-stretch">
          {view === 'welcome' ? (
            <div className="col-span-full flex flex-col items-center justify-center h-full gap-[40px] animate-in fade-in zoom-in-95 duration-1000">
              <div className="text-center space-y-4">
                <h1 className="text-[40px] md:text-[64px] font-black leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic">
                  WELCOME 2026
                </h1>
                <p className="text-[20px] text-[#FFFFCC] font-medium opacity-80 max-w-[600px] mx-auto leading-relaxed">
                  在马六甲的星空下，写下你对我的年度祝福
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <button 
                  onClick={() => setActiveModal('wish')}
                  className="group relative w-[240px] h-[64px] bg-[#FF6600] text-white font-black rounded-2xl shadow-[0_0_30px_rgba(255,102,0,0.4)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-[20px]">
                    <Send size={20}/> 填写祝福
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => setView('main')}
                  disabled={!canAccessMain}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md transition-all ${canAccessMain ? 'hover:bg-white/10 hover:border-white/30 text-white' : 'opacity-30 cursor-not-allowed text-white/50'}`}
                >
                  {canAccessMain ? '进入主会场' : '跨年前 1 小时解锁主会场'} <ChevronRight size={18}/>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Left: 祝福墙 */}
              <div className="bg-black/40 backdrop-blur-2xl rounded-[32px] border border-white/10 flex flex-col p-8 shadow-2xl overflow-hidden">
                <h2 className="text-[24px] font-black text-[#FFD966] mb-8 flex items-center gap-3 italic">
                  <MessageCircle size={28}/> BLESSING WALL
                </h2>
                <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                  {wishes.map((w, i) => (
                    <div key={i} className="group bg-white/5 border border-white/5 p-5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[#FFD966] font-bold text-[14px]">@{w.nickname}</span>
                        <div className="w-2 h-2 rounded-full bg-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[12px] text-white/40 mb-3 italic">" {w.thanks || '感谢陪伴'} "</p>
                      <p className="text-[17px] text-[#FFFFCC] leading-relaxed font-medium">{w.blessing}</p>
                    </div>
                  ))}
                  {wishes.length === 0 && <div className="text-center py-20 opacity-20 italic">等待第一份祝福...</div>}
                </div>
              </div>

              {/* Middle: 视觉缓冲区 */}
              <div className="pointer-events-none" />

              {/* Right: 系统状态 */}
              <div className="flex flex-col gap-[32px]">
                <div className="h-[80px] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center px-8 gap-4 shadow-xl">
                  <div className="relative">
                    <Users size={24} className="text-[#FFD966]"/>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  </div>
                  <div>
                    <div className="text-[10px] opacity-40 font-bold uppercase tracking-widest">Active Friends</div>
                    <div className="text-[20px] font-black">{onlineCount} <span className="text-[14px] font-normal opacity-40">ONLINE</span></div>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-end items-end gap-[32px]">
                   <button 
                    onClick={() => setActiveModal('game')}
                    className="group w-[200px] h-[56px] bg-[#FF6600] text-white font-bold rounded-xl shadow-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all"
                   >
                     <Gamepad2 size={24}/> TETRIS MINI
                   </button>
                </div>
              </div>
            </>
          )}
        </main>

        {/* Footer: 状态栏 */}
        <footer className="flex items-center px-[40px] bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10">
          <button 
            onClick={() => setActiveModal('admin')}
            className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-500 ${isAdmin ? 'bg-[#FF6600] rotate-180' : 'bg-white/5 hover:bg-white/10'}`}
          >
            {isAdmin ? <Activity className="text-white"/> : <Key className="text-white/20" size={24}/>}
          </button>
          <div className="ml-8 hidden md:block">
            <div className="flex items-center gap-4 text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase">
              <span>Weather: {weather}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Location: Malacca (GMT+8)</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Status: Secure</span>
            </div>
          </div>
          <div className="ml-auto text-[11px] font-mono opacity-20">CORE_ENGINE_V2.0.4</div>
        </footer>

      </div>

      {/* Modals */}
      {activeModal === 'wish' && (
        <Modal onClose={() => setActiveModal(null)} title="SEND BLESSINGS">
          <WishForm onDone={() => { setHasSubmitted(true); localStorage.setItem('wish_sent', 'true'); setActiveModal(null); }} />
        </Modal>
      )}

      {activeModal === 'admin' && (
        <Modal onClose={() => setActiveModal(null)} title={isAdmin ? "DASHBOARD" : "ADMIN AUTH"}>
          {isAdmin ? (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-[#FF6600]/40 space-y-4">
                <div className="flex items-center gap-2 text-[#FF6600] font-black italic tracking-widest text-[14px]">
                  <Zap size={18}/> SYNC ENGINE
                </div>
                <button onClick={runNameSequence} className="w-full py-5 bg-[#FF6600] text-white font-black rounded-xl shadow-[0_0_40px_rgba(255,102,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all">
                  ACTIVATE NAME SEQUENCE FIREWORKS
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'clear', label: '晴朗', icon: <Sun size={16}/> },
                  { id: 'cloudy', label: '多云', icon: <Cloud size={16}/> },
                  { id: 'rain', label: '下雨', icon: <Wind size={16}/> },
                  { id: 'storm', label: '雷暴', icon: <Zap size={16}/> }
                ].map(w => (
                  <button key={w.id} onClick={() => setWeather(w.id)} className={`flex items-center justify-center gap-2 py-4 rounded-xl border transition-all ${weather === w.id ? 'border-[#FF6600] bg-[#FF6600]/10 text-[#FF6600]' : 'border-white/10 bg-white/5 opacity-50'}`}>
                    {w.icon} {w.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <AdminAuth onVerify={(success) => success && setIsAdmin(true)} />
          )}
        </Modal>
      )}

      {activeModal === 'game' && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center animate-in fade-in duration-500">
           <div className="w-[450px] h-[650px] bg-black border border-white/20 rounded-[40px] shadow-[0_0_100px_rgba(255,102,0,0.2)] relative flex flex-col items-center justify-center">
              <button onClick={() => setActiveModal(null)} className="absolute top-10 right-10 text-white/20 hover:text-white transition-colors"><X/></button>
              <div className="text-center space-y-6">
                 <div className="w-24 h-24 bg-[#FF6600]/20 rounded-3xl flex items-center justify-center mx-auto border border-[#FF6600]/40">
                    <Gamepad2 size={48} className="text-[#FF6600] animate-bounce"/>
                 </div>
                 <h4 className="text-[24px] font-black tracking-widest italic uppercase">Tetris Loading</h4>
                 <div className="flex gap-2 justify-center">
                    {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-[#FF6600] rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
                 </div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
      `}</style>
    </div>
  );
}

// --- 子组件：全域景色引擎 ---
const SceneEngine = ({ time, weather }) => {
  const canvasRef = useRef(null);
  const hour = time.getHours();

  // 根据时间计算天空渐变
  const getSkyGradient = () => {
    if (hour >= 6 && hour < 10) return ['#FF9A8B', '#FF6A88', '#FF99AC']; // 黎明
    if (hour >= 10 && hour < 17) return ['#4FACFE', '#00F2FE']; // 正午
    if (hour >= 17 && hour < 19) return ['#F093FB', '#F5576C']; // 黄昏
    return ['#0F0C29', '#302B63', '#24243E']; // 深夜
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let frame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 初始化景色粒子
    const init = () => {
      particles = [];
      const count = weather === 'storm' || weather === 'rain' ? 200 : 80;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedY: weather === 'storm' || weather === 'rain' ? Math.random() * 15 + 10 : Math.random() * 0.5 + 0.2,
          speedX: weather === 'storm' ? (Math.random() - 0.5) * 2 : 0,
          opacity: Math.random() * 0.5 + 0.1,
          angle: Math.random() * Math.PI * 2
        });
      }
    };
    init();

    const drawSky = () => {
      const colors = getSkyGradient();
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 太阳或月亮
      const isDay = hour >= 6 && hour < 19;
      ctx.save();
      ctx.filter = 'blur(40px)';
      ctx.fillStyle = isDay ? 'rgba(255, 215, 0, 0.4)' : 'rgba(253, 245, 230, 0.2)';
      ctx.beginPath();
      ctx.arc(isDay ? canvas.width * 0.8 : canvas.width * 0.2, canvas.height * 0.2, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      drawSky();

      particles.forEach(p => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        
        if (weather === 'rain' || weather === 'storm') {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX, p.y + 15);
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.stroke();
        } else {
          // 漂浮光斑或星星
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          p.x += Math.sin(p.angle) * 0.2;
          p.angle += 0.01;
        }

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      // 闪电逻辑
      if (weather === 'storm' && Math.random() > 0.99) {
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(0,0, canvas.width, canvas.height);
      }

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, [weather, hour]);

  return <canvas ref={canvasRef} className="absolute inset-0 transition-opacity duration-1000" />;
};

// --- 子组件：烟花引擎 ---
const FireworkEngine = ({ active, text }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!active && !text) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let sparks = [];
    let frame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const explode = (x, y, color) => {
      const count = 80;
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        sparks.push({
          x, y,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          life: 1.0,
          color,
          size: Math.random() * 3 + 1
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (text) {
        ctx.save();
        ctx.font = "italic bold 72px Montserrat";
        ctx.textAlign = "center";
        // 霓虹描边文字
        ctx.strokeStyle = "#FF6600";
        ctx.lineWidth = 2;
        ctx.strokeText(text, canvas.width/2, canvas.height/2);
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FF6600";
        ctx.fillStyle = "white";
        ctx.fillText(text, canvas.width/2, canvas.height/2);
        ctx.restore();
      }

      if (Math.random() > 0.95) explode(Math.random() * canvas.width, Math.random() * canvas.height * 0.7, `hsl(${Math.random()*360}, 100%, 60%)`);

      sparks.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.1; // 重力
        s.life -= 0.015;
        if (s.life <= 0) sparks.splice(i, 1);
        ctx.globalAlpha = s.life;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [active, text]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

// --- 弹窗组件 ---
const Modal = ({ children, onClose, title }) => (
  <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/80 backdrop-blur-3xl animate-in fade-in duration-300">
    <div className="w-full max-w-[540px] bg-[#0a0a0a] border border-white/10 rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6600] to-transparent" />
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-[28px] font-black italic text-[#FFD966] tracking-tighter uppercase">{title}</h3>
        <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all"><X/></button>
      </div>
      {children}
    </div>
  </div>
);

// --- 表单与验证 ---
const WishForm = ({ onDone }) => {
  const [loading, setLoading] = useState(false);
  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'wishes'), {
        nickname: fd.get('nick'), thanks: fd.get('thanks'), blessing: fd.get('wish'), timestamp: serverTimestamp()
      });
      onDone();
    } catch (e) {
      alert("提交失败，请检查网络");
    } finally { setLoading(false); }
  };
  return (
    <form onSubmit={handle} className="space-y-6">
      <div className="space-y-1">
        <label className="text-[10px] font-bold opacity-30 uppercase ml-2">Display Name</label>
        <input name="nick" required placeholder="昵称 / 匿名" className="w-full h-[56px] bg-white/5 border border-white/10 rounded-2xl px-6 text-[18px] outline-none focus:border-[#FF6600]/50 transition-all" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold opacity-30 uppercase ml-2">Gratitude</label>
        <textarea name="thanks" placeholder="年度感谢 / 帮助事项 (可选)" className="w-full h-[100px] bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[16px] outline-none focus:border-[#FF6600]/50 transition-all resize-none" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold opacity-30 uppercase ml-2">Wishes</label>
        <textarea name="wish" required placeholder="写下你的 2026 愿望..." className="w-full h-[120px] bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[18px] outline-none focus:border-[#FF6600]/50 transition-all resize-none" />
      </div>
      <button disabled={loading} className="w-full h-[64px] bg-[#FF6600] text-white font-black rounded-2xl text-[20px] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4">
        {loading ? "ENVOYING..." : "CONFIRM & SEND"}
      </button>
    </form>
  );
};

const AdminAuth = ({ onVerify }) => {
  const [err, setErr] = useState("");
  const handle = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (checkAuth(fd.get('k'), fd.get('s'), fd.get('p'))) onVerify(true);
    else setErr("身份验证失败，请核对凭据");
  };
  return (
    <form onSubmit={handle} className="space-y-5">
      <input name="k" placeholder="Keyword" required className="w-full h-[56px] bg-white/5 border border-white/10 rounded-2xl px-6" />
      <input name="s" placeholder="Secret Code" required className="w-full h-[56px] bg-white/5 border border-white/10 rounded-2xl px-6" />
      <input name="p" type="password" placeholder="Password" required className="w-full h-[56px] bg-white/5 border border-white/10 rounded-2xl px-6" />
      {err && <p className="text-red-500 text-[13px] font-bold ml-2">{err}</p>}
      <button className="w-full h-[64px] bg-[#FF6600] text-white font-black rounded-2xl text-[20px]">AUTHORIZE</button>
    </form>
  );
};
