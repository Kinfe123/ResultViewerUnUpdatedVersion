import Review from "./Review";
import "./result.css";
import React, { useState, useEffect } from "react";
const Extra = () => {
  const [dis, setDis] = useState(false);
  const [disText, setDisText] = useState("ABOUT ME");
  return (
    <>
      <p style={{ paddingTop: 15 }}>
        🆕 we will be releasing a placement result soon
      </p>

      <footer style={{ padding: 10, fontFamily: "monospace" }}>
        <hr />
        <p>
          👨‍💻 DEVELOPED with 💜 by{" "}
          <a href="https://bit.ly/KINFISHTECH" target="_blank">
            KINFE
          </a>
        </p>
        <p>Copyright © {new Date().getFullYear()}</p>

        <button
          style={{ textAlign: "center" }}
          className="random-btn"
          style={{ margin: 10 }}
          onClick={() => {
            setDis(!dis);
          }}
        >
          {dis ? "HIDE ME" : "ABOUT ME"}
        </button>

        {dis ? <Review /> : ""}
      </footer>
    </>
  );
};
export default Extra;
