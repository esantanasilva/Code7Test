# base image
FROM node:12.7-alpine AS node
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-prod

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /usr/src/app/dist/FrontEnd /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
