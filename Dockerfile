FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3008

CMD ["npm", "run", "start"]