const axios = require("axios");

exports.handler = async function () {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "movie",
        apiKey: process.env.NEWS_API_KEY,
        language: "en",
        sortBy: "publishedAt",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.articles),
    };
  } catch (error) {
    console.error("News fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};