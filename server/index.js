const PORT = 8000
const express = require('express')
const bcrypt = require('bcrypt')
const { v1: uuidv1} = require('uuid')
const app = express()
const cors = require('cors')
const { connect } = require('getstream')
app.use(cors())
app.use(express.json())

const API_KEY = 'kvjfwedgn6km'
const API_SECRET = 'ncd9ht9u5wsaz5jhcs3fep3r3qhftcn8ht8vpupfs5fqrghx83ynvqu8trr43a64'
const APP_ID = '1167291'

app.post('/signup', async(req,res) => {
    try {
        const {username, password} = req.body
        const userId = uuidv1()
        const hashedPassword =  await bcrypt.hash(password, 10)
        const client = connect(API_KEY, API_SECRET, APP_ID)
        const token = client.createUserToken(userId)

        res.status(200).json({username, userId, hashedPassword, token})

    } catch (error) {
        console.log(error)
        
        res.status(500).json({message: error})
    }
})

app.listen(PORT, () => console.log("server running on Port " + PORT))

