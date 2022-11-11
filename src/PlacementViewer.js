import "./styles.css";
import React, { useState, useEffect } from "react";
import Placement from "./Placement";
import axios from "axios";
import MaleAvatar from "./male1.png";
import FemaleAvatar from "./female.png";
import GroupMale from "./1.png";
import GroupFemale from "./groupFemale.png";
import cheerio from "cheerio";
import GroupImage from "./im.png";
import { Button, Input } from "@material-ui/core";
export default function PlacementViewer() {
  let [placement, setPlacement] = useState("");
  let [input, setInput] = useState("");
  let [gender, setGender] = useState("");
  let [stream, setStream] = useState("");
  let [stores, setStores] = useState([]);
  let [school, setSchool] = useState("");
  let [id, setId] = useState("");
  let [name, setName] = useState("");

  let [check, setCheck] = useState(false);
  let [twins, setTwins] = useState([]);
  let [btnDis, setBtnDis] = useState("SEE MORE 🔽");
  let [checkForTrail, setCheckForTrail] = useState(true);
  let [placed, setPlaced] = useState("");
  function handler(event) {
    setInput(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    Placement.map((place) => {
      if (input === place.id) {
        setPlacement(place.placement);
        setGender(place.gender);
        setStream(place.stream);
        setSchool(place.school);
        setId(place.id);
        setName(place.name);
      }
    });

    //   let studentObject = [];
    //   axios
    //     .get(`https://result.ethernet.edu.et/result?regNo=${input}`)
    //     .then((response) => {
    //       const data = response.data;
    //       const $ = cheerio.load(data);

    //       // console.log($.html().includes('university'))

    //       studentObject = $.html().substring(
    //         $.html().search("university"),
    //         $.html().search("university") + 100
    //       );
    //       // let corrected = {studentObject}
    //       // console.log(studentObject.search('band'))
    //       // console.log(corrected)
    //       const arr = [];

    //       $(".css-xumdn4").each((index, element) => {
    //         arr.push($(element).text());
    //       });
    //       placed = arr[11];
    //       if (input.length === 0) {
    //         setPlaced("");
    //       }
    //       setPlaced(placed);
    //       setName(arr[1]);
    //       setId(arr[3]);
    //       setGender(arr[5]);
    //       setStream(arr[7]);
    //       setSchool(arr[9]);

    //       //name - 65
    //     });
    // }

    // //function to fetch the data
    // const getData1 = () => {
    //   let studentObject = [];
    //   axios
    //     .get(`https://result.ethernet.edu.et/result?regNo=${input}`)
    //     .then((response) => {
    //       const data = response.data;
    //       const $ = cheerio.load(data);

    //       // console.log($.html().includes('university'))

    //       studentObject = $.html().substring(
    //         $.html().search("university"),
    //         $.html().search("university") + 100
    //       );
    //       // let corrected = {studentObject}
    //       // console.log(studentObject.search('band'))
    //       // console.log(corrected)
    //       const arr = [];

    //       $(".css-xumdn4").each((index, element) => {
    //         arr.push($(element).text());
    //       });
    //       placed = arr[11];

    //       //name - 65
    //     });
  }

  useEffect(() => {
    sortPlacement();
  }, []);

  function checkIt() {
    setCheck(!check);
    if (check) {
      setBtnDis("SEE MORE 🔽");
    } else {
      setBtnDis("SEE LESS 🔼");
    }
  }

  let chars = ["A", "B", "A", "C", "B"];

  let uniqueChars = chars.filter((c, index) => {
    return chars.indexOf(c) === index;
  });
  let storing = [];
  console.log(uniqueChars);
  function sortPlacement() {
    Placement.map((x) => {
      for (let i = 526012; i < 526950; i++) {
        //it loops them through each of the student and print the reesult
        if (parseInt(x.id) === i) {
          storing.push(x.placement);
          setStores(storing);
        }
      }
    });
  }

  console.log(stores);
  let removedDuplicate = stores.filter((c, index) => {
    return stores.indexOf(c) === index;
  });
  // let sortTheOccurance = removedDuplicate.filter((i)=>{
  //   if()
  // })\
  // var allTypesArray = ["4", "4","2", "2", "2", "6", "2", "6", "6"];

  //this function sort the university based on the number of student joing at the university
  var s = stores.reduce(function (m, v) {
    m[v] = (m[v] || 0) + 1;
    return m;
  }, {}); // builds {2: 4, 4: 2, 6: 3}
  var a = [];

  for (let k in s) {
    a.push({ k: k, n: s[k] });
  }
  // now we have [{"k":"2","n":4},{"k":"4","n":2},{"k":"6","n":3}]
  a.sort(function (a, b) {
    return b.n - a.n;
  });
  a = a.map(function (a) {
    return a.k;
  });
  console.log(a);

  function findTwins(placement) {
    let filterTwin = Placement.filter((fi) => fi.placement === placement);
    return filterTwin;
  }
  function findTwinsGenderFemale(placement) {
    let filterTwin = Placement.filter((fi) => fi.placement === placement);
    let genderFemaleFilter = filterTwin.filter((fi) => fi.gender === "Female");
    return genderFemaleFilter;
  }
  function findTwinsGenderMale(placement) {
    let filterTwin = Placement.filter((fi) => fi.placement === placement);
    let genderMaleFilter = filterTwin.filter((fi) => fi.gender === "Male");
    return genderMaleFilter;
  }
  function findTwinNatural(placement) {
    let filterTwin = Placement.filter((fi) => fi.placement === placement);
    let streamFilter = filterTwin.filter((fi) => fi.stream === "NS");
    return streamFilter;
  }
  function findTwinSocial(placement) {
    let filterTwin = Placement.filter((fi) => fi.placement === placement);
    let streamFilter = filterTwin.filter((fi) => fi.stream === "SS");
    return streamFilter;
  }

  let count = 0;
  function getLarge() {
    Placement.map((place) => {
      if (place.placement === "ADDIS ABEBA UNIVERSITY") count += 1;
    });
    return `ADDIS ABEBA UNIVERSITY ➖ ${count}`;
  }
  console.log(getLarge());
  function getData() {
    let arr = [];
    Placement.map((x) => {
      if (!arr.includes(x.placement)) {
        arr.push(x.placement);
      }
    });

    return arr;
  }
  console.log(findTwinNatural(placement).length);
  let universities = getData();
  return (
    <div className="App" style={{ paddingTop: 30, margin: 5 }}>
      <h3>
        📊 Welcome Yaberus students, Wish you good luck with your Placement
        Result{" "}
      </h3>
      <h5 style={{ paddingTop: 10, paddingBottom: 12, margin: 5 }}>
        🛑 Enter your registration number:
      </h5>

      <form>
        <Input
          type="number"
          value={input}
          onChange={handler}
          style={{ marginLeft: 18 }}
          style={{ color: "white", fontFamily: "monospace" }}
          placeholder="526515"
        />
        <Button
          disabled={!(input.length === 6)}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleClick}
          style={{ marginLeft: 10 }}
        >
          GO{input.length === 6 ? "🚀" : ""}
        </Button>
      </form>
      {id === input && input ? (
        <div style={{ textAlign: "left" }}>
          {gender === "Male" ? (
            <img src={MaleAvatar} className="genderAvatar" alt="male avatar" />
          ) : (
            <img
              src={FemaleAvatar}
              className="genderAvatar"
              alt="female avatar"
            />
          )}
          <h4 style={{ textAlign: "center", paddingTop: 10, marginTop: 15 }}>
            ℹ️ STUDENT INFO
          </h4>
          <div className="underline" style={{ marginBottom: 15 }}></div>
          <p>👤 Name ➡️ {name}</p>
          <p>👫 Gender ➡️ {gender}</p>
          <p>🏫 School ➡️ YABRUS WOLKITE(R)</p>
          <p>
            🔴 Stream ➡️{" "}
            {stream === "NS"
              ? "Natural Science"
              : stream === "SS"
              ? "Social Science"
              : "Not defined"}
          </p>

          <p>🆔 ID ➡️ {id}</p>

          <h4 style={{ textAlign: "center", paddingTop: 10, marginTop: 15 }}>
            ℹ️ PLACEMENT RESULT
          </h4>
          <div className="underline" style={{ marginBottom: 15 }}></div>
          <p style={{ marginBottom: 7.5, marginTop: 13 }}>
            <hr style={{ marginBottom: 7.5, marginTop: 13 }} />{" "}
            <p style={{ textAlign: "center", paddingTop: 9.1 }}>
              <b>✅🏬 {placement}</b>
            </p>
            <hr style={{ marginBottom: 7.5, marginTop: 10 }} />
          </p>
          <div
            className="btnconfig"
            style={{ marginBottom: 30, marginTop: 20 }}
          >
            <h4
              className="btnforstyle"
              style={{ paddingTop: 10, background: "transparent" }}
            >
              📈 TOTAL ➖ {findTwins(placement).length}{" "}
              {findTwins(placement).length === 1 ? "student" : "students"}
            </h4>
          </div>

          {checkForTrail ? (
            <div style={{ marginBottom: 7.5, marginTop: 13 }}>
              <h3 style={{ textAlign: "center", paddingTop: 10 }}>
                {" "}
                <img
                  src={GroupImage}
                  className="genderAvatar"
                  style={{ maxWidth: 120, paddingBottom: 10, paddingTop: 0 }}
                />
                ℹ️ Campus Twin
              </h3>
              <div className="underline"></div>
              {findTwins(placement).length === 0 ? (
                <h4 style={{ marginBottom: 7.5, marginTop: 13 }}>
                  ✅ You dont have campus twins from YABRUS WOLKITE
                </h4>
              ) : (
                <h4 style={{ marginBottom: 7.5, marginTop: 13 }}>
                  {" "}
                  ✅ You are with {findTwins(placement).length - 1} student/s in{" "}
                  {school}
                </h4>
              )}
              <h4 className="btnforstyle" style={{ paddingTop: 10 }}>
                ➖ FROM NATURAL SCIENCE{" "}
              </h4>
              {findTwinNatural(placement).map((x) => {
                return (
                  <ul>
                    {name !== x.name ? (
                      <p
                        style={{
                          marginBottom: 18.5,
                          marginTop: 13,
                          marginLeft: 20
                        }}
                      >
                        👤 <b> {x.name}</b>
                      </p>
                    ) : (
                      ""
                    )}
                  </ul>
                );
              })}
              <h4 className="btnforstyle" style={{ paddingTop: 10 }}>
                ➖ FROM SOCIAL SCIENCE{" "}
              </h4>
              {findTwinSocial(placement).map((x) => {
                return (
                  <ul>
                    {name !== x.name ? (
                      <p
                        style={{
                          marginBottom: 18.5,
                          marginTop: 13,
                          marginLeft: 20
                        }}
                      >
                        👤 <b> {x.name}</b>
                      </p>
                    ) : (
                      ""
                    )}
                  </ul>
                );
              })}
              <h4 style={{ marginBottom: 12.5, marginTop: 13, fontSize: 17.4 }}>
                {" "}
                <img
                  src={GroupMale}
                  alt="males"
                  className="genderAvatar"
                  style={{ maxWidth: 120, paddingBottom: 7 }}
                />
                ✅ Male Campus Twins (ወንድ ካምፓስ ጓደኛ)
              </h4>
              {findTwinsGenderMale(placement).length === 0 ? (
                <p
                  style={{ marginBottom: 18.5, marginTop: 16, marginLeft: 20 }}
                >
                  You dont have any male campus twins
                </p>
              ) : (
                findTwinsGenderMale(placement).map((x) => {
                  return (
                    <ul>
                      {name !== x.name ? (
                        <p
                          style={{
                            marginBottom: 18.5,
                            marginTop: 16,
                            marginLeft: 20
                          }}
                        >
                          👤 <b> {x.name}</b> from {x.stream}
                        </p>
                      ) : (
                        ""
                      )}
                    </ul>
                  );
                })
              )}

              <h4 style={{ marginBottom: 12.5, marginTop: 13, fontSize: 17.4 }}>
                {" "}
                <img
                  src={GroupFemale}
                  className="genderAvatar"
                  style={{ maxWidth: 120, paddingBottom: 7 }}
                />
                ✅ Female Campus Twins(ሴት ካምፓስ ጓደኛ)
              </h4>
              {findTwinsGenderFemale(placement).length === 0 ? (
                <p
                  style={{ marginBottom: 18.5, marginTop: 16, marginLeft: 20 }}
                >
                  You dont have any female campus twins
                </p>
              ) : (
                findTwinsGenderFemale(placement).map((x) => {
                  return (
                    <ul>
                      {name !== x.name ? (
                        <p
                          style={{
                            marginBottom: 18.5,
                            marginTop: 16,
                            marginLeft: 20
                          }}
                        >
                          👤 <b> {x.name}</b> from {x.stream}
                        </p>
                      ) : (
                        ""
                      )}
                    </ul>
                  );
                })
              )}

              <p style={{ textAlign: "center" }}>👇 </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Button
                  variant="contained"
                  onClick={checkIt}
                  className="btnforstyle"
                  style={{ textAlign: "center" }}
                >
                  <pre>{btnDis}</pre>
                </Button>
              </div>
              {check ? (
                <div>
                  <h4 style={{ marginTop: 15, textAlign: "center" }}>
                    ℹ️ Campus Stats in YABRUS WOLKITE
                  </h4>

                  <p> ✅ Number of student joining in each campus</p>
                  {a.map((x) => {
                    return (
                      <p
                        style={{
                          marginBottom: 18.5,
                          marginTop: 16,
                          marginLeft: 20
                        }}
                      >
                        🏬 {x} ➖ {findTwins(x).length}{" "}
                        {findTwins(x).length === 1 ? "student" : "students"}
                      </p>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              <p style={{ textAlign: "center", paddingTop: 10 }}>
                If you got question , Contact me at my tg account
                <a href="https://t.me/Kinfe123" target="_blank">
                  <Button
                    className="btnforstyle"
                    style={{ marginTop: 7, marginLeft: 7, marginBottom: 9 }}
                  >
                    @Kinfe123
                  </Button>
                </a>
              </p>
            </div>
          ) : (
            <h5 style={{ textAlign: "center", margin: 15 }}>
              ✅ Campus twins is coming soon
            </h5>
          )}
        </div>
      ) : (
        <p style={{ paddingTop: 15 }}>
          Nothing to show or check your reg number
        </p>
      )}
    </div>
  );
}
