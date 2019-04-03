const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('hbs', expressHbs());
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utils/path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) =>{
  res.status(404).render('404', {docTitle: 'Page Not Found - 404'});
})



app.listen(3000);