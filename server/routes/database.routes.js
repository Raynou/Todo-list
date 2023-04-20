const { Router } = require("express");
const router = Router();
const Todo = require("../db/todo.js");

router
  .route("/database")
  .get(async (req, res) => {
    const data = await Todo.getAll();
    const todos = [];
    data.forEach((obj) => {
      todos.push(obj.dataValues);
    });
    res.send(todos);
  })
  .post(async (req, res) => {
    const name = req.body?.name;
    const description = req.body?.description;
    await Todo.create(name, description);
    res.sendStatus(200);
  })
  .put(async (req, res) => {
    const objective = req.body;
    await Todo.edit(objective);
    res.sendStatus(200);
  })
  .delete(async (req, res) => {
    const id = req.body?.id;
    await Todo.destroy(id);
    res.sendStatus(200); // Mala práctica XD
  });

router.get("/database/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.getById(id);
  res.send(todo);
});

module.exports = router;
