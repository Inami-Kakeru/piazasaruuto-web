/**
 * ハンバーガーメニュー機能
 * Hamburger Menu Component
 */

class HamburgerMenu {
    constructor() {
        this.hamburgerBtn = document.querySelector('.hamburger-menu');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // ハンバーガーボタンのクリックイベント
        this.hamburgerBtn.addEventListener('click', () => {
            this.toggleMenu();
        });

        // ナビゲーションリンクのクリックでメニューを閉じる
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // ナビゲーション外のクリックでメニューを閉じる
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.nav.contains(e.target) && !this.hamburgerBtn.contains(e.target)) {
                this.closeMenu();
            }
        });

        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // 画面サイズが変更された時の処理
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.hamburgerBtn.classList.add('active');
        this.hamburgerBtn.setAttribute('aria-expanded', 'true');
        this.hamburgerBtn.setAttribute('aria-label', 'メニューを閉じる');
        this.nav.classList.add('active');
        
        // スクロール無効化
        document.body.style.overflow = 'hidden';
        
        // フォーカス管理
        this.navLinks[0].focus();
    }

    closeMenu() {
        this.isOpen = false;
        this.hamburgerBtn.classList.remove('active');
        this.hamburgerBtn.setAttribute('aria-expanded', 'false');
        this.hamburgerBtn.setAttribute('aria-label', 'メニューを開く');
        this.nav.classList.remove('active');
        
        // スクロール有効化
        document.body.style.overflow = '';
        
        // フォーカスをハンバーガーボタンに戻す
        this.hamburgerBtn.focus();
    }
}

// ハンバーガーメニューの初期化
document.addEventListener('DOMContentLoaded', () => {
    new HamburgerMenu();
});

// グローバルに公開（必要に応じて）
window.HamburgerMenu = HamburgerMenu; 