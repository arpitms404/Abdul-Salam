import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  HardHat,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  Sparkles,
  MapPin,
  CheckCircle2,
  Check
} from 'lucide-react';
import {
  LeadInfo,
  getSmartBotReply,
  extractLeadDetails,
  generateWhatsAppLink,
  WHATSAPP_NUMBER,
  DISPLAY_PHONE
} from '../../data/chatKnowledgeBase';
import { COMPANY_DATA } from '../../data/companyData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  showWhatsAppCta?: boolean;
}

const INITIAL_GREETING: ChatMessage = {
  id: 'msg-init-1',
  sender: 'bot',
  text: `Assalam-o-Alaikum & Namaste! 🙏

Main **Abdul Salam Constructions** ka **Chat Support** assistant hoon.

Hum Bhadohi, Gyanpur aur aas-paas ke ilaqon me **Foundation se lekar Key Handover tak** full turnkey residential ghar banwate hain.

Aap mujhse pooch sakte hain:
• **Rates:** 1200 / 1500 / 2000 sqft me kitna kharcha aayega?
• **Materials:** UltraTech cement, Fe 550D TMT saria, eent, concrete mix
• **Payment:** 7 verified civil milestones
• **Site Visit:** Free engineer inspection`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedPrompts: [
    '1500 sqft ka kharcha kitna aayega?',
    'Payment ke 7 stages kya hain?',
    'Cement aur saria kaun sa hai?',
    'Free site inspection book karo'
  ]
};

