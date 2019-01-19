const express       = require('express')
const morgan        = require('morgan')
const marker = require('@ajar/marker'); 
require('dotenv').config();


const webRouter = require('./routes/web')
const apiRouter = require('./routes/api')

const app = express()

const { PORT, HOST } = process.env;

app.use(morgan('dev'))

//routing
app.use('/api',apiRouter)
app.use('/',webRouter)

app.get('*',(req,res)=> {
  res.status(404).send('<h1>Go figure!!!</h1>')
})

app.listen(PORT,HOST, err => {
  if(err) marker.error(err);
  else marker.magenta(`🌎  Express: `,`http://${HOST}:${PORT}`);
});

