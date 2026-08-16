import { Router } from 'express';
import { messageController } from '../controllers/message.controller.js';

const router = Router();

router.get('/', messageController.getMessages);
router.post('/', messageController.createConversation);
router.post('/:conversationId', messageController.sendMessage);

export default router;
