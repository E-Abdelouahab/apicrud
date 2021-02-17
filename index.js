import express from 'express'
import DataStore from 'nedb'

const PORT = 5000

//BDD
const db = new DataStore({ filename : "Patient"})
db.loadDatabase()

// Start Express 
const app = express()

app.use(express.json())

// API CRUD

//Create
app.post('/api/perso', (req, res) => {
    console.log(req.body)
    db.insert(req.body)
    res.send(req.body)
})

// Read All
app.get('/api/perso', (_req, res) => {
    db.find({}, (err, docs) => {
        if (err) console.log(err)

         res.send(docs)
    })
})

// Read one
app.get('/api/perso/:id', (req, res) => {
    db.find({ _id : req.params.id}, (err, docs) => {
        if (err) console.log(err)

         res.send(docs)
    })
})

// Update
app.patch('/api/perso/:id', (req, res) => {
    db.update({ _id: req.params.id}, {$set: {...req.body } })
    res.send(req.body)
})

// Delete
app.delete('/api/perso/:id', (req, res) => {
    db.remove({_id: req.params.id})
    
})

app.listen(PORT, ()=> {
    console.log(`Le serveur lancé sur le port : ${PORT}`)
})