import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes : Filme[] = [];
  pagina = 0;
  readonly limite = 5;

  constructor(private filmesService : FilmesService) { }

  ngOnInit() {
    this.onScroll();
  }

  open() {
  }

  onScroll() : void{
    this.listarFilmes();
  }

  private listarFilmes() : void {
    this.pagina++;
    this.filmesService.listar(this.pagina,this.limite).subscribe((filmes : Filme[])=>{
      this.filmes.push(...filmes);
    })
  }

}
