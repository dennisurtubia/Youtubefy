import { Component, OnInit } from "@angular/core";
import { GetApiService } from "../get-api.service";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import {Router } from '@angular/router';

interface myData {
  obj:Object;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  playlists:{};
  player: YT.Player;
  items: any[];
  current: any[];
  page: number;
  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private getApi: GetApiService,
    private router: Router
  ) {
    if (this.localSt.retrieve("page") === null) {
      this.localSt.store("page", 1);
      this.page = 1;
    } else {
      this.page = this.localSt.retrieve("page");
    }
    this.current = [
      {
        img:
          "http://www.punknet.com.br/wp-content/uploads/arctic-monkeys-am-300x300.jpg",
        title: "Speak to Me / Breathe",
        url: "http://youtube.com/whatch?",
        author: "Pink Floyd"
      }
    ];

    
  }


  savePlayer(player) {
    this.player = player;
    console.log("player instance", player);
  }
  onStateChange(event) {
    console.log("player state", event.data);
  }
  changePage(pageNumber: number) {
    this.page = pageNumber;
  }
  quit() {
    this.localSt.clear('page');
    this.localSt.clear('data');
    this.localSt.clear('token');
    this.router.navigate(['/login']);
  }
  setAlbum(id:number) {
    this.localSt.store('page', 2);
  }
  ngOnInit() {
    this.getApi.getListAlbum();
    this.getApi.getUser(this.localSt.retrieve('token').token);
    if(!this.localSt.retrieve('token') || this.localSt.retrieve('data').erro === "ACESSO_NEGADO") {
      this.quit();
    }
  }
  ngOnDestroy() {
    this.localSt.clear('data');
    this.localSt.clear('page');
  }
}
