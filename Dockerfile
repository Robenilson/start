# Usa uma imagem base com Node.js
FROM node:18

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install 

# Copia todo o código do projeto
COPY . .

# Expõe a porta (caso o projeto use uma porta específica)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
