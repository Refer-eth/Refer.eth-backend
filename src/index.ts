import morgan from 'morgan';
import Express from 'express';
import router from './routers/router';

console.log('<<<Starting Refer.eth backend>>>');

const app = Express();
app.use(morgan('dev'));
app.use(Express.json());
app.use('/api', router);

app.listen(3000, 'localhost', () => console.log('server is up and running'));
