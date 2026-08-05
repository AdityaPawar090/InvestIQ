const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-2.5-flash";

/**
 * Asks Gemini for a strict-JSON response and parses it safely.
 * Gemini sometimes wraps JSON in markdown code fences, so we strip those
 * before parsing.
 */
const generateJSON = async (prompt) => {
  const result = await ai.models.generateContent({ model: MODEL, contents: prompt });
  const raw = result.text;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

/**
 * Analyzes a user's real holdings (from MongoDB) and returns structured
 * insights: a score, risk level, diversification assessment, best/worst
 * performer, and a short written recommendation.
 */
const getPortfolioInsights = async (holdings) => {
  if (!holdings || holdings.length === 0) {
    return {
      score: null,
      riskLevel: "N/A",
      diversification: "N/A",
      bestStock: "N/A",
      recommendation:
        "You don't have any holdings yet. Add some positions to get AI-powered portfolio insights.",
    };
  }

  const holdingsSummary = holdings
    .map(
      (h) =>
        `${h.name}: qty=${h.qty}, avgCost=${h.avg}, currentPrice=${h.price}`
    )
    .join("\n");

  const prompt = `You are a financial analyst AI. Analyze this stock portfolio and respond
with ONLY valid JSON (no markdown, no commentary) matching this exact shape:
{
  "score": <number 0-100>,
  "riskLevel": "<Low|Medium|High>",
  "diversification": "<Poor|Fair|Good|Excellent>",
  "bestStock": "<symbol of best-performing holding>",
  "recommendation": "<2-3 sentence actionable recommendation, plain language, no financial guarantees>"
}

Portfolio holdings:
${holdingsSummary}`;

  try {
    return await generateJSON(prompt);
  } catch (err) {
    console.error("Gemini portfolio insights error:", err.message);
    throw new Error("AI insights are temporarily unavailable");
  }
};

/**
 * Analyzes a single stock by name/symbol and returns a structured rating.
 */
const analyzeStock = async (stockQuery, quote) => {
  const quoteContext = quote?.success
    ? `Live data: price=${quote.price}, change=${quote.change} (${quote.changePercent}%), previousClose=${quote.previousClose}, marketCap=${quote.marketCap}`
    : "Live price data was unavailable for this query.";

  const prompt = `You are a financial analyst AI. A user wants a quick take on this stock: "${stockQuery}".
${quoteContext}

Respond with ONLY valid JSON (no markdown, no commentary) matching this exact shape:
{
  "symbol": "<best-guess ticker or company name>",
  "rating": "<Strong Buy|Buy|Hold|Sell|Strong Sell>",
  "riskLevel": "<Low|Medium|High>",
  "strengths": ["<short strength 1>", "<short strength 2>", "<short strength 3>"],
  "risks": ["<short risk 1>", "<short risk 2>"],
  "summary": "<2-3 sentence plain-language summary, no financial guarantees, include a brief disclaimer that this is not financial advice>"
}`;

  try {
    return await generateJSON(prompt);
  } catch (err) {
    console.error("Gemini stock analyzer error:", err.message);
    throw new Error("AI analysis is temporarily unavailable");
  }
};

/**
 * Free-form investment chatbot. Keeps the reply grounded by including the
 * user's real holdings and current stock context where available.
 */
const chat = async (message, context) => {
  const prompt = `You are InvestIQ's AI investment assistant, embedded in a stock trading dashboard.
Answer the user's question helpfully and concisely (3-5 sentences max unless they ask for detail).
Always include a brief reminder that you're not a licensed financial advisor when giving
specific buy/sell suggestions. Do not invent stock prices or data you weren't given.

${context ? `Context about the user's portfolio:\n${context}\n` : ""}
User question: ${message}`;

  try {
    const result = await ai.models.generateContent({ model: MODEL, contents: prompt });
    return result.text;
  } catch (err) {
    console.error("Gemini chat error:", err.message);
    throw new Error("AI assistant is temporarily unavailable");
  }
};

module.exports = {
  getPortfolioInsights,
  analyzeStock,
  chat,
};
