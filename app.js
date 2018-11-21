import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import serverRoutes from './routes/server';
import routes from './routes';


const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(morgan('dev', {
    skip: (req) => req.originalUrl.startsWith('/health'),
}));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// API
app.use('/server', serverRoutes);
app.use('/', routes);

// aws health check
app.use('/health', (req, res) => res.send('success'));

// listen
app.listen(port, () => console.log('Server is starting!'));
