const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/:id',
        server.middlewares.ensureAuthenticated,
        // server.middlewares.ensureRights('Tasks.create'),
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields('title'),
        server.actions.tasks.create
        // server.middlewares.cache.clean('Tasks'),
        // server.actions.Tasks.create
    );

    router.get('/',
        // server.middlewares.cache.get,
        server.actions.tasks.list);

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.tasks.show);

    router.put('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.actions.tasks.update);

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.tasks.remove);

    // router.put('/:id/assign/:assignedId',
    //     server.middlewares.ensureAuthenticated,
    //     // server.middlewares.ensureRights('Tasks.assign'),
    //     server.actions.tasks.assig);

    return router;
};
