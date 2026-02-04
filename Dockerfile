# Use an official Node.js image to build the app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Copy only the files needed for the Vite build
COPY public ./public
COPY src ./src
COPY index.html ./
COPY vite.config.js ./
COPY eslint.config.js ./

RUN npm run build

# Use an official Nginx image to serve the build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]