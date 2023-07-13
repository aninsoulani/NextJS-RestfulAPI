FROM node:16

WORKDIR /project-restful

COPY . .
RUN npm install --production
RUN npm run build
CMD ["npm", "start"]
