import React, { useState } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, MessageSquare, Search, Send, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { BehaviourLog } from '../types';

interface BehaviourSummaryViewProps {
  logs: BehaviourLog[];
}

export const BehaviourSummaryView: React.FC<BehaviourSummaryViewProps> = ({ logs }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; time: string }[]>([
    {
      role: 'ai',
      text: "Hello Dr. Pavey! I am the Generative AI Layer powered by Gemini. I continuously ingest MediaPipe pose coordinates and YOLOv8 object detections across all 14 active camera rooms. Ask me anything like 'Which module has the highest fatigue?' or 'Summarize attention trends this week.'",
      time: '10:00 AM'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendQuery = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText, time: 'Just now' }]);
    setIsLoading(true);

    // Simulate Gemini Natural Language Query Response mentioned in Phase 7 implementation plan
    setTimeout(() => {
      let responseText = "Based on recent computer vision telemetry, student engagement is generally high (84%). However, during long afternoon sessions in GAI-202 (Generative AI), mobile phone distraction spiked by 14% around the 50-minute mark.";
      
      if (userText.toLowerCase().includes('below 75') || userText.toLowerCase().includes('low attendance')) {
        responseText = "Currently, 2 students have attendance below the 75% critical threshold: Liam Chen (72.0% in Computer Science) and Noah Williams (68.4% in Data Science). I recommend scheduling automated advisory notifications.";
      } else if (userText.toLowerCase().includes('recommend') || userText.toLowerCase().includes('improve')) {
        responseText = "Recommendation: Consider introducing 5-minute interactive coding quizzes or discussions every 45 minutes to break up continuous lecture blocks, which correlates with a 22% reduction in drowsy pose logs.";
      }

      setMessages(prev => [...prev, { role: 'ai', text: responseText, time: 'Just now' }]);
      setIsLoading(false);
    }, 1200);
  };

  const samplePrompts = [
    "Which students have attendance below 75%?",
    "Summarize behavior trends in CV-401",
    "Give recommendations to improve student engagement",
    "What time do distraction spikes usually occur?"
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#182232] via-[#1E293B] to-indigo-950 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden border border-slate-700">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} />
            Phase 7 Deliverable — Gemini API Integration
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">AI Behaviour Synthesis & Natural Language Queries</h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
            Bridging raw computer vision coordinates (MediaPipe + YOLOv8) with executive generative AI summaries. Teachers and administrators can interrogate classroom telemetry in plain English.
          </p>
        </div>
      </div>

      {/* Two Column Interactive Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: AI Assistant Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[600px]">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xs">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800">Gemini Telemetry Copilot</h3>
                <p className="text-[11px] text-emerald-600 font-mono font-medium">● Connected to Live Database</p>
              </div>
            </div>
            <button 
              onClick={() => setMessages([messages[0]])}
              className="text-xs text-slate-400 hover:text-slate-600 font-mono"
            >
              Clear Chat
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.role === 'user' ? 'bg-[#2563EB] text-white' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {msg.role === 'user' ? 'AD' : <Sparkles className="w-4 h-4 text-indigo-600" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-2xs ${
                  msg.role === 'user' 
                    ? 'bg-[#2563EB] text-white rounded-tr-xs' 
                    : 'bg-[#F8FAFC] border border-slate-200 text-slate-800 rounded-tl-xs'
                }`}>
                  <p>{msg.text}</p>
                  <span className={`text-[10px] block mt-1.5 font-mono ${msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-center text-slate-400 text-xs font-mono animate-pulse pl-2">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
                <span>Gemini is analyzing multi-camera vision logs...</span>
              </div>
            )}
          </div>

          {/* Prompt Suggestions */}
          <div className="px-6 py-2 border-t border-slate-100 bg-slate-50/50 flex gap-2 overflow-x-auto pb-3">
            {samplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => setQuery(p)}
                className="px-3 py-1 bg-white border border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB] rounded-full text-xs text-slate-600 transition-all whitespace-nowrap shrink-0 shadow-2xs"
              >
                + {p}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSendQuery} className="p-4 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Ask a natural language query about attendance or student behavior..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-100 border border-transparent focus:border-[#2563EB] focus:bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden transition-all"
            />
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="px-5 py-2.5 bg-[#2563EB] disabled:opacity-50 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-all flex items-center justify-center shadow-md shadow-blue-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Raw Behaviour Telemetry Feed */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-800">Raw Behaviour Event Logs</h3>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                MediaPipe
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-6">Realtime stream classification per student</p>

            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800">{log.studentName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.behaviourType === 'Attentive' ? 'bg-emerald-100 text-emerald-800' :
                      log.behaviourType === 'Distracted' ? 'bg-amber-100 text-amber-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}>
                      {log.behaviourType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{log.classCode} • {log.timestamp}</span>
                    <span className="text-slate-600">Conf: {log.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Behaviour logs are retained for 30 days in compliance with institutional data privacy guidelines.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
