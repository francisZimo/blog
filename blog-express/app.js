var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


if (process.env.NODE_ENV !== 'pro') {
    app.use(logger('dev'));
} else {
    let pathName = path.join(__dirname, 'log', 'access.log')
    const writeSteam = fs.createWriteStream(pathName, {
        flags: 'a'
    })

    app.use(logger('combined', {
        stream: writeSteam
    }))
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const sessionStore = new RedisStore({
        client: redisClient
    })
    // session
app.use(session({
    secret: 'franciszimo',
    cookie: {
        path: '/', //默认配置
        httpOnly: true, // 默认配置
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
}))


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;