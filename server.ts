import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { 
  PUBLICATIONS, 
  PROJECTS, 
  SUPERVISION_RECORD, 
  BIOGRAPHY_SUMMARY, 
  CONSULTING_SERVICES, 
  KEYNOTE_TOPICS, 
  AWARDS 
} from "./src/data.js";

dotenv.config();

const app = express();
app.use(express.json());

// Route to handle serving 3.png dynamically from any location where uploaded
app.get("/3.png", (req, res, next) => {
  const possiblePaths = [
    path.join(process.cwd(), "3.png"),
    path.join(process.cwd(), "public", "3.png"),
    path.join(process.cwd(), "src", "3.png"),
    path.join(process.cwd(), "src", "assets", "3.png"),
    path.join(process.cwd(), "assets", "3.png"),
    path.join(process.cwd(), "assets", "img", "3.png"),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return res.sendFile(p);
    }
  }
  next();
});

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured in Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// 1. General Executive Chat Assistant Twin
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], systemOverride } = req.body;
    const ai = getGeminiClient();

    const publicationsSummary = PUBLICATIONS.map(p => 
      `- [${p.year}] "${p.title}" published in ${p.venue} (Citations: ${p.citations}, Topic: ${p.topic})`
    ).join("\n");

    const projectsSummary = PROJECTS.map(p => 
      `- ${p.title} (${p.subtitle}): ${p.description}. Status: ${p.status}. Funding/Scale: ${p.scaleOrFunding || 'N/A'}`
    ).join("\n");

    const consultings = CONSULTING_SERVICES.map(c =>
      `- Service: ${c.service} | Target: ${c.forWho} | Deliverable: ${c.deliverable}`
    ).join("\n");

    const basicSystemInstruction = `You are the digital twin and official executive research proxy of Prof. Pius Adewale Owolawi, Assistant Dean of Industry Liaison, Special Projects and Work-Integrated Learning at Tshwane University of Technology (TUT).
Your role is to assist visitors (Universities, Governments, Corporations, Investors, and prospective Masters/PhD/Postdoc candidates) by answering their queries with elite professionalism, clarity, and authority.

Maintain an ambitious, highly competent, intellectual, and cooperative tone. Use short paragraphs and lists. 

Profile Credentials to keep in mind:
- Total Secured Funding: R94+ Million ($5.01M USD) in competitive funds (AgriSETA drone training, MICTSETA 4IR Chair, BANKSETA).
- Publications: 200+ peer-reviewed. Citations: 2000+. H-index: 27-30.
- Labs established: 8 world-class hardware/software labs.
- Research areas: AI/LLMs (especially resource-constrained Setswana/Sesotho), smart agriculture (precision drones and computer vision), telecom (mmWave, rain attenuation), renewable energy, and digital education databases.

Here are his key publications:
${publicationsSummary}

Here are his ongoing national projects & innovations:
${projectsSummary}

Here are his consulting capabilities:
${consultings}

Respond directly to the user's inquiry as Prof. Owolawi's digital representative. Cite real publication years, grant amounts, and case studies where appropriate. Do not make up facts outside this context.`;

    const formattedHistory = history.map((h: any) => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    // Generate output
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: systemOverride || basicSystemInstruction,
        temperature: 0.2
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    res.status(500).json({ error: error.message || "Failed to query Gemini AI" });
  }
});

