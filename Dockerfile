FROM node:23.4.0-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY tailwind.config.js ./ 
COPY postcss.config.js ./

# Install build dependencies
RUN apk add --no-cache python3 make g++

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV DISABLE_ESLINT_PLUGIN=true
ENV CI=false

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Add nginx configuration
RUN echo '                                                           \
server {                                                            \
    listen 3000;                                                    \
    location / {                                                    \
        root /usr/share/nginx/html;                                 \
        index index.html index.htm;                                 \
        try_files $uri $uri/ /index.html;                          \
    }                                                               \
}                                                                   \
' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
