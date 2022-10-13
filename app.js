const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// Partials reg
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(response => {
      res.render('beers.hbs', {
        allTheBeers: response
      });
    })
    .catch(error => {
      console.log(error);
    });
});


//.getRandom gives an array with 1 obj
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(response => {
      res.render('random-beer.hbs', { 
        randomBeer: response[0]
      });
    })
    .catch(error => {
      console.log(error);
    });
});

//:beer give a "id" property from beerpartial
//punkAPI.getBeer(beer) give a beer from id
app.get('/beers/:beer', (req, res) => {
  let { beer } = req.params;
  punkAPI.getBeer(beer)
    .then(response => {
      console.log(response);
      res.render('selectedBeer.hbs', {
        selectedBeer: response
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
