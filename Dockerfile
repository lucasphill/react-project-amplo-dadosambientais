FROM node:18-alpine AS build
# Definir diretório de trabalho dentro do container
WORKDIR /app
# Copiar arquivos de dependências e instalar
COPY package.json package-lock.json ./
RUN npm install
# Copiar o restante dos arquivos do projeto
COPY . .
# Construir a aplicação
RUN npm run build

# Usar uma imagem Nginx para servir os arquivos estáticos
FROM nginx:alpine
# Copiar os arquivos do build para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Expor a porta 80 para acessar a aplicação
EXPOSE 80
# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]