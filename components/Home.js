import React from 'react';

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Decorative Elements */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-lines"></div>

      <div className="content">
        <header className="header">
          <div className="logo-container">
            <div className="scales-icon">⚖️</div>
            <h1>JusticeMet</h1>
          </div>
          <p className="subtitle">Your AI-Powered Judicial Decision Assistant</p>
          <div className="header-accent"></div>
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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Raleway:wght@400;500;600&display=swap');

        body {
          margin: 0;
          padding: 0;
          background: #f5f5f5;
        }

        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f4f0 0%, #e6d5c3 100%);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          background: #800000;
          top: -100px;
          right: -100px;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          background: #800000;
          bottom: -50px;
          left: -50px;
        }

        .decorative-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(128, 0, 0, 0.03) 0px,
            rgba(128, 0, 0, 0.03) 1px,
            transparent 1px,
            transparent 30px
          );
        }

        .content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .scales-icon {
          font-size: 2.5rem;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          color: #800000;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          font-family: 'Raleway', sans-serif;
          font-size: 1.25rem;
          color: #4a4a4a;
          margin-top: 1rem;
          font-weight: 500;
        }

        .header-accent {
          width: 100px;
          height: 3px;
          background: #800000;
          margin: 2rem auto;
          position: relative;
        }

        .header-accent::before,
        .header-accent::after {
          content: '';
          position: absolute;
          width: 50px;
          height: 3px;
          background: #800000;
          opacity: 0.5;
        }

        .header-accent::before {
          left: -60px;
        }

        .header-accent::after {
          right: -60px;
        }

        .features {
          display: grid;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(128, 0, 0, 0.1);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
        }

        .icon {
          font-size: 2rem;
          background: rgba(128, 0, 0, 0.1);
          padding: 1rem;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .icon {
          transform: scale(1.1);
        }

        .feature-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #800000;
          margin: 0 0 0.5rem 0;
        }

        .feature-content p {
          font-family: 'Raleway', sans-serif;
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
        }

        .cta-button {
          display: block;
          margin: 0 auto;
          background-color: #800000;
          color: white;
          border: none;
          padding: 1.25rem 2.5rem;
          font-size: 1.25rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 6px rgba(128, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .cta-button:hover {
          background-color: #600000;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(128, 0, 0, 0.3);
        }

        .cta-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(45deg);
          transition: transform 0.3s ease;
        }

        .cta-button:hover::after {
          transform: rotate(45deg) translate(50%, 50%);
        }

        @media (max-width: 768px) {
          .content {
            padding: 1rem;
          }

          h1 {
            font-size: 2.5rem;
          }

          .feature-card {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem;
          }

          .decorative-circle {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}