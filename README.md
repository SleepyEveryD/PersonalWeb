# PersonalWeb

Personal portfolio website, split into a **frontend** (Vite + React SPA) and a
**backend** (Node + TypeScript / Express API). Both deploy to
[Render](https://render.com) via `render.yaml`.

```
frontend/   Vite + React single-page app (the portfolio UI)
backend/    Express API — /api/health and /api/chat (chatbot scaffold)
render.yaml Render Blueprint that defines both services
```

## Local development

Requires Node ≥ 20 and [pnpm](https://pnpm.io).

**Backend** (terminal 1):

```bash
cd backend
cp .env.example .env
pnpm install
pnpm dev            # http://localhost:8787
```

**Frontend** (terminal 2):

```bash
cd frontend
cp .env.example .env        # VITE_API_URL defaults to http://localhost:8787
pnpm install
pnpm dev            # http://localhost:5173
```

Quick checks:

```bash
curl http://localhost:8787/api/health
# {"status":"ok"}

curl -X POST http://localhost:8787/api/chat \
  -H 'content-type: application/json' -d '{"message":"hi"}'
# {"reply":"(stub) You said: \"hi\". ..."}
```

## Deploy to Render

1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, select the repo. Render reads `render.yaml`
   and creates two services: `personalweb-api` (web) and `personalweb-web` (static).
3. After the first deploy, set the environment variables the Blueprint left blank
   (each triggers a redeploy):
   - `personalweb-api` → **ALLOWED_ORIGIN** = the frontend URL
     (e.g. `https://personalweb-web.onrender.com`)
   - `personalweb-web` → **VITE_API_URL** = the backend URL
     (e.g. `https://personalweb-api.onrender.com`)
4. When wiring up the chatbot later, set **ANTHROPIC_API_KEY** on `personalweb-api`.

## Roadmap

- **Chatbot** — replace the `/api/chat` stub with a streaming Claude call
  (`@anthropic-ai/sdk`, model `claude-sonnet-5`, SSE).
- **Interactive project demos** — let visitors try each project in-browser via
  dedicated backend routes / sandboxed embeds.
