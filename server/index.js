const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const FakeDb = require('./fake-db');
const path = require('path');

const rentalRoutes = require('./routes/rentals'),
    userRoutes = require('./routes/user'),
    bookingRoutes = require('./routes/bookings');

mongoose.connect(config.DB_URI).then(() => {
    // Config server
    if(process.env.NODE_ENV !== 'production'){
        const fakeDb = new FakeDb();
        //fakeDb.seedDb();
    }
});

const app = express();

// app.get('/rentals', function(req, res){
//     res.json({'success': true });
// });
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// Config server
// Cmd line : npm init

if (process.env.NODE_ENV === 'production') {
    // Kết hợp Server và Client vào cùng 1 file index.html với port 3001
    const appPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(appPath));

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('App is running!')
});
