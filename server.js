const express = require('express');

const db = require('./data/accounts-model');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda webdb-i-challenge!</h2>
      <p>Welcome to the webdb-i-challenge!</p>
    `);
  });

  // GET
server.get('/api/budget', async (req, res) => {
    try {
      const budget = await db.find();
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving the budgets',
      });
    }
});

// GET BY ID
server.get('/api/budget/:id', async (req, res) => {
    const { id } = req.params
    try {
      const budget = await db.findById(id);
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving the budget',
      });
    }
});

// POST
server.post('/api/budget', async (req, res) => {
    try {
      const account = await db.add(req.body);
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({
        message: 'Error adding the account',
      });
    }
});

// PUT 
server.put('/api/budget/:id', async (req, res) => {
    const { id } = req.params
    try {
      const account = await db.update(id, req.body);
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'The account could not be found' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error updating the account',
      });
    }
});

// DELETE
server.delete('/api/budget/:id', async (req, res) => {
    const { id } = req.params
    try {
      const count = await db.remove(id);
      if (count > 0) {
        res.status(200).json({ message: 'The account has been removed' });
      } else {
        res.status(404).json({ message: 'The account could not be found' });
      }
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the account',
      });
    }
});

module.exports = server;