# Dockerfile (definitivo: Debian slim para compatibilidad con lightningcss)
FROM node:20-bullseye-slim

WORKDIR /app

# Evitar prompts y acelerar un poco
ENV NODE_ENV=development
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_LOGLEVEL=warn

# Copiar package files primero para cachear instalación
COPY package*.json ./

# Instalar dependencias dentro de la imagen (no dependen del host)
RUN npm ci

# Copiar el resto del código
COPY . .

# Asegurar que lightningcss esté reconstruido para el sistema dentro de la imagen
RUN npm rebuild lightningcss || true

EXPOSE 3000

# Comando por defecto (modo dev). Si prefieres producción cambialo luego.
CMD ["npm", "run", "dev"]
