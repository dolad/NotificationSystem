import express from 'express';

const app = express();
const port = 8000;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  return console.log(`server is listening on ${port}`);
});