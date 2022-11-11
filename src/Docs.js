import "./styles.css";
import { Link } from "react-router-dom";
import Button from "./Button";
const Docs = () => {
  return (
    <>
      <h4 style={{ margin: 10, paddingTop: 20 }}>Yaberus student result API</h4>
      <div className="underline"></div>
      <p style={{ margin: 10, paddingTop: 20 }}>
        This is the simplest Docs for yaberus student result API for developers
        to use and to develop app on top of it.{" "}
      </p>
      <button
        className="btn btn--primary btn--outline btn--medium"
        style={{ margin: 10, width: 200 }}
        onClick={() => {
          window.location = "https://yaberus-api.herokuapp.com";
        }}
      >
        CHECK THE API
      </button>
      <h4 style={{ margin: 10, paddingTop: 20 }}>List of the command</h4>
      <div className="underline"></div>

      <p style={{ margin: 10, paddingTop: 20 }}>
        After clicking the check the api button{" "}
      </p>
      <ul
        style={{
          margin: 10,
          paddingTop: 20,
          textAlign: "left",
          marginLeft: 48
        }}
      >
        <li>➖ /results - to get all the student result</li>
        <li>➖ /results/id_num - to get specific result</li>
      </ul>
      <p style={{ margin: 10, paddingTop: 20 }}>
        <b>Note that</b>: id_num must be in the range between 526012 - 526955
      </p>
    </>
  );
};
export default Docs;
