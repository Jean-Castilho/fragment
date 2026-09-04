# API MongoDB Atlas com Node.js Nativo

Esta é uma API RESTful modular construída em JavaScript com Node.js nativo (`node:http`) para manipular coleções no MongoDB Atlas. Ela segue uma arquitetura baseada em classes para conexão com o banco de dados, repositórios genéricos, serviços de lógica de negócio, controladores e roteamento.

## Requisitos

- Node.js (versão 18 ou superior)
- conta no MongoDB Atlas e connection string para o seu cluster.

## Configuração

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd mongodb-api
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure a Connection String do MongoDB Atlas:**


## Estrutura do Projeto

```
mongodb-api/
├── src/
│   ├── controllers/
│   │   └── CollectionController.js
│   ├── database/
│   │   └── Database.js
│   ├── repositories/
│   │   └── CollectionRepository.js
│   ├── routes/
│   │   └── Router.js
│   ├── services/
│   │   └── CollectionService.js
│   ├── app.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Como Rodar

Para iniciar o servidor da API, execute o seguinte comando:

```bash
npm start
```

## Endpoints da API

A API expõe os seguintes endpoints para a coleção padrão `items`:

-   `POST /api/collections` - Cria um novo documento.
-   `GET /api/collections` - Retorna todos os documentos.
-   `GET /api/collections/:id` - Retorna um documento específico pelo ID.
-   `PUT /api/collections/:id` - Atualiza um documento específico pelo ID.
-   `DELETE /api/collections/:id` - Exclui um documento específico pelo ID.

## Exemplos de Requisições

Ferramentas como `curl` ou Postman para testar a API.

### 1. Criar um Documento (POST)

**Requisição:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "Item 1", "description": "Primeiro item da coleção"}' http://localhost:3000/api/collections
```

**Resposta (Exemplo):**

```json
{"id":"65f7b3b3e6b3f3b3e6b3f3b3"}
```

### 2. Obter Todos os Documentos (GET)

**Requisição:**

```bash
curl http://localhost:3000/api/collections
```

**Resposta (Exemplo):**

```json
[
  {"_id":"65f7b3b3e6b3f3b3e6b3f3b3","name":"Item 1","description":"Primeiro item da coleção"}
]
```

### 3. Obter Documento por ID (GET)

Substitua `[ID_DO_DOCUMENTO]` pelo ID retornado na criação.

**Requisição:**

```bash
curl http://localhost:3000/api/collections/[ID_DO_DOCUMENTO]
```

**Resposta (Exemplo):**

```json
{"_id":"65f7b3b3e6b3f3b3e6b3f3b3","name":"Item 1","description":"Primeiro item da coleção"}
```

### 4. Atualizar Documento por ID (PUT)

Substitua `[ID_DO_DOCUMENTO]` pelo ID do documento que deseja atualizar.

**Requisição:**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"description": "Descrição atualizada do item 1"}' http://localhost:3000/api/collections/[ID_DO_DOCUMENTO]
```

**Resposta (Exemplo):**

```json
{"message":"Documento atualizado com sucesso"}
```

### 5. Excluir Documento por ID (DELETE)

Substitua `[ID_DO_DOCUMENTO]` pelo ID do documento que deseja excluir.

**Requisição:**

```bash
curl -X DELETE http://localhost:3000/api/collections/[ID_DO_DOCUMENTO]
```

**Resposta (Exemplo):**

```json
{"message":"Documento excluído com sucesso"}
```

## Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes. (Nota: O arquivo LICENSE não está incluído neste exemplo, mas é uma boa prática adicioná-lo.)
