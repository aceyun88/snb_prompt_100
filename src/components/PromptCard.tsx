import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { PromptData } from '../data/prompts';

interface PromptCardProps {
  prompt: PromptData;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-secondary transition-all flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded text-xs font-bold">
          #{prompt.id}
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-50 text-blue-700">
            {prompt.role}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-orange-50 text-orange-700">
            {prompt.type}
          </span>
        </div>
      </div>
      
      <div 
        onClick={handleCopy}
        className="flex-grow bg-gray-50 p-4 rounded-lg border-l-4 border-accent text-sm leading-relaxed text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors relative"
        title="클릭하여 복사"
      >
        {prompt.content}
        <div className={`absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full transition-opacity ${copied ? 'bg-green-100 text-green-700 opacity-100' : 'bg-white text-gray-500 opacity-0 group-hover:opacity-100 shadow-sm border border-gray-200'}`}>
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              복사완료
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              복사하기
            </>
          )}
        </div>
      </div>
    </div>
  );
}
