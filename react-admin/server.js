// require('rootpath')();
const express = require('express');
const app = express();
// const cors = require('cors');
const bodyParser = require('body-parser');
// const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(validate);

// api routes
// app.use("/api", require('./routes'));

// global error handler
// app.use(errorHandler);

// app.use(express.static('uploads'));
// app.use('/uploads', express.static('images'));
// start server

app.get('/users', function (req, res) {
    console.log("Hello");
})

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4150;
app.listen(port, () => console.log('Server listening on port ' + port));


