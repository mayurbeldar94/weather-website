const request = require('request')
const forcast = (lat,long,callback)=>{
    const url ='https://api.darksky.net/forecast/fbab4d53264367b2f5cbcbe86ee8ea13/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+''
    request({url, json:true},(error,{body})=>{
        if(error)   callback('unable to connect',undefined)
        
        else if(body.error)   callback("unable to find location",undefined)
        
        else
        {
            callback(undefined,`it is currrently ${body.currently.temperature} degree out. there is ${body.currently.precipIntensity}% chance of rain.`)
        }


    })

}
module.exports = forcast