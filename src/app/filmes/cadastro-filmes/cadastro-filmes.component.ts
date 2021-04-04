import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor(
    public validacao : ValidarCamposService,
    private fb: FormBuilder) { }

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
  }
  salvar() : void {
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;
    }
    alert('Success!!\n\n' + JSON.stringify(this.cadastro.value, null, 4));
  }
  resetarForm() : void {
    this.cadastro.reset();
  }
}
