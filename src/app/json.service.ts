import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private http: HttpClient) {}

  getLocationDist(){
    return this.http.get('../assets/locationDist.json');
  }

  getSampleGroupUsers(){
    return this.http.get('../assets/sampleGroupUsers.json');
  }
}
