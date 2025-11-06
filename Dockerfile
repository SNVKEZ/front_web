# === STAGE 1: Build the app ===
FROM node:18-alpine AS build

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники
COPY . .

# Сборка проекта
RUN npm run build

# === STAGE 2: Serve static files with nginx ===
FROM nginx:stable-alpine

# Копируем сборку из stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Настраиваем nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
