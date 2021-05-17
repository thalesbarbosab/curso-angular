import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { FilmesService } from './../../core/filmes.service';
import { Filme } from './../../shared/models/filme';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Alerta } from 'src/app/shared/models/alerta';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;
  id : number = null;

  constructor(
    public validacao : ValidarCamposService,
    public dialog : MatDialog,
    private fb: FormBuilder,
    private filmesService : FilmesService,
    private router: Router,
    private ar : ActivatedRoute) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    if(this.id){
      this.filmesService.visualizar(this.id).subscribe((filme : Filme)=>{
        this.criarForm(filme);
      });
    }else{
      this.criarForm( this.criarFormEmBranco());
    }
    this.generos = ["Ação","Aventura","Comédia","Drama","Ficção Científica","Romance","Terror"];
  }
  submit() : void {
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    if(this.id){
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }
  resetarForm() : void {
    this.cadastro.reset();
  }
  private criarForm(filme : Filme) : void {
    this.cadastro = this.fb.group({
      id: filme.id ? filme.id : null,
      titulo: [filme.titulo,[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      urlFoto: [filme.urlFoto,[Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento,[Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota,[Validators.required,Validators.min(0),Validators.max(10)]],
      urlIMDb: [filme.urlIMDb,[Validators.minLength(10)]],
      genero: [filme.genero,[Validators.required]],
    });
  }
  private criarFormEmBranco() : Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao : null,
      nota: null,
      urlIMDb: null,
      genero: null
    } as Filme;
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
      const config = {
        data: {
          titulo : 'Erro!',
          descricao: 'Erro ao salvar o filme, tente novamente.',
          btnSucesso: 'Fechar' ,
          corBtnSucesso: 'warn',
          possuirBtnFechar: false
        } as Alerta
      }
      this.dialog.open(AlertaComponent,config);
    });
  }
  private editar(filme : Filme) : void{
    this.filmesService.editar(filme).subscribe(()=>{
      const config = {
        data: {
          descricao : 'filme atualizado com sucesso',
          btnSucesso: 'ir para todos os filmes'
        } as Alerta
      }
      const dialogRef = this.dialog.open(AlertaComponent,config)
      dialogRef.afterClosed().subscribe(()=>this.router.navigateByUrl('/filmes'));
    },
    ()=>{
      const config = {
        data: {
          titulo : 'Erro!',
          descricao: 'Erro ao atualizar o filme, tente novamente.',
          btnSucesso: 'fechar' ,
          corBtnSucesso: 'warn',
          possuirBtnFechar: false
        } as Alerta
      }
      this.dialog.open(AlertaComponent,config);
    });
  }
}
