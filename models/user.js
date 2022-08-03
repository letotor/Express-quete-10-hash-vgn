const connection = require('../db-config');
const Joi = require('joi');
const argon2 = require('argon2');


const db = connection.promise();

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    email: Joi.string().email().max(255).presence(presence),
    firstname: Joi.string().max(255).presence(presence),
    lastname: Joi.string().max(255).presence(presence),
    password : Joi.string().max(255).presence(presence),
    city: Joi.string().allow(null, '').max(255),
    language: Joi.string().allow(null, '').max(255),
  }).validate(data, { abortEarly: false }).error;
};

const findMany = ({ filters: { language,password }}) => {
  let sql = 'SELECT * FROM users';
  console.log(sql);
  const sqlValues = [];
  if (language || password) {
    sql+= ' WHERE '
  }
  
  if (password){
    sql+=' password = ?';
    sqlValues.push(password);
  }
  if (language) {
    sql += ' AND language = ?';
    sqlValues.push(language);
  }

  return db.query(sql, sqlValues).then(([results]) => results);
};

const findOne = (id) => {
  return db
    .query('SELECT * FROM users WHERE id = ?', [id])
    .then(([results]) => results[0]);
};

const findByEmail = (email) => {
  
  console.log(email)
  return db
    .query('SELECT * FROM users WHERE email = ?', [email])
    .then(([results]) => results[0]);
};


const findByEmailWithDifferentId = (email, id) => {
  return db
    .query('SELECT * FROM users WHERE email = ? AND id <> ?', [email, id])
    .then(([results]) => results[0]);
};

const isAuthenticated =(email,hashedPassword) =>{
  return db
    .query('SELECT * FROM users WHERE email = ? AND hashedPassword = ? ',[email,hashedPassword])
    .then(([results]) => results[0]);

}
const create = (data) => {
  console.log('---------->create',data)
  return db.query('INSERT INTO users SET ?', data).then(([result]) => {
    const id = result.insertId;
    return { ...data, id };
  });
};

const update = (id, newAttributes) => {
  return db.query('UPDATE users SET ? WHERE id = ?', [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .query('DELETE FROM users WHERE id = ?', [id])
    .then(([result]) => result.affectedRows !== 0);
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  return ( argon2.verify(hashedPassword, plainPassword, hashingOptions));
};


module.exports = {
  findMany,
  findOne,
  validate,
  create,
  update,
  destroy,
  findByEmail,
  findByEmailWithDifferentId,
  isAuthenticated,
  hashPassword,
  verifyPassword,
};
