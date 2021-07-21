// query postgres database for needed values
// Maxwell Leonetti mleonett@ucsc.edu
// Based on work done by Prof David Harrison dcharris@ucsc.edu

const fs = require('fs');
const {Pool} = require('pg');

// setup connection
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// helper fcn to run database initializing files
const run = async (file) => {
  const content = fs.readFileSync(file, 'utf8');
  const statements = content.split(/\r?\n/);
  for (statement of statements) {
    await pool.query(statement);
  }
};

// initialize database
exports.reset = async () => {
  await run('sql/schema.sql');
  await run('sql/data.sql');
  await run('sql/indexes.sql');
};

// retreieve all emails fitting certain criteria
exports.selectMailboxes = async (mailbox, from, user) => {
  let select = 'SELECT id, mail, mailbox FROM mail WHERE username = $1';
  let val = [user];
  if (mailbox && from) { // from specified user and mailbox
    select += ` AND ((mail->'from'->>'name') ~* $3 OR `;
    select += `lower(mail->'from'->>'email') = lower($3)) AND mailbox = $2`;
    val = [user, mailbox, from];
  } else if (mailbox) { // from specified mailbox
    select += ` AND mailbox = $2`;
    val = [user, mailbox];
  } else if (from) { // all mailboxes and users
    select += ` AND ((mail->'from'->>'name') ~* $2 OR `;
    select += `lower(mail->'from'->>'email') = lower($2))`;
    val = [user, from];
  }
  const query = {
    text: select,
    values: val,
  };
  const {rows} = await pool.query(query);
  const emails = [];
  for (const row of rows) {
    emails.push(row);
  }
  return emails;
};

// retrieve single email based on id
// only allow retrieval from owner of that mail, or admin user
exports.selectEmail = async (id, user) => {
  const select =
    `SELECT mail FROM mail WHERE id = $1 AND (username = $2 OR $2 = 'admin')`;
  const query = {
    text: select,
    values: [id, user],
  };
  const {rows} = await pool.query(query);
  return rows.length == 1 ? rows[0].mail : undefined;
};

// sets mails starred status
exports.updateEmail = async (id, user, starred) => {
  const select =
    `UPDATE mail SET mail = jsonb_set(mail, '{starred}', $3, FALSE)`+
    ` WHERE id = $1 AND (username = $2 OR $2 = 'admin')`;
  const query = {
    text: select,
    values: [id, user, starred],
  };
  const {rows} = await pool.query(query);
  return rows.length == 1 ? rows[0].mail : undefined;
};

// check what mailbox a specified email is in
exports.selectMailboxID = async (id, user) => {
  const select =
    `SELECT mailbox FROM mail WHERE id = $1 AND`+
    ` (username = $2 OR $2 = 'admin')`;
  const query = {
    text: select,
    values: [id, user],
  };
  const {rows} = await pool.query(query);
  return rows[0].mailbox;
};

// insert a new email into the specified mailbox
// no ID specified, generated as a new mail
exports.insertEmail = async (email, box, toUser) => {
  const insert = 'INSERT INTO mail(mailbox, mail, username) '+
    'VALUES ($1, $2, $3) RETURNING id';
  const query = {
    text: insert,
    values: [box, email, toUser],
  };
  const {rows} = await pool.query(query);
  return rows;
};

// insert an email into a specified mailbox
// ID specified, for use in moving emails
exports.insertEmailID = async (email, box, id, toUser) => {
  const insert = 'INSERT INTO mail(id, mailbox, mail, username)'+
    ' VALUES ($1, $2, $3, $4) RETURNING id';
  const query = {
    text: insert,
    values: [id, box, email, toUser],
  };
  await pool.query(query);
};

// delete email by id
exports.deleteEmail = async (id, user) => {
  const del =
    `DELETE FROM mail where id = $1 AND (username = $2 OR $2 = 'admin')`;
  const query = {
    text: del,
    values: [id, user],
  };
  await pool.query(query);
};

console.log(`Connected to database '${process.env.POSTGRES_DB}'`);

// Sources
// https://www.haselt.com/blog/working-with-postgresql-jsonb
