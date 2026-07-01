import { Router } from 'express'

export const chatRouter = Router()

// POST /api/chat  { message: string } -> { reply: string }
//
// This is a scaffold. It currently echoes a canned reply so the frontend can
// wire up the full request/response flow (and verify CORS) end to end.
//
// TODO(chatbot): replace the stub below with a real LLM call.
//   1. Add "@anthropic-ai/sdk" to dependencies.
//   2. Read ANTHROPIC_API_KEY from process.env.
//   3. Call the Messages API with model "claude-sonnet-5".
//   4. Switch this handler to a streaming SSE response and update
//      frontend/src/lib/api.ts to consume the stream.
chatRouter.post('/chat', (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message : ''

  if (!message.trim()) {
    res.status(400).json({ error: 'message is required' })
    return
  }

  res.json({
    reply: `(stub) You said: "${message}". The AI chatbot isn't connected yet.`,
  })
})
