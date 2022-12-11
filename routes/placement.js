const { request } = require("express");
var express = require("express");
var router = express.Router();

var db = require("../config/pepperTeamAPI");

/* POST new state. */
router.post("/state", (req, res) => {
    const name_state = req.body.name_state;
    const data = [name_state];
    let sql = "INSERT INTO state(name_state) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      const resSql = "SELECT * FROM state WHERE id_state = ?";
      db.query(resSql, [newId], (err, res) => {
        if (err || !res.length) {
            throw err;
        }
        res.send(res[0]);
      });
    });
});

/* POST new type_of_settlements */
router.post("/type_of_settlements", (req, res) => {
    const name_types = req.body.name_types;
    const data = [name_types];
    let sql = "INSERT INTO types_of_settlements(name_types) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      const resSql = "SELECT * FROM type_of_settlemets WHERE id_types = ?";
      db.query(resSql, [newId], (err, res) => {
        if (err || !res.length) {
            throw err;
        }
        res.send(res[0]);
      });
    });
});

/* POST new city */
router.post("/city", (req, res) => {
    const id_state = req.body.id_state;
    const id_types = req.body.id_types;
    const name_city = req.body.name_city;
  
    const data = [id_state, id_types, name_city];
    let sql = "INSERT INTO city(id_state, id_types, name_city) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      const resSql = "SELECT * FROM city WHERE id_city = ?";
      db.query(resSql, [newId], (err, res) => {
        if (err || !res.length) {
            throw err;
        }
        res.send(res[0]);
      });
    });
});

/* POST new street */
router.post("/street", (req, res) => {
    const id_city = req.body.id_city;
    const name_street = req.body.name_street;
    
    const data = [id_city, name_street];
    let sql = "INSERT INTO street(id_city, name_street) VALUES(?)";
    db.query(sql, [data], (err, result) => {
        if (err) throw err;
        const newId = result.insertId;
        const resSql = "SELECT * FROM street WHERE id_street = ?";
        db.query(resSql, [newId], (err, res) => {
            if (err || !res.length) {
            throw err;
        }
        res.send(res[0]);
        });  
    });
});

module.exports = router;
