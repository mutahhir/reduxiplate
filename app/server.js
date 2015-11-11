import express from 'express';
import morgan from 'morgan';
import compress from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorhandler from 'errorhandler';
import path from 'path';

const app = express();

import apiRouter from './server/routes/api';

app.set('port', process.env.PORT || 3000);
app.use(compress());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'client'), {maxAge: 31557600000}));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.send(path.join(__dirname, 'client', 'index.html'));
});

app.use(errorhandler());

app.listen(app.get('port'), () => {
  console.log(`Express Server listening on port ${app.get('port')} in ${app.get('env')} mode`); // eslint-disable-line no-console
});

export default app;
