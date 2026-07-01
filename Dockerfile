# FROM node:24.18.0-alpine3.24
# RUN npm i -g pnpm
# RUN addgroup app && adduser -S -G app app
# USER app
# WORKDIR /app 
# COPY package*.json .
# COPY pnpm-lock.yaml .
# RUN pnpm install
# COPY . .
# RUN pnpm build
# ENV VITE_BASE_URL=http://localhost:8080
# EXPOSE 3000
# # shell form /bin/sh -x "npm start"
# # CMD npm start
# # exec form  can be override
# # CMD ["npm", "run", "preview"]
# # cant overrideS 
# ENTRYPOINT ["npm", "run", "preview"]

FROM node:24-alpine

# RUN addgroup -S app && adduser -S -G app app

WORKDIR /app

COPY package*.json .
COPY pnpm-lock.yaml .

RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# USER app

CMD ["npm", "run", "preview"]