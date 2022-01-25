FROM node:16

ARG DATABASE_URL=postgresql://postgres:postgres@localhost:5432/zhava
ARG SESSION_SECRET_KEY=285d58936075ea6f0b447c2268caf514
ARG PORT=3000
ENV DATABASE_URL ${DATABASE_URL}
ENV SESSION_SECRET_KEY ${SESSION_SECRET_KEY}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY db/ ./db/
RUN yarn install --frozen-lockfile
RUN yarn blitz prisma migrate
RUN yarn blitz db seed

COPY . .
RUN yarn build

EXPOSE ${PORT}

CMD yarn start -p ${PORT}
