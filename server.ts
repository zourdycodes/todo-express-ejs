import { controllers } from './database';
import express, { Request, Response } from 'express';
import helmet from 'helmet';

(() => {
  const app = express();
  app.set('view engine', 'ejs');
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());
  app.use(helmet());

  app.get('/', (req: Request, res: Response): void => {
    const searchTerm = req.query.searchTerm;
    const notes = controllers.getNotes(searchTerm);
    res.render('index.ejs', {
      notes,
    });
  });

  app.get('/notes/:id', (req: Request, res: Response): void => {
    const id = +req.params.id;
    const note = controllers.getNote(id);

    if (!note) {
      res.status(404).render('404.ejs');
      return;
    }

    res.render('singleNote.ejs', {
      note,
    });
  });

  app.post('/', (req: Request, res: Response): void => {
    const data = req.body;
    controllers.addNote(data);

    res.redirect('/');
  });

  app.post('/notes/:id/delete', (req, res): void => {
    const id = +req.params.id;
    controllers.deleteNote(id);
    res.redirect('/notes');
  });

  app.use(express.static('public'));

  const port = 3000;
  app.listen(port, () => {
    console.log(`app listen to port:${port}`);
  });
})();
