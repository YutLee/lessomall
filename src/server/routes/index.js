import express from 'express';
import baseRender from '../baseRender';
import todoApp from '../../client/reducers';
import App from '../../client/components/App';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const {initialState, html} = baseRender(todoApp, App);

  res.render('index', {app: app, initialState: JSON.stringify(initialState)});
});

export default router;
