"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processChatMessage = processChatMessage;
const openai_1 = __importDefault(require("openai"));
const uuid_1 = require("uuid");
const dataService_1 = require("./dataService");
// Initialize OpenAI client
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
// Define the tools/functions available to the AI agent
const tools = [
    {
        type: 'function',
        function: {
            name: 'create_incident',
            description: 'Create a new incident in the incident management system',
            parameters: {
                type: 'object',
                properties: {
                    teamName: {
                        type: 'string',
                        description: 'The name of the team reporting the incident',
                    },
                    issueDescription: {
                        type: 'string',
                        description: 'Detailed description of the issue or incident',
                    },
                    severity: {
                        type: 'string',
                        enum: ['Critical', 'High', 'Medium', 'Low', 'Info'],
                        description: 'The severity level of the incident',
                    },
                    environment: {
                        type: 'string',
                        enum: ['Production', 'Staging', 'Development', 'Testing'],
                        description: 'The environment where the incident occurred',
                    },
                    status: {
                        type: 'string',
                        enum: ['Open', 'In Progress', 'Resolved'],
                        description: 'The current status of the incident (default: Open)',
                    },
                },
                required: ['teamName', 'issueDescription', 'severity', 'environment'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'list_incidents',
            description: 'List all incidents or filter by status, severity, environment, or search term',
            parameters: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        enum: ['Open', 'In Progress', 'Resolved'],
                        description: 'Filter by status',
                    },
                    severity: {
                        type: 'string',
                        enum: ['Critical', 'High', 'Medium', 'Low', 'Info'],
                        description: 'Filter by severity',
                    },
                    environment: {
                        type: 'string',
                        enum: ['Production', 'Staging', 'Development', 'Testing'],
                        description: 'Filter by environment',
                    },
                    search: {
                        type: 'string',
                        description: 'Search term to filter incidents by team name or issue description',
                    },
                },
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'get_incident',
            description: 'Get details of a specific incident by ID',
            parameters: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The unique identifier of the incident',
                    },
                },
                required: ['id'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'update_incident',
            description: 'Update an existing incident',
            parameters: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The unique identifier of the incident to update',
                    },
                    teamName: {
                        type: 'string',
                        description: 'The name of the team reporting the incident',
                    },
                    issueDescription: {
                        type: 'string',
                        description: 'Detailed description of the issue or incident',
                    },
                    severity: {
                        type: 'string',
                        enum: ['Critical', 'High', 'Medium', 'Low', 'Info'],
                        description: 'The severity level of the incident',
                    },
                    environment: {
                        type: 'string',
                        enum: ['Production', 'Staging', 'Development', 'Testing'],
                        description: 'The environment where the incident occurred',
                    },
                    status: {
                        type: 'string',
                        enum: ['Open', 'In Progress', 'Resolved'],
                        description: 'The current status of the incident',
                    },
                },
                required: ['id'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'delete_incident',
            description: 'Delete an incident from the system',
            parameters: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The unique identifier of the incident to delete',
                    },
                },
                required: ['id'],
            },
        },
    },
];
// Execute function calls based on tool name
async function executeFunction(functionName, args) {
    try {
        switch (functionName) {
            case 'create_incident': {
                const now = new Date().toISOString();
                const incident = {
                    id: (0, uuid_1.v4)(),
                    teamName: args.teamName,
                    issueDescription: args.issueDescription,
                    severity: args.severity,
                    environment: args.environment,
                    status: args.status || 'Open',
                    createdAt: now,
                    updatedAt: now,
                };
                const created = dataService_1.DataService.createIncident(incident);
                return { success: true, data: created };
            }
            case 'list_incidents': {
                let incidents = dataService_1.DataService.getAllIncidents();
                // Apply filters
                if (args.status) {
                    incidents = incidents.filter(inc => inc.status === args.status);
                }
                if (args.severity) {
                    incidents = incidents.filter(inc => inc.severity === args.severity);
                }
                if (args.environment) {
                    incidents = incidents.filter(inc => inc.environment === args.environment);
                }
                if (args.search) {
                    const searchLower = args.search.toLowerCase();
                    incidents = incidents.filter(inc => inc.teamName.toLowerCase().includes(searchLower) ||
                        inc.issueDescription.toLowerCase().includes(searchLower));
                }
                return { success: true, data: incidents };
            }
            case 'get_incident': {
                const incident = dataService_1.DataService.getIncidentById(args.id);
                if (!incident) {
                    return { success: false, error: 'Incident not found' };
                }
                return { success: true, data: incident };
            }
            case 'update_incident': {
                const { id, ...updates } = args;
                const incident = dataService_1.DataService.updateIncident(id, updates);
                if (!incident) {
                    return { success: false, error: 'Incident not found' };
                }
                return { success: true, data: incident };
            }
            case 'delete_incident': {
                const success = dataService_1.DataService.deleteIncident(args.id);
                if (!success) {
                    return { success: false, error: 'Incident not found' };
                }
                return { success: true, data: { message: 'Incident deleted successfully' } };
            }
            default:
                return { success: false, error: `Unknown function: ${functionName}` };
        }
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
async function processChatMessage(messages) {
    try {
        // Add system message if not present
        const messagesWithSystem = [
            {
                role: 'system',
                content: `You are an AI assistant for an Incident Management System. You can help users:
- Create new incidents
- List and search existing incidents
- View incident details
- Update incident information
- Delete incidents

Be helpful, concise, and professional. When users want to create or update incidents, ask for missing required information.
Always confirm actions that modify data (create, update, delete).
When listing incidents, provide a clear summary of the results.`,
            },
            ...messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
            })),
        ];
        // Call OpenAI with function calling
        let response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: messagesWithSystem,
            tools: tools,
            tool_choice: 'auto',
        });
        let assistantMessage = response.choices[0].message;
        const functionCalls = [];
        // Handle function calls
        while (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
            // Execute all function calls
            const toolCallResults = [];
            for (const toolCall of assistantMessage.tool_calls) {
                if (toolCall.type === 'function') {
                    const functionName = toolCall.function.name;
                    const functionArgs = JSON.parse(toolCall.function.arguments);
                    console.log(`Executing function: ${functionName}`, functionArgs);
                    const result = await executeFunction(functionName, functionArgs);
                    functionCalls.push({
                        function: functionName,
                        args: functionArgs,
                        result: result,
                    });
                    toolCallResults.push({
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        content: JSON.stringify(result),
                    });
                }
            }
            // Add assistant message and tool results to messages
            messagesWithSystem.push(assistantMessage);
            messagesWithSystem.push(...toolCallResults);
            // Get next response from OpenAI
            response = await openai.chat.completions.create({
                model: 'gpt-4-turbo-preview',
                messages: messagesWithSystem,
                tools: tools,
                tool_choice: 'auto',
            });
            assistantMessage = response.choices[0].message;
        }
        return {
            response: assistantMessage.content || 'I apologize, but I could not generate a response.',
            functionCalls: functionCalls.length > 0 ? functionCalls : undefined,
        };
    }
    catch (error) {
        console.error('Error processing chat message:', error);
        throw new Error(`Failed to process chat message: ${error.message}`);
    }
}
