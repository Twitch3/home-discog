import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFilePreset } from 'lowdb/node';
import type { Album } from '../src/app/shared/interfaces/Album';
import type { LibraryDB, ServerDB } from '../src/app/shared/interfaces/LibraryDB'

const app = express();
const port = 3344;

const defaultData: ServerDB = {
  library: {
    vinyl: undefined,
    cd: undefined,
    dvd: undefined,
    blu_ray: undefined,
  },
  settings: {

  }
}

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

const mapStringifyReplacer = (key: string, value: Album) => value instanceof Map ? Array.from(value.entries()) : value;
const mapParseReplacer = (key: string, value: Album) => Array.isArray(value) && value.every(Array.isArray) ? new Map(value) : value;

const db: Low<ServerDB> = await JSONFilePreset('db.json', defaultData);
console.log(db);

currentData.library.vinyl = JSON.parse(db.data.library.vinyl ? db.data.library.vinyl : '', mapParseReplacer);


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
        lib = db.data.library.vinyl;
        break;
      case 'cd':
        lib = db.data.library.cd;
        break;
      case 'dvd':
        lib = db.data.library.dvd;
        break;
      case 'blu_ray':
        lib = db.data.library.blu_ray;
        break;
      default:
        message = 'No type included';
        lib = new Map<string, Album>();
    }
  }
  res.send({ msg: message, data: lib });
});

app.get('/settings', (req: express.Request, res: express.Response) => {
  res.send({ msg: 'Fetching settings', data: db.data.settings });
});

app.get('/album', (req: express.Request, res: express.Response) => {
  res.send({ msg: 'Fetching album' });
});

app.post('/album', (req: express.Request, res: express.Response) => {
  const album: Album = req.body;
  db.data.library.vinyl.set(album.id, album);
  db.write();
  console.log(db.data);
  res.send({ msg: 'Added album' });
});

app.delete('/album', (req: express.Request, res: express.Response) => {
  res.send({ msg: 'Deleted album' });
});

app.listen(port, () => {
  console.log(`Server is running at <http://localhost>:${port}`);
});
