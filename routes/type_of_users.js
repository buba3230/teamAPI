const { request } = require("express");
var express = require("express");
var router = express.Router();

var db = require("../config/pepperTeamAPI");

/* POST new type_of_users */
router.post("/", (req, res) => {
    const type_name = req.body.type_name;
  
    const data = [type_name];
    let sql = "INSERT INTO type_of_users(type_name) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) 
        throw err;
      const newId = result.insertId;
      const resSql = "SELECT * FROM type_of_users WHERE id_type = ?";
      db.query(resSql, [newId], (err, selectionResult) => {
        if (err || !selectionResult.length) {
          throw err;
        }
        res.send(selectionResult[0]);
      });
    });
  });

  /* GET type_of_users listing. */
router.get("/", function (req, res, next) {

  let sql = `select * from type_of_users`;

  db.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      throw error;
    }
    if (!result.length) {
      res.send({data: "Table type_of_users is empty"});
    } else {
      res.send(result);
      res.setHeader("Content-Type", "application/json");
    }
  });
});

module.exports = router;
