'use strict'

const cars = require('./cars.js')
const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/cars/', (req, res) => res.send ({data:cars}))
app.get('/api/cars/:carId', (req, res) => {
    const carId = parseInt(req.params.carId)
    const car = cars.find(car => car.id === carId)

    res.send({data: car })
})
app.post('/api/cars/', (req, res) => {
    const {make, model, colour} = req.body
    const newCar = {
        id: Date.now,
        make,
        model,
        colour
    }
    newCar.id = Date.now()
    cars.push(newCar)
    res.status(201).send({data: newCar});
})

app.patch('/api/cars/:carId', (req, res) => {
    const carId = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === carId)
    if (index < 0) {
        res.status(404).send({
            errors: [
             {
                 status: 'Not Found',
                 code: '404',
                 title: 'Resource does not exist',
                 description: 'We could not find a car with id: ${carId}'
            }  
            ]
        })
     } else {
         
    const {make, model, colour} = req.body
    const updatedCar = {carId, make, model, colour}
    cars[index] = updatedCar

    res.status(200).send({data: updatedCar})

    }
})

app.put('/api/cars/:carId', (req, res) => {
    const carId = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === carId)
    if (index < 0) {
        res.status(404).send({
            errors: [
             {
                 status: 'Not Found',
                 code: '404',
                 title: 'Resource does not exist',
                 description: 'We could not find a car with id: ${carId}'
            }  
            ]
        })
     } else {
         
    const {make, model, colour} = req.body
    const updatedCar = {carId, make, model, colour}
    cars[index] = updatedCar

    res.status(200).send({data: updatedCar})

    }
})

app.delete('/api/cars/:carId', (req, res) => {

        const carId = parseInt(req.params.carId)
        const index = cars.findIndex(car => car.id === carId)    
        if (index < 0) {
            res.status(404).send({
              errors: [
                {
                  status: 'Not found',
                  code: '404',
                  title: 'This resource does not exist',
                  description: `Could not find car with id: ${carId}`
                }
              ]
            })
          } else {
            let deletedCar = cars[index]
            cars.slice(index, 1)
            res.json(deletedCar)    
          }
    
    })

const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))