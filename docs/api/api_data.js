define({ "api": [
  {
    "type": "put",
    "url": "/admin",
    "title": "Atualizar administrador",
    "name": "AtualizarAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/admin?token=deadbeef",
          "type": "String"
        },
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
          "content": "{\n     \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/AdminController.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admin",
    "title": "Atualizar administrador",
    "name": "AtualizarAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/admin?token=deadbeef",
          "type": "String"
        },
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
          "content": "{\n     \"erro\": \"ADMIN_INVALIDO\"\n}",
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
    "url": "/admin/signup",
    "title": "Cadastrar administrador",
    "name": "CadastrarAdmin",
    "group": "Admin",
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
          "title": "Email já existe:",
          "content": "{\n    \"erro\": \"EMAIL_EXISTENTE\"\n}",
          "type": "json"
        },
        {
          "title": "Email já existe:",
          "content": "{\n    \"erro\": \"ERRO_BD\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/AdminController.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/signup",
    "title": "Cadastrar administrador",
    "name": "CadastrarAdmin",
    "group": "Admin",
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
          "title": "Email já existe:",
          "content": "{\n    \"erro\": \"EMAIL_EXISTENTE\"\n}",
          "type": "json"
        },
        {
          "title": "Email já existe:",
          "content": "{\n    \"erro\": \"ERRO_BD\"\n}",
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
    "title": "Informações do administrador",
    "name": "InfoAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/admin?token=deadbeef",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"id\": \"1\",\n    \"nome\": \"Doravante\",\n    \"email\": \"a@a.com\",\n    \"cpf\": \"11111111111\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Admin inválido:",
          "content": "{\n     \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/AdminController.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin",
    "title": "Informações do administrador",
    "name": "InfoAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/admin?token=deadbeef",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"id\": \"1\",\n    \"nome\": \"Doravante\",\n    \"email\": \"a@a.com\",\n    \"cpf\": \"11111111111\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Admin inválido:",
          "content": "{\n     \"erro\": \"ADMIN_INVALIDO\"\n}",
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
    "url": "/admin/signin",
    "title": "Login administrador",
    "name": "LoginAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
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
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"email\": \"a@a.com\",\n    \"senha\": \"9876\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"token\": \"deadbeef\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Email já existe:",
          "content": "{\n    \"erro\": \"INFORMACOES_INCORRETAS\"\n}",
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
    "url": "/admin/signin",
    "title": "Login administrador",
    "name": "LoginAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
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
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n    \"email\": \"a@a.com\",\n    \"senha\": \"9876\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"token\": \"deadbeef\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Email já existe:",
          "content": "{\n    \"erro\": \"INFORMACOES_INCORRETAS\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/AdminController.js",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/admin",
    "title": "Remover administrador",
    "name": "RemoverAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/admin?token=deadbeef",
          "type": "String"
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
    "filename": "./app/controllers/AdminController.ts",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/admin",
    "title": "Remover administrador",
    "name": "RemoverAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/admin?token=deadbeef",
          "type": "String"
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
    "filename": "./dist/app/controllers/AdminController.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/album",
    "title": "Submeter album",
    "name": "SubmitAlbum",
    "group": "Album",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
            "type": "object[]",
            "optional": false,
            "field": "musicas",
            "description": "<p>Musicas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/album?token=deadbeef",
          "type": "String"
        },
        {
          "title": "Exemplo:",
          "content": "{\n    \"capa\": \"https://pcache-pv-us1.badoocdn.com/p506/20486/2/1/4/1400806059/d1328272/t1508588594/c_8wBXuXaC94VXLn8hjatW9rorFe6zZV6LJGIETpAZlJo/1328272751/dfs_360/sz___size__.jpg\",\n    \"nome\": \"Nome do álbum\",\n    \"nomeArtista\": \"xxxtentacion\",\n    \"descricao\": \"Album legal\",\n    \"musicas\": \n        [ \n            {\n                \"nome\": \"Música 1\",\n                \"duracao\": 240,\n                \"explicito\": true,\n                \"genero\": 1\n            }, \n            {\n                \"nome\": \"Música 2\",\n                \"duracao\": 230,\n                \"explicito\": false,\n                \"genero\": 2\n            } \n        ]\n}",
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
          "content": "{\n    \"erro\": \"PUBLICADORA_INVALIDA\"\n}",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
            "type": "object[]",
            "optional": false,
            "field": "musicas",
            "description": "<p>Musicas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/album?token=deadbeef",
          "type": "String"
        },
        {
          "title": "Exemplo:",
          "content": "{\n    \"capa\": \"https://pcache-pv-us1.badoocdn.com/p506/20486/2/1/4/1400806059/d1328272/t1508588594/c_8wBXuXaC94VXLn8hjatW9rorFe6zZV6LJGIETpAZlJo/1328272751/dfs_360/sz___size__.jpg\",\n    \"nome\": \"Nome do álbum\",\n    \"nomeArtista\": \"xxxtentacion\",\n    \"descricao\": \"Album legal\",\n    \"musicas\":\n        [\n            {\n                \"nome\": \"Música 1\",\n                \"duracao\": 240,\n                \"explicito\": true,\n                \"genero\": 1\n            },\n            {\n                \"nome\": \"Música 2\",\n                \"duracao\": 230,\n                \"explicito\": false,\n                \"genero\": 2\n            }\n        ]\n}",
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
          "content": "{\n    \"erro\": \"PUBLICADORA_INVALIDA\"\n}",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
        },
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
          "title": "Admin inválido:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Admin inválido:",
          "content": "{\n    \"erro\": \"GENERO_INVALIDO\"\n}",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
        },
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
          "title": "Admin inválido:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Admin inválido:",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
        }
      ]
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
          "title": "ID gênero inválido:",
          "content": "{\n    \"erro\": \"ID_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Admin inváludo:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Gênero inváludo:",
          "content": "{\n    \"erro\": \"GENERO_INVALIDO\"\n}",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
        }
      ]
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
          "title": "ID gênero inválido:",
          "content": "{\n    \"erro\": \"ID_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Admin inváludo:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Gênero inváludo:",
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
    "type": "post",
    "url": "/genero",
    "title": "Inserir gênero",
    "name": "InserirGenero",
    "group": "Genero",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
        },
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
          "title": "Admin inválido:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Nome inválido:",
          "content": "{\n    \"erro\": \"NOME_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/GeneroController.js",
    "groupTitle": "Genero"
  },
  {
    "type": "post",
    "url": "/genero",
    "title": "Inserir gênero",
    "name": "InserirGenero",
    "group": "Genero",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
        },
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
          "title": "Admin inválido:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Nome inválido:",
          "content": "{\n    \"erro\": \"NOME_INVALIDO\"\n}",
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
    "url": "/genero",
    "title": "Listar todos os gêneros",
    "name": "ListarGeneros",
    "group": "Genero",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
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
          "title": "Admin inválido:",
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
    "type": "get",
    "url": "/genero",
    "title": "Listar todos os gêneros",
    "name": "ListarGeneros",
    "group": "Genero",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Resposta bem sucessida:",
          "content": "{\n    \"generos\":\n        [\n            {\n                \"id\": 1,\n                \"nome\": \"Ação\"\n            },\n            {\n                \"id\": 2,\n                \"nome\": \"Aventura\"\n            }\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Admin inválido:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/GeneroController.js",
    "groupTitle": "Genero"
  },
  {
    "type": "delete",
    "url": "/genero",
    "title": "Remover gênero",
    "name": "RemoverGenero",
    "group": "Genero",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
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
          "title": "ID inválido:",
          "content": "{\n    \"erro\": \"ID_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Admin inválido:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Gênero inválido:",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Json Web Token</p>"
          },
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
          "title": "Request-Example:",
          "content": "https://utfmusic.me/v1/genero?token=deadbeef",
          "type": "String"
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
          "title": "ID inválido:",
          "content": "{\n    \"erro\": \"ID_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Admin inválido:",
          "content": "{\n    \"erro\": \"ADMIN_INVALIDO\"\n}",
          "type": "json"
        },
        {
          "title": "Gênero inválido:",
          "content": "{\n    \"erro\": \"GENERO_INVALIDO\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./dist/app/controllers/GeneroController.js",
    "groupTitle": "Genero"
  }
] });
