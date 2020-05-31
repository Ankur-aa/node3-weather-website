const request = require('request')

const geocode= (address,callback) =>{
    const url1='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5rdXI4NjgiLCJhIjoiY2thaHpjZzJvMGxiZzJzbzBwcnZnMnF3NiJ9.efpc93_g3FsGBXUZXIHu3A&limit=1'
    request({url: url1,json: true},(error,response) =>{
          if(error){
              callback('unable to connect',undefined)
          }
      else if(response.body.features.length === 0){
              callback('location not found',undefined)
          }
          else{
          callback(undefined,{
              longitude:response.body.features[0].center[0],
              latitude: response.body.features[0].center[1],
              location: response.body.features[0].place_name
          })
      }}
          )
 }

 module.exports = geocode