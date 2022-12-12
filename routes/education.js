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

/* GET education listing. */
router.get("/", function (req, res, next) {

  let sql = `select * from education`;

  db.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      throw error;
    }
    if (!result.length) {
      res.setHeader("Content-Type", "application/json");
      res.send({data: "Table education is empty"});
    } else {
      res.send(result);
      
    }
  });
});

/* DELETE education from DB by ID. */

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from education where id_education=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `education with id: ${id} was deleted`, deletedId: id });
  });
});
module.exports = router;
