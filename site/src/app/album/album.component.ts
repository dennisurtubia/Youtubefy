import { Component, OnInit, Input } from '@angular/core';
import { GetApiService } from "../get-api.service";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private getApi: GetApiService,
  ) { }

  ngOnInit() {
    this.getApi.getAlbumMusics(this.localSt.retrieve('curralbum').id);
  }
  @Input('id') id:number;

}
