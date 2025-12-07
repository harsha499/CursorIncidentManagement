# AI Assistant Guide

## Overview

The AI Assistant is an intelligent chatbot integrated into the Incident Management System. It uses OpenAI's GPT-4 with function calling to understand natural language requests and perform operations on your incident database.

## Setup

### 1. Get an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy your API key (keep it secure!)

### 2. Configure Backend

1. Navigate to the `backend` directory
2. Copy the `env.template` file to `.env`:
   
   **Windows (PowerShell):**
   ```powershell
   Copy-Item env.template .env
   ```
   
   **Mac/Linux:**
   ```bash
   cp env.template .env
   ```

3. Edit the `.env` file and replace `your_openai_api_key_here` with your actual API key:
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
   PORT=3001
   ```
   
   ⚠️ **Important**: Never commit the `.env` file to git! It's already in `.gitignore`.

### 3. Install Dependencies

If you haven't already installed the dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Start the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Usage Examples

### Creating Incidents

**Example 1: Simple Creation**
```
User: Create a critical incident for database connection failure in production
AI: I'll create that incident for you. Which team should I assign this to?
User: Database Team
AI: ✅ Created incident successfully! ID: abc-123...
```

**Example 2: Detailed Creation**
```
User: Add a new incident: API timeout issues in staging environment, 
      high severity, reported by the DevOps team
AI: ✅ Created incident successfully!
    - Team: DevOps team
    - Severity: High
    - Environment: Staging
    - Status: Open
```

### Listing Incidents

**Example 1: List All**
```
User: Show me all incidents
AI: Here are all incidents in the system:
    1. [ID: abc-123] Critical - Database connection failure (Production) - Open
    2. [ID: def-456] High - API timeout (Staging) - In Progress
    ...
```

**Example 2: Filtered List**
```
User: What are all the critical incidents in production?
AI: Here are the critical production incidents:
    1. [ID: abc-123] Database connection failure - Open
    2. [ID: xyz-789] Server crash - In Progress
```

**Example 3: Search**
```
User: Find incidents related to database
AI: I found 3 incidents matching "database":
    ...
```

### Viewing Details

```
User: Show me details for incident abc-123
AI: Here are the details:
    📋 Incident ID: abc-123
    👥 Team: Database Team
    📝 Description: Database connection failure
    🔥 Severity: Critical
    🌍 Environment: Production
    📊 Status: Open
    📅 Created: 2025-12-07 10:30 AM
    📅 Updated: 2025-12-07 10:30 AM
```

### Updating Incidents

**Example 1: Update Status**
```
User: Mark incident abc-123 as resolved
AI: ✅ Updated incident abc-123. Status is now: Resolved
```

**Example 2: Change Severity**
```
User: Change the severity of incident def-456 to medium
AI: ✅ Updated incident def-456. Severity changed to: Medium
```

**Example 3: Update Multiple Fields**
```
User: Update incident abc-123: set status to in progress and severity to high
AI: ✅ Updated incident abc-123:
    - Status: In Progress
    - Severity: High
```

### Deleting Incidents

```
User: Delete incident abc-123
AI: ⚠️  Are you sure you want to delete this incident?
User: Yes, delete it
AI: ✅ Incident abc-123 has been deleted successfully
```

## Tips for Best Results

1. **Be Specific**: Include as much detail as possible in your requests
   - ✅ "Create a critical production incident for database timeout, reported by the Backend team"
   - ❌ "Create an incident"

2. **Use Natural Language**: You don't need to use specific command syntax
   - ✅ "What incidents are currently being worked on?"
   - ✅ "Show me in-progress incidents"
   - Both work equally well!

3. **Ask for Clarification**: If the AI needs more information, it will ask
   ```
   User: Create a new incident
   AI: I'd be happy to create an incident. Please provide:
       - Team name
       - Issue description
       - Severity (Critical/High/Medium/Low/Info)
       - Environment (Production/Staging/Development/Testing)
   ```

4. **Reference Incidents by ID**: When updating or viewing specific incidents, use their ID
   - The AI will show you IDs when listing incidents

## Features

### ✨ Function Calling
The AI automatically determines which operations to perform based on your request:
- **Create**: Adds new incidents to the database
- **Read**: Lists, searches, and views incident details
- **Update**: Modifies existing incidents
- **Delete**: Removes incidents from the system

### 🧠 Context Awareness
The AI maintains conversation context, so you can have natural back-and-forth conversations:
```
User: Show me critical incidents
AI: [Lists 3 critical incidents]
User: Mark the first one as resolved
AI: [Updates the incident from the previous list]
```

### 🔍 Smart Filtering
The AI understands various ways to filter incidents:
- By status: "open incidents", "resolved tickets", "in-progress issues"
- By severity: "critical bugs", "high priority incidents"
- By environment: "production incidents", "staging issues"
- By search: "database problems", "API errors"

### ✅ Validation
The AI validates your requests before executing:
- Ensures required fields are provided
- Checks for valid enum values (severity, environment, status)
- Confirms destructive actions (like deletions)

## Troubleshooting

### "Failed to process chat message"
- Check that your OpenAI API key is correctly set in `.env`
- Ensure the backend server is running
- Check the backend console for detailed error messages

### "Server is not responding"
- Make sure both frontend and backend are running
- Verify the backend is accessible at `http://localhost:3001`
- Check for CORS errors in the browser console

### "Invalid API key"
- Verify your OpenAI API key is correct
- Ensure there are no extra spaces in the `.env` file
- Check that you have credits available in your OpenAI account

## Cost Considerations

The AI Assistant uses OpenAI's GPT-4 API, which has associated costs:
- Each chat message costs a small amount based on token usage
- Function calls add minimal additional cost
- Typical conversation: $0.01 - $0.05 per session

Monitor your usage at: https://platform.openai.com/usage

## Privacy & Security

- All communication with OpenAI is encrypted (HTTPS)
- Your OpenAI API key is stored locally in `.env` (never commit this!)
- Incident data is sent to OpenAI for processing (consider data sensitivity)
- For sensitive data, consider using OpenAI's enterprise solutions or hosting your own LLM

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the backend console for detailed logs
3. Review the OpenAI API status: https://status.openai.com/
4. Ensure your OpenAI API key has sufficient credits

Enjoy your AI-powered Incident Management! 🚀

