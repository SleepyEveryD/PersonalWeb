import express from 'express'
import cors from 'cors'
import { healthRouter } from './routes/health.js'
import { chatRouter } from './routes/chat.js'

const app = express()

// Allow the frontend origin(s). ALLOWED_ORIGIN can be a comma-separated list.
// If unset, allow all origins (convenient for local dev).
const allowedOrigin = process.env.ALLOWED_ORIGIN
app.use(
  cors({
    origin: allowedOrigin ? allowedOrigin.split(',').map((o) => o.trim()) : true,
  }),
)

app.use(express.json())

app.use('/api', healthRouter)
app.use('/api', chatRouter)

const port = Number(process.env.PORT ?? 8787)
app.listen(port, () => {
  console.log(`[backend] listening on http://localhost:${port}`)
})
