const PORT = 8000
const express = require('express')
const bcrypt = require('bcrypt')
const { v1: uuidv1} = require('uuid')
const app = express()
const cors = require('cors')
const StreamChat = require('stream-chat').StreamChat
const { connect } = require('getstream')
app.use(cors())
app.use(express.json())

const API_KEY = 'kvjfwedgn6km'
const API_SECRET = 'ncd9ht9u5wsaz5jhcs3fep3r3qhftcn8ht8vpupfs5fqrghx83ynvqu8trr43a64'
const APP_ID = '1167291'

//signup
app.post('/signup', async (req,res) => {
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

//login
app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const client = connect(API_KEY, API_SECRET, APP_ID)
        const chatClient = StreamChat.getInstance(API_KEY, API_SECRET)
        const {users} = await chatClient.queryUsers({name: username})

        if(!users.length) return res.json(400).json({message:"User not found!"})

        const success =  await bcrypt.compare(password, users[0].hashedPassword)
        const token = client.createUserToken(users[0].id)
        const confirmedName = users[0].name
        const userId = users[0].id

        if(success) {
            res.status(200).json({token, username: confirmedName, userId})
        } else {
            res.status(500).json({message: "Login Failed!"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})

app.listen(PORT, () => console.log("server running on Port " + PORT))

