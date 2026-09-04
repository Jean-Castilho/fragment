import CollectionRepository from './repositories/CollectionRepository.js';
import CollectionService from './services/CollectionService.js';
import CollectionController from './controllers/CollectionController.js';
import Router from './routes/Router.js';


// app.js
export async function createApp(db) {
    const repository = new CollectionRepository(db, 'items');
    await repository.initialize();
    const service = new CollectionService(repository);
    const controller = new CollectionController(service);

    const router = new Router();

    router.post('/getCollection', controller.create.bind(controller));
    router.get('/postCollection', controller.getAll.bind(controller));
    router.get('/collections/:id', controller.getById.bind(controller));
    router.put('/collections/:id', controller.update.bind(controller));
    router.delete('/collections/:id', controller.delete.bind(controller));

    return router;
}