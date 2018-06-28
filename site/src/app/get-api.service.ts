import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Form } from "@angular/forms";
import { of } from "rxjs";
import { map } from "rxjs/Operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { Router } from "@angular/router";

import { Musica } from "./musica";

interface Object {
  nome?: string;
  senha?: string;
  cpf?: number;
  email?: string;
  token?: string;
  id?: number;
  generos?: any[];
  cnpj?: number;
  capa?: string;
  descricao?: string;
  nomeArtista?: string;
  explicito?: boolean;
  url?: string;
  genero?: number;
  duracao?: number;
}

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class GetApiService {
  album: Object;
  infoPublicadora: Object;
  albums: Object;
  constructor(
    private http: HttpClient,
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private router: Router
  ) {}
  private apiUrl = "http://35.198.13.13/v1/";

  addAdmin(form: Object) {
    const req = this.http
      .post(this.apiUrl + "admin/signup", {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        cpf: form.cpf
      })
      .subscribe(
        res => {
          console.log(res);
          this.localSt.store("registered", res);
        },
        err => {
          console.log("Erro");
        }
      );
  }
  addPublicadora(form: Object) {
    const req = this.http
      .post(this.apiUrl + "publicadora/signup", {
        nome: form.nome,
        senha: form.senha,
        cnpj: form.cpf,
        email: form.email
      })
      .subscribe(
        res => {
          console.log(res);
          this.localSt.store("registered", res);
        },
        err => {
          console.log("Erro");
        }
      );
  }
  addUser(form: Object) {
    const req = this.http
      .post(this.apiUrl + "ouvinte/signup", {
        nome: form.nome,
        senha: form.senha,
        cpf: form.cpf,
        email: form.email
      })
      .subscribe(
        res => {
          console.log(res);
          this.localSt.store("registered", res);
        },
        err => {
          console.log("Erro");
        }
      );
  }
  loginUser(form: Object) {
    const req = this.http
      .post(this.apiUrl + "ouvinte/signin", {
        senha: form.senha,
        email: form.email
      })
      .subscribe(
        res => {
          console.log(res);
          this.localSt.store('usertype', 1);
          if (res["token"]) {
            this.localSt.store("token", res);
            if (this.localSt.retrieve("erro")) {
              this.localSt.clear("erro");
            }
            this.router.navigate(["/"]);
          } else {
            this.localSt.store("erro", res);
          }
        },
        err => {
          console.log("Erro");
        }
      );
  }
  loginAdmin(form: Object) {
    const req = this.http
      .post(this.apiUrl + "admin/signin", {
        senha: form.senha,
        email: form.email
      })
      .subscribe(
        res => {
          console.log(res);
          this.localSt.store('usertype', 3);
          if (res["token"]) {
            this.localSt.store("token", res);
            if (this.localSt.retrieve("erro")) {
              this.localSt.clear("erro");
            }
            this.router.navigate(["/admin"]);
          } else {
            this.localSt.store("erro", res);
          }
        },
        err => {
          console.log("Erro");
        }
      );
  }
  loginPublicadora(form: Object) {
    const req = this.http
      .post(this.apiUrl + "publicadora/signin", {
        senha: form.senha,
        email: form.email
      })
      .subscribe(
        res => {
          console.log(res);
          this.localSt.store('usertype', 2);
          if (res["token"]) {
            this.localSt.store("token", res);
            if (this.localSt.retrieve("erro")) {
              this.localSt.clear("erro");
            }
            this.router.navigate(["/publicadora"]);
          } else {
            this.localSt.store("erro", res);
          }
        },
        err => {
          console.log("Erro");
        }
      );
  }
  getAdmin(token: string) {
    this.http.get(this.apiUrl + "admin?token=" + token).subscribe(data => {
      this.localSt.store("data", data);
    });
  }
  getPublicadora(token: string, id:number) {
    this.http
      .get(this.apiUrl + "publicadora/" + id + "/info?token=" + token)
      .subscribe(data => {
        this.localSt.store("data", data);
      });
  }
  getUser(token: string) {
    this.http.get(this.apiUrl + "ouvinte?token=" + token).subscribe(data => {
      this.localSt.store("data", data);
    });
  }
  getGenderInfo(id: number) {
    this.http
      .get(
        this.apiUrl +
          "genero/" +
          id +
          "?token=" +
          this.localSt.retrieve("token").token
      )
      .subscribe(data => {});
  }
  getGender(token: string) {
    this.http.get(this.apiUrl + "genero?token=" + token).subscribe(data => {
      this.localSt.store("genero", data["generos"]);
    });
  }
  getAlbum(id: number) {
    this.apiUrl + "album/" +
      id +
      "?token=" +
      this.localSt.retrieve("token").token;
    return new Promise((resolve, reject) => {
      this.http.get( this.apiUrl + "album/" + id + "?token=" + this.localSt.retrieve("token").token)
      .subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  }
  avaliaMusica(id:number, avaliacao:string){
    console.log(id);
    console.log(avaliacao);
    const req = this.http
      .post(
        this.apiUrl + "musica/avaliar?token=" + this.localSt.retrieve("token").token,
        {
          id: id,
          avaliacao: avaliacao
        }
      )
      .subscribe(
        res => {
          console.log(res);
          this.getNaoAvaliadas();
          this.localSt.store("registered", res);
        },
        err => {
          console.log("Erro");
        }
      );
  }
  postAlbum(form: Object, musicas: Array<Musica>) {
    console.log(form);
    console.log(musicas);
    const req = this.http
      .post(
        this.apiUrl + "album?token=" + this.localSt.retrieve("token").token,
        {
          nome: form.nome,
          nomeArtista: form.nomeArtista,
          capa: form.capa,
          descricao: form.descricao,
          musicas: musicas
        }
      )
      .subscribe(
        res => {
          console.log(res);
          this.localSt.store("registered", res);
        },
        err => {
          console.log("Erro");
        }
      );
  }
  postGender(token: string, form: Object) {
    const req = this.http
      .post(this.apiUrl + "genero?token=" + token, {
        nome: form.nome
      })
      .subscribe(
        res => {
          console.log(res);
          this.localSt.store("registered", res);
        },
        err => {
          console.log("Erro");
        }
      );
  }
  updateGender(id: number, nome: string) {
    this.http
      .request(
        "put",
        this.apiUrl + "genero?token=" + this.localSt.retrieve("token").token,
        { body: { id: id, nome: nome } }
      )
      .subscribe(
        res => {
          console.log(res);
          this.localSt.store("registered", res);
        },
        err => {
          console.log("Erro");
        }
      );
  }
  deleteGender(id: number) {
    this.http
      .request(
        "delete",
        this.apiUrl + "genero?token=" + this.localSt.retrieve("token").token,
        { body: { id: id } }
      )
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Erro");
        }
      );
  }
  getMusicaAprovada() {
    this.http
      .get(
        this.apiUrl +
          "musica/aprovadas?token=" +
          this.localSt.retrieve("token").token
      )
      .subscribe(data => {
        this.localSt.store("musicasAprovadas", data);
        console.log(data);
      });
  }
  getNaoAvaliadas() {
    this.http
      .get(
        this.apiUrl +
          "musica/naoavaliadas?token=" +
          this.localSt.retrieve("token").token
      )
      .subscribe(data => {
        this.localSt.store("musicasNaoAvaliadas", data);
      });
  }
  getReprovadas() {
    this.http
      .get(
        this.apiUrl +
          "musica/reprovadas?token=" +
          this.localSt.retrieve("token").token
      )
      .subscribe(data => {
        this.localSt.store("musicasReprovadas", data);
      });
  }
  getListAlbum(){
    this.http.get(this.apiUrl + "album").subscribe(data => {
      this.localSt.store('albuns', data['albuns']); 
    });
  }
  getListAlbumPublicadora(id:number){ 
    return new Promise((resolve, reject) => {
      this.http.get( this.apiUrl + "publicadora/" + id + "/albuns")
      .subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  }
  getAlbumMusics(id:number) {
    console.log(id);
    this.http.get(this.apiUrl + "album/" + id + "/musicas").subscribe(data => {
      this.localSt.store('musicas', data);
    });
  }
}
