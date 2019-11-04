const express = require('express');

const db = require('./data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    //SELECT * FROM accounts;

    db('accounts')
    .then(result => { 
        res.status(200).json(result);
    })
    .catch(error => { 
        res.status(500).json({ message: 'this went wrong: ' + error.message });
    });
});

router.post('/', async (req,res) => {
    //INSERT INTO (ColumnA) 
    //VALUES (dataA)
    try{ 
        const result = await db('accounts')
        .insert({
            budget: req.body.budget,
            name: req.body.name
        })
        res.json('New post got created with and id of ' + result[0]);
    }
    catch(error) { 
        res.status(500).json({ message: 'this went wrong: ' + error.message });
    }
})

module.exports = router;