import React from 'react';

export default function Home() {
  return (
    <div className="landing-page">
      <div className="content">
        <header className="header">
          <h1>JusticeMet</h1>
          <p className="subtitle">Your AI-Powered Judicial Decision Assistant</p>
        </header>

        <div className="features">
          <div className="feature-card">
            <div className="icon">📊</div>
            <div className="feature-content">
              <h2>Case Analysis</h2>
              <p>Analyze case details with precision and accuracy</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="icon">🔒</div>
            <div className="feature-content">
              <h2>Secure Handling</h2>
              <p>Ensure confidential handling of all judicial data</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="icon">🤖</div>
            <div className="feature-content">
              <h2>AI Integration</h2>
              <p>Leverage AI for interpretable legal predictions</p>
            </div>
          </div>
        </div>

        <button className="cta-button">
          Start Analyzing Cases
        </button>
      </div>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5e6d3 0%, #d2b48c 100%);
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        h1 {
          font-size: 3rem;
          color: #800000;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #4a4a4a;
        }

        .features {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }

        .icon {
          font-size: 2rem;
          background: rgba(128, 0, 0, 0.1);
          padding: 1rem;
          border-radius: 50%;
        }

        .feature-content h2 {
          font-size: 1.25rem;
          color: #800000;
          margin-bottom: 0.5rem;
        }

        .feature-content p {
          color: #666;
          font-size: 1rem;
        }

        .cta-button {
          display: block;
          margin: 0 auto;
          background-color: #800000;
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
          background-color: #600000;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .content {
            padding: 1rem;
          }

          h1 {
            font-size: 2rem;
          }

          .feature-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}