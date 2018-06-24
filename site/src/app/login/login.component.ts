import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../get-api.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor(
    private getApi:GetApiService,
    private fb: FormBuilder,
    private router: Router,
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: [ '', Validators.required ],
      senha: [ '', Validators.required ],
      opcao: [ '', Validators.required]
    });
  }

  ngOnInit() {
    if(this.localSt.retrieve('token')) {
      if(this.localSt.retrieve('token').token) {
        this.router.navigate(['/admin']);
      }
    }
  }
  ngOnDestroy(){
    this.localSt.clear('erro');
  }
  submitLogin() {
    console.log(this.form.value);
    if(this.form.value.opcao === "admin") {
      this.getApi.loginAdmin(this.form.value);
    } else if(this.form.value.opcao === "user") {
      this.getApi.loginUser(this.form.value);
    } else if(this.form.value.opcao === "publisher") {
      this.getApi.loginPublicadora(this.form.value);
    }
  }
}
