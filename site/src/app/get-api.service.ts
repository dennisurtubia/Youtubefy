import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Form} from '@angular/forms';
import { of } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

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
    private sessionSt: SessionStorageService
  ) {
  }
  private apiUrl = "https://api-projectbd.wedeploy.io/v1/";

  getPlaylists() {
    return this.http.get(this.apiUrl)
  }

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

}
