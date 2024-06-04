FROM node:18
WORKDIR /app
COPY backend-project/package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
