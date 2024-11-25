FROM node:22-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --omit=dev && npm cache clean --force

COPY . .

CMD [ "npm", "run", "docker:start:app" ]