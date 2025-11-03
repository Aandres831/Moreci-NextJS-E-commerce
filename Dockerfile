# Usa una imagen base con Node
FROM node:18-alpine

# Crea el directorio de la app
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "dev"]
