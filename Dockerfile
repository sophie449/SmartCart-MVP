# Build Stage
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist/smart-cart-mvp /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
