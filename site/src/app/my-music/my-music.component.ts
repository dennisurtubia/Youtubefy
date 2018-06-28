import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { GetApiService } from "../get-api.service";

@Component({
  selector: 'app-my-music',
  templateUrl: './my-music.component.html',
  styleUrls: ['./my-music.component.css']
})
export class MyMusicComponent implements OnInit {

  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private getApi: GetApiService
  ) { }

  ngOnInit() {
    this.getApi.getMusicaAprovada();
  }

}
