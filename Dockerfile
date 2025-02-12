# ARG DATABASE_URL
# ARG JWT_SECRET
# ARG BASE_URL
# ARG IPINFO_API_KEY
# FROM node:20-alpine
# ENV DATABASE_URL=${DATABASE_URL}
# ENV JWT_SECRET=${JWT_SECRET}
# ENV BASE_URL=${BASE_URL}
# ENV IPINFO_API_KEY=${IPINFO_API_KEY}

# WORKDIR /app
# RUN npm install -g pnpm

# COPY package.json pnpm-lock.yaml ./
# COPY prisma ./prisma/
# RUN pnpm install --frozen-lockfile
# RUN npx prisma generate

# COPY . .
# RUN pnpm build
# EXPOSE 3000
# CMD ["pnpm", "start"]




FROM node:20-alpine

ARG DATABASE_URL
ARG JWT_SECRET
ARG BASE_URL
ARG IPINFO_API_KEY

ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV BASE_URL=${BASE_URL}
ENV IPINFO_API_KEY=${IPINFO_API_KEY}

WORKDIR /app


RUN apk add --no-cache python3 make g++


RUN npm install -g pnpm@8.15.1 && pnpm -v


COPY package.json pnpm-lock.yaml ./

RUN node -v && \
    pnpm -v && \
    pnpm config set store-dir .pnpm-store && \
    pnpm install --frozen-lockfile --no-optional --verbose


COPY prisma ./prisma/
RUN pnpm prisma generate

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
