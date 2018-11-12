FROM justsml/docker-phantom-node:latest

COPY ./ /app
WORKDIR /app
RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
