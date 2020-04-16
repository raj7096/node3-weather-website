const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Path For Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlerbars Engine and View Location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static Directory To serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Raj Rathore'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Raj Rathore'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'For Any Help Or Query You Can Contact Me',
        title:'Help',
        name:'Raj Rathore'
    })
})

app.get('/Weather',(req, res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:'You Must Provide Address!'
        })
    }
         
    geocode(address,(error,{latitude,longitude,location} = {})=>{
        if (error){
          return res.send({error})
        }
        
        forecast(latitude,longitude, (error,forecastData) => {
            if (error){
              return  res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address
            })          
          })
        
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Raj Rathore',
        errorMessage:'Page Not Found'
    })
})

app.listen(port,()=>{
    console.log('Server Is On At' +port)
})