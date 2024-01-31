import express from 'express';
import { getUsers } from './server.mjs';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Błąd podczas pobierania użytkowników:', error);
    res.status(500).send('Błąd pobierania użytkowników');
  }
});

export default router;
