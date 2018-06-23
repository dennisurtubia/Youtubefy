import { Component, OnInit } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { GetApiService } from '../get-api.service';
import {Router} from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  response: Object;
  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private getApi:GetApiService,
    private router:Router
  ) {
    this.localSt.store('page', 1);
  }

  setPage(page: number) {
    this.localSt.store("page", page);
  }
  getAdmin(token:string){
    this.getApi.getAdmin(token);
  }

  quit(){
    this.localSt.clear('token');
    this.localSt.clear('data');
    this.localSt.clear('page');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    if(!this.localSt.retrieve('token')) {
      this.router.navigate(['/login']);
    }
    
    this.getAdmin(this.localSt.retrieve('token').token);
  }
  ngOnDestroy(){
    this.localSt.clear('data');
    this.localSt.clear('page');
  }
  
}
