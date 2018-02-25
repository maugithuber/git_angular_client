import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';  //para recojer las respuestas que nos devuelve la api
import { Like } from '../models/like';
import { GLOBAL } from './global';  //variable de configuracion global

@Injectable()
export class LikeService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    addLike(token, liked):Observable<any>{
        let params = JSON.stringify(liked);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.post(this.url+'like',params,{headers:headers});
    }
    
    deleteLike(token, liked):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.delete(this.url+'unlike/'+liked,{headers:headers});
    }

}