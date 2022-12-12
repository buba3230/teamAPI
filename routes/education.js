const { request } = require("express");
var express = require("express");
var router = express.Router();

var db = require("../config/pepperTeamAPI");

/* POST new education */
router.post("/", (req, res) => {
    const university = req.body.university;
    const specialty = req.body.specialty;
    const faculty = req.body.faculty;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const grade_level = req.body.grade_level;
  
    const data = [university, specialty, faculty, start_date, end_date, grade_level];
    let sql = "INSERT INTO education(university, specialty, faculty, start_date, end_date, grade_level) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      const resSql = "SELECT * FROM education WHERE id_education = ?";
      db.query(resSql, [newId], (err, selectionResult) => {
        if (err || !selectionResult.length) {
            throw err;
        }
        res.send(selectionResult[0]);
      });
    });
});

/* UPDATE new education */
router.put("/:id", (req, res) => {

  //get ID from parameters
  let id_education=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let university = req.body.university;
  let specialty = req.body.specialty;
  let faculty = req.body.faculty;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let grade_level = req.body.grade_level;


  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  university = university ? university : null;
  specialty = specialty ? specialty : null;
  faculty = faculty ? faculty : null;
  start_date = start_date ? start_date : null;
  end_date = end_date ? end_date : null;
  grade_level = grade_level ? grade_level : null;

  //build data array
  const data = [university, specialty, faculty, start_date, end_date, grade_level, id_education];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE education 
            SET university = IFNULL(?, university),
                specialty = IFNULL(?, specialty),
                faculty = IFNULL(?, faculty),
                start_date = IFNULL(?, start_date),
                end_date = IFNULL(?, end_date),
                grade_level = IFNULL(?, grade_level)
              WHERE id_education=?`
  //run query
  console.log(data);
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM education WHERE id_education = ?";
    db.query(resSql, [id_education], (err, selectionResult) => { console.log(selectionResult);
      if (err || !selectionResult.length) {
        console.log(err);  
        // throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

module.exports = router;
