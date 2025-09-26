'use client';

import './marketing.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing">
      <Header />
      
      {/* Heroセクションはコンテナの外で全幅表示 */}
      {children}
      
      <Footer />
    </div>
  );
}


