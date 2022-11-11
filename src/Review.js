import React, { useState } from "react";
import review from "./review.js";
import "./styles.css";
import {
  FaGithubSquare,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaQuoteRight
} from "react-icons/fa";
const Review = () => {
  const { name, job, image, info } = review[0];

  return (
    <>
      <article className="review">
        <div className="img-container">
          <img src={image} alt={name} className="person-img" />
          <span className="quote-icon">
            <FaQuoteRight /> 🇪🇹
          </span>
        </div>
        <h4
          className="author"
          style={{
            margin: 15,
            color: "black"
          }}
        >
          👨‍💻 {name}
        </h4>
        <div className="underline"></div>
        <p
          className="job"
          style={{ marginBottom: 7.5, marginTop: 13, textAlign: "center" }}
        >
          💼 {job}
        </p>
        <p className="info">{info}</p>
        <div className="btn-container">
          <a
            style={{ textDecoration: "none", background: "transparent" }}
            href="https://github.com/Kinfe123"
            target="_blank"
          >
            <button className="prev-btn">
              <FaGithubSquare />{" "}
            </button>
          </a>

          <a
            style={{ textDecoration: "none", background: "transparent" }}
            href="https://instagram.com/umkinfe"
            target="_blank"
          >
            <button className="prev-btn">
              <FaInstagram />{" "}
            </button>
          </a>
          <a
            style={{ textDecoration: "none", background: "transparent" }}
            href="https://www.linkedin.com/in/kinfe-michael-tariku-1497b3201/"
            target="_blank"
          >
            <button className="prev-btn">
              <FaLinkedinIn />{" "}
            </button>
          </a>
          <a
            style={{ textDecoration: "none", background: "transparent" }}
            href="https://bit.ly/KINFISHTECH"
            target="_blank"
          >
            <button className="prev-btn">
              <FaGlobe />{" "}
            </button>
          </a>
        </div>
      </article>
    </>
  );
};
export default Review;
