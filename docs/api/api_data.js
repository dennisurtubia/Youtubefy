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
      }
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
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/app/controllers/AlbumController.ts",
    "groupTitle": "Album"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./api/apidoc/main.js",
    "group": "_home_fjorg_Projects_ProjectBD_api_apidoc_main_js",
    "groupTitle": "_home_fjorg_Projects_ProjectBD_api_apidoc_main_js",
    "name": ""
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/api/main.js",
    "group": "_home_fjorg_Projects_ProjectBD_docs_api_main_js",
    "groupTitle": "_home_fjorg_Projects_ProjectBD_docs_api_main_js",
    "name": ""
  }
] });
