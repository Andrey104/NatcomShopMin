import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  email;
  emailError = false;

  constructor (private http: HttpClient){

  }

  emailForm = new FormGroup({
    email: new FormControl(this.email, [
      Validators.required,
      Validators.email
    ]),
  });

  ok() {
    if (this.emailForm.valid) {
      this.email = this.emailForm.get('email').value;
      this.sendPriceRequest(this.email);
      this.emailError = false;
    } else {
      this.emailError = true;
    }
  }


  sendPriceRequest(email) {
    this.http
      .post('http://92.53.120.99/api/price/',{ "email": email})
      .subscribe(
        data => {
          alert('Прайс успешно отправлен!')
        },
        err => {
          alert('Неудалось отправить прайс. Попробуйте позже.')
        }
      );
  }
}
