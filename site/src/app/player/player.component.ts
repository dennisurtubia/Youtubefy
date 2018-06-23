import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  musica: string;
  constructor() { }

  ngOnInit() {
    
  }
  @Input("music") music: string;
}
