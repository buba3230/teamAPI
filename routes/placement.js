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
      db.query(resSql, [newId], (err, selectionResult) => {
        if (err || !selectionResult.length) {
            throw err;
        }
        res.send(selectionResult[0]);
      });
    });
});

/* POST new types_of_settlements */
router.post("/types_of_settlements", (req, res) => {
    const name_types = req.body.name_types;

    const data = [name_types];
    let sql = "INSERT INTO types_of_settlements(name_types) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      const resSql = "SELECT * FROM types_of_settlements WHERE id_types = ?";
      db.query(resSql, [newId], (err, selectionResult) => {
        if (err || !selectionResult.length) {
            throw err;
        }
        res.send(selectionResult[0]);
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
      db.query(resSql, [newId], (err, selectionResult) => {
        if (err || !selectionResult.length) {
            throw err;
        }
        res.send(selectionResult[0]);
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
        db.query(resSql, [newId], (err, selectionResult) => {
            if (err || !selectionResult.length) {
            throw err;
        }
        res.send(selectionResult[0]);
        });  
    });
});

/* GET state listing. */
router.get("/state", function (req, res, next) {

  let sql = `select * from state`;

  db.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      throw error;
    }
    if (!result.length) {
      console.log("Table : state is empty");
    } else {
      res.send(result);
    }
  });
});

/* GET types_of_settlements listing. */
router.get("/types_of_settlements", function (req, res, next) {

  let sql = `select * from types_of_settlements`;

  db.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      throw error;
    }
    if (!result.length) {
      console.log("Table : types_of_settlements is empty");
    } else {
      res.send(result);
    }
  });
});

/* GET city listing. */
router.get("/city", function (req, res, next) {

  let sql = `select * from city`;

  db.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      throw error;
    }
    if (!result.length) {
      console.log("Table : city is empty");
    } else {
      res.send(result);
    }
  });
});

/* GET street listing. */
router.get("/street", function (req, res, next) {

  let sql = `select * from street`;

  db.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      throw error;
    }
    if (!result.length) {
      console.log("Table : street is empty");
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
