import React, { useEffect, useState } from "react";
import "../styles/InventiveHero.css";

const InventiveHero = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const timer = window.setTimeout(
      () => setIsReady(true),
      reduced ? 0 : 180
    );

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className={`inventivePage ${isReady ? "is-ready" : ""}`}>
      <section className="inventiveFrame">

        {/* =====================================================
            METALLIC SEMI-CIRCLE / CONCENTRIC RING SYSTEM
            Built with CSS so the geometry stays controlled and
            matches the reference instead of filling the screen
            with a generic WebGL texture.
        ====================================================== */}
        <div className="inventiveOrb" aria-hidden="true">
          <div className="metalRing ringOuter">
            <div className="ringHighlight" />
          </div>

          <div className="metalRing ring2">
            <div className="ringHighlight" />
          </div>

          <div className="metalRing ring3">
            <div className="ringHighlight" />
          </div>

          <div className="metalRing ring4">
            <div className="ringHighlight" />
          </div>

          <div className="metalRing ring5">
            <div className="ringHighlight" />
          </div>

          <div className="orbCore">
            <div className="coreGlow" />
          </div>
        </div>

        {/* Deep black gradient keeps the lower half clean */}
        <div className="inventiveVignette" aria-hidden="true" />

        {/* =====================================================
            HEADER
        ====================================================== */}
        <header className="inventiveHeader">
          <div className="scientPill" aria-label="SCIEnT">
            <span className="scientIcon" aria-hidden="true">
              <span className="bulbBody" />
              <span className="bulbBase" />
              <i className="ray ray1" />
              <i className="ray ray2" />
              <i className="ray ray3" />
              <i className="ray ray4" />
              <i className="ray ray5" />
            </span>
            <span className="scientWord">SCIEnT</span>
          </div>

          <button className="menuPill" type="button" aria-label="Open menu">
            <span>menu</span>
            <span className="menuLines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </header>

        {/* camera / device notch */}
        <div className="topNotch" aria-hidden="true">
          <span />
        </div>

        {/* =====================================================
            CONTENT — INTENTIONALLY ABOVE THE METALLIC DESIGN
        ====================================================== */}
        <div className="inventiveContent">

          <div className="titleGlass">
            <h1><strong>INVENTIVE</strong></h1>
          </div>

          <div className="inventiveCopy">
            <p>
              <strong>INVENTIVE</strong> is SCIEnT's groundbreaking initiative,
              designed to fuel the spark of innovation in aspiring minds.
              Whether you’re a dreamer, thinker, or builder, this is your
              chance to bring your ideas to life.
            </p>

            <p>
              This program offers you a unique opportunity to transform your raw
              concepts into impactful solutions, with the support of mentors,
              resources, and a platform to showcase your brilliance.
            </p>
          </div>

          <div className="scrollCue" aria-hidden="true">
            <span className="scrollLine" />
            <span className="scrollText">SCROLL TO EXPLORE</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InventiveHero;