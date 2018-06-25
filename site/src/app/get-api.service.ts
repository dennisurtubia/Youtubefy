import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Form} from '@angular/forms';
import { of } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import {Router} from "@angular/router";
import { catchError, retry } from 'rxjs/operators';
import {Musica} from "./musica";

interface Object{
  nome?:string;
  senha?:string;
  cpf?:number;
  email?:string;
  token?:string;
  id?:number;
  generos?:any[];
  cnpj?:number;
  capa?:string;
  descricao?:string;
  nomeArtista?:string;
  explicito?:boolean;
  url?:string;
  genero?:number;
  duracao?:number;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer 8f1ce254-7a29-4180-b17c-b1f0653c1c02'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GetApiService {
  constructor(
    private http:HttpClient,
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private router: Router,
  ) {

  }
  private apiUrl = "https://api-projectbd.wedeploy.io/v1/";


  addAdmin (form: Object) {
    const req = this.http.post(this.apiUrl + 'admin/signup', {
      nome: form.nome,
      senha: form.senha,
      cpf: form.cpf,
      email: form.email
    })
    .subscribe(
      res => {
        console.log(res);
        this.localSt.store('registered', res);
      },
      err => {
        console.log("Erro");
      }
    );
  }
  addPublicadora (form: Object) {
    const req = this.http.post(this.apiUrl + 'publicadora/signup', {
      nome: form.nome,
      senha: form.senha,
      cnpj: form.cpf,
      email: form.email
    })
    .subscribe(
      res => {
        console.log(res);
        this.localSt.store('registered', res);
      },
      err => {
        console.log("Erro");
      }
    );
  }
  addUser (form: Object) {
    const req = this.http.post(this.apiUrl + 'ouvinte/signup', {
      nome: form.nome,
      senha: form.senha,
      cpf: form.cpf,
      email: form.email
    })
    .subscribe(
      res => {
        console.log(res);
        this.localSt.store('registered', res);
      },
      err => {
        console.log("Erro");
      }
    );
  }
  loginUser(form:Object){
    const req = this.http.post(this.apiUrl + 'ouvinte/signin', {
      senha: form.senha,
      email: form.email
    })
    .subscribe(
      res => {
        console.log(res);
        if(res['token']){
          this.localSt.store('token', res);
          if(this.localSt.retrieve('erro')){
            this.localSt.clear('erro');
            
          }
          this.router.navigate(['/']);
        } else {
          this.localSt.store('erro', res);
        }
      },
      err => {
        console.log("Erro");
      }
    );
  }
  loginAdmin(form:Object) {
    const req = this.http.post(this.apiUrl + 'admin/signin', {
      senha: form.senha,
      email: form.email
    })
    .subscribe(
      res => {
        console.log(res);
        if(res['token']){
          this.localSt.store('token', res);
          if(this.localSt.retrieve('erro')){
            this.localSt.clear('erro');
            
          }
          this.router.navigate(['/admin']);
        } else {
          this.localSt.store('erro', res);
        }
        
      },
      err => {
        console.log("Erro");
      }
    );
  }
  loginPublicadora(form:Object){
    const req = this.http.post(this.apiUrl + 'publicadora/signin', {
      senha: form.senha,
      email: form.email
    })
    .subscribe(
      res => {
        console.log(res);
        if(res['token']){
          this.localSt.store('token', res);
          if(this.localSt.retrieve('erro')){
            this.localSt.clear('erro');
            
          }
          this.router.navigate(['/publicadora']);
        } else {
          this.localSt.store('erro', res);
        }
      },
      err => {
        console.log("Erro");
      }
    );
  }
  getAdmin(token:string){
    this.http.get(this.apiUrl + 'admin?token=' + token).subscribe(data => {
      this.localSt.store('data', data);
    });
  }
  getPublicadora(token:string){
    this.http.get(this.apiUrl + 'publicadora?token=' + token).subscribe(data => {
      this.localSt.store('data', data);
    });
  }
  getUser(token:string){
    this.http.get(this.apiUrl + 'ouvinte?token=' + token).subscribe(data => {
      this.localSt.store('data', data);
    });
  }
  getGenderInfo(id:number) {
    this.http.get(this.apiUrl + 'genero/' + id + '?token=' + this.localSt.retrieve('token').token).subscribe(data => {
    });
  }
  getGender(token:string){
    this.http.get(this.apiUrl + 'genero?token=' + token).subscribe(data => {
      this.localSt.store('genero', data['generos']);
    });
  }
  postAlbum(form:Object, musicas:Array<Musica>){
    console.log(form);
    console.log(musicas);
    const req = this.http.post(this.apiUrl + 'album?token=' + this.localSt.retrieve('token').token, {
      nome: form.nome,
      nomeArtista: form.nomeArtista,
      capa: form.capa,
      descricao: form.descricao,
      musicas: musicas
    })
    .subscribe(
      res => {
        console.log(res);
        this.localSt.store('registered', res);
      },
      err => {
        console.log("Erro");
      }
    );
  }
  postGender(token:string, form:Object){
    const req = this.http.post(this.apiUrl + 'genero?token=' + token, {
      nome: form.nome,
    })
    .subscribe(
      res => {
        console.log(res);
        this.localSt.store('registered', res);
      },
      err => {
        console.log("Erro");
      }
    );
  }
  updateGender(id:number, nome:string) {
    this.http.request('put', this.apiUrl + 'genero?token=' + this.localSt.retrieve('token').token, { body: {id:id, nome:nome} })
    .subscribe(
      res => {
        console.log(res);
        this.localSt.store('registered', res);
      },
      err => {
        console.log("Erro");
      }
    );
  }
  deleteGender(id:number){
    this.http.request('delete', this.apiUrl + 'genero?token=' + this.localSt.retrieve('token').token, { body: {id:id} })
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
    this.http.get(this.apiUrl + 'musica/aprovadas?token=' + this.localSt.retrieve('token').token).subscribe(data => {
      this.localSt.store('musicasAprovadas', data);
    });
  }
  getNaoAvaliadas() {
    this.http.get(this.apiUrl + 'musica/naoavaliadas?token=' + this.localSt.retrieve('token').token).subscribe(data => {
      this.localSt.store('musicasNaoAvaliadas', data);
    });
  }
}
