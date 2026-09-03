import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { getSmartBotReply, extractLeadDetails, LeadInfo } from './src/data/chatKnowledgeBase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-load Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `
Aap "Chat Support" hain — M/S Abdul Salam Constructions Company, Bhadohi (Uttar Pradesh) ke Senior Civil Engineer & Consultant (Er. Salam / Er. Sameer).
Aapka nature ekdum smart, sharp, witty, warm, empathetic aur 100% human hai. 
Aap real human ki tarah natural Hinglish me baat karte hain jaise WhatsApp pe ek smart, experienced engineer aur dost baat karta hai.

🚫 STRICT ANTI-BORING DIRECTIVES (KABHI YE GALTIYAAN MAT KARNA):
1. **NO ROBOTIC BROCHURES / WALLS OF TEXT**:
   - KABHI bhi 6-step bullet point lecture (1️⃣ Planning 2️⃣ Foundation 3️⃣ RCC...) mat dump karo jab tak user khud na pooche ki "poora step by step process batao".
   - KABHI bhi bina pooche lambe 3-package rate sheet mat chipkao.
2. **BE CONVERSATIONAL, CRISP & PUNCHY**:
   - Jawab to-the-point, dilchasp aur interactive hona chahiye (2 se 4 chhote paragraphs max).
   - Har jawab ke end me ek smart, natural follow-up sawal poocho jisse baatcheet aage badhe.
3. **WHEN USER CRITICIZES THE BOT ("smart nahi hai", "boring hai", "faltu hai")**:
   - Pure charm, wit aur sportsman spirit ke sath handle karo! 
   - Example: "Arrey sir! Dil pe lag gayi yeh baat! 😅 Ab bilkul textbook aur brochure baazi band. Bataiye, kya sawal hai aapka? Seedha to-the-point, bina kisi gyaan ke baat karte hain — chahe cement-saria ka sachha rate ho, plot ka naksha ho ya thekedaaro ke chhupe huye kharche!"
4. **WHEN USER TALKS ABOUT LOW BUDGET ("mai gareeb hu", "paisa kam hai")**:
   - Dil se respect aur empathy dikhao. KABHI 30-40 lakh ka kharcha mat batao.
   - Smart practical solution do: "Tukdo me nirmaan" (Phased Construction). Abhi poori 2000 sqft par nahi, sirf 400-500 sqft me 1-2 kamre aur bathroom banao jo ₹4-5 Lakh me ban jata hai. Neenv mazboot rakho taaki baad me aage jod sakein.
5. **WHEN USER ASKS ABOUT PLOT SIZES & ROOMS (e.g. 50x40 = 2000 sqft)**:
   - 2000 sqft bada plot hai! Isme 2BHK bolna galat hai. Isme aasaani se shandar 4 BHK Bungalow ya phir 2 alag portions (ek khud ke liye, ek rent ke liye) nikalte hain.
