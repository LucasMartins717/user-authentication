# User-Authentication

• [Introdução](#introdução)  
• [Funcionalidades](#funcionalidades)  
• [Tecnologias](#tecnologias)  
• [Instalação](#instalação)  
• [Licença](#licença)  

## Introdução

***User-Authentication*** é um projeto simples desenvolvido para aprender a criar um sistema de autenticação de usuários. Ele foi criado com Node.js e possui uma integração com React e PostgreSQL. Ele utiliza Node.js para o back-end, PostgreSQL para armazenamento de dados, e React com TypeScript para o front-end.

<br/>ㅤ<br/>
![gifDemonstração](/client/public/showGif3.gif)

## Funcionalidades

**Visualizar Postagens** 📂: Permite que qualquer um veja as postagens disponíveis sem a necessidade de autenticação.

***Cadastro e Login de Usuários*** 🔒:<br>
*•* Criação de contas com senha protegida por hashing.<br>
*•* Login seguro com autenticação baseada em tokens JWT.

***Criação de Postagens*** 📝: Usuários autenticados podem publicar postagens que são  armazenadas no banco de dados.

***Interface Intuitiva*** ✨: Interface responsiva e estilizada.


## Tecnologias

![Node.js](https://img.shields.io/badge/-Node.js-282C34?style=flat&logo=node.js&logoColor=green) Usado para construir o servidor back-end e gerenciar os usuários responsáveis pela autenticação e interação com o banco de dados.  


![React](https://img.shields.io/badge/-React-282C34?style=flat&logo=react&logoColor=61DAFB) Utilizado para desenvolver o front-end da aplicação.


![TypeScript](https://img.shields.io/badge/-TypeScript-282C34?style=flat&logo=typescript&logoColor=3178C6) Adicionado ao React para melhorar a tipagem e facilitar o desenvolvimento.  


![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-282C34?style=flat&logo=postgresql&logoColor=4169E1) Utilizado para armazenar informações dos usuários e das postagens.  

![Styled Components](https://img.shields.io/badge/-Styled--Components-282C34?style=flat&logo=styled-components&logoColor=DB7093) Usado para estilização dinâmica e modular dos componentes React.  



## Instalação

### Pré-requisitos

- **Node.js**: Certifique-se de que o Node.js está instalado na sua máquina ([instale aqui](https://nodejs.org/en/)).
- **PostgreSQL**: Configure um banco de dados PostgreSQL e crie um banco para o projeto.

### • Passos para instalação

• Clone o repositório:

```sh
git clone https://github.com/LucasMartins717/user-authentication
```

### • Configuração do Back-End (***server***):

• Instale as dependências:

```sh
npm install
```

• Crie um arquivo .env e configure as variáveis de ambiente:

```sh
PG_USERNAME=seu-nome
PG_PASSWORD=sua-senha
PG_HOST=localhost
PG_DATABASE=sua-db
JWT_KEY=sua-chave-jwt
```

• Criação das tabelas no banco de dados PostgreSQL:

```sh
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

• Inicie o servidor:

```sh
node --watch server.js
```

### • Configuração do Front-End (***client***):


• Instale as dependências:

```sh
npm install
```

• Inicie o aplicativo:

```sh
npm run dev
```

• Dê uma olhada na porta gerada no terminal. Você pode clicar no link segurando Ctrl ou simplesmente digitar o endereço no navegador para abrir o aplicativo.


## Licença

• Este projeto utiliza a Licença MIT. Para mais informações, consulte o arquivo [LICENSE](./LICENSE).
