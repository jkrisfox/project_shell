const express = require('express');
const authenticated = require('./authenticated');
const { ToDo } = require('../models');

const router = express.Router();

router
  .route('/')
  .all(authenticated)
  // get all todos
  .get((req, res) => {
    req.authenticatedUser.getToDos().then(todos => {
      res.json({
        todos: todos || []
      });
    });
  })

  // create  todo
  .post((req, res) => {
    const { subject, dueDate, done } = req.body;
    const newTodo = ToDo.build({
      subject,
      done,
      dueDate
    });
    newTodo.setUser(req.authenticatedUser).then(() =>
      newTodo.save().then(() => {
        res.json(newTodo);
      })
    );
  });

router
  .route('/:id')
  .all(authenticated)
  .all((req, res, next) => {
    ToDo.findOne({
      where: {
        id: req.params.id,
        userId: req.authenticatedUser.id
      }
    }).then(todo => {
      if (todo) {
        req.todo = todo;
        next();
      } else {
        res.status(404);
      }
    });
  })

  // get a specific todo
  .get((req, res) => {
    res.json(req.todo);
  })

  // update a given todo
  .put((req, res) => {
    const { subject, dueDate, done } = req.body;
    const todoToUpdate = req.todo;
    todoToUpdate.subject = subject;
    todoToUpdate.dueDate = dueDate;
    todoToUpdate.done = done;
    todoToUpdate.save().then(updatedTodo => {
      res.json(updatedTodo);
    });
  })

  .delete((req, res) => {
    const { todo } = req;
    todo.destroy().then(() => {
      res.json({ delete: true });
    });
  });

module.exports = router;
