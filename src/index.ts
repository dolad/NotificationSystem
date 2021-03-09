import express from 'express';
import {App} from './app';
import {Subscription} from './controllers/subscription';
import {Publisher} from './controllers/publish';

const app3 = express();

const port : number = 9000;
const port2 :number = 8000;
const port3 :number = 9001;


const app1 = new App ([
    new Subscription(),
],
port
)
const app2 = new App ([
  new Publisher(),
],port2 )

app1.listen();
app2.listen();


app3.get('/', (req, res) => {
    res.send('The sedulous hyena3 ate the antelope!');
  });

app3.listen(port3, () => {
    console.log(`⚡️[server]: Server2 is running at http://localhost:${port3}`);
    return console.log(`server is listening on ${port3}`);
  });

