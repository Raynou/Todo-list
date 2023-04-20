const { Todo } = require("../db/models/todoModel.js");

const id = 1;
const name = "Claro";
const description = "Yo";

const edit = async () => {
  await Todo.update(
    { name: name, description: description },
    {
      where: {
        id: id,
      },
    }
  );
};

edit();
// Todo.findAll().then(res => console.log(res[0].dataValues)).catch(err => console.error(err));
