/**
 * Component Loader Utility
 * HTMLコンポーネントを動的に読み込むためのユーティリティ
 */

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
    }

    /**
     * コンポーネントを読み込む
     * @param {string} componentName - コンポーネント名（例: 'header', 'footer'）
     * @param {string} targetSelector - 挿入先のセレクター
     * @param {Object} options - オプション設定
     */
    async loadComponent(componentName, targetSelector, options = {}) {
        try {
            // 既に読み込まれている場合はスキップ
            if (this.loadedComponents.has(componentName)) {
                return;
            }

            const targetElement = document.querySelector(targetSelector);
            if (!targetElement) {
                console.error(`Target element not found: ${targetSelector}`);
                return;
            }

            // コンポーネントファイルのパス
            const componentPath = `./components/${componentName}.html`;
            
            // コンポーネントを読み込み
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${response.statusText}`);
            }

            const componentHtml = await response.text();
            
            // コンポーネントを挿入
            targetElement.innerHTML = componentHtml;
            
            // 読み込み完了をマーク
            this.loadedComponents.add(componentName);
            
            // オプションのコールバックを実行
            if (options.onLoad) {
                options.onLoad();
            }

            console.log(`Component '${componentName}' loaded successfully`);
            
        } catch (error) {
            console.error(`Error loading component '${componentName}':`, error);
            
            // エラー時のフォールバック処理
            if (options.onError) {
                options.onError(error);
            }
        }
    }

    /**
     * 複数のコンポーネントを同時に読み込む
     * @param {Array} components - コンポーネント設定の配列
     */
    async loadComponents(components) {
        const promises = components.map(component => 
            this.loadComponent(component.name, component.target, component.options)
        );
        
        await Promise.all(promises);
    }

    /**
     * ページ内のすべてのコンポーネントプレースホルダーを自動検出して読み込む
     */
    async loadAllComponents() {
        const componentElements = document.querySelectorAll('[data-component]');
        console.log('Found component elements:', componentElements.length);
        
        for (const element of componentElements) {
            const componentName = element.dataset.component;
            const options = this.parseOptions(element.dataset.options);
            console.log('Loading component:', componentName, 'for element:', element);
            
            await this.loadComponent(componentName, `[data-component="${componentName}"]`, options);
        }
    }

    /**
     * データ属性からオプションを解析
     * @param {string} optionsString - JSON形式のオプション文字列
     * @returns {Object} 解析されたオプション
     */
    parseOptions(optionsString) {
        if (!optionsString) return {};
        
        try {
            return JSON.parse(optionsString);
        } catch (error) {
            console.warn('Failed to parse component options:', error);
            return {};
        }
    }

    /**
     * コンポーネントが読み込まれているかチェック
     * @param {string} componentName - コンポーネント名
     * @returns {boolean} 読み込み済みかどうか
     */
    isComponentLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }

    /**
     * コンポーネントを再読み込み
     * @param {string} componentName - コンポーネント名
     */
    reloadComponent(componentName) {
        this.loadedComponents.delete(componentName);
        return this.loadComponent(componentName, `[data-component="${componentName}"]`);
    }
}

// グローバルインスタンスを作成
window.ComponentLoader = new ComponentLoader();

// DOMContentLoaded時に自動でコンポーネントを読み込む
document.addEventListener('DOMContentLoaded', function() {
    // 自動読み込みが有効な場合のみ実行
    if (window.autoLoadComponents !== false) {
        window.ComponentLoader.loadAllComponents();
    }
});

// 使用例:
/*
// 個別に読み込む場合
ComponentLoader.loadComponent('header', '#header-placeholder', {
    onLoad: () => console.log('Header loaded'),
    onError: (error) => console.error('Header load failed:', error)
});

// 複数同時読み込み
ComponentLoader.loadComponents([
    { name: 'header', target: '#header-placeholder' },
    { name: 'footer', target: '#footer-placeholder' }
]);

// HTMLでの使用例:
<div data-component="header"></div>
<div data-component="footer" data-options='{"onLoad": "console.log(\"Footer loaded\")"}'></div>
*/
