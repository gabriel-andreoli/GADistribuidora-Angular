import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../ApiConfig/apiurl';
import { loginDTO } from '../interfaces/loginDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private readonly http: HttpClient) { }

  loginAndGenerateToken(loginDTO: loginDTO) : Observable<any>{
    const url = `${apiUrl.login}`
    return this.http.post(url, loginDTO);
  }
}
