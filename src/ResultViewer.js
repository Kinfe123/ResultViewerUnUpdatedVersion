import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import Result from "./Result";
import "./result.css";
import "./styles.css";
import jsPDF from "jspdf";
import MaleAvatar from "./male1.png";
import FemaleAvatar from "./female.png";
import "jspdf-autotable";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import Extra from "./Extra";

const ResultViewer = () => {
  let [input, setInput] = useState("");

  let [total, setTotal] = useState();
  let [math, setMath] = useState();
  let [chem, setChem] = useState();
  let [eng, setEng] = useState();
  let [stream, setStream] = useState("");
  let [civic, setCivic] = useState();
  let [bio, setBio] = useState();
  let [apt, setApt] = useState();
  let [phy, setPhy] = useState();
  let [name, setName] = useState("");
  let [school, setSchool] = useState("");
  let [gender, setGender] = useState("");
  let [id, setId] = useState("");
  let [his, setHis] = useState("");
  let [geo, setGeo] = useState("");
  let [eco, setEco] = useState("");
  let [ssCount, setSsCount] = useState(0);
  let [passNs, setPassNs] = useState(0);
  let stateNs = false;
  let stateSc = false;
  let [nsPassCounterMale, setNsPassCounterMale] = useState(0);
  let [nsPassCounterFemale, setNsPassCounterFemale] = useState(0);
  let [ssPassCounterMale, setSsPassCounterMale] = useState(0);
  let [ssPassCounterFemale, setSsPassCounterFemale] = useState(0);
  let [nsCounter, setNsCounter] = useState(0);
  let [ssCounter, setSsCounter] = useState(0);
  let [maleNsCounter, setMaleNsCounter] = useState(0);
  let [check, setCheck] = useState(stateNs);
  let [checkForSocial, setCheckForSocial] = useState(stateSc);
  let [passChecker, setPassChecker] = useState([]);
  let [top, setTop] = useState([]);
  let [rankResult, setRankResult] = useState("");
  let [tops, setTops] = useState([]);
  let [topFemale, setTopFemale] = useState([]);
  let [topFemaleSs, setTopFemaleSs] = useState([]);
  let [passCheckerFemale, setPassCheckerFemale] = useState([]);
  let [btnDis, setBtnDis] = useState("SEE MORE 🔽");
  let [btnDisSocial, setBtnDisSocial] = useState("SEE MORE 🔽");

  let [rank, setRank] = useState(0);
  let [remarkNs, setRemarkNs] = useState("");
  let [nsRank, setNsRank] = useState([]);
  let [ssRank, setSsRank] = useState([]);
  let [result, setResult] = useState("");
  // let [result , setResult] = useState({})

  // const calc = () => {
  //   if (stream === "NS") {
  //     let totalValue = math + chem + bio + civic + eng + apt + phy;

  //     setTotal(totalValue);
  //   }
  //   if (stream === "SS") {
  //     let totalValue = math + his + eco + civic + eng + apt + geo;

  //     setTotal(totalValue);
  //   }
  // };
  // useEffect(() => {
  //   calc();
  // }, [input, id]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const col = ["SUBJECTS", "MARKS"];

    const rows = [];
    let checkNs = true;
    const rows1 = [];
    const rowSs = [];
    const col1 = ["STUDENT INFO", "DESCRIPTION"];

    let nsStudentInfo = [];
    let ssStudentInfo = [];

    let stdInfo = [];
    let ssStdInfo = [];

    Result.map((result) => {
      if (result.id === input) {
        if (result.stream === "NS") {
          let stdData = {
            math: result.math,
            chem: result.chem,
            bio: result.bio,
            civics: result.civics,
            eng: result.eng,
            phy: result.phy,
            apt: result.apt,
            pass: passDetecionNs(
              result.gender,
              parseInt(result.total - result.civics)
            ),
            remark: distEvalForNs(parseInt(result.total - result.civics)),
            rank: getRank(parseInt(result.total - result.civics)) + 1,
            gap: "",
            total: result.total,
            nocivics: result.total - result.civics
          };
          nsStudentInfo = [stdData];
          // setResultList([{
          //   math:result.math ,chem:result.chem, bio:result.bio , civics:result.civics, eng:result.eng , phy:result.phy , apt:result.apt, gap:"", total:result.total , nocivics:(result.total-result.civics)
          // }])

          checkNs = true;
        } else if (result.stream === "SS") {
          let data = {
            math: result.math,
            his: result.his,
            geo: result.geo,
            civics: result.civics,
            eng: result.eng,
            apt: result.apt,
            pass: passDetecionSs(
              result.gender,
              parseInt(result.total - result.civics)
            ),
            remark: distEvalSs(parseInt(result.total - result.civics)),
            rank: getRankSs(parseInt(result.total - result.civics)) + 1,
            gap: "",
            total: result.total,
            nocivics: result.total - result.civics
          };
          ssStudentInfo = [data];
          checkNs = false;
        }

        // setStudentInfoList([

        // ]);
        let data = {
          name: result.name,
          school: result.school,
          gender: result.gender,
          stream: result.stream,
          id: result.id
        };
        stdInfo = [data];
      }
    });

    stdInfo.map((element) => {
      var name = ["Name", element.name];
      var school = ["School", element.school];
      var gender = ["Gender", element.gender];
      var stream = ["Stream", element.stream];
      var id = ["ID", element.id];

      var studentInfos = [name, school, gender, stream, id];
      for (let i = 0; i < studentInfos.length; i++) {
        rows1.push(studentInfos[i]);
      }
    });

    if (checkNs) {
      nsStudentInfo.map((element) => {
        var math = ["Math", element.math];
        var bio = ["Biology", element.bio];
        var chem = ["Chemistry", element.chem];
        var civics = ["Civics", element.civics];
        var eng = ["English", element.eng];

        var apt = ["SAT", element.apt];
        var phy = ["Physics", element.phy];
        var pass = ["STATUS", element.pass];
        var remark = ["REMARK", element.remark];
        var rank = ["RANK", `${element.rank} from Natural Science`];
        var gap = ["", element.gap];
        var total = ["TOTAL", element.total];
        var totalNoCivics = ["TOTAL(NO CIVICS)", element.nocivics];
        let resultArray = [
          math,
          bio,
          chem,
          civics,
          apt,
          phy,
          eng,
          gap,
          pass,
          remark,
          rank,

          total,
          totalNoCivics
        ];
        for (let i = 0; i < resultArray.length; i++) {
          rows.push(resultArray[i]);
        }
      });
    } else {
      ssStudentInfo.map((element) => {
        var math = ["Math", element.math];
        var geo = ["Geography", element.geo];
        var his = ["History", element.his];
        var civics = ["Civics", element.civics];
        var eng = ["English", element.eng];

        var apt = ["SAT", element.apt];
        var pass = ["STATUS", element.pass];
        var remark = ["REMARK", element.remark];
        var rank = ["RANK", `${element.rank} from Social Science`];
        var gap = ["", element.gap];
        var total = ["TOTAL", element.total];
        var totalNoCivics = ["TOTAL(NO CIVICS)", element.nocivics];
        let resultArray = [
          math,
          geo,
          his,
          civics,
          apt,
          eng,
          gap,
          pass,
          remark,
          rank,

          total,
          totalNoCivics
        ];
        for (let i = 0; i < resultArray.length; i++) {
          rowSs.push(resultArray[i]);
        }
      });
    }

    doc.autoTable(col1, rows1, { startY: 10 });

    Result.map((result) => {
      if (result.id === input) {
        if (result.stream === "NS") {
          doc.autoTable(col, rows, { startY: 75 });
        } else {
          doc.autoTable(col, rowSs, { startY: 75 });
        }
        doc.setFontSize(10);
        doc.text("KINFISH(KINFE)", 167, 8);
        doc.save(`${result.name}- ${result.id}.pdf`);
      }
    });
  };
  const nsCount = () => {
    let index = 0;
    Result.map((res) => {
      if (res.stream === "NS") {
        index++;
      }
    });
    setNsCounter(index);
  };
  const ssCounted = () => {
    let index = 0;
    Result.map((res) => {
      if (res.stream === "SS") {
        index++;
      }
    });
    setSsCounter(index);
  };
  let filtering = Result.filter((fi) => fi.stream === "SS");

  let topTenSocial = filtering.filter(
    (f) => parseInt(f.total) - parseInt(f.civics) > 320
  );

  const topTens = () => {
    let topArr = [];
    topTenSocial.map((res) => {
      if (res.stream === "SS") {
        if (
          parseInt(res.total - res.civics) >= 324 &&
          parseInt(res.total) >= 413
        ) {
          topArr.push(parseInt(res.total - res.civics));
        }
      }
    });

    topArr.sort((a, b) => b - a);
    topTenSocial.map((res) => {
      let index = 0;
      let newTopArr = [];
      for (let i = 0; i < 11; i++) {
        if (parseInt(res.total - res.civics) === topArr[i]) {
          newTopArr.push(res.name);
          topArr[i] = newTopArr[index];
          i++;
        }
      }
    });

    setTops(topArr);
  };
  let filteringN = Result.filter((fi) => fi.stream === "NS");

  let topTenNatural = filteringN.filter(
    (f) => parseInt(f.total) - parseInt(f.civics) >= 470
  );

  const topTen = () => {
    let topArr = [];
    topTenNatural.map((res) => {
      if (res.stream === "NS") {
        if (parseInt(res.total - res.civics) >= 470) {
          topArr.push(parseInt(res.total - res.civics));
        }
      }
    });

    topArr.sort((a, b) => b - a);
    topTenNatural.map((res) => {
      let index = 0;
      let newTopArr = [];
      for (let i = 0; i < 10; i++) {
        if (parseInt(res.total - res.civics) === topArr[i]) {
          newTopArr.push(res.name);
          topArr[i] = newTopArr[index];
          i++;
        }
      }
    });
    setTop(topArr);
  };

  //Pass and Fail

  const passNsCheck = () => {
    let topArr = [];
    let topArrFemale = [];
    Result.map((res) => {
      if (res.stream === "NS" && res.gender === "Male") {
        if (parseInt(res.total - res.civics) >= 363) {
          topArr.push(parseInt(res.total));
        }
      } else if (res.stream === "NS" && res.gender === "Female") {
        if (parseInt(res.total - res.civics) >= 351) {
          topArrFemale.push(parseInt(res.total));
        }
      }
    });

    topArr.sort((a, b) => b - a);
    topArrFemale.sort((a, b) => b - a);

    Result.map((res) => {
      let index = 0;
      let newTopArr = [];
      let newTopArrFemale = [];
      for (let i = 0; i < 400; i++) {
        if (parseInt(res.total) === topArr[i] && res.gender === "Male") {
          newTopArr.push(res.name);
          topArr[i] = newTopArr[index];

          i++;
        } else if (
          parseInt(res.total) === topArrFemale[i] &&
          res.gender === "Female"
        ) {
          newTopArrFemale.push(res.name);
          topArrFemale[i] = newTopArrFemale[index];
          i++;
        }
      }
    });

    setPassChecker(topArr);
    setPassCheckerFemale(topArrFemale);
  };

  //end
  const passSsCheck = () => {
    let topArr = [];
    let topArrFemale = [];
    Result.map((res) => {
      if (res.stream === "SS" && res.gender === "Male") {
        if (parseInt(res.total - res.civics) >= 264) {
          topArr.push(parseInt(res.total));
        }
      } else if (res.stream === "SS" && res.gender === "Female") {
        if (parseInt(res.total - res.civics) >= 254) {
          topArrFemale.push(parseInt(res.total));
        }
      }
    });

    topArr.sort((a, b) => b - a);
    topArrFemale.sort((a, b) => b - a);
    Result.map((res) => {
      let index = 0;
      let newTopArr = [];
      let newTopArrFemale = [];
      for (let i = 0; i < 600; i++) {
        if (parseInt(res.total) === topArr[i] && res.gender === "Male") {
          newTopArr.push(res.name);
          topArr[i] = newTopArr[index];
          i++;
        } else if (
          parseInt(res.total) === topArrFemale[i] &&
          res.gender === "Female"
        ) {
          newTopArrFemale.push(res.name);
          topArrFemale[i] = newTopArrFemale[index];
          i++;
        }
      }
    });
    setSsPassCounterMale(topArr);
    setSsPassCounterFemale(topArrFemale);
  };

  const topTenFemale = () => {
    let topArr = [];
    Result.map((res) => {
      if (res.stream === "NS") {
        if (
          res.gender === "Female" &&
          parseInt(res.total - res.civics) >= 434
        ) {
          topArr.push(parseInt(res.total - res.civics));
        }
      }
    });

    topArr.sort((a, b) => b - a);

    Result.map((res) => {
      let index = 0;
      let newTopArr = [];
      for (let i = 0; i <= 19; i++) {
        if (
          parseInt(res.total - res.civics) === topArr[i] &&
          res.gender === "Female"
        ) {
          newTopArr.push(res.name);
          topArr[i] = newTopArr[index];
          i++;
        }
      }
    });
    setTopFemale(topArr);
  };

  //ranking soln

  const topTenFemaleSs = () => {
    let topArr = [];
    Result.map((res) => {
      if (res.stream === "SS") {
        if (
          res.gender === "Female" &&
          parseInt(res.total - res.civics) >= 310
        ) {
          topArr.push(parseInt(res.total - res.civics));
        }
      }
    });

    topArr.sort((a, b) => b - a);

    Result.map((res) => {
      let index = 0;
      let newTopArr = [];
      for (let i = 0; i <= 14; i++) {
        if (
          parseInt(res.total - res.civics) === topArr[i] &&
          res.gender === "Female"
        ) {
          newTopArr.push(res.name);
          topArr[i] = newTopArr[index];
          i++;
        }
      }
    });
    setTopFemaleSs(topArr);
  };

  // const nsFemaleCounter = () => {
  //   let femaleCounter = 0;
  //   let femaleNumberPass = 0;

  //     Result.map((res)=>{

  //       if(res.stream === "NS"){
  //         if(res.gender === "Female"){
  //           femaleCounter++

  //         }
  //       }
  //     })

  //   setNsFemaleCount(femaleCounter)
  // }
  function findScoreTwins(total) {
    let filtered = Result.filter((fil) => fil.total === total);
    return filtered.filter((fil) => fil.stream === "NS");
  }
  function findScoreTwinsSocial(total) {
    let filtered = Result.filter((fil) => fil.total === total);
    return filtered.filter((fil) => fil.stream === "SS");
  }

  function checkItForSocial() {
    setCheckForSocial(!checkForSocial);
    if (checkForSocial) {
      setBtnDisSocial("SEE MORE 🔽");
    } else {
      setBtnDisSocial("SEE LESS 🔼");
    }
  }

  // const getResult = (id) => {
  //   Result.map((res)=>{
  //     if(res.id === id){
  //       setResult(res.total - res.civics)
  //     }
  //   })
  // }
  useEffect(() => {
    topTen();
    topTens();
    topTenFemale();
    topTenFemaleSs();
    passNsCheck();
    nsCount();
    passSsCheck();
    ssCounted();
    distEvalForNs();
    distEvalSs();
  }, []);

  const handler = (event) => {
    setInput(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
    Result.map((res) => {
      if (input === res.id) {
        if (res.stream == "NS") {
          setName(res.name);

          setId(res.id);
          setSchool(res.school);
          setGender(res.gender);
          setMath(res.math);
          setBio(res.bio);
          setChem(res.chem);
          setEng(res.eng);
          setStream(res.stream);
          setApt(res.apt);
          setCivic(res.civics);
          setPhy(res.phy);
          setTotal(res.total);

          // let totalValue = math + chem + bio + civic + eng + apt + phy;
          // res.total = totalValue;
          // setTotal(totalValue);
        }
        if (res.stream === "SS") {
          setName(res.name);
          setId(res.id);
          setSchool(res.school);
          setGender(res.gender);
          setMath(res.math);
          setGeo(res.geo);
          setEco(res.eco);
          setEng(res.eng);
          setStream(res.stream);
          setApt(res.apt);
          setCivic(res.civics);
          setHis(res.his);

          setTotal(res.total);
        }
      }
    });
  };
  //   function getUnique(array){
  //     var uniqueArray = [];

  //     // Loop through array values
  //     for(let i=0; i < array.length; i++){
  //         if(uniqueArray.indexOf(array[i]) === -1) {
  //             uniqueArray.push(array[i]);
  //         }
  //     }
  //     return uniqueArray;
  // }
  //On maintaince on rank

  let filteringRank = Result.filter((fi) => fi.stream === "NS");

  let rankNatural = filteringRank
    .filter((f) => parseInt(f.total) - parseInt(f.civics) > 0)
    .sort((a, b) => b.total - a.total);
  // console.log(rankNatural);
  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  const getRank = (total) => {
    let arr = [];
    rankNatural.map((res) => {
      if (parseInt(res.total - res.civics) >= 0) {
        arr.push(parseInt(res.total - res.civics));
      }
    });
    arr.sort((a, b) => b - a);
    console.log(arr);
    return arr.indexOf(total);
  };
  let filteringS = Result.filter((fi) => fi.stream === "SS");

  let rankSocial = filteringS
    .filter((f) => parseInt(f.total) - parseInt(f.civics) > 0)
    .sort((a, b) => b.total - a.total);
  const getRankSs = (total) => {
    let arr = [];
    rankSocial.map((res) => {
      if (parseInt(res.total - res.civics) >= 0) {
        arr.push(parseInt(res.total - res.civics));
      }
    });
    arr.sort((a, b) => b - a);
    console.log(arr);
    return arr.indexOf(total);
  };

  // //Ranking Social
  // const checkRank = (total) => {
  //   let arr = []
  //   Result.map((res )=>{
  //     if(res.stream === "NS"){
  //       arr.push(parseInt(res.total))
  //     }

  //   })
  //   arr.sort((a , b)=> b - a)

  // }

  function checkIt() {
    setCheck(!check);
    if (check) {
      setBtnDis("SEE MORE 🔽");
    } else {
      setBtnDis("SEE LESS 🔼");
    }
  } //Unsolved issue for collapsable
  function distEvalForNs(totalMark) {
    if (totalMark >= 470) {
      return "First class with very distinction";
    } else if (totalMark < 470 && totalMark >= 430) {
      return "First class with distinction";
    } else if (totalMark < 430 && totalMark >= 400) {
      return "First class";
    } else if (totalMark < 400 && totalMark >= 380) {
      return "Second class";
    } else if (totalMark < 380 && totalMark >= 363) {
      return "Lower class";
    } else if (totalMark < 363) {
      return "Lowest class";
    }
  }

  function distEvalSs(totalMark) {
    if (totalMark >= 336) {
      return "First class with very distinction";
    } else if (totalMark < 336 && totalMark >= 316) {
      return "First class with very distinction";
    } else if (totalMark < 316 && totalMark >= 300) {
      return "First class";
    } else if (totalMark < 300 && totalMark >= 280) {
      return "Second class";
    } else if (totalMark < 280 && totalMark >= 264) {
      return "Lower class";
    } else if (totalMark < 264) {
      return "Lowest class";
    }
  }
  function passDetecionNs(gender, total) {
    if (gender === "Male") {
      if (total >= 363) {
        return "PASS ✅";
      } else {
        return "FAIL ⛔";
      }
    } else if (gender === "Female") {
      if (total >= 361) {
        return "PASS ✅ ";
      } else {
        return "FAIL ⛔";
      }
    }
  }
  function passDetecionSs(gender, total) {
    if (gender === "Male") {
      if (total >= 264) {
        return "PASS ✅";
      } else {
        return "FAIL ⛔";
      }
    } else if (gender === "Female") {
      if (total >= 254) {
        return "PASS ✅ ";
      } else {
        return "FAIL ⛔";
      }
    }
  }

  return (
    <div style={{ paddingTop: 30, margin: 5 }}>
      <h3>📊 Welcome Yaberus students, Wish you good luck with your result </h3>
      <h5 style={{ paddingTop: 10 }}>🛑 Enter your registration number:</h5>
      <form>
        <Input
          type="number"
          value={input}
          onChange={handler}
          placeholder="526515"
          style={{
            marginRight: 10,
            paddingTop: 27,
            color: "white",
            fontFamily: "monospace"
          }}
        />
        <Button
          disabled={!(input.length === 6)}
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleClick}
        >
          GO{input.length === 6 ? "🚀" : ""}
        </Button>
      </form>
      {id === input && input ? (
        <div style={{ textAlign: "left" }}>
          {stream === "NS" ? (
            <div>
              {gender === "Male" ? (
                <img
                  src={MaleAvatar}
                  className="genderAvatar"
                  alt="male avatar"
                />
              ) : (
                <img
                  src={FemaleAvatar}
                  className="genderAvatar"
                  alt="female avatar"
                />
              )}
              <h4
                style={{ textAlign: "center", paddingTop: 10, marginTop: 15 }}
              >
                ℹ️ STUDENT INFO
              </h4>
              <div className="underline" style={{ marginBottom: 15 }}></div>
              <p>👤 Name ➡️ {name}</p>
              <p>👫 Gender ➡️ {gender}</p>
              <p>🏫 School ➡️ {school}</p>
              <p>
                🔴 Stream ➡️{" "}
                {stream === "NS"
                  ? "Natural Science"
                  : stream === "SS"
                  ? "Social Science"
                  : "Not defined"}
              </p>

              <p>🆔 ID ➡️ {id}</p>
              <h4 style={{ textAlign: "center", paddingTop: 10 }}>
                📊 STUDENT RESULT{" "}
              </h4>
              <div className="underline" style={{ marginBottom: 15 }}></div>
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                🧮 Math ➡️ {math}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                🧪 Chemistry ➡️ {chem}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                🧬 Biology ➡️ {bio}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                📝 English ➡️ {eng}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                🪐 Physics ➡️ {phy}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                📚 Civics ➡️ {civic}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                📋 SAT ➡️ {apt}
              </p>
              <hr />
              <br />
              <h4
                style={{ textAlign: "center", paddingTop: 10, marginBottom: 4 }}
              >
                {" "}
                ℹ️ DETAIL INFO
              </h4>
              <div className="underline"></div>
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Total(700)</b> ➡️ {total}
              </p>
              <hr />

              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Total(No Civics)</b> ➡️ {total - civic}
              </p>
              <hr />

              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Avarage(100%)</b> ➡️ {total / 7}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Status</b> ➡️ {passDetecionNs(gender, total - civic)}
              </p>
              <hr />
              {/* {gender === "M"
                  ? total - civic >= 363
                    ? "Pass ✅ "
                    : "Fail ⛔"
                  : total - civic >= 351
                  ? "Pass ✅"
                  : "Fail ⛔"}
              </p> */}

              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Remark ➡️</b> {distEvalForNs(total - civic)}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Rank </b> ➡️{" "}
                {getRank(total - civic) + 1 === 1
                  ? `${getRank(total - civic) + 1} from Natural
                Science 🥇`
                  : getRank(total - civic) + 1 === 2
                  ? `${getRank(total - civic) + 1} from Natural Science 🥈`
                  : getRank(total - civic) + 1 === 3
                  ? `${getRank(total - civic) + 1} from Natural Science 🥉 `
                  : `${getRank(total - civic) + 1} from Natural Science`}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>
                  <i>
                    Note that: If you get your rank a little bit down , It is
                    because there were couple or more guys having the same
                    result more than you.{" "}
                  </i>
                </b>
              </p>

              <div
                className="btnconfig"
                style={{ marginBottom: 30, marginTop: 13 }}
              >
                <Button
                  style={{ textAlign: "center", marginRight: 14 }}
                  variant="contained"
                  onClick={downloadPDF}
                  className="btnforstyle"
                >
                  <PrintRoundedIcon /> <pre> Print </pre>
                </Button>
                <Button
                  style={{ textAlign: "center" }}
                  variant="contained"
                  onClick={checkIt}
                  className="btnforstyle"
                >
                  <pre> {btnDis} </pre>
                </Button>
              </div>

              {check ? (
                <div style={{ marginBottom: 7.5, marginTop: 13 }}>
                  <h3 style={{ textAlign: "center", paddingTop: 10 }}>
                    {" "}
                    ℹ️ Natural Science Info
                  </h3>
                  <div className="underline"></div>
                  <h4>✅ Score Twins</h4>
                  {findScoreTwins(total).length === 1 ? (
                    <p>➖ You dont have score twins from {school}</p>
                  ) : (
                    <p>
                      ➖ You scored the same result with{" "}
                      {findScoreTwins(total).length - 1} student(s) in {school}
                    </p>
                  )}
                  {findScoreTwins(total).map((x) => {
                    return (
                      <ul>
                        {name !== x.name ? (
                          <p>
                            👤 <b> {x.name}</b> from {x.stream}
                          </p>
                        ) : (
                          ""
                        )}
                      </ul>
                    );
                  })}

                  <h4 style={{ marginBottom: 7.5, marginTop: 13 }}>
                    {" "}
                    ✅ Top 10 Students from Natural Science by Rank
                  </h4>

                  {top.map((x) => {
                    let i = 1;
                    let score = 0;
                    let id = 0;
                    let scoreTotal = 0;
                    Result.map((res) => {
                      if (res.name === x) {
                        score = parseInt(res.total - res.civics);
                        id = parseInt(res.id);
                        scoreTotal = parseInt(res.total);
                      }
                    });

                    return (
                      <ul>
                        <p
                          key={name}
                          style={{ marginBottom: 7.5, marginTop: 13 }}
                        >
                          👤 {x} <br />
                          <pre
                            style={{
                              paddingLeft: 50,
                              marginBottom: 7.5,
                              marginTop: 13
                            }}
                          >
                            🆔 ID ➖ {id}{" "}
                          </pre>
                          <pre style={{ paddingLeft: 50 }}>
                            📊 Total ➖ {score}/600 <b>or</b> {scoreTotal}/700
                          </pre>
                        </p>

                        {/* {console.log("The mark : ", getMark(top, x))} */}
                      </ul>
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              {check ? (
                <div style={{ marginBottom: 7.5, marginTop: 13 }}>
                  <h4>
                    {" "}
                    ✅ ♀ Top 15 Female Student from Natural Science by Rank
                  </h4>
                  {topFemale.map((x) => {
                    let score = 0;
                    let id = 0;
                    let scoreTotal = 0;
                    Result.map((res) => {
                      if (res.name === x) {
                        score = parseInt(res.total - res.civics);
                        id = parseInt(res.id);
                        scoreTotal = parseInt(res.total);
                      }
                    });
                    let i = 1;
                    return (
                      <ul>
                        <p key={name}>
                          👤 {x} <br />
                          <pre
                            style={{
                              paddingLeft: 50,
                              marginBottom: 7.5,
                              marginTop: 13
                            }}
                          >
                            🆔 ID ➖ {id}{" "}
                          </pre>
                          <pre style={{ paddingLeft: 50 }}>
                            📊 Total ➖ {score}/600 <b>or</b> {scoreTotal}/700
                          </pre>
                        </p>
                      </ul>
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              <h4>✅ Pass and Fail Stats For Natural Science</h4>
              <p>
                ➖ Natural Science Students that passed the exam➡️{" "}
                {passChecker.length + passCheckerFemale.length} out of{" "}
                {nsCounter}
              </p>
              <p>- Male Passed ➡️{passChecker.length}</p>

              <p>- Female Passed ➡️ {passCheckerFemale.length}</p>
              <p>
                ➖ Natural Science Percentage Pass(From Natural) ➡️{" "}
                {Math.floor(
                  ((passChecker.length + passCheckerFemale.length) /
                    nsCounter) *
                    100
                )}
                %
              </p>

              <p>
                ➖ Natural Science Percentage Pass(From All students) ➡️{" "}
                {Math.floor(
                  ((passChecker.length + passCheckerFemale.length) /
                    (ssCounter + nsCounter)) *
                    100
                )}
                %
              </p>

              <p style={{ textAlign: "center" }}>
                🔰 Without being said , Yaberus Wolkite was able to pass about{" "}
                <b>
                  53%(
                  {passCheckerFemale.length +
                    passChecker.length +
                    ssPassCounterFemale.length +
                    ssPassCounterMale.length}
                  )
                </b>{" "}
                of the of grade 12 Students.{" "}
              </p>
            </div>
          ) : (
            <div>
              {gender === "Male" ? (
                <img
                  src={MaleAvatar}
                  className="genderAvatar"
                  alt="male avatar"
                />
              ) : (
                <img
                  src={FemaleAvatar}
                  className="genderAvatar"
                  alt="female avatar"
                />
              )}
              <h4
                style={{
                  textAlign: "center",
                  paddingTop: 10,
                  marginBottom: 7.5,
                  marginTop: 13
                }}
              >
                ℹ️ STUDENT INFO
              </h4>
              <div
                className="underline"
                style={{ marginBottom: 7.5, marginTop: 13 }}
              ></div>
              <p>👤 Name ➡️ {name}</p>
              <p>👫 Gender ➡️ {gender}</p>
              <p>🏫 School ➡️ {school}</p>
              <p>
                🔴 Stream ➡️{" "}
                {stream === "NS"
                  ? "Natural Science"
                  : stream === "SS"
                  ? "Social Science"
                  : "Not defined"}
              </p>

              <p>🆔 ID ➡️ {id}</p>
              <h4
                style={{
                  textAlign: "center",
                  paddingTop: 10,
                  marginBottom: 7.5,
                  marginTop: 13
                }}
              >
                📊 STUDENT RESULT{" "}
              </h4>
              <div
                className="underline"
                style={{ marginBottom: 7.5, marginTop: 13 }}
              ></div>
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                🧮 Math ➡️ {math}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                📜 History ➡️ {his}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                🏔️ Geography ➡️ {geo}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                📝 English ➡️ {eng}
              </p>
              <hr />

              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                📚 Civics ➡️ {civic}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                📋 SAT ➡️ {apt}
              </p>
              <hr />
              <br />
              <h4 style={{ textAlign: "center", paddingTop: 10 }}>
                ℹ️ FURTHER INFO
              </h4>
              <div className="underline"></div>
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Total(600)</b> ➡️ {total}
              </p>
              <hr />

              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Total(No Civics)</b> ➡️ {total - civic}
              </p>
              <hr />

              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Avarage(100%)</b> ➡️ {total / 6}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Status ➡️ </b> {passDetecionSs(gender, total - civic)}
                {/* {gender === "M"
                  ? total - civic >= 264
                    ? "Pass ✅"
                    : "Fail ⛔"
                  : total - civic >= 254
                  ? "Pass ✅ "
                  : "Fail ⛔"} */}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Remark</b> ➡️ {distEvalSs(total - civic)}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>➖ Rank </b> ➡️{" "}
                {getRankSs(total - civic) + 1 === 1
                  ? `${getRankSs(total - civic) + 1} from Social
                Science 🥇`
                  : getRankSs(total - civic) + 1 === 2
                  ? `${getRankSs(total - civic) + 1} from Social Science 🥈`
                  : getRankSs(total - civic) + 1 === 3
                  ? `${getRankSs(total - civic) + 1} from Social Science 🥉 `
                  : `${getRankSs(total - civic) + 1} from Social Science`}
              </p>
              <hr />
              <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                <b>
                  <i>
                    Note that: If you get your rank a little bit down , It is
                    because there were couple or more guys having the same
                    result more than you.{" "}
                  </i>
                </b>
              </p>
              <div
                className="btnconfig"
                style={{ marginBottom: 30, marginTop: 13 }}
              >
                <Button
                  className="btnforstyle"
                  style={{ textAlign: "center", marginRight: 14 }}
                  variant="contained"
                  onClick={downloadPDF}
                >
                  <PrintRoundedIcon />
                  <pre> Print </pre>
                </Button>
                <Button
                  className="btnforstyle"
                  variant="contained"
                  onClick={checkItForSocial}
                >
                  <pre>{btnDisSocial}</pre>
                </Button>
              </div>
              {checkForSocial ? (
                <div style={{ marginBottom: 7.5, marginTop: 13 }}>
                  <h3 style={{ textAlign: "center", paddingTop: 10 }}>
                    {" "}
                    ℹ️ Social Science Info
                  </h3>
                  <div className="underline"></div>
                  <h4>✅ Score Twins</h4>

                  {findScoreTwinsSocial(total).length === 1 ? (
                    <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                      ➖ You dont have score twins from {school}
                    </p>
                  ) : (
                    <p style={{ marginBottom: 7.5, marginTop: 13 }}>
                      ➖ You scored the same result with{" "}
                      {findScoreTwinsSocial(total).length - 1} student(s) in{" "}
                      {school}
                    </p>
                  )}
                  {findScoreTwinsSocial(total).map((x) => {
                    return (
                      <ul>
                        {name !== x.name ? (
                          <p>
                            👤 <b> {x.name}</b> from {x.stream}
                          </p>
                        ) : (
                          ""
                        )}
                      </ul>
                    );
                  })}
                  <h4 style={{ marginBottom: 7.5, marginTop: 13 }}>
                    {" "}
                    ✅ Top 10 Students from Social Science by Rank
                  </h4>
                  {tops.map((x) => {
                    let score = 0;
                    let id = 0;
                    let scoreTotal = 0;
                    Result.map((res) => {
                      if (res.name === x) {
                        score = parseInt(res.total - res.civics);
                        id = parseInt(res.id);
                        scoreTotal = parseInt(res.total);
                      }
                    });

                    return (
                      <ul>
                        <p key={name}>
                          👤 {x} <br />
                          <pre
                            style={{
                              paddingLeft: 50,
                              marginBottom: 7.5,
                              marginTop: 13
                            }}
                          >
                            🆔 ID ➖ {id}{" "}
                          </pre>
                          <pre style={{ paddingLeft: 50 }}>
                            📊 Total ➖ {score}/500 <b>or</b> {scoreTotal}/600
                          </pre>
                        </p>
                      </ul>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              {checkForSocial ? (
                <div>
                  <h4>
                    {" "}
                    ✅ ♀ Top 15 Female Students from Social Science by Rank
                  </h4>
                  {topFemaleSs.map((x) => {
                    let score = 0;
                    let id = 0;
                    let scoreTotal = 0;
                    Result.map((res) => {
                      if (res.name === x) {
                        score = parseInt(res.total - res.civics);
                        id = parseInt(res.id);
                        scoreTotal = parseInt(res.total);
                      }
                    });
                    let i = 1;
                    return (
                      <ul>
                        <p key={name}>
                          👤 {x} <br />
                          <pre
                            style={{
                              paddingLeft: 50,
                              marginBottom: 7.5,
                              marginTop: 13
                            }}
                          >
                            🆔 ID ➖ {id}{" "}
                          </pre>
                          <pre style={{ paddingLeft: 50 }}>
                            📊 Total ➖ {score}/500 <b>or</b> {scoreTotal}/600
                          </pre>
                        </p>
                      </ul>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              <h4>✅ Pass and Fail Stats for Social Science</h4>

              <p>
                ➖ Social Science Students that passed the exam ➡️{" "}
                {ssPassCounterFemale.length + ssPassCounterMale.length} out of{" "}
                {ssCounter}
              </p>
              <p>- Male ➡️ {ssPassCounterMale.length}</p>

              <p>- Female ➡️ {ssPassCounterFemale.length} </p>

              <p>
                ➖ Social Science Percentage Pass(From Social Science) ➡️{" "}
                {Math.floor(
                  ((ssPassCounterFemale.length + ssPassCounterMale.length) /
                    ssCounter) *
                    100
                )}
                %
              </p>
              <p>
                ➖ Social Science Percentage Pass(From All Students) ➡️{" "}
                {Math.floor(
                  ((ssPassCounterFemale.length + ssPassCounterMale.length) /
                    (ssCounter + nsCounter)) *
                    100
                )}
                %
              </p>
              <p style={{ textAlign: "center" }}>
                🔰 Without being said , Yaberus Wolkite was able to pass about{" "}
                <b>
                  53%(
                  {passCheckerFemale.length +
                    passChecker.length +
                    ssPassCounterFemale.length +
                    ssPassCounterMale.length}
                  )
                </b>{" "}
                of the of grade 12 Students.{" "}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p style={{ padding: 20 }}>Nothing to show || Check your reg number</p>
      )}
    </div>
  );
};
export default ResultViewer;
