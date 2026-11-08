# Utiliza a imagem oficial leve do Nginx baseada em Alpine Linux
FROM nginx:alpine

# Define o diretório de trabalho padrão do Nginx
WORKDIR /usr/share/nginx/html

# Remove os arquivos padrão do Nginx
RUN rm -rf ./*

# Copia todos os arquivos da aplicação web para o diretório servido pelo Nginx
COPY index.html ./
COPY js/ ./js/
COPY css/ ./css/

# Expõe a porta 80 do container
EXPOSE 80

# Inicializa o Nginx em primeiro plano (daemon off)
CMD ["nginx", "-g", "daemon off;"]
