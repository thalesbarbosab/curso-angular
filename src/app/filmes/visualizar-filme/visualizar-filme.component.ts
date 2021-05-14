import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {

  filme : Filme;
  staticPhoto : string = "https://storiavoce.com/wp-content/plugins/lightbox/images/No-image-found.jpg";

  constructor(private ar : ActivatedRoute,
              private filmeService : FilmesService) { }

  ngOnInit() {
    this.view(this.ar.snapshot.params['id']);
  }

  private view(id: number) : void {
    this.filmeService.visualizar(id).subscribe((filme : Filme)=>{
      this.filme = filme;
    });
  }

}
