// PRINCIPAL

import express from 'express';
import cors from 'cors';
import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';
import { authentication } from './src/middlewares/authentication.js';

const PORT = 3000;
const app = express();

// 1. MIDDLEWARES DE APLICACIÓN

// Permite las solicitudes de origen cruzado (Cross-Origin Resource Sharing).
app.use(cors());

// Express convierte automáticamente el JSON recibido en el cuerpo de la petición a un objeto JavaScript
app.use(express.json());


// 2. RUTAS PUBLICAS (sin autenticación)
app.get('/', (req,res)=> {
    res.send('Server Express')
})
app.use('/auth', authRouter);


// 3. RUTAS PROTEGIDAS (con autenticación)
app.use('/api', authentication, productsRouter);
// app.use('/api/categories', authentication, categoriesRouter);
// app.use('/api/users', authentication, usersRouter);


// 4. MIDDLEWARE PARA MANEJO DE ERRORES

// Middleware 404 - Debe ir después de todas las rutas
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});

// Middleware de manejo de errores general
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (res.headersSent) return next(err);
    res.status(500).send('¡Algo salió mal!');
});

// 4. INICIAR SERVIDOR (solo en desarrollo local)
if (!process.env.VERCEL) {
    app.listen(PORT, (req, res)=>{
        console.log("");
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
        console.log("");    
    });
}

export default app;