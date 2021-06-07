import express from 'express';
import routes from './routes';
import auth from './config/authConfig';

const app = express();

app.use(auth.initialize());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("Server listen on port 3333");
});