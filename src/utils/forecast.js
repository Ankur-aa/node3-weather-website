
const request = require('request')

const forecast =(longitude,latitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=8f766ae494a8b6b7d6a732a4111d8171&query='+longitude+','+latitude
    request({url: url, json: true},(error,response) =>{
     if(error){
         callback('unable to connect',undefined)
     }
 else if(response.body.error){
         callback('location not found',undefined)
     }
     else{
         callback(undefined, response.body.current.weather_descriptions[0]+'.It is currently '+response.body.current.temperature+' degrees out.It feels like '+response.body.current.feelslike+' degrees out.The humidity is '+response.body.current.humidity+'%')
          }
      })
 }
 module.exports=forecast