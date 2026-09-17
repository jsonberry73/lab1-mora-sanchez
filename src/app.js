const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Conexión a MongoDB (usando el host interno 'db' de Docker)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password123@db:27017/team_notes?authSource=admin';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use(require('./routes/index'));

module.exports = app;