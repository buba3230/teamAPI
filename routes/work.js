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

/* DELETE work from DB by ID. */

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from work where id_work=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `work with id: ${id} was deleted`, deletedId: id });
  });
});

module.exports = router;
