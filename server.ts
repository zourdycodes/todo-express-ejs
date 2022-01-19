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

  app.post('/', (req: Request, res: Response): void => {
    const data = req.body;
    controllers.addNote(data);

    res.redirect('/notes');
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
