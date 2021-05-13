import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from './../shared/models/filme';
import { HttpClient, HttpParams } from '@angular/common/http';

const url = "http://localhost:3000/filmes/";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private httpClient : HttpClient) { }

  listar(page:number,limit:number) : Observable<Filme[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page',page.toString());
    httpParams =  httpParams.set('_limit',limit.toString());
    return this.httpClient.get<Filme[]>(url, {params: httpParams});
  }

  salvar(filme : Filme) : Observable<Filme> {
    return this.httpClient.post<Filme>(url,filme);
  }
}
