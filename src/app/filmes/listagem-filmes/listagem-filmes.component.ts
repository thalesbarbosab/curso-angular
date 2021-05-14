import { ConfigParams } from './../../shared/models/config-params';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  config: ConfigParams = {
    page: 0,
    limit: 5,

  }
  //readonly limite = 5;
  //pagina = 0;
  //texto : string = '';
  //genero : string = '';
  filmes : Filme[] = [];
  filtrosListagem: FormGroup;
  generos : Array<string>;

  constructor(private filmesService : FilmesService,
              private fb : FormBuilder) { }

  ngOnInit() {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });
    this.filtrosListagem.get('texto').valueChanges.subscribe((val : string)=>{
      this.config.search = val;
      this.resetarListagem();
    })
    this.filtrosListagem.get('genero').valueChanges.subscribe((val : string)=>{
      this.config.field = {type: 'genero', value: val};
      this.resetarListagem();
    })
    this.generos = ["Ação","Aventura","Comédia","Drama","Ficção Científica","Romance","Terror"];
    this.onScroll();
  }

  open() {
  }

  onScroll() : void{
    this.listarFilmes();
  }

  private listarFilmes() : void {
    this.config.page++;
    this.filmesService.listar(this.config).subscribe((filmes : Filme[])=>{
      this.filmes.push(...filmes);
    })
  }
  private resetarListagem() : void {
    this.config.page = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
