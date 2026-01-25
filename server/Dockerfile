FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]