/** * 马六甲跨年游戏系统 - 2025 最终工程版
 */

const GameSystem = {
    current: null,
    
    open(type) {
        const win = document.getElementById('gameWindow');
        const body = document.getElementById('gameBody');
        const title = document.getElementById('gameTitle');
        win.classList.remove('hidden');
        body.innerHTML = ''; // 清空旧内容

        switch(type) {
            case 'tetris':
                title.innerText = "🕹️ 俄罗斯方块 · 新年版";
                this.initTetris(body);
                break;
            case 'puzzle':
                title.innerText = "🧩 新年拼图";
                this.initPuzzle(body);
                break;
            case 'riddle':
                title.innerText = "🏮 新年猜灯谜";
                this.initRiddle(body);
                break;
            case 'connect':
                title.innerText = "🔢 数字连线";
                this.initConnect(body);
                break;
            case 'hongbao':
                title.innerText = "🧧 红包接接乐";
                this.initHongbao(body);
                break;
        }
    },

    close() {
        document.getElementById('gameWindow').classList.add('hidden');
        this.current = null;
    },

    // --- 游戏 1: 俄罗斯方块逻辑简述 ---
    initTetris(parent) {
        parent.innerHTML = `
            <div class="score-board">分数: <span id="tetrisScore">0</span></div>
            <canvas id="tetrisCanvas" width="240" height="400"></canvas>
            <p style="font-size:12px">操作: 键盘方向键 / 触屏滑动</p>
        `;
        // 此处集成 Tetris 引擎逻辑...
        // 消除 5 行触发背景烟花: BackgroundEffects.triggerSmallFirework();
    },

    // --- 游戏 3: 猜灯谜逻辑 ---
    initRiddle(parent) {
        const riddles = [
            { q: "一口咬断牛尾巴 (猜一字)", a: "告" },
            { q: "身穿红袍子，头戴绿帽子，坐在泥里子 (猜一蔬菜)", a: "胡萝卜" }
        ];
        let idx = Math.floor(Math.random() * riddles.length);
        
        parent.innerHTML = `
            <div style="min-height:120px; font-size:20px; text-align:center;">${riddles[idx].q}</div>
            <input type="text" id="riddleInput" class="input-item" placeholder="输入答案">
            <button id="submitRiddle" class="btn-submit" style="width:120px">提交</button>
            <p style="color:#FFD700; font-size:12px; margin-top:10px;">
                💡 不会的话，可以发给好朋友或群里一起问问哦！
            </p>
        `;

        document.getElementById('submitRiddle').onclick = () => {
            const val = document.getElementById('riddleInput').value;
            if(val === riddles[idx].a) {
                alert("太棒了！答对了！");
                this.open('riddle'); // 换题
                // 触发背景烟花
            } else {
                alert("再试一次吧~");
            }
        };
    },

    // --- 游戏 5: 红包接接乐 ---
    initHongbao(parent) {
        parent.innerHTML = `
            <div class="score-board">得分: <span id="hbScore">0</span></div>
            <canvas id="hbCanvas" width="280" height="420" style="background:#800;"></canvas>
        `;
        // 红包掉落逻辑...
    }
};

// 导出系统供 HTML 调用
window.GameSystem = GameSystem;
