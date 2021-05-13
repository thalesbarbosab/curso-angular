import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from './../shared/models/filme';
import { HttpClient } from '@angular/common/http';

const url = "http://localhost:3000/filmes/";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private httpClient : HttpClient) { }

  salvar(filme : Filme) : Observable<Filme> {
    return this.httpClient.post<Filme>(url,filme);
  }
}
