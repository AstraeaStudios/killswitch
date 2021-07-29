FROM node:alpine
WORKDIR /opt/killswitch

ENV PORT=8080

EXPOSE 8080

COPY . .
RUN yarn
RUN yarn build

ENTRYPOINT [ "node", "." ]