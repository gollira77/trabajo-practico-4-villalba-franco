import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Probando API');
});

const PORT = process.env.PORT || 4000;

const init = async () => {
    try {
        await sequelize.authenticate(); 
        console.log('Base de datos conectada');

        await sequelize.sync(); 

        app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error al conectar:', err);
    }
};

init();