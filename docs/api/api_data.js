define({ "api": [
  {
    "type": "put",
    "url": "/admin",
    "title": "Atualizar administrador",
    "name": "AtualizarAdmin",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n   \"token\": \"1234\"       \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Novo nome</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Novo email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senha",
            "description": "<p>Nova senha</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cpf",
            "description": "<p>Novo CPF</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n   \"nome\": \"Doravante\",\n   \"email\": \"a@a.com\",\n   \"senha\": \"9876\",\n   \"cpf\": \"11111111111\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"sucesso\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n     \"erro\": \"GENERO_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/AdminController.ts",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/:id",
    "title": "Informações do administrador",
    "name": "InfoAdmin",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{ \n    \"token\": \"1234\"  \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"admin\": \n    {\n        \"id\": \"1\",\n        \"nome\": \"Doravante\",\n        \"email\": \"a@a.com\",\n        \"cpf\": \"11111111111\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n     \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/AdminController.ts",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin",
    "title": "Inserir administrador",
    "name": "InserirAdmin",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n    \"token\": \"1234\"       \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senha",
            "description": "<p>Senha</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cpf",
            "description": "<p>CPF</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"nome\": \"Doravante\",\n    \"email\": \"a@a.com\",\n    \"senha\": \"9876\",\n    \"cpf\": \"11111111111\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"sucesso\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n    \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/AdminController.ts",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin",
    "title": "Listar todos os administradores",
    "name": "ListarAdmins",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{ \n    \"token\": \"1234\"  \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"admins\": \n    [\n        {\n            \"id\": \"1\",\n            \"nome\": \"Doravante\",\n            \"email\": \"a@a.com\",\n            \"cpf\": \"11111111111\"\n        },\n        {\n            \"id\": \"2\",\n            \"nome\": \"Sebastião\",\n            \"email\": \"b@a.com\",\n            \"cpf\": \"11111111111\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n    \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/AdminController.ts",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/admin",
    "title": "Remover administrador",
    "name": "RemoverAdmin",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n   \"token\": \"1234\"       \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"sucesso\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n     \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/AdminController.ts",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/album",
    "title": "Submeter album",
    "name": "SubmitAlbum",
    "group": "Album",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token da Publicadora (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n    \"token\": \"1234\"       \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "capa",
            "description": "<p>URL da capa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomeArtista",
            "description": "<p>Nome do artista</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idPublicadora",
            "description": "<p>Id da publicadora</p>"
          },
          {
            "group": "Parameter",
            "type": "object[]",
            "optional": false,
            "field": "musicas",
            "description": "<p>Musicas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"capa\": \"https://pcache-pv-us1.badoocdn.com/p506/20486/2/1/4/1400806059/d1328272/t1508588594/c_8wBXuXaC94VXLn8hjatW9rorFe6zZV6LJGIETpAZlJo/1328272751/dfs_360/sz___size__.jpg\",\n    \"nome\": \"Nome do álbum\",\n    \"nomeArtista\": \"xxxtentacion\",\n    \"descricao\": \"Album legal\",\n    \"idPublicadora\": 1,\n    \"musicas\": \n        [ \n            {\n                \"nome\": \"Música 1\",\n                \"duracao\": 240,\n                \"explicito\": true,\n                \"genero\": 1\n            }, \n            {\n                \"nome\": \"Música 2\",\n                \"duracao\": 230,\n                \"explicito\": false,\n                \"genero\": 2\n            } \n        ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"musicasAdicionadas\": [1],\n    \"musicasNaoAdicionadas\": [24]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n    \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/AlbumController.ts",
    "groupTitle": "Album"
  },
  {
    "type": "post",
    "url": "/album",
    "title": "Submeter album",
    "name": "SubmitAlbum",
    "group": "Album",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token da Publicadora (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n   \"token\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "capa",
            "description": "<p>URL da capa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomeArtista",
            "description": "<p>Nome do artista</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descrição</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idPublicadora",
            "description": "<p>Id da publicadora</p>"
          },
          {
            "group": "Parameter",
            "type": "object[]",
            "optional": false,
            "field": "musicas",
            "description": "<p>Musicas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n   \"capa\": \"https://pcache-pv-us1.badoocdn.com/p506/20486/2/1/4/1400806059/d1328272/t1508588594/c_8wBXuXaC94VXLn8hjatW9rorFe6zZV6LJGIETpAZlJo/1328272751/dfs_360/sz___size__.jpg\",\n   \"nome\": \"Vou cutucar seu\",\n   \"nomeArtista\": \"dennis dj\",\n   \"descricao\": \"vem q eu vou te\",\n   \"idPublicadora\": 12344321,\n   \"musicas\": [\n                  {\n                      \"nome\": \"Corsinha Amarelo\",\n                      \"duracao\": 240,\n                      \"explicito\": true,\n                      \"genero\": 1\n                  },\n                  {\n                      \"nome\": \"Comprar alimento\",\n                      \"duracao\": 240,\n                      \"explicito\": false,\n                      \"genero\": 24\n                  },\n              ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"musicasAdicionadas\": [1],\n    \"musicasNaoAdicionadas\": [24]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n     \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/AlbumController.js",
    "groupTitle": "Album"
  },
  {
    "type": "put",
    "url": "/genero",
    "title": "Atualizar gênero",
    "name": "AtualizarGenero",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n   \"token\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>ID do gênero</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Novo nome do gênero</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"id\": 1,\n    \"nome\": \"Novo nome\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"sucesso\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n     \"erro\": \"GENERO_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/GeneroController.js",
    "groupTitle": "Genero"
  },
  {
    "type": "put",
    "url": "/genero",
    "title": "Atualizar gênero",
    "name": "AtualizarGenero",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n    \"token\": \"1234\"       \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Novo nome</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"id\": 1,\n    \"nome\": \"Novo nome\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"sucesso\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n    \"erro\": \"GENERO_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/GeneroController.ts",
    "groupTitle": "Genero"
  },
  {
    "type": "get",
    "url": "/genero/:id",
    "title": "Informações do gênero",
    "name": "InfoGenero",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n   \"token\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>ID do gênero</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n   \"nome\": \"Ação\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n     \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/GeneroController.js",
    "groupTitle": "Genero"
  },
  {
    "type": "get",
    "url": "/genero/:id",
    "title": "Informações do gênero",
    "name": "InfoGenero",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{ \n    \"token\": \"1234\"  \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"id\": 1,\n    \"nome\": \"Ação\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n    \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/GeneroController.ts",
    "groupTitle": "Genero"
  },
  {
    "type": "post",
    "url": "/genero",
    "title": "Inserir gênero",
    "name": "InserirGenero",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n    \"token\": \"1234\"       \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"nome\": \"Ação\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"sucesso\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/GeneroController.ts",
    "groupTitle": "Genero"
  },
  {
    "type": "post",
    "url": "/genero",
    "title": "Inserir gênero",
    "name": "InserirGenero",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n   \"token\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do gênero</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"nome\": \"Ação\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"sucesso\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n     \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/GeneroController.js",
    "groupTitle": "Genero"
  },
  {
    "type": "get",
    "url": "/genero",
    "title": "Listar todos os gêneros",
    "name": "ListarGeneros",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n   \"token\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n \"generos\": [\n     {\n         \"id\": 1,\n         \"nome\": \"Dennis\"\n     },\n     {\n         \"id\": 2,\n         \"nome\": \"Aventura\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n     \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/GeneroController.js",
    "groupTitle": "Genero"
  },
  {
    "type": "get",
    "url": "/genero",
    "title": "Listar todos os gêneros",
    "name": "ListarGeneros",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{ \n    \"token\": \"1234\"  \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"generos\": \n        [\n            {\n                \"id\": 1,\n                \"nome\": \"Ação\"\n            },\n            {\n                \"id\": 2,\n                \"nome\": \"Aventura\"\n            }\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n    \"erro\": \"TOKEN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/GeneroController.ts",
    "groupTitle": "Genero"
  },
  {
    "type": "delete",
    "url": "/genero",
    "title": "Remover gênero",
    "name": "RemoverGenero",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n    \"token\": \"1234\"       \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"sucesso\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n    \"erro\": \"GENERO_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/GeneroController.ts",
    "groupTitle": "Genero"
  },
  {
    "type": "delete",
    "url": "/genero",
    "title": "Remover gênero",
    "name": "RemoverGenero",
    "group": "Genero",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do Administrador (por enquanto é o id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo Header:",
          "content": "{\n   \"token\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>ID do gênero</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"sucesso\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Resposta com erro:",
          "content": "{\n     \"erro\": \"GENERO_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/GeneroController.js",
    "groupTitle": "Genero"
  }
] });
