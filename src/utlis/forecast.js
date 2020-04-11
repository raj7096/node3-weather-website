const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/304a951670577520e02dd3bffe647271/'+latitude+','+longitude+'?units=si'
  request ({ url, json:true},(error,{body})=>{
      if(error){
          callback('Unable To access Weather Service!',undefined)
      }else if(body.error){
          callback('Unable To Locate')
      }else{
          callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
      }
  })
}
module.exports = forecast
