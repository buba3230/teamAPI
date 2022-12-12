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
router.post("/type_of_settlements", (req, res) => {
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

/* UPDATE new state */
router.put("/state/:id", (req, res) => {

  //get ID from parameters
  let id_state=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let name_state = req.body.name_state;

  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  name_state = name_state ? name_state : null;

  //build data array
  const data = [name_state, id_state];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE state 
            SET name_state = IFNULL(?, name_state) 
              WHERE id_state=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM state WHERE id_state = ?";
    db.query(resSql, [id_state], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

/* UPDATE new types_of_settlements */
router.put("/types-of-settlements/:id", (req, res) => {

  //get ID from parameters
  let id_types=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let name_types = req.body.name_types;

  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  name_types = name_types ? name_types : null;

  //build data array
  const data = [name_types, id_types];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE types_of_settlements 
            SET name_types = IFNULL(?, name_types) 
              WHERE id_types=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM types_of_settlements WHERE id_types = ?";
    db.query(resSql, [id_types], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

/* UPDATE new city */
router.put("/city/:id", (req, res) => {

  //get ID from parameters
  let id_city=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let id_state = req.body.id_state;
  let id_types = req.body.id_types;
  let name_city = req.body.name_city;


  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  id_state = id_state ? id_state : null;
  id_types = id_types ? id_types : null;
  name_city = name_city ? name_city : null;

  //build data array
  const data = [id_state, id_types, name_city, id_city];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE city 
            SET id_state = IFNULL(?, id_state),
                id_types = IFNULL(?, id_types), 
                name_city = IFNULL(?, name_city) 
              WHERE id_city=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM city WHERE id_city = ?";
    db.query(resSql, [id_city], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

/* UPDATE new street */
router.put("/street/:id", (req, res) => {

  //get ID from parameters
  let id_street=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let id_city = req.body.id_city;
  let name_street = req.body.name_street;

  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  id_city = id_city ? id_city : null;
  name_street = name_street ? name_street : null;

  //build data array
  const data = [id_city, name_street, id_street];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE street 
            SET id_city = IFNULL(?, id_city),
                name_street = IFNULL(?, name_street) 
              WHERE id_street=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM street WHERE id_street = ?";
    db.query(resSql, [id_street], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
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
      res.setHeader("Content-Type", "application/json");
      res.send({data: "Table state is empty"});
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
      res.setHeader("Content-Type", "application/json");
      res.send({data: "Table types_of_settlements is empty"});
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
      res.setHeader("Content-Type", "application/json");
      res.send({data: "Table city is empty"});
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
      res.setHeader("Content-Type", "application/json");
      res.send({data: "Table street is empty"});
    } else {
      res.send(result);
    }
  });
});

/* DELETE types_of_settlements from DB by ID. */

router.delete("/type_of_settlements/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from types_of_settlements where id_types=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `type_of_settlements with id: ${id} was deleted`, deletedId: id });
  });
});

/* DELETE state from DB by ID. */

router.delete("/state/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from state where id_state=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `state with id: ${id} was deleted`, deletedId: id });
  });
});

/* DELETE city from DB by ID. */

router.delete("/city/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from city where id_city=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `сity with id: ${id} was deleted`, deletedId: id });
  });
});

/* DELETE street from DB by ID. */

router.delete("/street/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from street where id_street=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `street with id: ${id} was deleted`, deletedId: id });
  });
});

module.exports = router;
