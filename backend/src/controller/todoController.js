var Todo = require('../model/todo');

var controller = {};

controller.getTodos = (request, response) => {
    Todo.find({}, function (err, todos) {
        if (err) throw err;

        var result = todos.map(todo => ({ id: todo.id, name: todo.name, isCompleted: todo.isCompleted }));
        response.json(result);
    });
}

controller.create = (request, response) => {
    var newTodo = Todo(request.body);
    newTodo.save(error => {
        if (error) throw error;

        console.log('Todo created!');
        response.status(201).end();
    })
}

controller.update = (request, response) => {
    Todo.findOne({ id: request.body.id }, function (err, todo) {
        if (err) throw err;

        Object.keys(request.body).forEach(property => {
            todo[property] = request.body[property]
        })

        todo.save(error => {
            if (error) throw error;

            console.log('Todo updated!');
            response.end();
        })
    });
}

controller.delete = (request, response) => {
    Todo.findOne({ id: request.query.id }, function (err, todo) {
        if (err) throw err;

        todo.remove(error => {
            if (error) throw error;

            console.log('Todo deleted!');
            response.end();
        })
    });
}

module.exports = controller;