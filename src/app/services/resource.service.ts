import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralURL } from '../util/generalUrl';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  public getLanguages() {
    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    
    return this.http.get(GeneralURL.manualURL, options);
  }

}
