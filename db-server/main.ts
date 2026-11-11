import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from "sqlite3";
import type { Album } from '../src/app/shared/interfaces/Album';
import type { LibraryDB, ServerDB } from '../src/app/shared/interfaces/LibraryDB'

const app = express();
const port = 3344;

const currentData: LibraryDB = {
  library: {
    vinyl: undefined,
    cd: undefined,
    dvd: undefined,
    blu_ray: undefined,
  },
  settings: {

  }
};
const db = new sqlite3.Database('home-discog.db');
console.log(db);

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/library', (req: express.Request, res: express.Response) => {
  let lib = new Map<string, Album>();
  let message: string = '';
  if (req.query && req.query['type']) {
    message = 'Fetched ' + req.query['type']
    switch (req.query['type'].toString().toLowerCase()) {
      case 'vinyl':
        // lib = db.data.library.vinyl;
        break;
      case 'cd':
        // lib = db.data.library.cd;
        break;
      case 'dvd':
        // lib = db.data.library.dvd;
        break;
      case 'blu_ray':
        // lib = db.data.library.blu_ray;
        break;
      default:
        message = 'No type included';
        lib = new Map<string, Album>();
    }
  }
  res.send({ msg: message, data: lib });
});

app.get('/settings', (req: express.Request, res: express.Response) => {
  res.send({ msg: 'Fetching settings', data: {} });
});

app.get('/album', (req: express.Request, res: express.Response) => {
  res.send({ msg: 'Fetching album' });
});

app.post('/album', (req: express.Request, res: express.Response) => {
  const album: Album = req.body;
  res.send({ msg: 'Added album' });
});

app.delete('/album', (req: express.Request, res: express.Response) => {
  res.send({ msg: 'Deleted album' });
});

app.listen(port, () => {
  console.log(`Server is running at <http://localhost>:${port}`);
});
