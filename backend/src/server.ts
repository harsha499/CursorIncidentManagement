import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import incidentsRouter from './routes/incidents';
import chatRouter from './routes/chat';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS configuration
app.use(cors({
  origin: [
    'https://genieims.onrender.com', // Production frontend
    'http://localhost:3000', // Local development
    'http://localhost:3001', // Local API testing
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/incidents', incidentsRouter);
app.use('/api/chat', chatRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.OPENAI_API_KEY) {
    console.log('✅ OpenAI API Key configured');
  } else {
    console.warn('⚠️  OpenAI API Key not configured');
  }
});

