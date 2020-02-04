const path =require('path')
const express = require('express')
const app = express()
const hbs =require('hbs')
const geocode =require('./util/geocode')
const forcast =require('./util/forcast')

const port = process.env.PORT || 3000

//Define path for express config
const publicDirName = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

//Setup handle bar engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
//color effect gayab hotat he line kadali tar
app.use(express.static(publicDirName))


app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name : 'mayur beldar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title :'About us ',
        name : 'mayur beldar'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title :'Help',
        name :'mayur beldar'
      
    })
})



app.get('/weather',(req , res) => { 
    
    if(!req.query.address)
    {
        return res.send({
            error : 'You must provide the address'
        })
    }

    geocode(req.query.address,(error,{long,lat,location}={})=>{
        if(error) return res.send({error})
        // console.log(long,lat);
        // console.log(location);
        
        forcast(long,lat,(error,forecast)=>{
    
            if(error) return res.send({error})
            //console.log(data)

            res.send({
                
                forecast : forecast,
                location,
                address : req.query.address
             })
        })
    }) 
 })


      app.get('/help/*',(req, res)=>{
        res.render('404_all',{
            title :'404',
            name :'mayur beldar',
            errorMessage :'page content not available'

          
        })
    })

    app.get('*',(req, res)=>{
        res.render('404_all',{
            title :'404',
            name :'mayur beldar',
            errorMessage : '404 not found'
        })
    })
    
    
app.listen(port,()=>{
    console.log("Server listenig on port " +port)
})