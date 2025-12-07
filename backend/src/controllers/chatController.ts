import { Request, Response } from 'express';
import * as aiAgentService from '../services/aiAgentService';

export const chat = async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Invalid request. Expected an array of messages.',
      });
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return res.status(400).json({
          error: 'Each message must have a role and content.',
        });
      }
      if (!['user', 'assistant', 'system'].includes(msg.role)) {
        return res.status(400).json({
          error: 'Invalid message role. Must be user, assistant, or system.',
        });
      }
    }

    const result = await aiAgentService.processChatMessage(messages);

    res.json({
      message: result.response,
      functionCalls: result.functionCalls,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error.message,
    });
  }
};

