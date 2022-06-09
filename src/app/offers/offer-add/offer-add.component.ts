import {Component, OnInit} from '@angular/core';
import {Offer} from "../offer";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NumberValidators} from "../../shared/number.validator";
import {GenericValidator} from "../../shared/generic.validator";


@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.css']
})
export class OfferAddComponent implements OnInit {

  // @ts-ignore
  offerFormGroup: FormGroup;
  offer = new Offer();

  displayMessage: { [key: string]: string } = {};
  private readonly validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private formBuilder: FormBuilder ) {

    this.validationMessages = {
      toyName: {
        required: 'Please enter the data',
        minlength: 'The toy name must be longer than 3 characters.',
      },
      toyType: {
        required: 'Please enter the data'
      },
      toyDescription: {
        required: 'Please enter the data',
        maxlength: 'The toy description cannot be longer than 50 characters.',
      },
      ageMinimum: {
        validateRange: 'Minimum age must be in range 0-18'
      },
      imageURL: {

      },
      city: {
        required: 'Please enter the data',
        minlength: 'The city name need to be at lest 2 characters long.',
        maxlength: 'The city name cannot be longer than 25 characters.',
      },
      offerType: {
        required: 'Please enter the data',
      },
      description: {
        maxlength: 'The description cannot be longer than 50 characters.',
      },
      price: {
        required: 'Please enter the data',
      },
      deliveryOption: {
        required: 'Please enter the data',
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.offerFormGroup = this.formBuilder.group({
      toyName: ['', [Validators.required, Validators.minLength(3)]],
      toyType: ['', [Validators.required]],
      toyDescription: ['', [Validators.required, Validators.maxLength(50)]],
      ageMinimum: [null, NumberValidators.validateRange(0,18)],
      imageURL: '',
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      offerType: ['exchange', [Validators.required]],
      price: [1.00, [Validators.required]],
      deliveryOption: ['pickup_in_person', [Validators.required]],
      description: ['', [Validators.maxLength(50)]],
    });

    this.offerFormGroup.get('offerType')?.valueChanges.subscribe(
      value => this.offerTypeChanged(value)
    );

    // this.assignValidationMessages();
    this.offerFormGroup.valueChanges.subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.offerFormGroup);
    });
  }

  save() {
    console.log(this.offerFormGroup);
    console.log('Saved: ' + JSON.stringify(this.offerFormGroup.value));
  }

  populateTestData(): void {
    this.offerFormGroup.patchValue({
      toyName: "test toy name",
      description: "test description",
      city: "test city"
    })
  }

  offerTypeChanged(offerTypeValue: string): void {
    const priceControl = this.offerFormGroup.get('price');
    if (offerTypeValue === 'sell' || offerTypeValue === 'sellexchange') {
      priceControl?.setValidators(Validators.required);
    } else {
      priceControl?.clearValidators();
    }
    priceControl?.updateValueAndValidity();
  }

}