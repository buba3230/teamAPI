const { request } = require("express");
var express = require("express");
var router = express.Router();

var db = require("../config/pepperTeamAPI");

/* POST new work */
router.post("/", (req, res) => {
    const place = req.body.place;
    const position = req.body.position;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
  
    const data = [place, position, start_date, end_date];
    let sql = "INSERT INTO work(place, position, start_date, end_date) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      const resSql = "SELECT * FROM work WHERE id_work = ?";
      db.query(resSql, [newId], (err, selectionResult) => {
        if (err || !selectionResult.length) {
            throw err;
        }
        res.send(selectionResult[0]);
      });
    });
});

/* UPDATE new work */
router.put("/:id", (req, res) => {

  //get ID from parameters
  let id_work=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let place = req.body.place;
  let position = req.body.position;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;

  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  place = place ? place : null;
  position = position ? position : null;
  start_date = start_date ? start_date : null;
  end_date = end_date ? end_date : null;

  //build data array
  const data = [place, position, start_date, end_date, id_work];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE work 
            SET place = IFNULL(?, place), 
                position = IFNULL(?, position), 
                start_date = IFNULL(?, start_date), 
                end_date = IFNULL(?, end_date)
              WHERE id_work=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM work WHERE id_work = ?";
    db.query(resSql, [id_work], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

module.exports = router;
