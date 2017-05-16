var express = require('express');
var consolidate = require('consolidate');
var bodyparser = require('body-parser');

var app = express();

app.set('views', './views');
app.engine('html', consolidate.nunjucks);
app.use('/static', express.static('./static'));
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', function(request, response) {
	response.render('index.html');
});

app.get('/profile/:username', function(request, response){
	var username = request.params.username;
	response.render('profile.html', {
		name: username
	});
});

app.post('/submit', function(request, response){
	var username = request.body.username;
	if(username == null){
		response.redirect('/');
	} else {
		response.redirect('/profile/' + username);
	}
});

app.listen(3000, function () {
	console.log('Server is running on port 3000...')
});