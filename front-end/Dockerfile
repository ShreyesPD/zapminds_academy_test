# front-end/Dockerfile (npm + Node 20)
FROM node:20-alpine AS builder
WORKDIR /app/front-end

RUN apk add --no-cache python3 make g++ bash

# copy package manifests for caching
COPY front-end/package*.json ./

# install dependencies (dev deps are needed to build)
RUN npm ci

# copy source and studio (so ../studio imports work)
COPY front-end/ ./
COPY studio/ ../studio/

# --- TEMP: check whether build-time env vars are present (DO NOT print secrets) ---
RUN if [ -n "${NUXT_SUPABASE_URL:-}" ]; then echo "BUILD: NUXT_SUPABASE_URL=SET"; else echo "BUILD: NUXT_SUPABASE_URL=NOT_SET"; fi
RUN if [ -n "${NUXT_SUPABASE_ANON_KEY:-}" ]; then echo "BUILD: NUXT_SUPABASE_ANON_KEY=SET"; else echo "BUILD: NUXT_SUPABASE_ANON_KEY=NOT_SET"; fi
# -------------------------------------------------------------------------------

# build
RUN npm run build

# # ---------- runner ----------
# FROM node:20-alpine AS runner
# WORKDIR /app/front-end

# RUN addgroup -S app && adduser -S app -G app

# COPY --from=builder /app/front-end/.output ./.output
# COPY --from=builder /app/front-end/node_modules ./node_modules
# COPY --from=builder /app/front-end/package.json ./package.json

# ENV NODE_ENV=production
# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000

# EXPOSE 3000
# USER app

# CMD ["node", ".output/server/index.mjs"]


# ---------- runner ----------
FROM node:20-alpine AS runner
WORKDIR /app/front-end

# install python runtime and pip (for running tests / user code)
RUN apk add --no-cache python3 py3-pip

# create non-root user
RUN addgroup -S app && adduser -S app -G app

# copy runtime artifacts (as before)
COPY --from=builder /app/front-end/.output ./.output
COPY --from=builder /app/front-end/node_modules ./node_modules
COPY --from=builder /app/front-end/package.json ./package.json

# if you have a Python requirements file (optional), copy and install:
# COPY front-end/requirements.txt ./requirements.txt
# RUN pip3 install --no-cache-dir -r requirements.txt

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000
USER app

CMD ["node", ".output/server/index.mjs"]
