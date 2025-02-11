# # FROM node:20-alpine


# # WORKDIR /app

# # RUN npm install -g pnpm

# # ENV JWT_SECRET="jfhajfhadjfad"
# # ENV BASE_URL="http://localhost:4000"
# # ENV IPINFO_API_KEY="afkjafh87qyhgasd"

# # COPY package.json pnpm-lock.yaml ./
# # COPY prisma ./prisma/



# # RUN pnpm install --frozen-lockfile

# # RUN npx prisma generate

# # COPY . .

# # RUN pnpm build
# # EXPOSE 3000

# # CMD ["pnpm", "start"]




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



# Set environment variables as build args

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



# new code


FROM node:20-alpine

# Add build-time arguments
ARG DATABASE_URL
ARG JWT_SECRET
ARG BASE_URL
ARG IPINFO_API_KEY

# Set environment variables
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV BASE_URL=${BASE_URL}
ENV IPINFO_API_KEY=${IPINFO_API_KEY}

WORKDIR /app

# Install necessary build dependencies
RUN apk add --no-cache python3 make g++

# Install pnpm with specific version
RUN npm install -g pnpm@8.15.1

# Copy package files first
COPY package.json pnpm-lock.yaml ./

# Install dependencies with verbose logging
RUN echo "Node version: $(node -v)" && \
    echo "PNPM version: $(pnpm -v)" && \
    pnpm config set store-dir .pnpm-store && \
    pnpm install --frozen-lockfile --no-optional --verbose

# Copy prisma files and generate client
COPY prisma ./prisma/
RUN pnpm prisma generate

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]