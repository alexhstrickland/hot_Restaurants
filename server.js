
// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3040;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// tables array
const tables = [];
const waitList = [];


// routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

app.get('/api/tables', (req, res) => res.json(tables));

app.get('/api/waitlist', (req, res) => res.json(waitList));

// make a reservation
app.post('/api/tables', (req, res) => {
   
    const  newReservation = req.body;
    
    console.log(newReservation);

    console.log(tables.length);
    // if statement to decide whether to add to reservation list or waitlist based on length of reservation list
    if(tables.length < 5){
        tables.push(newReservation);
        res.json(newReservation);
    }
    else{
        waitList.push(newReservation);
        res.json(newReservation);
    }
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));