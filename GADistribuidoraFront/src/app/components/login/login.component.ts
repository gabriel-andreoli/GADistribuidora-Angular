import { Component, OnInit } from '@angular/core';
import { loginDTO } from '../../interfaces/loginDTO';
import { AuthenticateService } from '../../services/authenticate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { tokenDTO } from '../../interfaces/tokenDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthenticateService, HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginDTO: loginDTO = {
    email: "",
    password:  ""
  }

  constructor (private readonly authenticateService: AuthenticateService) { }
  ngOnInit() { }

  login(){
    this.authenticateService.loginAndGenerateToken(this.loginDTO).subscribe(
      token => { 
        const expirationDate = new Date(token["expiration"]);
        const tokenStr: string = token["token"];
        const tokenDTO: tokenDTO = {token: tokenStr, expiration: expirationDate};
        this.setUserToken(tokenDTO);
      },
      err => console.log("Erro requisição de login")
    );
  }

  setUserToken(token: tokenDTO){
    localStorage.setItem("token", JSON.stringify(token));
  }
}