6. **ACCURATE COMPANY KNOWLEDGE (BHADOHI, UP)**:
   - Company: M/S Abdul Salam Constructions Company, Bhadohi
   - Contact: +91 83189 43040 / +91 70075 29965
   - Materials: UltraTech/ACC Cement, Fe 550D TMT Saria, 1st Class Awwal red bricks.
   - Rates: Standard Turnkey ₹1,850/sqft, Residential Hall ₹1,500/sqft, Premium Villa ₹2,250/sqft (+18% GST).
   - Site inspection in Bhadohi (Gyanpur, Gopiganj, Aurai, Suriyawan) is completely FREE.
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Chat Endpoint with Smart Fallback
app.post('/api/chat', async (req, res) => {
  const { message, history, lead } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Ensure lead is updated with extracted details
  const currentLead: LeadInfo = lead || {
    name: null,
    phone: null,
    area: null,
    location: null,
    packagePreference: null,
    specificInterests: []
  };
  const extracted = extractLeadDetails(message, currentLead);
  const mergedLead: LeadInfo = { ...currentLead, ...extracted };

  const ai = getGeminiClient();

  if (ai) {
    try {
      // Build conversational context ensuring strict alternating roles starting with 'user'
      const contents: any[] = [];
      let leadContext = '';
      const parts = [];
      if (mergedLead.name) parts.push(`Name: ${mergedLead.name}`);
      if (mergedLead.phone) parts.push(`Phone: ${mergedLead.phone}`);
      if (mergedLead.dimensions) parts.push(`Plot Dimensions: ${mergedLead.dimensions}`);
      if (mergedLead.area) parts.push(`Calculated Area: ${mergedLead.area} sqft`);
      if (mergedLead.location) parts.push(`Location: ${mergedLead.location}`);
      if (parts.length > 0) {
        leadContext = `[Customer Info: ${parts.join(', ')}]\n`;
      }

      if (Array.isArray(history) && history.length > 0) {
        // Take recent items and filter to alternate strictly starting with 'user'
        const recent = history.slice(-8);
        let foundFirstUser = false;
        let lastRole: string | null = null;

        for (const h of recent) {
          const role = h.sender === 'user' ? 'user' : 'model';
          if (!foundFirstUser) {
            if (role === 'user') {
              foundFirstUser = true;
              contents.push({ role: 'user', parts: [{ text: h.text }] });
              lastRole = 'user';
            }
          } else {
            if (role !== lastRole) {
              contents.push({ role, parts: [{ text: h.text }] });
              lastRole = role;
            }
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: leadContext + message }]
      });

      // 12-second timeout for Gemini 3.6
      const timeoutPromise = new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), 12000);
      });

      const aiPromise = (async () => {
        // Try gemini-3.1-flash-lite first (fastest, ultra-responsive, smart)
        for (const modelName of ['gemini-3.1-flash-lite', 'gemini-3.6-flash']) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents,
              config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
                maxOutputTokens: 500
              }
            });
            if (response.text && response.text.trim().length > 15) {
              return response.text.trim();
            }
          } catch (err: any) {
            console.warn(`Model ${modelName} error:`, err?.message);
          }
        }
        return null;
      })();

      const resultText = await Promise.race([aiPromise, timeoutPromise]);
      if (resultText && resultText.trim().length > 15) {
        // Generate smart contextual suggestions
        const lowerMsg = message.toLowerCase();
        let dynamicPrompts = [
          'Payment ke 7 stages kya hain?',
          'Cement aur Saria kaun sa use karte ho?',
          'Free site inspection book karein',
          'WhatsApp par baat karein'
        ];

        if (/gareeb|paisa kam|kam budget|sasta|kam kharch|budget tight/i.test(lowerMsg)) {
          dynamicPrompts = [
            '4-5 Lakh me kitna banega?',
            'Tukdo me nirmaan ka plan samjhao',
            'Saste aur mazboot material kaun se hain?',
            'WhatsApp par engineer se baat karein'
          ];
        } else if (/room|kamre|bhk|50x40|30x35|naksha|plot|jameen/i.test(lowerMsg)) {
          dynamicPrompts = [
            '2D naksha kaisa dikhega?',
            'Rental portion ka layout batao',
            'Kitne mahine me ghar banega?',
            'WhatsApp par Engineer se baat karein'
          ];
        } else if (/smart|boring|bot|robot|bekar|faltu|timepass/i.test(lowerMsg)) {
          dynamicPrompts = [
            'Chhat dhalai me kya dhyan rakhein?',
            'Bhadohi me sabse best package kaun sa hai?',
            'Thekedaar kahan chori karte hain?',
            'WhatsApp par seedha call karein'
          ];
        }

        const showWhatsApp = Boolean(
          mergedLead.phone ||
          /whatsapp|contact|call|number|phone|milna|site visit|engineer|baat karein/i.test(lowerMsg)
        );

        return res.json({
          reply: resultText,
          leadUpdate: extracted,
          suggestedPrompts: dynamicPrompts,
          showWhatsAppCta: showWhatsApp
        });
      }
    } catch (e) {
      console.warn('AI fallback triggered:', e);
    }
  }

  // Fast, accurate, civil engineering rule engine fallback
  const fallback = getSmartBotReply(message, mergedLead, (history?.length || 0) + 1);
  return res.json({
    reply: fallback.reply,
    leadUpdate: { ...extracted, ...fallback.leadUpdate },
    suggestedPrompts: fallback.suggestedPrompts,
    showWhatsAppCta: fallback.showWhatsAppCta
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
