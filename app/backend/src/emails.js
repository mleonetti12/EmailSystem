// implement routes from app.js
// Maxwell Leonetti mleonett@ucsc.edu
// Based on work done by Prof David Harrison dcharris@ucsc.edu

const db = require('./db');
db.reset();

const boxes = ['inbox', 'trash', 'sent'];
// const users = ['admin', 'test_user'];

// helper fcn for retrieving entire mailbox as a JSON array
exports.getMailbox = async (req, res) => {
  const mailboxes = [];
  const emails =
    await db.selectMailboxes(
        req.query.mailbox, req.query.from, 'test_user');
  if (req.query.mailbox) {
    if (!emails || emails.length == 0) {
      res.status(404).send();
    } else {
      const mail = [];
      for (let j=0; j<emails.length; j++) {
        const mailObj = emails[j].mail;
        mailObj.content = mailObj.content.substring(0, 32);
        mailObj.id = emails[j].id;
        mail.push(mailObj);
      }
      mailboxes.push({'name': req.query.mailbox, 'mail': mail});
    }
  } else {
    for (let i=0; i<boxes.length; i++) {
      const filtered = emails.filter((email) => email.mailbox == boxes[i]);
      const mail = [];
      for (let j=0; j<filtered.length; j++) {
        const mailObj = filtered[j].mail;
        mailObj.content = mailObj.content.substring(0, 32);
        mailObj.id = filtered[j].id;
        mail.push(mailObj);
      }
      if (mail.length > 0) {
        mailboxes.push({'name': boxes[i], 'mail': mail});
      }
    }
  }
  res.status(200).json(mailboxes);
};

// helper fcn for retrieving a single email by ID
exports.getEmail = async (req, res) => {
  const email = await db.selectEmail(req.params.id, 'admin');
  if (email) {
    email.id = req.params.id;
    res.status(200).json(email);
  } else {
    res.status(404).send();
  }
};

// POST for sending a new mail to a user
exports.post = async (req, res) => {
  const email = req.body;
  const date = (new Date()).toISOString();
  email.received = date;
  email.sent = date;
  email.from = {'name': 'CSE183 Student', 'email': 'cse183-student@ucsc.edu'};
  email.read = false;
  email.starred = false;
  email.avatar = 'https://www.calebkeiter.com/wp-content/uploads/2014/12/professional-headshot-backgrounds.jpg';
  // check if user exists, also
  // send copy w/ different id to other users inbox (use insertEmailID)
  // this should be only fcn moving emails between users
  const rows = await db.insertEmail(email, 'sent', 'test_user');
  email.id = rows[0].id;
  res.status(201).json(email);
};

// PUT route for updating email values (starred/not) and moving between mailboxes
exports.put = async (req, res) => {
  const email = await db.selectEmail(req.params.id, 'test_user');
  if (email) {
    if (req.query.starred) {
      await db.updateEmail(req.params.id, 'test_user', !email.starred);
      res.status(204);
    } else {
      const box = await db.selectMailboxID(req.params.id, 'test_user');
      if (req.query.mailbox == 'sent' && box != 'sent') {
        res.status(409);
      } else {
        const exists = boxes.includes(req.query.mailbox);
        if (!exists) boxes.push(req.query.mailbox);
        await db.deleteEmail(req.params.id, 'test_user');
        await db.insertEmailID(
            email, req.query.mailbox, req.params.id, 'test_user');
        res.status(204);
      }
    }
  } else {
    res.status(404);
  }
  res.send();
};

// sources:
// https://stackoverflow.com/questions/18133635/remove-property-for-all-objects-in-array
// https://swagger.io/docs/specification/describing-parameters/
// https://stackoverflow.com/questions/2295496/convert-array-to-json
