FROM node:alpine
WORKDIR /opt/killswitch

ENV PORT=80

EXPOSE 80

COPY . .
RUN yarn
RUN yarn build

ENTRYPOINT [ "node", "." ]