export const ChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPromptedBubble, setHasPromptedBubble] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Lead State
  const [lead, setLead] = useState<LeadInfo>({
    name: null,
    phone: null,
    area: null,
    location: null,
    packagePreference: null,
    specificInterests: []
  });

  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  // Show a gentle greeting nudge after 4 seconds if unopened
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPromptedBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    // Extract lead details locally from user input
    const localLeadUpdates = extractLeadDetails(text, lead);
    const updatedLead: LeadInfo = {
      ...lead,
      ...localLeadUpdates,
      specificInterests: [...lead.specificInterests, text.slice(0, 50)]
    };
    setLead(updatedLead);

    // 1. Try calling Server-Side Gemini AI for natural, human-like dialogue
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newMessages.map((m) => ({ sender: m.sender, text: m.text })),
          lead: updatedLead
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          if (data.leadUpdate) {
            setLead((prev) => ({ ...prev, ...data.leadUpdate }));
          }

          const showWhatsApp = typeof data.showWhatsAppCta === 'boolean'
            ? data.showWhatsAppCta
            : Boolean(
                updatedLead.phone ||
                /whatsapp|contact|call|number|phone|milna|site visit|engineer/i.test(text)
              );

          const botMsg: ChatMessage = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedPrompts: data.suggestedPrompts || [
              '1000 sqft ka kharcha kitna aayega?',
              'Cement aur Saria kaun sa lagate ho?',
              'Payment ke 7 stages kya hain?',
              'WhatsApp par baat karein'
            ],
            showWhatsAppCta: showWhatsApp
          };

          setMessages((prev) => [...prev, botMsg]);
          setIsTyping(false);
          return;
        }
      }
    } catch (err) {
      console.warn('AI endpoint unavailable, using conversational fallback:', err);
    }

    // 2. High-speed Conversational Rule Engine (Guaranteed zero brochure dumps)
    setTimeout(() => {
      const botRes = getSmartBotReply(text, updatedLead, newMessages.length);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botRes.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: botRes.suggestedPrompts,
        showWhatsAppCta: botRes.showWhatsAppCta
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setLead({
      name: null,
      phone: null,
      area: null,
      location: null,
      packagePreference: null,
      specificInterests: []
    });
  };

  const currentWhatsAppLink = generateWhatsAppLink(
    lead,
    messages[messages.length - 1]?.text || 'Ghar ke construction rate aur details chahiye'
  );

  return (
    <>
      {/* ========================================================= */}
      {/* 1. FLOATING CHAT BUTTON & NUDGE BUBBLE                     */}
      {/* ========================================================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
        
        {/* Proactive Greeting Bubble (Pops up gently if chat is closed) */}
        <AnimatePresence>
          {!isOpen && hasPromptedBubble && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto bg-[#070F1E] border border-[#1E3B64] text-white p-3 max-w-[280px] shadow-2xl relative mb-1 cursor-pointer hover:border-[#E58A1F] transition-all"
              onClick={() => setIsOpen(true)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHasPromptedBubble(false);
                }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-800 border border-slate-600 text-slate-300 hover:text-white flex items-center justify-center text-[10px]"
                aria-label="Dismiss message"
              >
                ✕
              </button>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E58A1F]/20 border border-[#E58A1F] flex items-center justify-center flex-shrink-0 text-[#E58A1F] mt-0.5">
                  <HardHat className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-heading">
                    Ghar Banwana Hai?
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    Plot size batayein, instant rate aur BOQ estimate payein!
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-[#E58A1F] font-semibold">
                    <span>Chat Support Online</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <motion.button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasPromptedBubble(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3.5 bg-[#0B1B3D] hover:bg-[#0E224D] border-2 border-[#E58A1F] text-white shadow-2xl transition-all cursor-pointer group focus:outline-none"
          aria-label="Toggle Chat Support"
        >
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 ring-2 ring-[#0B1B3D] animate-pulse" />
            <MessageSquare className="w-5 h-5 text-[#E58A1F] group-hover:text-white transition-colors" />
          </div>
          <div className="text-left font-sans">
            <div className="font-heading font-black text-xs uppercase tracking-wider text-white">
              Chat Support
            </div>
            <div className="text-[10px] font-mono text-[#E58A1F] leading-none">
              Online • Er. Salam Team
            </div>
          </div>
        </motion.button>
      </div>

      {/* ========================================================= */}
      {/* 2. CHAT SUPPORT MODAL / WINDOW                            */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-2 bottom-2 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-auto sm:w-[420px] md:w-[450px] max-h-[90vh] sm:max-h-[640px] h-[620px] bg-[#070F1E] border border-[#1E3B64] shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Window Header */}
            <div className="bg-[#0B1B3D] border-b border-[#1E3B64] p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 bg-[#0E264D] border border-[#E58A1F] flex items-center justify-center text-[#E58A1F]">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#0B1B3D]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-heading font-black text-sm text-white">
                      Chat Support
                    </h2>
                    <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-1 py-0.2">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-300 truncate max-w-[200px]">
                    M/S Abdul Salam Constructions
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1.5">
                {/* Direct Call */}
                <a
                  href={`tel:${COMPANY_DATA.contact.phone}`}
                  title="Direct Call Site Engineer"
                  className="p-2 text-slate-300 hover:text-[#E58A1F] hover:bg-[#0E264D] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>

                {/* Reset Chat */}
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-2 text-slate-400 hover:text-white hover:bg-[#0E264D] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-2 text-slate-400 hover:text-white hover:bg-red-950/60 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Context Memory Bar (Shows what details bot has remembered) */}
            {(lead.area || lead.dimensions || lead.location || lead.name || lead.phone) && (
              <div className="bg-[#0A162B] border-b border-slate-800 px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span className="text-slate-400 text-[10px] uppercase">Active Inquiry:</span>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {lead.name && (
                    <span className="bg-[#0E264D] text-[#E58A1F] px-1.5 py-0.5 border border-slate-700">
                      👤 {lead.name}
                    </span>
                  )}
                  {lead.dimensions ? (
                    <span className="bg-[#0E264D] text-white px-1.5 py-0.5 border border-[#E58A1F]/50 font-medium">
                      📐 {lead.dimensions} ({lead.area} sqft)
                    </span>
                  ) : lead.area ? (
                    <span className="bg-[#0E264D] text-white px-1.5 py-0.5 border border-slate-700">
                      📐 {lead.area} sqft
                    </span>
                  ) : null}
                  {lead.location && (
                    <span className="bg-[#0E264D] text-white px-1.5 py-0.5 border border-slate-700">
                      📍 {lead.location}
                    </span>
                  )}
                  {lead.phone && (
                    <span className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 border border-emerald-700">
                      📞 {lead.phone}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4 bg-[#070F1E] font-sans text-xs sm:text-[13px] leading-relaxed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Speech Bubble */}
                  <div
                    className={`max-w-[86%] p-3 sm:p-3.5 transition-all ${
                      msg.sender === 'user'
                        ? 'bg-[#E58A1F] text-[#070F1E] font-medium selection:bg-[#070F1E] selection:text-white'
                        : 'bg-[#0D1C36] text-slate-100 border border-[#1E3B64] shadow-md'
                    }`}
                  >
                    {/* Render message with line breaks and formatting */}
                    <div className="whitespace-pre-line break-words space-y-1">
                      {msg.text}
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`text-[9px] font-mono mt-1.5 text-right ${
                        msg.sender === 'user' ? 'text-[#070F1E]/70' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Interactive WhatsApp Direct Card if Triggered */}
                  {msg.showWhatsAppCta && (
                    <div className="w-full max-w-[86%] mt-2 bg-[#0A1A2F] border border-emerald-600/60 p-3 shadow-lg space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Send to WhatsApp (+91 {DISPLAY_PHONE})</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Senior Civil Engineer ko seedha WhatsApp bhejein — quotation, floor plan aur free inspection discuss karein:
                      </p>
                      <a
                        href={currentWhatsAppLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                      >
                        <span>Open in WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Suggested Prompts for Easy 1-Tap Interaction */}
                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[11px] font-mono bg-[#0A172C] hover:bg-[#122A4E] hover:text-[#E58A1F] border border-slate-700 px-2.5 py-1 text-slate-300 transition-colors cursor-pointer text-left"
                        >
                          💬 {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono bg-[#0D1C36] border border-[#1E3B64] px-3 py-2 w-fit">
                  <div className="w-2 h-2 rounded-full bg-[#E58A1F] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#E58A1F] animate-bounce [animation-delay:0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-[#E58A1F] animate-bounce [animation-delay:0.3s]" />
                  <span className="ml-1 text-[11px]">Engineer replying...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Keyword Pills Above Input */}
            <div className="bg-[#050C18] border-t border-slate-800 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px] font-mono">
              <button
                type="button"
                onClick={() => handleSendMessage('1500 sqft ka rate aur kharcha batao')}
                className="whitespace-nowrap px-2 py-0.5 bg-[#0A162B] text-slate-300 hover:text-[#E58A1F] border border-slate-700 transition-colors cursor-pointer"
              >
                💰 1500 sqft Cost
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Cement aur Saria kaun sa lagate ho?')}
                className="whitespace-nowrap px-2 py-0.5 bg-[#0A162B] text-slate-300 hover:text-[#E58A1F] border border-slate-700 transition-colors cursor-pointer"
              >
                🧱 Materials
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('7 Payment Milestones kya hain?')}
                className="whitespace-nowrap px-2 py-0.5 bg-[#0A162B] text-slate-300 hover:text-[#E58A1F] border border-slate-700 transition-colors cursor-pointer"
              >
                📊 7 Stages
              </button>
              <a
                href={currentWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-700 hover:bg-emerald-900 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>📲 WhatsApp</span>
              </a>
            </div>

            {/* Message Input Box */}
            <div className="p-3 bg-[#091529] border-t border-[#1E3B64]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ghar banwane ka sawal poochein (Hinglish/Hindi/English)..."
                  className="flex-1 bg-[#050B15] border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#E58A1F] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 bg-[#E58A1F] hover:bg-[#d47b13] disabled:opacity-40 disabled:hover:bg-[#E58A1F] text-[#070F1E] font-bold transition-colors cursor-pointer"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1.5 px-0.5">
                <span>WhatsApp Helpline: +91 {DISPLAY_PHONE}</span>
                <span className="text-[#E58A1F]">Zero Hidden Charges</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
