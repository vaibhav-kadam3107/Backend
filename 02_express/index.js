import 'dotenv/config'
import express from 'express' 
import logger from "./logger.js";
import morgan from "morgan";

const app = express() 
const port = process.env.PORT || 3000 

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(express.json())  

let usersData = [] 
let id = 1 

// Add a new user
app.post("/users", (req, res) => {
    const { name, roll_no } = req.body 
    const user = { id: id++, name, roll_no } 
    usersData.push(user) 
    res.status(201).send(user) 
}) 

// Get all users
app.get("/users", (req, res) => {
    res.send(usersData) 
}) 

// Get a specific user
app.get("/users/:id", (req, res) => {
    const user = usersData.find(user => user.id === parseInt(req.params.id)) 
    if (!user) {
        return res.status(404).send("User not found!") 
    }
    res.send(user) 
}) 

// Update a user
app.put("/users/:id", (req, res) => {  
    const user = usersData.find(user => user.id === parseInt(req.params.id)) 
    if (!user) {
        return res.status(404).send("User not found!") 
    }

    const { name, roll_no } = req.body 
    if (name) user.name = name 
    if (roll_no) user.roll_no = roll_no 
    
    return res.status(200).send(user)   
}) 

// Delete a user
app.delete("/users/:id", (req, res) => {  // Changed from "/user/:id" to "/users/:id"
    const index = usersData.findIndex(user => user.id === parseInt(req.params.id)) 
    if (index === -1) {
        return res.status(404).send("User not found!") 
    }
    
    usersData.splice(index, 1) 
    return res.status(204).send('User deleted')   // No response body for 204 status
}) 

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`) 
}) 
