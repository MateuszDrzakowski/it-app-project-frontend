import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {of, Subscription} from "rxjs";
import {OfferService} from "../offer.service";
import {IOffer} from "../ioffer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NumberValidators} from "../../shared/number.validator";
import {GenericValidator} from "../../shared/generic.validator";

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit, OnDestroy{

  // @ts-ignore
  private sub: Subscription;
  // @ts-ignore
  offerFormGroup: FormGroup;
  // @ts-ignore
  offer: IOffer;
  retrievedId: string;
  // @ts-ignore
  userId: number = 1;
  private errorMessage: string | any;

  displayMessage: { [key: string]: string } = {};
  private readonly validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private route: ActivatedRoute, private offerService: OfferService,
              private formBuilder: FormBuilder, private router: Router) {
    this.retrievedId = 'retreivedId';

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

//  Read the offer id from the router parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if(id != null ){
          this.retrievedId = id;
          this.getOffer(parseInt(id));
        }
      }
    )


  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getOffer(id: number): void {
    this.offerService.getOffer(id)
      .subscribe({
        next: (offer: IOffer) => this.fillFormWithData(offer),
        error: err => this.errorMessage = err
      })
  }

  private fillFormWithData(offer: IOffer) {
    if(this.offerFormGroup) {
      this.offerFormGroup.reset();
    }
    this.offer = offer;

    this.offerFormGroup.patchValue({
      toyName: this.offer.toy.toyName,
      toyType: this.offer.toy.toyType,
      toyDescription: this.offer.toy.description,
      ageMinimum: this.offer.toy.ageMinimum,
      imageURL: this.offer.toy.imageURL,
      city: this.offer.city,
      offerType: this.offer.offerType,
      description: this.offer.description,
      price: this.offer.price,
      deliveryOption: this.offer.deliveryOption
    });
  }

  save() {
    if(this.offerFormGroup.valid) {
      if (this.offerFormGroup.dirty) {
        // const offerToUpdate = {...this.offer, ...this.offerFormGroup.value}
        const offerToUpdate = {
            "id": parseInt(this.retrievedId),
            "toy": {
              //TODO
              "id": this.offer.toy.id,
              "toyName": this.offerFormGroup.value.toyName,
              "toyType": this.offerFormGroup.value.toyType,
              "description": this.offerFormGroup.value.toyDescription,
              "ageMinimum": this.offerFormGroup.value.ageMinimum,
              "imageURL": "assets/images/xbox-controller.png",
              "additionalImageURLs": ["assets/images/xbox-controller.png", "assets/images/truck2.jpg", "assets/images/xbox-controller.png"]
            },
            "city": this.offerFormGroup.value.city,
            "offerType": this.offerFormGroup.value.offerType,
            "price": this.offerFormGroup.value.price,
            "deliveryOption": this.offerFormGroup.value.deliveryOption,
            "description": this.offerFormGroup.value.description,
            "userId": this.userId
          };

        console.log("offerToUpdate: ");
        console.log(offerToUpdate);

        this.offerService.updateOffer(offerToUpdate)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
            })

      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors'
    }

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

  private onSaveComplete() {
    this.offerFormGroup.reset();
    this.router.navigate(['/offers']);
  }

  deleteOffer() {
    if(confirm('Are you sure, you want delete the offer?')) {
      this.offerService.deleteOffer(this.offer.id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
    }
  }
}
