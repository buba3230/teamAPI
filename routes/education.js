const { request } = require("express");
var express = require("express");
var router = express.Router();

var db = require("../config/pepperTeamAPI");

/* POST new education */
router.post("/education", (req, res) => {
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
      db.query(resSql, [newId], (err, res) => {
        if (err || !res.length) {
            throw err;
        }
        res.send(res[0]);
      });
    });
});



module.exports = router;
