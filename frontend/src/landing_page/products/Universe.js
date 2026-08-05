import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  const roadmap = [
    {
      icon: "🤖",
      title: "AI Portfolio Advisor",
      description: "Receive AI-powered suggestions to improve your portfolio."
    },
    {
      icon: "💬",
      title: "Finance Chatbot",
      description: "Ask investment questions and get intelligent responses."
    },
    {
      icon: "📈",
      title: "Market Trend Analysis",
      description: "Visualize market movements using interactive charts."
    },
    {
      icon: "⭐",
      title: "Smart Watchlist",
      description: "Track favorite stocks with alerts and personal notes."
    },
    {
      icon: "🌙",
      title: "Dark Mode",
      description: "A clean and comfortable experience for every user."
    },
    {
      icon: "☁️",
      title: "Cloud Deployment",
      description: "Deploy securely with scalable cloud infrastructure."
    }
  ];

  return (
    <section className="container py-5">

      <div className="text-center mb-5">

        <span className="badge bg-primary px-3 py-2 mb-3">
          🚀 Future Roadmap
        </span>

        <h2 className="fw-bold mb-3">
          What's Coming Next in InvestIQ
        </h2>

        <p className="text-muted fs-5">
          InvestIQ is continuously evolving with modern AI features,
          analytics, and an improved user experience.
        </p>

      </div>

      <div className="row g-4">

        {roadmap.map((item, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">

                <div style={{ fontSize: "40px" }}>
                  {item.icon}
                </div>

                <h4 className="mt-3 fw-bold">
                  {item.title}
                </h4>

                <p className="text-muted">
                  {item.description}
                </p>

              </div>
            </div>
          </div>
        ))}

      </div>

      <div className="text-center mt-5">

        <h4 className="fw-bold mb-3">
          Ready to experience InvestIQ?
        </h4>

        <p className="text-muted mb-4">
          Join today and explore a smarter way to manage your investments.
        </p>

        <Link
          to="/signup"
          className="btn btn-primary btn-lg rounded-pill px-5"
        >
          Create Free Account
        </Link>

      </div>

    </section>
  );
}

export default Universe;