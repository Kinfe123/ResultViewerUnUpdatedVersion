import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Button.css";
import "./HeroSection.css";
import Typewriter from "typewriter-effect";

function Hero() {
  return (
    <div className="hero-container">
      <h1 style={{ marginTop: 10, marginBottom: 20 }}>
        Hola , G12 Yaberus Students 👋🏿
      </h1>
      <p>
        <Typewriter
          onInit={(typewriter) => {
            typewriter

              .typeString("What are you waiting for?")

              .pauseFor(1000)
              .deleteAll()
              .typeString("Explore your stat and campus!")
              .start();
          }}
        />
      </p>
      <div className="hero-btns">
        <Link to="/result">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--medium"
          >
            📊 EXAM RESULT
          </Button>
        </Link>
        <Link to="/placement">
          <button
            className="btn btn--primary btn--outline btn--medium "
            buttonStyle="btn--outline"
            buttonSize="btn--medium"
          >
            🆕 PLACEMENT RESULT
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
