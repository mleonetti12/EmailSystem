// Load middleware and describe routes
// Maxwell Leonetti mleonett@ucsc.edu
// Based on work done by Prof David Harrison dcharris@ucsc.edu

const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const dummy = require('./dummy');
const emails = require('./emails');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.safeLoad(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
);


app.get('/v0/dummy', dummy.get);
// Routes
app.get('/v0/mail', emails.getMailbox);
app.get('/v0/mail/:id', emails.getEmail);
app.post('/v0/mail', emails.post);
app.put('/v0/mail/:id', emails.put);


app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
