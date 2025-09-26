import express from 'express';
import cors from 'cors';

import { JSONFilePreset } from 'lowdb/node';

const app = express();
const port = 3344;

const defaultData: any[] = [];
const db = await JSONFilePreset('db.json', defaultData);

app.use(cors());

app.get('/library', (req: express.Request, res: express.Response) => {
  res.send({ msg: 'Hello, TypeScript with Express!', data: db.data });
});

app.get('/album', (req: express.Request, res: express.Response) => {
  res.send({ msg: 'Hello, TypeScript with Express!' });
});

app.post('/album', (req: express.Request, res: express.Response) => {
  res.send({ msg: 'Hello, TypeScript with Express!' });
});

app.listen(port, () => {
  console.log(`Server is running at <http://localhost>:${port}`);
});
