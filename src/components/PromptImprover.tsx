import React, { useState } from 'react';
import { Bot, Sparkles, Copy, Check } from 'lucide-react';
import { improvePrompt } from '../lib/gemini';

export default function PromptImprover() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [improvedPrompt, setImprovedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleImprove = async () => {
    if (!inputPrompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    try {
      const result = await improvePrompt(inputPrompt);
      setImprovedPrompt(result);
    } catch (err: any) {
      setError(err.message || '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!improvedPrompt) return;
    navigator.clipboard.writeText(improvedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6 mb-12">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI 프롬프트 개선기</h2>
            <p className="text-white/80 text-sm mt-1">간단한 생각을 입력하면 전문가 수준의 프롬프트로 다듬어드립니다.</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col h-full">
          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            원본 프롬프트 입력
          </label>
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="예시: 마케팅 전략 기획서 좀 작성해줘"
            className="flex-grow w-full border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all resize-none min-h-[200px]"
          />
          <button
            onClick={handleImprove}
            disabled={isLoading || !inputPrompt.trim()}
            className="mt-4 w-full bg-primary hover:bg-secondary disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                처리 중...
              </span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                프롬프트 고도화하기
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col h-full opacity-100 transition-opacity">
          <label className="text-sm font-semibold text-gray-700 mb-2 flex justify-between items-center">
            <span>AI 전문가 버전</span>
            {improvedPrompt && (
              <button
                onClick={copyToClipboard}
                className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors font-medium min-h-[32px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? '복사완료' : '복사하기'}
              </button>
            )}
          </label>
          <div className="flex-grow relative">
            <div className={`absolute inset-0 bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto whitespace-pre-wrap ${!improvedPrompt && !error ? 'flex items-center justify-center text-gray-400' : 'text-gray-800'}`}>
              {error ? (
                <span className="text-red-500">{error}</span>
              ) : improvedPrompt ? (
                improvedPrompt
              ) : (
                <div className="text-center flex flex-col items-center">
                  <span className="block mb-2">✨</span>
                  <span>최적화된 프롬프트가 여기에 표시됩니다</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
