const express = require('express');
const dataStore = require('nedb')
const app = express();
app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));// increases the size of file recieving to the server
let dataBase = new dataStore('dataBase.db');
dataBase.loadDatabase();

// before in the iss app we need not to worry about "what we need to send back?" but now :-/ we use the server to save the data into a data base 
app.post('/api',(request,response)=>{
    
    const data = request.body
    const timeStamp = Date.now();
    data.timeStamp = timeStamp;
    dataBase.insert(data)
    response.json(data) // it will take back the response to the client side javascript
    
});
// it will find all the data and send the data as a response
app.get('/api',(request,response)=>{
    dataBase.find({},(err,data)=>{
       if (err){
           response.end()
           return
       }
        response.json(data)
    })
    
})