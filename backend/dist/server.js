"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const incidents_1 = __importDefault(require("./routes/incidents"));
const chat_1 = __importDefault(require("./routes/chat"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware - CORS configuration
app.use((0, cors_1.default)({
    origin: [
        'https://cursorincidentmanagement.onrender.com', // Production frontend
        'http://localhost:3000', // Local development
        'http://localhost:3001', // Local API testing
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/incidents', incidents_1.default);
app.use('/api/chat', chat_1.default);
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
    }
    else {
        console.warn('⚠️  OpenAI API Key not configured');
    }
});
