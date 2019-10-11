const request=require('request')
/**************callback abstraction **********/
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicHJhdmFsbGlrYXNhbmFib3lpbmEiLCJhIjoiY2sxMHFibHc1MDhrcTNucDJyYnpvYmI3eSJ9.1IyDXJ6v3dZFn3btcOnpKw'
    request({url,json:true},(error,{body})=>{
         if(error){
           callback('Unable to connect location service.',undefined)
         }else if(body.features.length===0){
           callback('Unable to find location.Try another search.',undefined)
         }else{
           callback(undefined,{
               latitude:body.features[0].center[1],
               longitude:body.features[0].center[0],
               location:body.features[0].place_name
           })    
    }
      
    })
  }
 module.exports=geocode;