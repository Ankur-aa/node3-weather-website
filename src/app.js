const express = require('express')
const path = require('path')
const app = express()
const port= process.env.PORT || 3000
const hbs=require('hbs')
const geocode = require('./utils/geocode.js')
const forecast= require('./utils/forecast.js')
const publicdirpath = path.join(__dirname,'../public')
const viewspath= path.join(__dirname,'../templates/views')
const partialspath= path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)
// app.engine('hbs', require('hbs').__express);
 app.use(express.static(publicdirpath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'andreeew'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me ',
        name:'andreeew'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help ',
        name:'andreeew'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error : 'provide location'
        })
    }
    geocode(req.query.location,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:'invalid location'
            })
        }
        forecast(latitude,longitude,(error,forecastresponse)=>{
            if(error){
                return res.send('Invalid location')
            }
            return res.send({
                forecast:forecastresponse,
                address: req.query.location,
                location
            })

        })
    })
    

})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        para:'help page not found',
        name:'andrew'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        para:'404 page not found',
        name:'andrew'
    })
})
app.listen(port,()=>{
    console.log('this is running on'+ port)
})