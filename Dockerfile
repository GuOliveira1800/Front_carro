# Definir a imagem base
FROM node:12.22.9

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo package.json para o diretório de trabalho
COPY package.json .

# Instalar as dependências do projeto
RUN npm install

# Instalar o Angular CLI globalmente
RUN npm install -g @angular/cli@10.0.8

# Copiar todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Expôr a porta 4200 para acesso ao servidor de desenvolvimento do Angular
EXPOSE 4200

# Comando padrão a ser executado quando o contêiner for iniciado
CMD ["ng", "serve", "--host", "0.0.0.0"]
