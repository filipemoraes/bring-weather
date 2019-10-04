FROM node:latest as bring-weather
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=bring-weather app/dist/bring-weather /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf