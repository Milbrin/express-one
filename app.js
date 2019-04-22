const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
// .then(result => {
//   console.log(result[0])  
// })
// .catch(err => 
//     {console.log(err)});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5cbe288d3e37150ad81a4664')
        .then(user=> {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));

})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);

mongoose.connect('mongodb+srv://express-one:Kamikaz1@express-one-vpvtr.mongodb.net/shop?retryWrites=true')
    .then(connection => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Georges',
                    email: 'favouille@gmail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch(err => console.log(err));

