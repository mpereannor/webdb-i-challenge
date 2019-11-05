const express = require('express');

const db = require('./data/dbConfig');

const router = express.Router();


//fetch data
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


//fetch data by id 
router.get('/:id', async (req, res) => { 
    
    /*SELECT * FROM accounts 
    WHERE id = id 
    */

    try { 
        const result = await db('accounts')
        .where({id: req.params.id});
        res.status(200).json(result[0]);
    }
    catch (error) { 
    res.status(500).json({ message: 'this went wrong: ' + error.message });
    }
});


//insert new data 
router.post('/', async (req,res) => {

    /*INSERT INTO (ColumnA) 
    VALUES (dataA)
    */

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
});

//update data 
router.put('/:id', async (req, res) => {

    /*UPDATE accounts
    SET budget = new time', name = 'new name'
    WHERE id = an (id);
    */

  db('accounts')
  .where({ id: req.params.id })
  .update({
    budget: req.body.budget,
    name: req.body.name,
  })
  .then(updatedBudget => {
    res.json(updatedBudget + ' records got changed!' );
  })
  .catch(error => {
    res.status(500).json({ message: 'this went wrong: ' + error.message });
  });
})

//delete data 
router.delete('/:id', async (req, res) => {
    // DELETE FROM posts WHERE id = 1;

  db('accounts')
  .where( {
      id: req.params.id
  })
  .del()
  .then(deletedBudget => {
      res.json(deletedBudget + 'row got deleled!');
  })
  .catch(error => 
    {
    res.status(500).json('this went wrong: ' + error.message)
    })
})
module.exports = router;