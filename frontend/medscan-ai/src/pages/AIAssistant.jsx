import React, { useState, useRef, useEffect } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { MOCK_AI_SUGGESTIONS } from '../data/mockData';
import { apiService } from '../services/api';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Trash2, 
  ShieldAlert, 
  Copy, 
  Check, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';

export const AIAssistant = () => {
  const { currentAnalysis, analyses, settings } = useAnalysis();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your MediScan AI Clinical Assistant. I can help evaluate prescription interactions, explain mechanism of action, or answer pharmacology questions. How can I assist your clinical practice today?',
      time: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const chatEndRef = useRef(null);

  const activePatient = currentAnalysis || analyses[0];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const aiResponseText = await apiService.queryAICopilot(query, activePatient);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiResponseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('AI Copilot error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e2ece9]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#006859] text-white flex items-center justify-center shadow-md shadow-[#006859]/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Clinical AI Copilot
              <span className="text-xs bg-[#e6f4f1] text-[#006859] px-2.5 py-0.5 rounded-full font-bold border border-[#cce3dd]">
                {settings.aiModel}
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Context Aware • Active Patient: <strong>{activePatient?.patientName}</strong> ({activePatient?.riskLevel} Risk)
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1.5"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Main Chat Body */}
      <div className="flex-1 bg-white rounded-3xl border border-[#e2e8f0] p-6 shadow-xs overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.sender === 'user'
                ? 'bg-slate-900 text-white'
                : 'bg-[#006859] text-white shadow-xs'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div className={`p-4 rounded-2xl text-sm leading-relaxed space-y-1 relative group ${
              msg.sender === 'user'
                ? 'bg-slate-900 text-white rounded-tr-none'
                : 'bg-[#f4f8f7] border border-[#e2ece9] text-slate-800 rounded-tl-none'
            }`}>
              <p>{msg.text}</p>
              
              <div className="flex items-center justify-between gap-4 pt-1 text-[10px] opacity-70">
                <span>{msg.time}</span>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="hover:opacity-100 transition-opacity"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
            <div className="w-8 h-8 rounded-full bg-[#006859] text-white flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-[#f4f8f7] px-4 py-3 rounded-2xl border border-[#e2ece9] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006859] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#006859] animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-[#006859] animate-bounce delay-200" />
              <span className="ml-2 text-slate-600 font-semibold">MediScan AI analyzing pharmacology database...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-bold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#006859]" /> Quick Questions:
        </span>
        {MOCK_AI_SUGGESTIONS.slice(0, 3).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 bg-white border border-[#cce3dd] hover:border-[#006859] hover:bg-[#e6f4f1] text-slate-700 hover:text-[#006859] font-medium rounded-full shrink-0 transition-all shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-3 bg-white p-2.5 rounded-full border border-[#d8e5e1] shadow-md focus-within:border-[#006859] focus-within:ring-2 focus-within:ring-[#006859]/20 transition-all"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Copilot about drug interactions, contraindications, or dosing..."
          className="flex-1 pl-4 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="p-3 bg-[#006859] hover:bg-[#005044] disabled:opacity-50 text-white rounded-full transition-all shadow-sm shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
