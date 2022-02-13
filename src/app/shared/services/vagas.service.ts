import { Vagas } from './../interfaces/vagas';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  url = "http://localhost:3000/vagas";

  constructor(private http: HttpClient) { }

  getVagas(): Observable<Vagas[]>{
    return this.http.get<Vagas[]>(this.url);
  }

  getVagaId(vagaId: number){
    return this.http.get<Vagas>(`${this.url}/${vagaId}`);
  }

  cadastrarVaga(vaga: Vagas){
    return this.http.post<Vagas>(this.url,vaga);
  }

  atualizarVaga(id:any, vaga: Vagas){
    return this.http.put<Vagas>(`${this.url}/${id}`,vaga);
  }

  removerVaga(id:any):Observable<Vagas>{
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
