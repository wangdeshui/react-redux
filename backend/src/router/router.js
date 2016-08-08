var todoController = require('../controller/todoController');

var router = {};

router.config = (appServer) => {
    
    appServer.route('/api/todos')
        .get(todoController.getTodos)
        .post(todoController.create)
        .put(todoController.update)
        .delete(todoController.delete)
}

module.exports = router;