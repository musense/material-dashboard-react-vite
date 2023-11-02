FROM node:16.19.0

WORKDIR /app
EXPOSE 8080
RUN npm install -g serve

COPY index.html ./
COPY package.json ./
COPY yarn.lock ./
COPY .eslintrc.cjs ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

COPY ./src ./src
COPY ./public ./public
COPY ./environments ./environments

RUN yarn \
    && yarn build:dev:oogiri

# CMD [ "serve","-s","dist","-p","8080" ]

# bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# remove existing files from nginx directory
RUN rm -rf /usr/share/nginx/html/*
# copy built assets from 'builder' stage
COPY --from=builder /usr/src/next-nginx/.next /usr/share/nginx/html
# add nginx config
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
# expose port 80 for nginx
EXPOSE 4200
# start nginx
CMD ["nginx", "-g", "daemon off;"]