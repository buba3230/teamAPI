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


/* DELETE state from DB by ID. */

router.delete("/state/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from state where id_state=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `state with id: ${id} was deleted`, deletedId: id });
  });
});

/* POST new types_of_settlements */
router.post("/typeOfSettlements", (req, res) => {
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


/* DELETE types_of_settlements from DB by ID. */

router.delete("/typeOfSettlements/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from types_of_settlements where id_types=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `typeOfSettlements with id: ${id} was deleted`, deletedId: id });
  });
});

/* POST new city */
router.post("/nameCity", (req, res) => {
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

/* DELETE city from DB by ID. */

router.delete("/nameCity/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from city where id_city=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `nameCity with id: ${id} was deleted`, deletedId: id });
  });
});

/* POST new street */
router.post("/nameStreet", (req, res) => {
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

/* DELETE street from DB by ID. */

router.delete("/nameStreet/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from street where id_street=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `street with id: ${id} was deleted`, deletedId: id });
  });
});

module.exports = router;
