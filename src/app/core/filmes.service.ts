import { ConfigParams } from './../shared/models/config-params';
import { ConfigParamsService } from './config-params.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from './../shared/models/filme';
import { HttpClient, HttpParams } from '@angular/common/http';

const url = "http://localhost:3000/filmes/";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private httpClient : HttpClient,
              private configParamsService : ConfigParamsService) { }

  listar(config:ConfigParams) : Observable<Filme[]> {
    const configParams = this.configParamsService.configureParams(config);
    return this.httpClient.get<Filme[]>(url, {params: configParams});
  }

  salvar(filme : Filme) : Observable<Filme> {
    return this.httpClient.post<Filme>(url,filme);
  }
}
