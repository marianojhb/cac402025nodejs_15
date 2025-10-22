import express from 'express';

const router = express.Router();

router.get('/users', (req, res) => {
    res.send('Lista de usuarios');
});
router.post('/users', (req, res) => {
    res.send('Crear un nuevo usuario');
});
router.put('/users/:id', (req, res) => {
    res.send(`Actualizar usuario con ID: ${req.params.id}`);
});
router.delete('/users/:id', (req, res) => {
    res.send(`Eliminar usuario con ID: ${req.params.id}`);
});

export default router;