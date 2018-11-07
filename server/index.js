const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./fake-db')

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/user'),
      bookingRoutes = require('./routes/bookings');

mongoose.connect(config.DB_URI).then(() =>{
    const fakeDb = new FakeDb();
    //fakeDb.seedDb();
});

const app = express();

// app.get('/rentals', function(req, res){
//     res.json({'success': true });
// });
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('App is running!')
});
