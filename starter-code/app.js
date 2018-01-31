const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res) => {
	client.getRandomJoke()
		.then((response) => {
			res.render('joke', { value: response.value });
		}).catch((err) => {
			res.render('joke', { value: err.message });
		});
});

app.get('/categories', (req, res) => {
	let category = req.query.cat;
	if (category) {
		client.getRandomJoke(req.query.cat)
			.then((response) => {
				res.render('joke-by-category', { category: category, joke: response.value });
			}).catch((err) => {
				res.render('joke', { value: err.message });
			});
	} else {
		client.getJokeCategories()
			.then((response) => {
				res.render('categories', { categories: response });
			})
			.catch((err) => {
				res.render('joke', { value: err.message });
			});
	}
});

app.get('/search', (req, res) => {
	res.render('search-form');
});

app.post('/search', (req, res) => {
	let input = req.body.input;
	client.search(input)
		.then(function (response) {
			if (response.count > 0) {
				res.render('joke', { value: response.items[0].value });
			} else {
				res.render('joke', { value: "Nothing found" });
			}
			
		}).catch(function (err) {
			res.render('joke', { value: err.message });
		});
});

app.get('/', (req, res) => {
	res.render('index');
});

// Server Started
app.listen(3000, () => {
	console.log('My first app listening on port 3000!');
});
