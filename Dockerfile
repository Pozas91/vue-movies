# Proceso de compilación
FROM node:9.11.1-alpine as build-stage

# instalar un simple servidor http para servir nuestro contenido estático
# RUN npm install -g http-server

# hacer la carpeta 'app' el directorio de trabajo actual
WORKDIR /app

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./

# instalar dependencias del proyecto
RUN npm install

# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . .

# construir aplicación para producción minificada
RUN npm run build

# Proceso de producción
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiando configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf
CMD [ "nginx", "-g", "daemon off; "]
