import express from 'express';
import fs from 'fs-promises';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {});

app.get('/high-score', (req, res) => {});

app.get('/info', (req, res) => {});

// API Routes

app.get('/api/compare', (req, res) => {});

app.get('/api/high-score', (req, res) => {});

app.post('/api/high-score', (req, res) => {});
