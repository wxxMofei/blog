const koa = require('koa'),
    app = new koa(),
    router = require('koa-router')(),
    json = require('koa-json'),
    koajwt = require('koa-jwt'),
    bodyparser = require('koa-bodyparser');

const db = require('./server/config/db.js'),
    errorHandle = require('./server/middlewares/errorHandle.js'),
    sendHandle = require('./server/middlewares/sendHandle.js');

const user = require('./server/routes/user.js');

app.use(json());
app.use(bodyparser());
app.use(sendHandle());
app.use(errorHandle);
app.use(koajwt({
        secret: 'note_token'
    }).unless({
        path: [/\/user\/register/, /\/user\/login/]
    }));

router.use('/api', user.routes());
app.use(router.routes());

app.listen('3000', () => {
    console.log('koa is listening in 3000');
})