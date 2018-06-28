import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { GetApiService } from '../get-api.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {Musica} from "../musica";

interface Object{
  nome?:string;
  senha?:string;
  cpf?:number;
  email?:string;
  token?:string;
  id?:number;
  generos?:any[];
  cnpj?:number;
  capa?:string;
  descricao?:string;
  nomeArtista?:string;
  explicito?:boolean;
  url?:string;
  genero?:number;
  duracao?:number;
}


@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {
  form:FormGroup;
  musica: FormGroup;
  musicas: Array<Musica> =[];
  albuns:Object;
  
  constructor(
    private localSt: LocalStorageService,
    private fb: FormBuilder,
    private sessionSt: SessionStorageService,
    private getApi:GetApiService,
    private router: Router
  ) {
    
    this.createForm();
  }
  addAlbum(){
    this.getApi.postAlbum(this.form.value, this.musicas);
  }
  addMusic(){
    console.log(this.musica.value.explicito);
    if(this.musica.value.explicito == "true") {
      this.musica.value.explicito = true;
    } else {
      this.musica.value.explicito = false;
    }
    console.log(this.musica.value.explicito);
    if(this.musica.valid){
      this.musicas.push({
        'nome':this.musica.value.nome,
        'duracao':+this.musica.value.duracao,
        'url':this.musica.value.url,
        'explicito':this.musica.value.explicito,
        'genero':+this.musica.value.genero
      });
      if (this.musica.valid) {
        console.log("Form Submitted!");
        this.musica.reset();
      }
    } else {
      console.log("Insira todos os dados necessários");
    }
    
    
    // this.musicas[length].nome = this.musica.value.nome;
    // this.musicas[length].duracao = this.musica.value.duracao;
    // this.musicas[length].explicito = this.musica.value.explicito;
    // this.musicas[length].genero = this.musica.value.genero;
    // this.musicas[length].url = this.musica.value.url;
  }
  remove(i:number){
    this.musicas.splice(i,1);
  }
  createForm() {
    this.form = this.fb.group({
      nome: [ '', Validators.required ],
      nomeArtista: [ '', Validators.required],
      capa: ['', Validators.required],
      descricao: ['', Validators.required],
    });
    this.musica = this.fb.group({
      nome: [ '', Validators.required ],
      duracao: [ '', Validators.required],
      explicito: ['', Validators.required],
      genero: ['', Validators.required],
      url: ['', Validators.required],
    });
  }
  quit(){
    this.localSt.clear('token');
    this.localSt.clear('usertype');
    this.localSt.clear('currplaying');
    this.localSt.clear('albuns');
    this.localSt.clear('data');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.getApi.getPublicadora(this.localSt.retrieve('token').token, this.localSt.retrieve('data')['id']);
    this.getApi.getListAlbumPublicadora(3).then(data => {
      this.albuns = data['albuns'];
      console.log(data);
    });
    if(this.localSt.retrieve('token') === null) {
      this.router.navigate(['/login']);
    }
  }

}
