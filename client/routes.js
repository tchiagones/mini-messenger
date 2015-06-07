/*
Routes
*/
Router.route('/', function () {
    this.render('home');
});

Router.route('/index', function () {
    this.render('index');
});

Router.route('/about', function () {
    this.render('about');
});

Router.route('/contact', function () {
    this.render('contact');
});