const request=require('request')
/**************callback abstraction challenge **********/
const forecast=(latitude,longitude,callback)=>{
    var url='https://api.darksky.net/forecast/947d854f24384714f952fe4c95577e5c/'+latitude +','+ longitude
 request({url,json:true},(error,{body})=>{
   if(error){
     callback('Unable to connect weather service.',undefined)
   }else if(body.error){
     callback('Unable to find location.',undefined)
   }else{
  callback(undefined,body.daily.data[0].summary+ ' It is currently '+body.currently.temperature+' degrees out. This high today is '+ body.daily.data[0].temperatureHigh +' with low  of '+ body.daily.data[0].temperatureLow +'. There is a '+body.currently.precipProbability+'% chance of rain.') 
}
})
}
module.exports=forecast;