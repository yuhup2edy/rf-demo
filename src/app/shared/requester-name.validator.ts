import {AbstractControl, ValidatorFn} from '@angular/forms';

// export function forbiddenRequesterFunction(control : AbstractControl) : {[key:string]:any} | null
// {
// // custom validator returns key of type string and value of type any
// // below statement tests for the username to be admin against the incoming control value from the form 
// // returns key as forbiddenRequester with value whatever was entered    
//     const forbidden = /admin/.test(control.value);
//     return forbidden ? {'forbiddenRequester' : {value : control.value}} : null;
// }


// declaring a factory function that can take parameter and return of type Vaidator function. this is because the regular function 
// can take only one argument which is the abstract control and not anything from the HTML form. see above function for example
// the => operator converts this into a regular function 

export function forbiddenRequesterFunction(forbiddenRequester : RegExp) : ValidatorFn 
{
    return (control : AbstractControl) : {[key:string]:any} | null =>
    {
        const forbidden = forbiddenRequester.test(control.value);
        return forbidden ? {'forbiddenRequester' : {value : control.value}} : null;
    };
    
}