import express, { Request, Response } from 'express';
import helmet from 'helmet';

(() => {
  const app = express();
  app.set('views', __dirname);
  app.set('view engine', 'ejs');
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());
  app.use(helmet());

  app.get('/', (_req: Request, res: Response): void => {
    res.render('index.ejs', {
      numberOfIteration: 50,
    });
  });

  app.use(express.static('public'));

  const port = 3000;
  app.listen(port, () => {
    console.log(`app listen to port:${port}`);
  });
})();
