import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private fb : FormBuilder){}

  title = 'Reactive or Model Driven Approach';
  // registrationForm = new FormGroup({
  //   requester : new FormControl('venkatS'),
  //   password : new FormControl(''),
  //   confirmPassword : new FormControl(''),
  //   address : new FormGroup({
  //     city : new FormControl('Belle Mead'),
  //     state : new FormControl('New Jersey'),
  //     zipCode : new FormControl('08502')
  //   })
  // });

  registrationForm = this.fb.group
  (
    {
      requester : ['Sriram',[Validators.required, Validators.minLength(3)]],
      password  : [''],
      confirmPassword : [''],
      address : this.fb.group
      (
        {
          city : ['Fairfax'],
          state : ['Virginia'],
          zipCode : ['22033']
        }
      )
    }
  );

  loadAPI()
  {
    this.registrationForm.setValue(
      //* if you need to load only partial data, use the .patchValue method
      {
        requester : 'Venkataramani',
        password : 'abcnews',
        confirmPassword : 'abcnews',
        address : {
          city : 'Chennai',
          state : 'Tamil Nadu',
          zipCode : '600091'
        }
      });
  }
}