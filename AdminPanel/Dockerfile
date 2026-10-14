# Standalone XUM AI Admin Panel (Vite SPA) for Dokploy.
# VITE_* values are public client configuration, not server-side secrets.
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_CLERK_PUBLISHABLE_KEY

ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}

RUN test -n "$VITE_SUPABASE_URL" \
 && test -n "$VITE_SUPABASE_ANON_KEY" \
 && test -n "$VITE_CLERK_PUBLISHABLE_KEY" \
 || (echo "Missing admin build arguments (Supabase URL/key or Clerk publishable key)" >&2; exit 1)
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
