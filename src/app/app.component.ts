import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

import {DiscountService} from "./discount.service";
import {log} from "util";
import {Discount} from "./discount";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  email;
  emailError = false;
  discounts: Discount[];
  isLoad: boolean = false;

  constructor (private http: HttpClient,
               private service: DiscountService) {}

  ngOnInit() {
    this.load();
  }

  emailForm = new FormGroup({
    email: new FormControl(this.email, [
      Validators.required,
      Validators.email
    ]),
  });

  load(): void {
    this.service.getDiscounts()
      .subscribe(discounts => {
        this.discounts = discounts;
      }, error2 => {
        log(error2);
      });
  }

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
    this.isLoad = true;
    this.http
      .post('/api/price/', {'email': email})
      .subscribe(
        data => {
          this.isLoad = false;
          alert('Прайс успешно отправлен!');
          this.emailForm.reset();
        },
        err => {
          alert('Неудалось отправить прайс. Попробуйте позже.');
          this.isLoad = false;
        }
      );
  }
}
