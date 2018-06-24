import { Component, OnInit } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { GetApiService } from '../get-api.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  response: Object;
  form:FormGroup;
  loading: boolean;
  currentBtn: number;
  currentEdit: any[];
  listGender: any[];
  constructor(
    private localSt: LocalStorageService,
    private fb: FormBuilder,
    private sessionSt: SessionStorageService,
    private getApi:GetApiService,
    private router:Router
  ) {
    if (this.localSt.retrieve("page") === null) {
      this.localSt.store("page", 1);

    }
    this.createForm();
    this.localSt.clear('registered');
    this.listGender = this.localSt.retrieve('genero');
    this.loading = false;
    this.currentBtn = -1;
  }

  createForm() {
    this.form = this.fb.group({
      nome: [ '', Validators.required ]
    });
  }
  addGender() {
    this.localSt.clear('registered');
    this.getApi.postGender(this.localSt.retrieve('token').token, this.form.value);
    setTimeout(() => 
    {
      this.getApi.getGender(this.localSt.retrieve('token').token);
    }, 2000);
  }
  close(){
    this.localSt.clear('registered');
  }
  deleteGender(id:number, index:number) {
    this.getApi.deleteGender(id);
    this.loading = true;
    this.currentBtn = index;
    setTimeout(() => 
    {
      this.getApi.getGender(this.localSt.retrieve('token').token);
      this.loading = false;
      this.currentBtn = null;
    }, 2000);
  }
  updateGender() {
    this.getApi.updateGender(this.currentEdit.id, this.form.value.nome);
    setTimeout(() => 
    {
      this.getApi.getGender(this.localSt.retrieve('token').token);
    }, 2000);
  }
  setPage(page: number) {
    this.localSt.store("page", page);
  }
  getAdmin(token:string){
    this.getApi.getAdmin(token);
  }
  refresh() {
    this.getApi.getGender(this.localSt.retrieve('token').token);
  }
  quit(){
    this.localSt.clear('token');
    this.localSt.clear('data');
    this.localSt.clear('page');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.localSt.clear('registered');
    if(!this.localSt.retrieve('token')) {
      this.router.navigate(['/login']);
    }
    this.getAdmin(this.localSt.retrieve('token').token);
    this.getApi.getGender(this.localSt.retrieve('token').token);
    this.listGender = this.localSt.retrieve('genero');

  }
  ngOnDestroy(){
    this.localSt.clear('data');
    this.localSt.clear('page');
    this.localSt.clear('registered');
    this.localSt.clear('genero');
  }
  
}
