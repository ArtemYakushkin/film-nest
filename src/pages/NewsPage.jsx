import React, { useEffect } from "react";
import { useNewsStore } from "../store/newsStore";

const NewsPage = () => {
  const { news, loading, error, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) return <p>Загрузка новостей...</p>;
  if (error) return <p>{error}</p>;

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().replace("T", " ").replace("Z", "");
  };

  return (
    <div className="section">
      <div className="container">
        <div className="wrapp">
          <h2 className="subtitle">Latest Movie News</h2>
          <ul className="news-list">
            {news.map((article, index) => (
              <li className="news-item" key={index}>
                <a
                  className="news-link"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="news-source">
                    <p>{formatDateTime(article.publishedAt)}</p>
                    <span>|</span>
                    <p>{article.source.name}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
