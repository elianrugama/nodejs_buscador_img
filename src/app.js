import express from 'express';
import cors from 'cors';
import imageSearchRouter from './routes/imageSearch.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de salud
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'API de búsqueda de imágenes funcionando'
  });
});

// Rutas
app.use('/api', imageSearchRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 