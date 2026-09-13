# 🏥 MedClinic API

API REST moderna para gestão de segurança, a#utenticação e controle de #acesso baseado em perfis (RBAC) da clínica médica **MedClinic**. Projeto desenvolvido em **Node.js** com **TypeScript 6** e **TypeORM**, conectado de forma segura a uma base de dados **PostgreSQL na nuvem (Aiven)**.

## 🚀 Tecnologias Utilizadas
- **Node.js** (Ambiente de execução)
- **TypeScript 6** (Tipagem estrita e moderna com módulos `NodeNext`)
- **Express** (Framework HTTP)
- **TypeORM** (Mapeamento de Dados Relacionais)
- **Aiven Cloud** (Hospedagem segura do PostgreSQL com criptografia SSL)
- **tsx** (Executor TypeScript ultra-rápido para desenvolvimento)
- **class-validator & class-transformer** (Validação automática de payloads HTTP via DTOs)
- **jsonwebtoken (JWT) & bcryptjs** (Criptografia de credenciais e segurança de rotas)

## 🔧 Como Executar o Projeto Localmente

### 📋 Pré-requisitos (Base de Dados)

Antes de executar a API, #certifique-se de que possui uma instância do **PostgreSQL** ativa (local via pgAdmin/Docker ou na nuvem via Aiven):

1. **Criar a Base de Dados:** Aceda ao seu cliente SQL e crie uma base de dados vazia (ex: `defaultdb` ou `medclinic_db`).
2. **Estrutura do Banco (Opcional):** O projeto está configurado com `synchronize: true` para gerar as tabelas automaticamente na inicialização. Caso prefira uma criação manual e estrita, execute o script SQL contido em `src/database/schema.sql` diretamente na sua base de dados.
3. **Credenciais:** Garanta que tem à mão o Host, Porta, Utilizador e Senha desta base de dados para preencher no ficheiro `.env`.

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/helensjferreira-dev/medclinic-api.git
   cd medclinic-api
   ```

2. **Instalar as Dependências:**
   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente:**
   Duplique ou renomeie o arquivo `.env.example` para `.env` na raiz do projeto e preencha-o com as credenciais da base de dados (incluindo o suporte a SSL ativo para a nuvem da Aiven):
   ```env
   PORT=3000
   DB_HOST=seu-host-da-base-de-dados
   DB_PORT=sua-porta-da-base-de-dados
   DB_USER=seu-usuario-da-base-de-dados
   DB_PASS=sua-senha-da-base-de-dados
   DB_NAME=defaultdb
   DB_SSL=true (Se a base de dados estiver na nuvem)
   JWT_SECRET=sua_chave_secreta_aqui
   JWT_EXPIRES_IN=1d
   ```

4. **Executar em Modo de Desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Compilar para Produção (Build):**
   ```bash
   npm run build
   ```

6. **Executar em Produção:**
   ```bash
   npm start
   ```

## 🛣️ Rotas da API (Mapeamento de Endpoints)

### 🔓 Rotas Públicas (Autenticação)
- **`POST /auth/register`**: Cadastra um novo usuário no sistema com validação automática de campos e formato de e-mail.
  - *Payload:* `name`, `email`, `password`, `role` (`'Administrador'`, `'Atendente'`, `'Médico'`, `'Paciente'`).
- **`POST /auth/login`**: Realiza a autenticação, valida a hash da senha e emite o Token JWT contendo o identificador (`sub`) e o perfil (`role`).
  - *Payload:* `email`, `password`.

### 🛡️ Rotas Privadas (Protegidas por JWT & RBAC)
*(Exigem o envio do Token no cabeçalho HTTP: `Authorization: Bearer <TOKEN>`)*

- **`GET /users/me`**: Retorna os dados completos do perfil do usuário logado (Acessível por qualquer perfil autenticado. A senha nunca é exposta no JSON).
- **`GET /users/admin/ping`**: Endpoint restrito de teste de permissões (Acessível **apenas** por usuários com perfil `'Administrador'`). Retorna erro `403 Forbidden` para outros perfis.

## 📁 Estrutura de Pastas (MVC Arquitetura)
- `src/@types/`: Extensões de tipagem do ecossistema do Express.
- `src/database/`: Inicialização do `DataSource` e script automático de criação do banco (`schema.sql`).
- `src/dtos/`: Objetos de Transferência de Dados (contratos de entrada e interfaces de saída).
- `src/entities/`: Modelos de Tabelas e ENUMs nativos do TypeORM (`User.ts`).
- `src/errors/`: Exceções customizadas e centralizadas da aplicação (`AppError.ts`).
- `src/middlewares/`: Tratamento global de erros (`errorHandler`), validação de DTOs, autenticação JWT e controle RBAC.
- `src/repositories/`: Camada isolada de persistência e métodos customizados de banco (`UserRepository.ts`).
- `src/routes/`: Mapeamento e separação de endpoints do Express.
- `src/services/`: Camada nuclear contendo as regras de negócio do sistema (`UserService.ts`).
- `src/utils/`: Ferramentas auxiliares síncronas de suporte (JWT e Bcrypt).

## 🔗 Link do Kanban:

[Visualizar quadro GitHub Projects](https://github.com/users/helensjferreira-dev/projects/7)

## 🌿 Branches Utilizadas

Durante o desenvolvimento foram utilizadas branches específicas para separar funcionalidades, correções e documentação.

### Principais Branches

- main
- develop

### Branches de Funcionalidades

- feat/setup-project
- feat/user-model
- feat/auth
- feat/rbac


### Branch de Correções e Refinamentos

- chore/fix-middlewares-schema

### Branch de Documentação

- docs/readme


## 🚀 Evolução 

> 📢 **Nota:** Esta API representa a **Etapa 1** do projeto prático de validação de arquitetura e segurança. O sistema terá continuidade ao final do módulo do curso de desenvolvimento Back-end, onde serão acoplados os fluxos operacionais completos da clínica médica.


### 👤 Autora

Hélen dos Santos Jorge Ferreira

Desenvolvedora Back-end.

🔗 GitHub:  
https://github.com/helensjferreira-dev

🔗 LinkedIn:  
https://www.linkedin.com/in/helensjferreira-dev/

---

Projeto de desenvolvimento Back-end desenvolvido para fins educacionais avançados, aplicando os pilares da engenharia de software moderna. Focado na prática aprofundada de TypeScript 6, modelagem de dados relacionais com PostgreSQL, e implementação de regras de negócio isoladas. A aplicação adota uma arquitetura modular que assegura alta manutenibilidade, segurança de endpoints e total preparação para expansões futuras de domínio.