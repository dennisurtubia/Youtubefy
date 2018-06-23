import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../get-api.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form:FormGroup;
  constructor(
    private getApi:GetApiService,
    private fb: FormBuilder,
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nome: [ '', Validators.required ],
      cpf: [ '', Validators.required ],
      email: [ '', Validators.required ],
      senha: [ '', Validators.required ],
      opcao: [ '', Validators.required]
    });
  }

  ngOnInit() {
  }
  submitRegister(form:FormData) {
    if(this.form.value.opcao === "admin") {
      this.getApi.addAdmin(this.form.value);
    } else if(this.form.value.opcao === "user") {
      this.getApi.addUser(this.form.value);
    }
  }
}
