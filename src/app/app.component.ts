import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenRequesterFunction } from './shared/requester-name.validator';
import { passwordValidator } from './shared/password.validator';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit
{

  title = 'Reactive or Model Driven Approach';
  registrationForm : FormGroup;

  get email() // getter function; can replace in form with email.invalid or email.touched etc. 
  {
    return this.registrationForm.get('email');
  }

  get alternateEmails()
  {
    return this.registrationForm.get('alternateEmails') as FormArray ; // as is a type assertion function and used as getter 
                                                                        //  in the HTML ngFor tag to iterate 
  }

  addAlternateEmail()
  {
    this.alternateEmails.push(this.fb.control('')); // this will just push a new form control upon a click event of however called
  }

  constructor(private fb : FormBuilder)
  {
    //depedency injection completed
  }

  ngOnInit()
  {
    this.registrationForm = this.fb.group
  (
    {
      requester : ['Sriram',[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+$'),forbiddenRequesterFunction(/password/)]],
      password  : [''],
      confirmPassword : [''],
      email : [''],
      subscribe : [],
      address : this.fb.group
      (
        {
          city : ['Fairfax'],
          state : ['Virginia'],
          zipCode : ['22033']
        }
      ), alternateEmails : this.fb.array([]) // this is to create an array of form elements, first arg is 0 for # of elements
                                              // tha array function from FormArray allows us to dynamically add form elements
                                              // example - TMP CRM remember adding land line, mobile, SMS etc
    },{validator : passwordValidator}
 // remember to pass the validator function for password as 2nd arg to the registration from control and not the individual fields
  );
    this.registrationForm.get('subscribe').valueChanges
        .subscribe(checkedValue => 
        {
          const email = this.registrationForm.get('email');
          // if checked then ensure the required property is set on the email 
          if (checkedValue)
          {
            email.setValidators(Validators.required);
          }
          else
          {
            email.clearAsyncValidators();
          }
          email.updateValueAndValidity();
          this.registrationForm.get('subscribe').updateValueAndValidity; // use this to ensure current status is always provided back to view
        });
  
  // the value changes property on the form element level is available under OnInit and provides a handle to any time a value 
  // on a form field changes. use this to conditionally render the requried lable on the email text 
  // use case is only if check box for subscribe is clicked, the email field is made mandatory
  // value changes returns an observable and we need to subscribe to it and when the value changes, we get it as a "checked" return

        
  } // OnInit closure

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

loadAPI()
{
  this.registrationForm.setValue
  (
  //* if you need to load only partial data, use the .patchValue method
  {
    requester : 'Venkataramani',
    password : 'abcnews',
    confirmPassword : 'abcnews',
    address : 
    {
      city : 'Chennai',
      state : 'Tamil Nadu',
      zipCode : '600091'
    }
  }
  );
} // loadAPI() closure
} // class closure