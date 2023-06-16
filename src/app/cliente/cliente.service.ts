import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './model/cliente';

import { environment } from 'src/environments/environment';

const API = "cliente"

@Injectable({providedIn: 'root'})
export class ClienteService {
    
    
    constructor(private httpClient: HttpClient) { }
    
    public listar(): Observable<Cliente[]> {
       return this.httpClient.get<Cliente[]>(`${environment.apiHost}/${API}`) 
    }

    pesquisar(nomeSearch: string): Observable<Cliente[]> {
        let searchParams = new HttpParams()
        searchParams = searchParams.set("nome", nomeSearch)
        return this.httpClient.get<Cliente[]>(`${environment.apiHost}/${API}`, {params: searchParams})
    }

    salvar(cliente: Cliente): Observable<Cliente> {
        return this.httpClient.post<Cliente>(`${environment.apiHost}/${API}`, cliente) 
    }

    deletar(cpf: string) {
        return this.httpClient.delete(`${environment.apiHost}/${API}/${cpf}`)
    }
}