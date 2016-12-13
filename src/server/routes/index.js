import express from 'express';
import baseRender from '../baseRender';
import todoApp from '../../client/reducers';
import App from '../../client/components/App';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const {initialState, html} = baseRender(todoApp, App);
  console.log(html);
  res.render('index', {title: 'index', html: html, initialState: JSON.stringify(initialState)});
});

export default router;
