import { Router } from 'express'

export const healthRouter = Router()

// Used by Render's health check (see render.yaml healthCheckPath).
healthRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})
