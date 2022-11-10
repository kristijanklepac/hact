# Base stage
# ---------------------------------------
FROM node:18-bullseye-slim AS base

# This get shared across later stages
WORKDIR /usr/src/app
RUN chown node:node /usr/src/app
USER node

FROM base as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY --chown=node:node package*.json ./

RUN npm ci && npm cache clean --force

COPY --chown=node:node . .

RUN npm run build

FROM base as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --chown=node:node package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --chown=node:node --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]