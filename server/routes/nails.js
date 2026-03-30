import express from 'express';
import nailsController from '../controllers/nails.js';

const router = express.Router();

router.post('/nails', nailsController.createNails);
router.get('/nails', nailsController.getNails);
router.get('/nails/:id', nailsController.getNailsById);
router.put('/nails/:id', nailsController.editNails);
router.delete('/nails/:id', nailsController.deleteNails);

export default router;