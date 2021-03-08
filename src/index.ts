import express from 'express';
import {App} from './app';
import {Subscription} from './controllers/subscription';

const app2 = express();
const app3 = express();

const port = 8000;
const port2 = 9000;
const port3 = 9001;


const app1 = new App ([
    new Subscription(),
],
8000
)

app1.listen();

app2.get('/', (req, res) => {
    res.send('The sedulous hyena2 ate the antelope!');
  });

app2.listen(port2, () => {
    console.log(`⚡️[server]: Server2 is running at http://localhost:${port2}`);
    return console.log(`server is listening on ${port2}`);
  });



app3.get('/', (req, res) => {
    res.send('The sedulous hyena3 ate the antelope!');
  });

app3.listen(port3, () => {
    console.log(`⚡️[server]: Server2 is running at http://localhost:${port3}`);
    return console.log(`server is listening on ${port3}`);
  });

