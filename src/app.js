 const path = require('path')
 const hbs = require('hbs')
 const express = require('express')
 const geocode = require('./utils/geocode.js')
 const forecast = require('./utils/forecast.js')
 const app = express()
 const port=process.env.PORT || 8000;
 /**********hbs path ************/
 app.set('view engine', 'hbs');
 /**********html files path *********/
 const htmlFilesPath = path.join(__dirname, '../front-end')
 app.use(express.static(htmlFilesPath)) //instead of 1,12,13lines we can use one line app.use(express.static('front-end'))
 /**************customizing views directory **********/
 const viewsPath = path.join(__dirname, '../templates/views')
 app.set('views', viewsPath)
 /***********partials **********/
 const partialsPath = path.join(__dirname, '../templates/partials')
 hbs.registerPartials(partialsPath)

 /***********dynamic pages with templating **********/
 app.get('', (req, res) => {
   res.render('index', {
     title: 'Weather',
     name: 'Pravallika'
   })
 })
 app.get('/about', (req, res) => {
   res.render('about', {
     title: 'About Me',
     name: 'Pravallika'
   })
 })
 app.get('/help', (req, res) => {
   res.render('help', {
     helptext: 'Need any help?',
     title: 'Help',
     name: 'Pravs'
   })
 })
 /**********weather page ******/
 app.get('/weather', (req, res) => {
   if (!req.query.address) {
     return res.send({
       error: 'You must provide address.'
     })

   }
   geocode(req.query.address, (error, {
     latitude,
     longitude,
     location
   } = {}) => {
     if (error) {
       return res.send({
         error
       })
     }

     forecast(latitude, longitude, (error, forecastData) => {
       if (error) {
         return res.send({
           error
         })
       }
       res.send({
         forecast: forecastData,
         location: location,
         address: req.query.address
       })

     })
   })

 })
 /***********querystring ********/
 app.get('/product', (req, res) => {
   if (!req.query.search) {
     return res.send({
       error: 'You must provide search query'
     })
   }
   console.log(req.query)
   res.send({
     product: []
   })

 })
 /**************help page **************/
 app.get('/help', (req, res) => {
   res.send([{
     name: 'pravallika',
     age: 22
   }, {
     name: 'surya',
     age: 24
   }])
 })
 /***********404 error *********/
 app.get('/help/*', (req, res) => {
   res.render('404', {
     title: '404',
     name: 'pravs',
     error: 'Help article not found'
   })
 })
 app.get('*', (req, res) => {
   res.render('404', {
     title: '404',
     name: 'pravs',
     error: 'Page not found'
   })
 })
 /************** main page ***********/
 //due to express.static, the html content in res.send is not appearing
 // app.get('',  (req, res)=> {
 //   res.send('<h1>Title page</h1>')
 // })


 /***********about page *********/
 // app.get('/about',(req, res)=> {
 //     res.send('<h1>About page</h1>')
 //   })
 app.listen(port, () => {
   console.log('server is running on port' +port)
 })