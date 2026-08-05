import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/stocks/news")
      .then((res) => setNews(res.data.news || []))
      .catch(() => setError("Unable to load news right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h3 className="title mb-4">📰 Live Financial News</h3>

      {loading && <p className="iq-muted">Loading news…</p>}
      {error && <p style={{ color: "var(--iq-danger)" }}>{error}</p>}

      <div style={{ display: "grid", gap: "16px" }}>
        {news.map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noreferrer" className="iq-news-item">
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt=""
                style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 10, flexShrink: 0 }}
              />
            )}
            <div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</p>
              <small className="iq-muted">
                {item.publisher}
                {item.publishedAt &&
                  ` · ${new Date(item.publishedAt * 1000).toLocaleDateString()}`}
              </small>
            </div>
          </a>
        ))}
      </div>

      {!loading && !error && news.length === 0 && <p className="iq-muted">No news found right now.</p>}
    </>
  );
};

export default News;
