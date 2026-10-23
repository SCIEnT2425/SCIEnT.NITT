FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV DISABLE_ESLINT_PLUGIN=true
ENV CI=false
# Source maps would publish the readable source (and add ~8 MB to the image)
ENV GENERATE_SOURCEMAP=false

RUN npm run build

# Debian-based and pinned (same as the public proxy): newer nginx:alpine images
# crash on the server's CentOS 7 kernel (3.10) with pwrite() "Operation not permitted"
FROM nginx:1.27.2

COPY --from=build /app/build /usr/share/nginx/html

# Serve the SPA: unknown paths fall back to index.html for React Router.
# Hashed bundles are cached for a year; photos in public/ for a week;
# index.html is always revalidated so a deploy never serves stale bundle names.
RUN printf '%s\n' \
  'server {' \
  '    listen 3000;' \
  '    root /usr/share/nginx/html;' \
  '    location /static/ {' \
  '        expires 1y;' \
  '        add_header Cache-Control "public, immutable";' \
  '    }' \
  '    location ~* \.(?:jpe?g|png|webp|gif|svg|ico)$ {' \
  '        expires 7d;' \
  '        add_header Cache-Control "public";' \
  '    }' \
  '    location / {' \
  '        index index.html;' \
  '        add_header Cache-Control "no-cache";' \
  '        try_files $uri $uri/ /index.html;' \
  '    }' \
  '}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
