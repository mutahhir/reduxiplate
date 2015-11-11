import {Router} from 'express';

const api = Router();


api.get('/', (req, res) => {
  res.json({
    foo: 'Bar'
  });
});

api.get('/bar/:value', (req, res) => {
  res.json({
    param: req.params.value,
    foo: 'bar'
  });
});


export default api;
