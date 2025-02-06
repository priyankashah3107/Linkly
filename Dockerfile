FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm


COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# copy over file : copy everything from the workingdir and over to the src dir
COPY . .


RUN npx prisma generate

RUN pnpm build


EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]