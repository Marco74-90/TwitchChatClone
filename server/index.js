const PORT = 8000
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.post('/signup', async(req,res) => {
    try {
        const {username, password} = req.body

    } catch (error) {
        console.log(error)
        
        res.status(500).json({message: error})
    }
})

app.listen(PORT, () => console.log("server running on Port " +PORT))
