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

/* UPDATE new type_of_users */
router.put("/:id", (req, res) => {

  //get ID from parameters
  let id_type=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let type_name = req.body.type_name;

  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  type_name = type_name ? type_name : null;

  //build data array
  const data = [type_name, id_type];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE type_of_users 
            SET type_name = IFNULL(?, type_name) 
              WHERE id_type=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM type_of_users WHERE id_type = ?";
    db.query(resSql, [id_type], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

module.exports = router;
