import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';  //para recojer las respuestas que nos devuelve la api
import { Message } from '../models/message';
import { GLOBAL } from './global';  //variable de configuracion global

@Injectable()
export class MessageService{
    public url:string;

    constructor(
        private _http:HttpClient,
    ){
        this.url = GLOBAL.url;
    }
    addMessage(token,message):Observable<any>{
        let params = JSON.stringify(message);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

        return this._http.post(this.url+'message',params,{headers:headers});
    }

    getMyMessages(token,page=1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

        return this._http.get(this.url+'my-messages/'+page,{headers:headers});
    }
    getEmitMessages(token,page=1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

        return this._http.get(this.url+'messages/'+page,{headers:headers});
    }
}