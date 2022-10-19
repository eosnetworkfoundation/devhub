require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import compression from 'compression';
import helmet from "helmet";

const app = express();
app.disable('x-powered-by');

app.use(compression());
app.use(cors());
app.use(helmet());

const limit = '5mb';
app.use(bodyParser.urlencoded({ extended: true, limit }));
app.use(bodyParser.json({limit}));


// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req:any, res:any, next:any) => {
  const err:any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err:any, req:any, res:any, next:any) => {
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
