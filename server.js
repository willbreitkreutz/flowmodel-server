const express = require('express')
const cors = require('cors');
const app = express()
const port = 3030
const fs = require('fs');
const path = require('path')

app.use(cors())

app.get('/runs', (req, res, next) => {
  const runs = [];
  fs.readdir('model-runs', (err, files) => {
    if(err) return next(err);
    files.forEach((file) => {
      if(file[0] !== '.') runs.push(file)
    })
    res.json(runs)
  })
})

app.get('/runs/:run/list', (req, res, next) => {
  const items = [];
  fs.readdir(path.join('model-runs', req.params.run), (err, files) => {
    if(err) return next(err);
    files.forEach((file) => {
      if(file.indexOf('.json') !== -1) items.push(file);
    })
    res.json(items)
  })
})

app.use(express.static('model-runs'));

app.listen(port, () => {
  console.log(`Flowmodel server listening on http://localhost:${port}`)
})