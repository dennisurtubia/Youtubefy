import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Form} from '@angular/forms';
import { of } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import {Router} from "@angular/router";

interface Object{
  nome:string;
  senha:string;
  cpf:number;
  email:string;
  token:string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization' : "8f1ce254-7a29-4180-b17c-b1f0653c1c02"
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
    private router: Router
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
        if(res.token){
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
        if(res.token){
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
  getAdmin(token:string){
    console.log(this.apiUrl + 'admin?token=' + token);
    this.http.get(this.apiUrl + 'admin?token=' + token).subscribe(data => {
      this.localSt.store('data', data);
    });
  }
  getUser(token:string){
    console.log(this.apiUrl + 'ouvinte?token=' + token);
    this.http.get(this.apiUrl + 'ouvinte?token=' + token).subscribe(data => {
      this.localSt.store('data', data);
    });
  }
}