const { Todo } = require("./models/todoModel.js");
const create = async (name, description) => {
  await Todo.create({
    id: null,
    name: name,
    description: description,
  });
};

const getAll = async () => {
  const res = await Todo.findAll();
  return res;
};

const getById = async (id = 1) => {
  const res = await Todo.findByPk(id);
  return res;
};

const edit = async (todo) => {
  const [id, name, description] = Object.values(todo);
  await Todo.update(
    { name: name, description: description },
    {
      where: {
        id: id,
      },
    }
  );

};

const destroy = async (id) => {
  await Todo.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
  destroy,
};
