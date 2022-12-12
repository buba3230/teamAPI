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

/* UPDATE new user */
router.put("/:id", (req, res) => {

  //get ID from parameters
  let id_user=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let login = req.body.login;
  let email = req.body.email;
  let phone = req.body.phone;
  let password = req.body.password;
  let date_of_registration = req.body.date_of_registration;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let patronymic = req.body.patronymic;
  let sex = req.body.sex;
  let birthday = req.body.birthday;

  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  login = login ? login : null;
  email = email ? email : null;
  phone = phone ? phone : null;
  password = password ? password : null;
  date_of_registration = date_of_registration ? date_of_registration : null;
  firstname = firstname ? firstname : null;
  lastname = lastname ? lastname : null;
  patronymic = patronymic ? patronymic : null;
  sex = sex ? sex : null;
  birthday = birthday ? birthday : null;

  //build data array
  const data = [login, email, phone, password, date_of_registration, firstname, lastname, patronymic, sex, birthday, id_user];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE user 
            SET login = IFNULL(?, login),
                email = IFNULL(?, email),
                phone = IFNULL(?, phone),
                password = IFNULL(?, password),
                date_of_registration = IFNULL(?, date_of_registration),
                firstname = IFNULL(?, firstname),
                lastname = IFNULL(?, lastname),
                patronymic = IFNULL(?, patronymic),
                sex = IFNULL(?, sex),
                birthday = IFNULL(?, birthday)
              WHERE id_user=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM user WHERE id_user = ?";
    db.query(resSql, [id_user], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

/* UPDATE new users_type */
router.put("/users-type/:id", (req, res) => {

  //get ID from parameters
  let id_user_type=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let id_user = req.body.id_user;
  let id_type = req.body.id_type;
  
  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  id_user = id_user ? id_user : null;
  id_type = id_type ? id_type : null;
  

  //build data array
  const data = [id_user, id_type, id_user_type];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE users_type 
            SET id_user = IFNULL(?, id_user),
                id_type = IFNULL(?, id_type)
              WHERE id_user_type=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM users_type WHERE id_user_type = ?";
    db.query(resSql, [id_user_type], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

/* UPDATE new user_information */
router.put("/user-information/:id", (req, res) => {

  //get ID from parameters
  let id_user_info=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let information_about_user = req.body.information_about_user;
  let hobby = req.body.hobby;
  let id_state = req.body.id_state;
  let id_types = req.body.id_types;
  let id_city = req.body.id_city;
  let id_user = req.body.id_user;
  let house_number = req.body.house_number;
  
  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  information_about_user = information_about_user ? information_about_user : null;
  hobby = hobby ? hobby : null;
  id_state = id_state ? id_state : null;
  id_types = id_types ? id_types : null;
  id_city = id_city ? id_city : null;
  id_user = id_user ? id_user : null;
  house_number = house_number ? house_number : null;

  //build data array
  const data = [information_about_user, hobby, id_state, id_types, id_city, id_user, house_number, id_user_info];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE user_information 
            SET information_about_user = IFNULL(?, information_about_user),
                hobby = IFNULL(?, hobby),
                id_state = IFNULL(?, id_state),
                id_types = IFNULL(?, id_types),
                id_city = IFNULL(?, id_city),
                id_user = IFNULL(?, id_user),
                house_number = IFNULL(?, house_number)
              WHERE id_user_info=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM user_information WHERE id_user_info = ?";
    db.query(resSql, [id_user_info], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

/* UPDATE new users_work */
router.put("/users-work/:id", (req, res) => {

  //get ID from parameters
  let id_users_work=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let id_user = req.body.id_user;
  let id_work = req.body.id_work;
  
  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  id_user = id_user ? id_user : null;
  id_work = id_work ? id_work : null;
  

  //build data array
  const data = [id_user, id_work, id_users_work];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE users_work 
            SET id_user = IFNULL(?, id_user),
                id_work = IFNULL(?, id_work)
              WHERE id_users_work=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM users_work WHERE id_users_work = ?";
    db.query(resSql, [id_users_work], (err, selectionResult) => {
      if (err || !selectionResult.length) {
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

/* UPDATE new users_education */
router.put("/users-education/:id", (req, res) => {

  //get ID from parameters
  let id_users_education=req.params.id;

  //get value from body to LET variable - because we need to modify it later (there is no nullish coelastic operator)
  let id_user = req.body.id_user;
  let id_education = req.body.id_education;
  
  //modify value to NULL if we dont have data in request
  //we need NULL to use mySQL function IFNULL!!!
  id_user = id_user ? id_user : null;
  id_education = id_education ? id_education : null;
  

  //build data array
  const data = [id_user, id_education, id_users_education];
  
  //create sql for updating
  //if some data is NULL - update with OLD value - and we dont clear it
  let sql=`UPDATE users_work 
            SET id_user = IFNULL(?, id_user),
            id_education = IFNULL(?, id_education)
              WHERE id_users_education=?`
  //run query
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    const resSql = "SELECT * FROM users_education WHERE id_users_education = ?";
    db.query(resSql, [id_users_education], (err, selectionResult) => {
      if (err || !selectionResult.length) {D
          throw err;
      }
      //send result of selection
      res.send(selectionResult[0]);
    });
  });
});

module.exports = router;
