const express       = require('express')
const bodyParser    = require('body-parser')
const morgan        = require('morgan')

const marker = require('@ajar/marker'); 

require('dotenv').config();
const { PORT, HOST } = process.env;

//instantiating app
const app = express()

//configurating middleware

const logger = (req,res,next)=>{
  marker.info(`req.url: ${ req.url }`)
  next()
}

app.use( logger )

// const logger = function(a,b,c){
//     //
//     return (req,res,next)=>{
//             marker.info(`req.url: ${req.url}`)
//             next()
//     }
// }

// app.use( logger('one','two','three') )

// app.use( (req,res,next) => {
//     marker.info(`request was called... ${req.url}`)
//     next()
// })

// //configuring app middleware
app.use( morgan('dev') );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())
app.use(express.json())

//define routes

app.get('/',(req,res)=>{
    res.send('Hello Express!!!');
})

app.get('/api',(req,res)=>{

    const data = [
        {id:1,bot_name:'Yossi',email:'yas@gmail.com'},
        {id:2,bot_name:'Jane',email:'ja@ne.com'},
        {id:3,bot_name:'Benson',email:'ben@son.com'},
    ]

    res.status(200).json( data );
//   res.send( JSON.stringify(data) )
    marker.obj(data,'/api - data:')
})

// test this url in the browser: 
// http://localhost:3030/search?level=6&food=sushi&place=tokyo
app.get('/search',(req,res)=> {

    marker.obj(req.query,'/search - req.query:')
    
    res.status(200).json(req.query)
})

app.get('/markup',(req,res)=>{

    const some_data = 'Inspired!'
    
    const markup = `<h1>Hello Express</h1>
                    <p>This is an example demonstrating some basic html markup<br/>
                        being sent and rendered in the browser</p>
                    <p>Prepare to be:</p>
                    <ul>
                        <li>Surprised!</li>
                        <li>Amazed!</li>
                        <li>${some_data}</li>
                    </ul>`

    res.status(200).send(markup)
})

app.get('/shows/:showID/:time',(req,res)=>{
    res.status(200).send(`<h1>Up next is Show #${req.params.showID}</h1> 
                    time: ${req.params.time}`)
})

app.get('/user/:user_id/edit',(req,res)=>{
    res.status(200).send(`<h1>Editing user #${req.params.user_id}</h1>`)
})


app.post('/shows',(req,res)=>{
    //instead of saving the sent data to a DB, we'll just display it
    marker.obj(req.body,'req.body is:');
    res.status(200).send(`Creating a new Show by the name of: ${req.body.showName}.`)
})

//this route describes a regexp pattern which handles
// /places/ +  any number of digits + optional slash + optional 'edit'
app.get(/\/places\/(\d+)\/?(edit)?/,(req,res)=>{
 //all of these urls will activate it:
 // places/456
 // places/456/
 // places/456/edit
    let message = `place #${req.params[0]}'s details`

    if(req.params[1] === 'edit')
        message = `Editing ${message}`
    else
        message = `Viewing ${message}`

    res.send(`<h1>${message}</h1>`)
});

app.get('/counter',(req,res)=>{
    let count = 0;
    const timer_id = setInterval(()=>{
        if(count === 4){
            res.end('finished counting')
            clearInterval(timer_id)
        }else{
            marker.info(count)
            count++;
            res.write('count = '+count+'\n')
        }
    },1000)
    
})

app.get('*',  (req, res) => {
    res.status(404).send('My 404 not found')
})
// app.get('*',(req,res)=>{
//     res.sendFile('../index.html')
// })

//start the server...
app.listen(PORT,HOST, err => {
    if(err) marker.error(err);
    else marker.magenta(`🌎  Express: `,`http://${HOST}:${PORT}`);
});
