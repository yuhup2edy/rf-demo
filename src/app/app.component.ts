import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Reactive or Model Driven Approach';
  registrationForm = new FormGroup({
    requester : new FormControl('venkatS'),
    password : new FormControl(''),
    confirmPassword : new FormControl(''),
    address : new FormGroup({
      city : new FormControl('Belle Mead'),
      state : new FormControl('New Jersey'),
      zipCode : new FormControl('08502')
    })
  });
}
