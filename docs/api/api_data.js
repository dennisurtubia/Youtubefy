define({ "api": [
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
            "type": "Number[]",
            "optional": false,
            "field": "musicas",
            "description": "<p>IDs das músicas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo:",
          "content": "{\n   \"capa\": \"https://pcache-pv-us1.badoocdn.com/p506/20486/2/1/4/1400806059/d1328272/t1508588594/c_8wBXuXaC94VXLn8hjatW9rorFe6zZV6LJGIETpAZlJo/1328272751/dfs_360/sz___size__.jpg\",\n   \"nome\": \"Vou cutucar seu\",\n   \"nomeArtista\": \"dennis dj\",\n   \"descricao\": \"vem q eu vou te\",\n   \"idPublicadora\": 12344321,\n   \"musicas\": [1,2,3,4,5]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/controllers/AlbumController.ts",
    "groupTitle": "Album"
  }
] });
