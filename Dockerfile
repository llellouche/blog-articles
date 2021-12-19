#stage 1
FROM node:16.2-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/BlogArticles /usr/share/nginx/html
