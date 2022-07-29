import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const ROUTE = '/api/v1';

export interface Content {
  name: string;
  email: string;
  subject: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  //url = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  public sendMessage(content: Content): Observable<Content>{
    console.log(content);
    return this.http.post<Content>(ROUTE + "/send", content)
  }
}