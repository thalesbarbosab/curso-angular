import { MatDialog } from '@angular/material';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {

  id : number;
  filme : Filme;
  staticPhoto : string = "https://storiavoce.com/wp-content/plugins/lightbox/images/No-image-found.jpg";

  constructor(private ar : ActivatedRoute,
              private filmeService : FilmesService,
              private router : Router,
              public dialog : MatDialog) { }

  ngOnInit() {
    this.id = this.ar.snapshot.params['id'];
    this.view();
  }

  public backToAll(){
    this.router.navigateByUrl('/filmes');
  }

  public delete(){
    const config = {
      data: {
        titulo : 'confirma a remoção deste filme?',
        descricao : 'ao clicar em ok, o filme será removido.',
        btnSucesso: 'OK',
        corBtnSucesso: 'warn',
        btnCancelar: 'cancelar',
        corBtnCancelar: 'primary',
        possuiBtnFechar: true
      } as Alerta
    }
    const dialogRef = this.dialog.open(AlertaComponent,config)
    dialogRef.afterClosed().subscribe((opcao:boolean)=>{
      if(opcao){
        this.filmeService.excluir(this.filme.id).subscribe(()=>{
          const config = {
            data: {
              titulo : 'filme removido',
              descricao : 'filme removido com sucesso!',
              btnCancelar: 'retornar para todos os filmes',
              corBtnCancelar: 'primary',
              possuiBtnFechar: true
            } as Alerta
          }
          const dialogRef = this.dialog.open(AlertaComponent,config)
          dialogRef.afterClosed().subscribe(()=>{
            this.router.navigateByUrl('/filmes')
          })
        })
      }
    });
  }

  public edit(){
    this.router.navigateByUrl('/filmes/cadastro/'+ this.id);
  }

  private view() : void {
    this.filmeService.visualizar(this.id).subscribe((filme : Filme)=>{
      this.filme = filme;
    });
  }


}
