import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { FilmesService } from './../../core/filmes.service';
import { Filme } from './../../shared/models/filme';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Alerta } from 'src/app/shared/models/alerta';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao : ValidarCamposService,
    public dialog : MatDialog,
    private fb: FormBuilder,
    private filmesService : FilmesService,
    private router: Router) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.cadastro = this.fb.group({
      titulo: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      urlFoto: ['',[Validators.minLength(10)]],
      dtLancamento: ['',[Validators.required]],
      descricao: [''],
      nota: [0,[Validators.required,Validators.min(0),Validators.max(10)]],
      urlImdb: ['',[Validators.minLength(10)]],
      genero: ['',[Validators.required]],
    });
    this.generos = ["Ação","Aventura","Comédia","Drama","Ficção Científica","Romance","Terror"];
  }
  submit() : void {
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }
  resetarForm() : void {
    this.cadastro.reset();
  }
  private salvar(filme : Filme) : void{
    this.filmesService.salvar(filme).subscribe(()=>{
      const config = {
        data: {
          descricao : 'filme salvo com sucesso',
          btnSucesso: 'ir para todos os filmes',
          corBtnSucesso: 'success',
          btnCancelar: 'incluir novo filme',
          corBtnCancelar: 'primary',
          possuiBtnFechar: true
        } as Alerta
      }
      const dialogRef = this.dialog.open(AlertaComponent,config)
      dialogRef.afterClosed().subscribe((opcao:boolean)=>{
        if(opcao){
          this.router.navigateByUrl('filmes');
        }else{
          this.resetarForm();
        }
      });
    },
    ()=>{
      alert('Erro!')
    });
  }
}
