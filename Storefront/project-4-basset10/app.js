const express = require('express');

const zipcodes = require('zipcodes');

let app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

require("./models/db");

const mongoose = require('mongoose');


let eventController = require('./controllers/event');
const Store = mongoose.model("Store");
app.use(require('apikey')(auth));



function auth(key, fn) {
	if ('test' === key) {
		fn(null, { id: '1', name: 'John Dorian' });
	} else {
		fn(null, null);
	}
}



// All events
app.get('/store', eventController.getAllEvents);

// One event
app.get('/store/:id', eventController.getSingleEvent);

// New event
app.post('/store', eventController.addEvent);

// Modify event
app.put('/store/:id', eventController.editEvent);

// Delete event
app.delete('/store/:id', eventController.deleteById);




app.get('/search', async function (req, res) {
	var searchedStores = [];
	if (req.query.q) {


		//No zip or radius. Search nationwide
		if (!req.query.radius && !req.query.zip && !req.query.city && !req.query.state) {
			searchedStores = await Store.find(
				{ 'items.name': new RegExp(req.query.q, "i") }
			);
		}
		
		//No zip, but city and state, reverse lookup
		if (req.query.city && req.query.state && !req.query.zip) {
			if(req.query.radius){
				var l = zipcodes.lookupByName(req.query.city, req.query.state);
				var lookupZip = l.zip;
				const searchedStoresZip = await Store.find(
					{
						'items.name': new RegExp(req.query.q, "i")
					}
				);

				var i = 0;
				for (var zip in searchedStoresZip) {
					var dist = zipcodes.distance(searchedStoresZip[i].zip, lookupZip);
					console.log(searchedStoresZip[i].zip)
					console.log(dist);
					if (dist <= req.query.radius) {
						searchedStores.push(searchedStoresZip[i]);
					}
	
					i++
				}

			}else{
				var l = zipcodes.lookupByName(req.query.city, req.query.state);
				var lookupZip = l.zip;
				var rad = 20;
				const searchedStoresZip = await Store.find(
					{
						'items.name': new RegExp(req.query.q, "i")
					}
				);

				var i = 0;
				for (var zip in searchedStoresZip) {
					var dist = zipcodes.distance(searchedStoresZip[i].zip, lookupZip);
					console.log(searchedStoresZip[i].zip)
					console.log(dist);
					if (dist <= rad) {
						searchedStores.push(searchedStoresZip[i]);
					}
	
					i++
				}

			}
		}

		//Zip but no radius, assume 20 mile radius
		if (req.query.zip && !req.query.radius) {
			var loc = zipcodes.lookup(req.query.zip);
			const searchedStoresZip = await Store.find(
				{
					'items.name': new RegExp(req.query.q, "i")
				}
			);

			var i = 0;
			for (var zip in searchedStoresZip) {
				var dist = zipcodes.distance(searchedStoresZip[i].zip, loc.zip);
				console.log(searchedStoresZip[i].zip)
				console.log(dist);
				if (dist <= 20) {
					searchedStores.push(searchedStoresZip[i]);
				}

				i++
			}
		}

		//Zip and radius, use both
		if (req.query.radius && req.query.zip) {
			var loc = zipcodes.lookup(req.query.zip);
			console.log(loc);
			console.log(loc.zip)
			const searchedStoresZip = await Store.find(
				{ 'items.name': new RegExp(req.query.q, "i") }
			);
			var i = 0;
			for (var zip in searchedStoresZip) {
				var dist = zipcodes.distance(searchedStoresZip[i].zip, loc.zip);
				console.log(searchedStoresZip[i].zip)
				console.log(dist);
				if (dist <= req.query.radius) {
					searchedStores.push(searchedStoresZip[i]);
				}

				i++

			}
		}
		res.json({
			status: "success",
			data: {
				store: searchedStores
			}
		});

	} else {
		res.status(400);
		res.json({
			status: "error",
			message: {
				q: "Must have a value"
			}
		});
	}

});

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' +
		app.get('port') + '; press Ctrl-C to terminate.');
});
