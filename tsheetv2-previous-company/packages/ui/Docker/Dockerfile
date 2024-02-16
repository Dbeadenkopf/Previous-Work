FROM node:16

WORKDIR /usr/src/tsheetv2

COPY package.json package-lock.json .npmrc ./
COPY packages/ui packages/ui

ARG JS_UTIL_TOKEN

RUN npm ci -w ui

EXPOSE 2000

CMD ["npm", "start", "-w", "ui"]
