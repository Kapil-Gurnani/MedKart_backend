const schema = require('./db/schema');

let port = process.env.PORT || 8000;
// let host = '3.15.60.254';

schema.db.on('error', console.error.bind(console, 'connection error:'));
schema.db.once('open', function () {
  console.log("we are connected");

  const CryptoJS = require("crypto-js");
  const create = require('./lib/create');
  const read = require('./lib/read');
  var multer = require('multer');
  var DIR = './uploads/';

  var upload = multer({
    dest: DIR
  });

  const express = require('express');
  let app = express();
  const bodyParser = require('body-parser');
  let secretKey = 'Kapil';
  // const urlencodedParser = bodyParser.urlencoded({
  //     extended: false
  // });


  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  // parse application/json
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    res.setHeader('Access-Control-Allow-Credentials', true);
    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
  });
  // app.use(multer({
  //   dest: DIR,
  //   rename: function (fieldname, filename) {
  //     return filename + Date.now();
  //   },
  //   onFileUploadStart: function (file) {
  //     console.log(file.originalname + ' is starting ...');
  //   },
  //   onFileUploadComplete: function (file) {
  //     console.log(file.fieldname + ' uploaded to  ' + file.path);
  //   }
  // }));

  app.get('/', (req, res) => {
    res.send('Backend is up');
  });

  //upload
  app.post('/api', function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.end(err.toString());
      }

      res.end('File is uploaded');
    });
  });

  // Admin Section Start
  app.get('/vendors', (req, res) => {
    let message = {
      schema: schema,
      schemaName: "Vendor"
    }
    read.start(message).then(data => {
      res.send(data);
    }).catch(err => {
      res.send(err);
    });
  });
  // Admin Section End

  // Vendor Section Start
  app.get('/products', (req, res) => {
    let message = {
      schema: schema,
      schemaName: "Products"
    }
    read.start(message).then(data => {
      res.send(data);
    }).catch(err => {
      res.send(err);
    });
  });

  app.get('/orders', (req, res) => {
    let message = {
      schema: schema,
      schemaName: "Orders"
    }
    read.start(message).then(data => {
      res.send(data);
    }).catch(err => {
      res.send(err);
    });
  });

  app.get('/users', (req, res) => {
    let message = {
      schema: schema,
      schemaName: "Users"
    }
    read.start(message).then(data => {
      res.send(data);
    }).catch(err => {
      res.send(err);
    });
  });

  app.get('/discountCoupons', (req, res) => {
    let message = {
      schema: schema,
      schemaName: "Discount"
    }
    read.start(message).then(data => {
      res.send(data);
    }).catch(err => {
      res.send(err);
    });
  });

  app.post('/addProduct', (req, res) => {
    let message = {
      schema: schema,
      schemaName: "Products",
      content: {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        imageLink: req.body.imageLink,
        price: req.body.price,
        category: req.body.category,
        size: req.body.size,
        vendor: req.body.vendor
      }
    }
    console.log(message);
    create.start(message).then((data) => {
      res.send(data);
    }).catch(err => {
      res.send(err);
    });
  });
  // Vendor Section End

  app.get('/read', function (req, res) {

    let message = {
      schema: schema,
      schemaName: "Users"
    }
    read.start(message).then(data => {
      res.send(data);
    }).catch(err => {
      res.send(err);
    });


  });

  app.post('/create', (req, res) => {
    let message = {
      schema: schema,
      schemaName: "Users",
      content: {
        name: req.body.registerUsername,
        password: req.body.registerPassword,
        email: req.body.registerEmail
      }
    }

    create.start(message).then((data) => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    });
  });

  //login
  app.post('/login', (req, res) => {
    let message = {
      schema: schema,
      schemaName: "Users",
    }
    let content = {
      password: req.body.loginPassword,
      email: req.body.loginEmail
    }
    read.start(message).then(data => {
      //   console.log(data);
      let match = false;
      let role = '';
      data.forEach(element => {
        if (element.email == content.email) {
          let clientPasswordInBytes = CryptoJS.AES.decrypt(req.body.loginPassword, secretKey);
          var clientPassword = JSON.parse(clientPasswordInBytes.toString(CryptoJS.enc.Utf8));
          let serverPasswordInBytes = CryptoJS.AES.decrypt(element.password, secretKey);
          var serverPassword = serverPasswordInBytes.toString(CryptoJS.enc.Utf8);
          if (clientPassword == serverPassword) {
            match = true;
            role = element.role;
            return;
          }
        }
      });
      res.send({
        'result': match,
        'role': role
      });
    }).catch(err => {
      res.send(err);
    });
  });

  app.post('/register', (req, res) => {

    let clientPassword = CryptoJS.AES.encrypt(req.body.registerPassword, secretKey);
    // console.log(clientPassword.toString());
    let message = {
      schema: schema,
      schemaName: "Users",
      content: {
        name: req.body.registerUsername,
        password: clientPassword.toString(),
        email: req.body.registerEmail,
        address: req.body.registerAddress,
        city: req.body.registerCity,
        state: req.body.registerState,
        pincode: req.body.registerPincode,
        phone: req.body.registerPhone,
        role: req.body.registerRole
      }
    }

    create.start(message).then((data) => {
      res.send({
        'result': true
      });
    }).catch(err => {
      res.send({
        'result': false,
        'error': err
      });
    });
  });

  app = app.listen(port, () => {
    let host = app.address().address
    port = app.address().port

    console.log("Example app listening at http://%s:%s", host, port)
  });
});