// 2. Specialized Publication & Research Search Assistant
app.post("/api/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const ai = getGeminiClient();

    const publicationsSummary = PUBLICATIONS.map(p => 
      JSON.stringify({
        id: p.id,
        year: p.year,
        title: p.title,
        venue: p.venue,
        topic: p.topic,
        abstract: p.abstract || ""
      })
    ).join("\n");

    const prompt = `A user is searching Prof. Pius Owolawi's research publications for: "${query}".
Analyze the following list of publications and determine the top 3-4 publications that are most relevant to the search query.

Publications database:
${publicationsSummary}

Provide a short, structured summary response in Markdown. For each matching paper, state:
1. The exact Title and Year
2. A 2-sentence summary of how it fits their query
3. Its impact space (diagnostic, climate, agricultural, etc.)
Include a encouraging call-to-action at the end for the user to collaborate on this topic with Prof. Owolawi.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the advanced Research Search assistant on Prof. Owolawi's website. Be objective and direct.",
        temperature: 0.1
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Search Assistant Error:", error);
    res.status(500).json({ error: error.message || "Search assistance error occurs" });
  }
});

// 3. US/Africa Funding Opportunity Recommender
app.post("/api/recommend-funding", async (req, res) => {
  try {
    const { researcherBio, topicOfInterest } = req.body;
    if (!topicOfInterest) {
      return res.status(400).json({ error: "A topic or brief description of interest is required." });
    }
    const ai = getGeminiClient();

    const targetFunders = `
    - National Science Foundation (NSF) — CISE (Computer & Information Science and Engineering), ENG (Engineering) directorates
    - National Institutes of Health (NIH) — Fogarty International Center for global health diagnostics
    - Department of Energy (DoE) — Smart microgrid optimization, solar fault detection
    - USAID — Higher education, agricultural drone training deployment, or food security platforms
    - Gates Foundation — Agricultural tech, inclusive apps (small-scale farmers, local translations)
    - Microsoft Philanthropies, Google.org, NVIDIA Foundation — Al for skills development/accessibility
    - AgriSETA / MICTSETA / BANKSETA — Skills, e-learning, regional vocational models
    `;

    const pastGrants = `
    - AgriSETA: R12.43M agricultural drone precision spraying (PS25TUT11)
    - MICTSETA: R26.4M Work Integrated Learning (WIL) and R10.6M Research Chair
    - BANKSETA: R29.06M for 532 graduates
    - NRF (National Research Foundation): R5.2M mmWave hardware setup
    - TIA (Technology Innovation Agency): R300,000 AI vehicle theft detection
    - GIZ-SAGEN: R2M energy efficiency training
    `;

    const prompt = `A collaborator has input the following research topic/interest: "${topicOfInterest}".
Researcher background (if provided): "${researcherBio || 'N/A'}".

Recommend 2-3 specific global funding routes (e.g. NSF, NIH, AgriSETA, GIZ) that align with their topic, drawing parallels to Prof. Owolawi's historical grant-winning record.

Target Funders database:
${targetFunders}

Prof. Owolawi's historical grants:
${pastGrants}

Structure your response clearly:
1. **Recommended Funding Instrument & Agency**: Which matches best and why.
2. **Prof. Owolawi's Collaborative Advantage**: Cite one of his historical grants and explain how partnering on this proposal strengthens the bid (e.g. 'By utilizing Prof. Owolawi's existing R12.4M AgriSETA drone infrastructure...').
3. **Actionable Next Step**: Advice on scoping the initial concept note. Ensure a highly motivating, executive-level delivery.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the top-tier Funding Recommender & Strategy advisor for Prof. Pius Owolawi's academic partnership office.",
        temperature: 0.15
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Funding Recommender Error:", error);
    res.status(500).json({ error: error.message || "Failed to recommend funding options" });
  }
});

// 4. Student Supervision Alignment Advisor
app.post("/api/student-advisor", async (req, res) => {
  try {
    const { rawProposal, studentTier } = req.body;
    if (!rawProposal) {
      return res.status(400).json({ error: "A brief research idea or proposal is required." });
    }
    const ai = getGeminiClient();

    const researchThemes = `
    1. Artificial Intelligence, ML & Deep Learning (NLP for low-resource languages, BCI, Financial AI modeling)
    2. Wireless, Optical & Satellite Communication Engineering (Rain attenuation modeling, 5G/6G, RIS networks)
    3. Smart Agriculture, Precision Farming & Agritech (YOLO-based weed detection, drone hyperspectral yield modeling)
    4. Renewable Energy Systems & Smart Grids (AI-driven solar PV faults, microgrid optimization)
    5. Computer Vision & Intelligent Systems (Object/instance segmentation, SAM-enabled medical imaging)
    6. IoT, Edge Computing & Communication Networks (VANETs, fog-cloud agritech, smart aquaponics)
    7. Electromagnetic Compatibility & Radio Engineering (EMC/EMI diagnostics, MIMO, Radio-over-Fibre)
    8. Embedded Systems, Robotics & Remote Engineering (BCI-driven robots, flying cars telemetry, drone payload capture)
    9. Societal Impact & Inclusive Technology (Low-cost rural AI, regional policy convergence)
    `;

    const supervisionRequirements = `
    - Documents Required: Detailed CV, Academic Transcripts, a solid 2-3 page Research Proposal aligned with themes, 2 academic reference letters, English certificate (IELTS/TOEFL) for non-natives.
    - Status of candidates: Shortlisted applicants undergo a technical review followed by a rigorous 1-on-1 interview with Prof. Owolawi.
    `;

    const prompt = `A prospective student (${studentTier || 'Masters/PhD'}) submitted this research idea/proposal:
"${rawProposal}"

Review their proposal against Prof. Owolawi's 9 active Research Themes and provide constructive, academic feedback.

Themes:
${researchThemes}

Requirements & Guidelines:
${supervisionRequirements}

Your response must be in structured Markdown and include:
1. **Alignment Rating**: How well does it align with his themes (High / Moderate / Low) and which theme is the absolute best fit.
2. **Constructive Technical Suggestions**: Give 2 concrete ideas to elevate their technical depth (e.g. suggesting adding UAV hyperspectral layers, LSTM-CNN frameworks, or rain propagation maps).
3. **Application Roadmap Checklist**: A step-by-step checklist of what documents they need to assemble next to apply successfully under Prof. Owolawi's supervision.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Postgraduate Admissions & Research Mentor Advisor bot at TUT ICT Faculty. Be encouraging, academically rigorous, and constructive.",
        temperature: 0.2
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Student Advisor Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze student proposal" });
  }
});

// Configure Vite middleware or serve static static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production build from dist/...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
