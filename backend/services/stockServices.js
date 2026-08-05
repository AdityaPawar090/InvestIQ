const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();

const getStockQuote = async (symbol) => {
  try {
    const quote = await yahooFinance.quote(symbol);

    return {
      success: true,
      symbol: quote.symbol,
      name: quote.shortName,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      currency: quote.currency,
      open: quote.regularMarketOpen,
      high: quote.regularMarketDayHigh,
      low: quote.regularMarketDayLow,
      previousClose: quote.regularMarketPreviousClose,
      volume: quote.regularMarketVolume,
      marketCap: quote.marketCap,
    };
  } catch (err) {
    console.error("Yahoo Error:", err);

    return {
      success: false,
      message: err.message,
    };
  }
};

// Fetches multiple quotes in parallel — used by the Watchlist so we don't
// make N sequential round trips from the frontend.
const getStockQuotesBatch = async (symbols) => {
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const quote = await getStockQuote(symbol);
      return { requestedSymbol: symbol, ...quote };
    })
  );
  return results;
};

// Live financial news via Yahoo Finance's search endpoint, which returns a
// `news` array alongside quote matches for a given query.
const getFinancialNews = async (query = "stock market") => {
  try {
    const results = await yahooFinance.search(query, { newsCount: 12 });

    const news = (results.news || []).map((item) => ({
      title: item.title,
      publisher: item.publisher,
      link: item.link,
      publishedAt: item.providerPublishTime,
      thumbnail: item.thumbnail?.resolutions?.[0]?.url || null,
    }));

    return { success: true, news };
  } catch (err) {
    console.error("Yahoo News Error:", err);
    return { success: false, message: err.message, news: [] };
  }
};

module.exports = {
  getStockQuote,
  getStockQuotesBatch,
  getFinancialNews,
};
