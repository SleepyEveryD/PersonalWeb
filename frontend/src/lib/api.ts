// Lightweight client for talking to the backend API.
// The base URL is injected at build time via VITE_API_URL.
// In local dev this defaults to the backend running on :8787.

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8787'

export async function apiFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

// Chatbot stub — sends a message and returns the assistant reply.
// Will move to streaming (SSE) once the real LLM integration lands.
export interface ChatResponse {
  reply: string
}

export function sendChatMessage(message: string): Promise<ChatResponse> {
  return apiFetch<ChatResponse>('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  })
}
