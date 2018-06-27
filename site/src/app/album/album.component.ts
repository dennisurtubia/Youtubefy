import { Component, OnInit, Input } from '@angular/core';
import { GetApiService } from "../get-api.service";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { PlayerComponent } from "../player/player.component";

@Component({
  providers: [PlayerComponent],
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private getApi: GetApiService,
    private playerYoutube: PlayerComponent
  ) { }
  setAlbum(id:object) {
    this.localSt.store('page', 2);
    this.localSt.store('currAlbum', id);
  }
  play(musica:Object){
    this.getApi.getAlbum(musica['idAlbum']).then(data=>{
      this.localSt.store('currPlaying', {
        nome: musica['nome'],
        capa: data['capa'],
        nomeArtista: data['nomeArtista'],
        url: musica['url']
      });
    });
  }

  ngOnInit() {
    if(this.localSt.retrieve('currAlbum')) {
      this.getApi.getAlbumMusics(this.localSt.retrieve('curralbum').id);
    }
  }
  ngOnDestroy(){
    this.localSt.clear('currAlbum');
  }
  @Input('id') id:number;
  
}
