const { request } = require("express");
var express = require('express');
var router = express.Router();

var db = require("../config/pepperTeamAPI");

/* POST new user */
router.post("/", (req, res) => {
  const login = req.body.login;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const date_of_registration = req.body.date_of_registration;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const patronymic = req.body.patronymic;
  const sex = req.body.sex;
  const birthday = req.body.birthday;

  const data = [login, email, phone, password, date_of_registration, firstname, lastname, patronymic, sex, birthday];
  let sql = "INSERT INTO user(login, email, phone, password, date_of_registration, firstname, lastname, patronymic, sex, birthday) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    const resSql = "SELECT * FROM user WHERE id_user = ?";
    db.query(resSql, [newId], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      res.send(selectionResult[0]);
    });
  });
});

/* DELETE user from DB by ID. */

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from user where id_user=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `users with id: ${id} was deleted`, deletedId: id });
  });
});


/* POST new users_type */
router.post("/users_type", (req, res) => {
  const id_user = req.body.id_user;
  const id_type = req.body.id_type;

  const data = [id_user, id_type];
  let sql = "INSERT INTO users_type(id_user, id_type) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    const resSql = "SELECT * FROM users_type WHERE id_user_type = ?";
    db.query(resSql, [newId], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      res.send(selectionResult[0]);
    });
  });
});

/* DELETE  users_type from DB by ID. */

router.delete("/users_type/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from users_type where id_user_type=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `users_type with id: ${id} was deleted`, deletedId: id });
  });
});


/* POST new user_information */
router.post("/user_information", (req, res) => {
  const information_about_user = req.body.information_about_user;
  const hobby = req.body.hobby;
  const id_state = req.body.id_state;
  const id_types = req.body.id_types;
  const id_city = req.body.id_city;
  const id_street = req.body.id_street;
  const id_user = req.body.id_user;
  const house_number = req.body.house_number;

  const data = [information_about_user, hobby, id_state, id_types, id_city, id_street, id_user, house_number];
  let sql = "INSERT INTO user_information(information_about_user, hobby, id_state, id_types, id_city, id_street, id_user, house_number) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    const resSql = "SELECT * FROM user_information WHERE id_user_info = ?";
    db.query(resSql, [newId], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      res.send(selectionResult[0]);
    });
  });
});

/* DELETE  user_information from DB by ID. */

router.delete("/user_information/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from user_information where id_user_info=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `user_information with id: ${id} was deleted`, deletedId: id });
  });
});

/* POST new users_work */
router.post("/users_work", (req, res) => {
  const id_user = req.body.id_user;
  const id_work = req.body.id_work;

  const data = [id_user, id_work];
  let sql = "INSERT INTO users_work(id_user, id_work) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    const resSql = "SELECT * FROM users_work WHERE id_users_work = ?";
    db.query(resSql, [newId], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      res.send(selectionResult[0]);
    });
  });
});

/* DELETE users_work from DB by ID. */

router.delete("/users_work/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from users_work where id_users_work=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `users_work with id: ${id} was deleted`, deletedId: id });
  });
});

/* POST new users_education */
router.post("/users_education", (req, res) => {
  const id_user = req.body.id_user;
  const id_education = req.body.id_education;

  const data = [id_user, id_education];
  let sql = "INSERT INTO users_education(id_user, id_education) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    const resSql = "SELECT * FROM users_education WHERE id_users_education = ?";
    db.query(resSql, [newId], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      res.send(selectionResult[0]);
    });
  });
});

/* DELETE users_education from DB by ID. */

router.delete("/users_education/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from users_education where id_users_education=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.send({ data: `users_education with id: ${id} was deleted`, deletedId: id });
  });
});

module.exports = router;
