# Deployment Guide - Render

This project is deployed on Render with two separate services:

## 🌐 Live URLs

- **Frontend (Website)**: https://cursorincidentmanagement.onrender.com
- **Backend (API Server)**: https://cursorincidentmanagementsystem.onrender.com

## 📋 Architecture

```
User's Browser
    ↓
https://cursorincidentmanagement.onrender.com (React Frontend)
    ↓
    ↓ API Calls
    ↓
https://cursorincidentmanagementsystem.onrender.com/api (Node.js Backend)
    ↓
JSON File Storage (incidents.json)
```

## 🚀 Deployment Steps

### Backend Deployment (Already Done ✅)

1. **Service**: https://cursorincidentmanagementsystem.onrender.com
2. **Type**: Web Service
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm start`
5. **Environment Variables**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `PORT`: 3001 (or Render's default)

### Frontend Deployment (Already Done ✅)

1. **Service**: https://cursorincidentmanagement.onrender.com
2. **Type**: Static Site
3. **Build Command**: `cd frontend && npm install && npm run build`
4. **Publish Directory**: `frontend/dist`
5. **Environment Variables**:
   - `VITE_API_URL`: https://cursorincidentmanagementsystem.onrender.com/api

## 🔧 Configuration

### Backend CORS Setup

Make sure your backend (`backend/src/server.ts`) allows requests from your frontend:

```typescript
app.use(cors({
  origin: [
    'https://cursorincidentmanagement.onrender.com',
    'http://localhost:3000' // for local development
  ]
}));
```

### Frontend API Configuration

The frontend is configured to call the backend directly at:
- **Production**: https://cursorincidentmanagementsystem.onrender.com/api
- **Local Dev**: http://localhost:3001/api

This is set in:
- `frontend/src/config.ts`
- `frontend/rsbuild.config.ts` (via `__API_URL__` environment variable)

## 📝 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
PORT=3001
```

### Frontend (Render Environment Variables)
```env
VITE_API_URL=https://cursorincidentmanagementsystem.onrender.com/api
```

## 🔄 Update Deployment

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push
```
Render will auto-deploy if connected to GitHub.

### Update Frontend
```bash
cd frontend
npm run build
git add .
git commit -m "Update frontend"
git push
```
Render will rebuild and deploy automatically.

## 🧪 Testing

### Test Backend
```bash
curl https://cursorincidentmanagementsystem.onrender.com/api/health
# Should return: {"status":"ok","message":"Server is running"}
```

### Test Frontend
Visit: https://cursorincidentmanagement.onrender.com

## 🐛 Troubleshooting

### Frontend can't connect to Backend
1. Check CORS settings in backend
2. Verify `VITE_API_URL` environment variable on Render
3. Check backend logs on Render dashboard

### AI Assistant not working
1. Verify `OPENAI_API_KEY` is set in backend environment variables
2. Check backend logs for API errors
3. Ensure you have OpenAI credits available

### 404 Errors
1. Ensure backend is deployed and running
2. Check API endpoint URLs match
3. Verify frontend build includes correct API URL

## 📊 Monitoring

Check service status:
- Backend: https://cursorincidentmanagementsystem.onrender.com/api/health
- Frontend: https://cursorincidentmanagement.onrender.com

## 💰 Cost Optimization

Render free tier:
- Services may spin down after inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading to paid tier for always-on services

---

Last Updated: December 2025

