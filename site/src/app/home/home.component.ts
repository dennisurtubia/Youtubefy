import { Component, OnInit } from "@angular/core";
import { GetApiService } from "../get-api.service";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { Router } from '@angular/router';

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
  currentMusic: number;
  duration: number;
  currentTime: number;
  dataRefresher: any;
  savedAlbuns: any[];
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
    this.localSt.store('currPlaying', {
      url: '8'
    });
  }
  savePlayer(player) {
    this.player = player;
    console.log("player instance", player);
  }
  onStateChange(event) {
    console.log("player state", event.data);
  }

  play(musica:Object, index:number){
    this.getApi.getAlbum(musica['idAlbum']).then(data=>{
      this.localSt.store('currPlaying', {
        nome: musica['nome'],
        capa: data['capa'],
        nomeArtista: data['nomeArtista'],
        url: musica['url']
      });
      this.player.cueVideoById(this.localSt.retrieve('currPlaying')['url']);
      this.player.playVideo();
      this.currentMusic = musica['id'];
      
    });
  }
  toggle() {
    if(this.player.getPlayerState() === 2){
      this.player.playVideo();
    } else{
      this.player.pauseVideo();
    }
  }
  
  changePage(pageNumber: number) {
    this.page = pageNumber;
    if(pageNumber !== 2){
      this.localSt.clear('currAlbum');
    } else if( pageNumber = 4){
      this.getApi.getMusicaAprovada();
    }
  }
  quit() {
    this.localSt.clear('page');
    this.localSt.clear('data');
    this.localSt.clear('token');
    this.router.navigate(['/login']);
  }
  setAlbum(id:object) {
    this.getApi.getAlbum(id['idAlbum']).then(data=>{
      this.localSt.store('currAlbum', id);
    });
    this.getApi.getAlbumMusics(id['id']);
    this.localSt.store('page', 2);
    this.localSt.store('currAlbum', id);
  }
  refreshData(){
    this.dataRefresher =
      setInterval(() => {
        this.currentTime = this.player.getCurrentTime();
        this.duration = this.player.getDuration();
      }, 1000);  
  }
  setTime(time:number){
    this.player.seekTo(time, true);
  }
  cancelPageRefresh(){
    if(this.dataRefresher){
      clearInterval(this.dataRefresher);
    }    
  }
  ngOnInit() {
    if(this.localSt.retrieve('token') && this.localSt.retrieve('usertype') === 3) {
      this.router.navigate(['/admin']);
    } else if(this.localSt.retrieve('token') && this.localSt.retrieve('usertype') === 2) {
      this.router.navigate(['/publicadora']);
    } if(this.localSt.retrieve('token') && this.localSt.retrieve('usertype') === 1) {
      this.router.navigate(['/']);
    } else {
      this.quit();
      this.router.navigate(['login']);
    }
    this.refreshData();
    this.getApi.getListAlbum();
    this.getApi.getUser(this.localSt.retrieve('token').token);
  }
  ngOnDestroy() {
    this.cancelPageRefresh();
    this.localSt.clear('data');
    this.localSt.clear('page');
  }
}
