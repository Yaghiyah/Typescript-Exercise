
interface IValidator<T> {
    /*
        Declare an IValidator<T> generic interface that has a single member:
        the () operator that takes a parameter of type T and returns boolean
    */
    (value: T): boolean;
}

interface ICompositeValidator<T> {

    /*
        Declare an ICompositeValidator<T> interface that declares an
        Add function that takes a variable number of IValidator<T>
        parameters and returns void.
    */
    Add(...val: IValidator<T>[]): void;

    /*
        Add a  function called Invoke to CompositeValidator< T > that takes a
        parameter of type T and returns boolean.Its implementation should enumerate all
        validators passed in the Add() calls and return true if all of them return true;
        otherwise, it returns false.
    */
    Invoke(arg: T): boolean;
}


class CompositeValidator<T> implements ICompositeValidator<T> {

    private _validatorCollection: IValidator<T>[];

    constructor() {
        this._validatorCollection = new Array();
    }

    /*
        Implement ICompositeValidator<T> in a class CompositeValidator<T>. Make the implementation
        store the validators passed in Add() calls in a private array (adding them to the existing ones).
    */
    public Add(...val: IValidator<T>[]) {

        // push a validator object to the array/collection. 
        this._validatorCollection.push(...val);
    }

    /*
      Add a  function called Invoke to CompositeValidator<T> that takes a parameter of
      type T and returns boolean. Its implementation should enumerate all validators
      passed in the Add() calls and return true if all of them return true; otherwise,
      it returns false.
    */
    public Invoke(arg: T) {     

        // no validation faults detected. 
        let result = true;

        // iterate through the validator collection.
        this._validatorCollection.forEach((v) => {
            // current validator failed validation logic?
            if (v(arg) === false) {
                result = false;                     
            }                         
        });  

        return result;        
    }
}

// Create a Person type with fields like "Name" and "Age".
// https://github.com/Microsoft/TypeScript-Handbook/blob/c5af16b4ee2f4b6b74f1a8f1f6367829a55102cf/pages/Classes.md
class Person {
    Name: string;
    Age: number;
    constructor(name: string, age: number) {
        this.Name = name;
        this.Age = age;
    }
}

/* Create an instance of CompositeValidator<Person> and add two 
   validators to it: one checks that Person is not "Mike" and another is that
   Age is more than 20. (Hint: use lambdas)
*/
// https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Interfaces.md
let nameValidator: IValidator<Person>;
let ageValidator: IValidator<Person>;


// https://basarat.gitbooks.io/typescript/content/docs/arrow-functions.html
// Create a name validator.  
nameValidator = (p: Person): boolean => {
    return (p.Name === 'Mike');    
}

// Create a age validator.  
ageValidator = (p: Person): boolean => {
    return (p.Age > 20);    
}

// create an instance of the a composite validator. 
var cv = new CompositeValidator<Person>();
// push Name and Age validator(s) to the internal collection. 
cv.Add(nameValidator, ageValidator);

// create a person with an invaild "name and "age".
var p1 = new Person("yogi", 5);
 // create a person with an vaild "name and "age".
var p2 = new Person("Mike", 30);


// cheap test fixtures for our people types. :)
if ( cv.Invoke(p1) === false ) {
    alert("PASS!! PERSON 1 IS NOT VALID.");
} else {
    alert("FAIL!! PERSON 1 IS VALID. (EXPECTED FAILURE)");
}

if ( cv.Invoke(p2) === true ) {
    alert("PASS!! PERSON 2 IS VALID.");
} else {
    alert("FAIL!! PERSON 2 IS IN-VALID. (EXPECTED PASS");
}
