/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CATEGORIES, PROMPTS } from './data/prompts';
import PromptCard from './components/PromptCard';
import PromptImprover from './components/PromptImprover';
import { Menu, X, Component, HelpCircle, FileText, Megaphone, Presentation, Users, Handshake, LineChart, Scale, Code, Briefcase, Landmark } from 'lucide-react';

const ICONS = {
  FileText,
  Megaphone,
  Presentation,
  Users,
  Handshake,
  LineChart,
  Scale,
  Code,
  Briefcase,
  Landmark
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<number | 'improve'>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    const IconCmp = ICONS[iconName as keyof typeof ICONS] || HelpCircle;
    return <IconCmp className={className} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-blue-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveCategory(1)}>
              <Component className="w-8 h-8 text-accent" />
              <span className="font-bold text-xl tracking-tight hidden sm:block">소셜앤비즈</span>
              <span className="font-bold text-xl tracking-tight sm:hidden">소셜앤비즈</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveCategory('improve')}
                className={`flex items-center gap-2 font-medium ${activeCategory === 'improve' ? 'text-accent' : 'text-gray-300 hover:text-white transition-colors'}`}
              >
                <HelpCircle className="w-5 h-5" />
                프롬프트 개선기
              </button>
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex w-full">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          
          {/* Sidebar */}
          <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit md:sticky md:top-24 z-40`}>
            <nav className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">프롬프트 도구</div>
              <button
                onClick={() => { setActiveCategory('improve'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === 'improve' ? 'bg-blue-50 text-secondary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <HelpCircle className={`w-5 h-5 ${activeCategory === 'improve' ? 'text-secondary' : 'text-gray-400'}`} />
                프롬프트 개선기
              </button>

              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">카테고리</div>
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => { setActiveCategory(category.id); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === category.id ? 'bg-blue-50 text-secondary' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {renderIcon(category.icon, `w-5 h-5 ${activeCategory === category.id ? 'text-secondary' : 'text-gray-400'}`)}
                  {category.name}
                </button>
              ))}
            </nav>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-900 leading-relaxed border border-blue-100 shadow-sm">
              <strong>Tip:</strong><br/>
              원하는 프롬프트를 선택하여 복사한 후 생성형 AI에 붙여넣고 [대괄호]안의 내용을 자유롭게 변경하여 사용하세요.
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 w-full max-w-full overflow-hidden">
            {activeCategory === 'improve' ? (
              <PromptImprover />
            ) : (
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
                  {renderIcon(CATEGORIES.find(c => c.id === activeCategory)?.icon || 'HelpCircle', "w-8 h-8 text-secondary")}
                  <h2 className="text-2xl font-bold text-primary">
                    {CATEGORIES.find(c => c.id === activeCategory)?.name} 관리 프롬프트
                  </h2>
                  <span className="ml-auto bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                    10 Prompts
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {PROMPTS.filter(p => p.categoryId === activeCategory).map(prompt => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Component className="w-10 h-10 mx-auto text-accent mb-4" />
          <h3 className="text-xl font-bold text-accent mb-2">소셜앤비즈 프롬프트 100선</h3>
          <p className="text-gray-400 text-sm mb-6">분야별, 직무별, 종류별로 최적화된 비즈니스 프롬프트 컬렉션</p>
          <div className="border-t border-gray-700 pt-6 mt-6 text-sm text-gray-500">
            <p>&copy; 2026 (사)소셜앤비즈. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
