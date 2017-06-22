const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//set port dynmically
const port = process.env.PORT || 3000;
var app = express();
//setup partials-------------
hbs.registerPartials(__dirname+'/views/partials');
//set template engine------------
app.set('view engine', 'hbs');
//set helper ----------------
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});
//use middleware -------------
app.use((req, res, next)=>{
  var date = new Date().toString();
  var logTxt = `${date}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', logTxt+'\n', (error)=>{
    if(error){
      console.log('Unable to append to server.log.');
    }
  });
  console.log(logTxt);
  next();
});
//maintenance mood --------------
// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });
//set static contents------------
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage:"hi express users!"
  });
});

app.get('/json', (req, res)=>{
//  res.send('<h1>Hello Express!</h1>');
    res.send({
      name:'ෂෙහාන් ගමගේ',
      languages:[
        'Java',
        'JavaScript',
        'C#'
      ],
      frameworks:[
        'Spring',
        'NodeJs',
        'AngularJs'
      ]
    });

});

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
      pageTitle: 'අප ගැන'
    });
});

app.listen(port, ()=>{
  console.log(`Server is run on port ${port}`);
});
