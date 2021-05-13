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

  listar(page:number,limit:number,text:string,gender:string) : Observable<Filme[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page',page.toString());
    httpParams =  httpParams.set('_limit',limit.toString());
    //httpParams =  httpParams.set('_sort','titulo');
    //httpParams =  httpParams.set('_order','desc');
    if(text){
      httpParams =  httpParams.set('q',text.toString());
    }
    if(gender){
      httpParams =  httpParams.set('genero',gender.toString());
    }
    return this.httpClient.get<Filme[]>(url, {params: httpParams});
  }

  salvar(filme : Filme) : Observable<Filme> {
    return this.httpClient.post<Filme>(url,filme);
  }
}
