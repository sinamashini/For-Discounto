FROM node:16

ARG DATABASE_URL=postgres://postgres:13146cb3129855da595f81a8ce33dd87@104.248.46.73:22106/zhava_db
ARG SESSION_SECRET_KEY=285d58936075ea6f0b447c2268caf514314E323138565363514433784A2F5951355A544F5357382B71316247335758662B414C475056474A5365633D13146cb3129855da595f81a8ce33dd87112234312423324fgdgdf56456dfg234
ARG SMS_PROVIDER_APIKEY=74335069726877556F345035764231536F4C4B7133332B467250537A674E427A2F5231384156456E6743733D
ARG PORT=5000
ARG MASTER_PASS=a00002163188a19ae85a61165bfc9d55!@
ARG QUIRREL_TOKEN=c68ebfc7-f8cb-4067-bc36-1d09672d4ae8
ARG QUIRREL_API_URL=https://worker.sinamashini.com
ARG PASSPHRASE=NUJ7ZxKdFeUYcwnZYTrrowpN3a26W8hFFjNAKACvQRIa9JwB
ARG QUIRREL_BASE_URL=panel.zhavaclinic.com
ENV DATABASE_URL ${DATABASE_URL}
ENV SESSION_SECRET_KEY ${SESSION_SECRET_KEY}
ENV SMS_PROVIDER_APIKEY ${SMS_PROVIDER_APIKEY}
ENV MASTER_PASS ${MASTER_PASS}
ENV QUIRREL_TOKEN ${QUIRREL_TOKEN}
ENV QUIRREL_API_URL ${QUIRREL_API_URL}
ENV PASSPHRASE ${PASSPHRASE}
ENV QUIRREL_BASE_URL ${QUIRREL_BASE_URL}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY db/ ./db/
RUN yarn install --frozen-lockfile
# RUN yarn blitz prisma migrate

COPY . .
RUN yarn build

EXPOSE ${PORT}

CMD yarn start -p ${PORT}
