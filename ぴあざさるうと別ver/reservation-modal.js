/**
 * 予約モーダルコンポーネント
 * ReservationModal Component
 */

class ReservationModal {
    constructor() {
        this.isOpen = false;
        this.modal = null;
        this.overlay = null;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        // モーダルオーバーレイ
        this.overlay = document.createElement('div');
        this.overlay.className = 'reservation-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        `;

        // モーダルコンテンツ
        this.modal = document.createElement('div');
        this.modal.className = 'reservation-modal';
        this.modal.style.cssText = `
            background-color: #fff;
            border-radius: 16px;
            padding: 32px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            transform: scale(0.9);
            opacity: 0;
            transition: all 0.3s ease;
        `;

        this.modal.innerHTML = `
            <div class="modal-header">
                <h2 style="
                    font-family: 'Noto Serif JP', serif;
                    font-size: 24px;
                    font-weight: 400;
                    color: #5c4b3e;
                    margin: 0 0 24px 0;
                    text-align: center;
                    letter-spacing: 2px;
                ">ご予約</h2>
                <button class="modal-close" aria-label="閉じる" style="
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                ">×</button>
            </div>
            
            <div class="modal-content">
                <p style="
                    font-family: 'Noto Sans JP', sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #5c4b3e;
                    margin-bottom: 24px;
                    text-align: center;
                ">ご予約はお電話にて承っております</p>
                
                <div class="contact-info" style="
                    background-color: #f8f6f4;
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 24px;
                    text-align: center;
                ">
                    <div class="phone-number" style="
                        font-size: 28px;
                        font-weight: 600;
                        color: #5c4b3e;
                        margin-bottom: 8px;
                        font-family: 'Noto Sans JP', sans-serif;
                    ">📞 03-3978-4800</div>
                    
                    <div class="hours" style="
                        font-size: 14px;
                        color: #666;
                        margin-bottom: 16px;
                        font-family: 'Noto Sans JP', sans-serif;
                    ">
                        <p style="margin: 4px 0;">月・火・水・金・土 10:00〜17:30</p>
                        <p style="margin: 4px 0;">（カット最終 16:30）</p>
                        <p style="margin: 4px 0;">日・木 定休日</p>
                    </div>
                </div>
                
                <div class="reservation-options" style="
                    display: grid;
                    gap: 16px;
                    margin-bottom: 24px;
                ">
                    <button class="btn-call" style="
                        background-color: #a8c9a8;
                        color: #5c4b3e;
                        border: none;
                        border-radius: 50px;
                        padding: 16px 24px;
                        font-weight: 600;
                        font-size: 16px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: 'Noto Sans JP', sans-serif;
                        letter-spacing: 1px;
                    ">📞 電話で予約する</button>
                    
                    <button class="btn-line" style="
                        background-color: #00c300;
                        color: #fff;
                        border: none;
                        border-radius: 50px;
                        padding: 16px 24px;
                        font-weight: 600;
                        font-size: 16px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: 'Noto Sans JP', sans-serif;
                        letter-spacing: 1px;
                    ">💬 LINEで予約する</button>
                </div>
                
                <div class="additional-info" style="
                    font-size: 14px;
                    color: #666;
                    text-align: center;
                    font-family: 'Noto Sans JP', sans-serif;
                    line-height: 1.5;
                ">
                    <p style="margin: 8px 0;">※ 駐車場のご利用は事前にお電話でご予約ください</p>
                    <p style="margin: 8px 0;">※ お子様同伴可・カード決済対応</p>
                </div>
            </div>
        `;

        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);
    }

    bindEvents() {
        // 予約ボタンのイベント
        const reservationBtns = document.querySelectorAll('#reservationBtn, #footerReservationBtn');
        reservationBtns.forEach(btn => {
            btn.addEventListener('click', () => this.open());
        });

        // モーダル内のボタンイベント
        this.modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close')) {
                this.close();
            } else if (e.target.classList.contains('btn-call')) {
                this.callReservation();
            } else if (e.target.classList.contains('btn-line')) {
                this.lineReservation();
            }
        });

        // オーバーレイクリックで閉じる
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // ESCキーで閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.overlay.style.display = 'flex';
        
        // アニメーション
        setTimeout(() => {
            this.modal.style.transform = 'scale(1)';
            this.modal.style.opacity = '1';
        }, 10);

        // スクロール無効化
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.modal.style.transform = 'scale(0.9)';
        this.modal.style.opacity = '0';
        
        setTimeout(() => {
            this.overlay.style.display = 'none';
        }, 300);

        // スクロール有効化
        document.body.style.overflow = '';
    }

    callReservation() {
        window.location.href = 'tel:03-3978-4800';
    }

    lineReservation() {
        // LINE予約のURL（実際のLINE公式アカウントURLに変更してください）
        const lineUrl = 'https://line.me/R/ti/p/@your-line-id';
        window.open(lineUrl, '_blank');
    }
}

// モーダルの初期化
document.addEventListener('DOMContentLoaded', () => {
    new ReservationModal();
});

// グローバルに公開（必要に応じて）
window.ReservationModal = ReservationModal; 