const gameContainer = document.getElementById('game-container');
const resultModal = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const totalLanterns = 15; // 螢幕上同時出現的水燈總數
let canPick = true;

// 1. 抽獎邏輯
function checkWin() {
    // 設定中獎機率，例如 20%
    const winRate = 0.2; 
    return Math.random() < winRate;
}

// 2. 處理水燈點擊
function pickLantern(event) {
    if (!canPick) return; 

    canPick = false; // 點擊後鎖定，避免重複點擊
    const lantern = event.target;
    
    // 停止動畫
    lantern.style.animationPlayState = 'paused';
    
    // 模擬選中效果
    lantern.style.border = '5px solid gold';
    
    // 判斷中獎
    const isWinner = checkWin();
    
    if (isWinner) {
        resultMessage.textContent = '恭喜您！您中獎了！';
    } else {
        resultMessage.textContent = '很可惜，請下次再試！';
    }

    // 顯示結果
    resultModal.classList.remove('hidden');
}

// 3. 生成水燈
function createLantern() {
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');
    
    // 隨機設置水燈在河流寬度內的位置
    // 假設河流佔畫面中間 40% 的寬度
    const minLeft = 30; // 30% 寬度
    const maxLeft = 70; // 70% 寬度
    const randomLeft = Math.random() * (maxLeft - minLeft) + minLeft;
    lantern.style.left = `${randomLeft}%`;

    // 隨機設置動畫持續時間 (速度)
    const minDuration = 8; // 最快 8 秒
    const maxDuration = 15; // 最慢 15 秒
    const randomDuration = Math.random() * (maxDuration - minDuration) + minDuration;
    lantern.style.animation = `flow ${randomDuration}s linear infinite`;

    // 隨機設置初始延遲，讓它們不在同一時間點出現
    const randomDelay = -Math.random() * maxDuration; 
    lantern.style.animationDelay = `${randomDelay}s`;
    
    // 添加點擊事件
    lantern.addEventListener('click', pickLantern);
    
    gameContainer.appendChild(lantern);
}

// 4. 重置遊戲
window.resetGame = function() {
    // 移除所有水燈
    gameContainer.innerHTML = ''; 
    // 隱藏結果視窗
    resultModal.classList.add('hidden'); 
    canPick = true;
    // 重新生成水燈
    for (let i = 0; i < totalLanterns; i++) {
        createLantern();
    }
}

// 首次加載時啟動遊戲
document.addEventListener('DOMContentLoaded', resetGame);
