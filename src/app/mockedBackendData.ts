import {InMemoryDbService} from "angular-in-memory-web-api";
import {Offer} from "./offers/offer";
import {IOffer} from "./offers/ioffer";
import {IUser} from "./profiles/iuser";
import {IComment} from "./profiles/icomment";
import {ISwapRequest} from "./swapRequests/iswapRequest";


export class MockedBackendData implements InMemoryDbService {

  createDb() {
    const offers: IOffer[] =
      [
        {
          "id": 1,
          "toy": {
            "id": 1,
            "toyName": "LandyAchtz Mini Skateboard",
            "toyType": "Skateboard",
            "description": "Toy description",
            "ageMinimum": 7,
            "imageURL": "assets/images/skateboard.jpg",
            "additionalImageURLs": ["assets/images/xbox-controller.png", "assets/images/truck2.jpg", "assets/images/xbox-controller.png"]
          },
          "city": "Wrocław",
          "offerType": "exchange",
          "price": "",
          "deliveryOption": "courier",
          "description": "Offer description",
          "userId": 1
        },
        {
          "id": 2,
          "toy": {
            "id": 2,
            "toyName": "Truck BigWheels",
            "toyType": "Small Truck",
            "description": "Toy description",
            "ageMinimum": 3,
            "imageURL": "assets/images/truck2.jpg",
            "additionalImageURLs": ["assets/images/xbox-controller.png", "assets/images/truck2.jpg", "assets/images/xbox-controller.png"]

          },
          "city": "Długołęka",
          "offerType": "sell",
          "price": "3.99",
          "deliveryOption": "courier",
          "description": "Offer description",
          "userId": 1
        },
        {
          "id": 3,
          "toy": {
            "id": 3,
            "toyName": "Turbo Skateboard 3",
            "toyType": "Skateboard",
            "description": "Toy description",
            "ageMinimum": 4,
            "imageURL": "assets/images/xbox-controller.png",
            "additionalImageURLs": ["assets/images/xbox-controller.png", "assets/images/truck2.jpg", "assets/images/xbox-controller.png"]

          },
          "city": "Wrocław",
          "offerType": "exchange",
          "price": "",
          "deliveryOption": "courier",
          "description": "Offer description",
          "userId": 2
        },
        {
          "id": 4,
          "toy": {
            "id": 4,
            "toyName": "LandyAchtz Mini Skateboard 333",
            "toyType": "Skateboard",
            "description": "Toy description",
            "ageMinimum": 4,
            "imageURL": "assets/images/xbox-controller.png",
            "additionalImageURLs": ["assets/images/xbox-controller.png", "assets/images/truck2.jpg", "assets/images/xbox-controller.png"]

          },
          "city": "Wrocław",
          "offerType": "exchange",
          "price": "",
          "deliveryOption": "courier",
          "description": "Offer description",
          "userId": 2
        },
        {
          "id": 5,
          "toy": {
            "id": 5,
            "toyName": "Truck mini",
            "toyType": "Small Toy",
            "description": "Toy description",
            "ageMinimum": 3,
            "imageURL": "assets/images/xbox-controller.png",
            "additionalImageURLs": ["assets/images/xbox-controller.png", "assets/images/truck2.jpg", "assets/images/xbox-controller.png"]

          },
          "city": "Długołęka",
          "offerType": "sell",
          "price": "125.99",
          "deliveryOption": "courier",
          "description": "Offer description",
          "userId": 3
        }
      ];
    const profile: IUser[] =
      [
        {
          "id": 1,
          "firstName": "John",
          "lastName": "Bush",
          "phone": "100200300",
          "username": "John123",
          "createDate": "25-07-2019",
          "avatar": 'svg-1'

        },
        {
          "id": 2,
          "firstName": "Jenny",
          "lastName": "Town",
          "phone": "100200300",
          "username": "Jenny21",
          "createDate": "19-02-2022",
          "avatar": 'svg-2'
        },
        {
          "id": 3,
          "firstName": "Kenny",
          "lastName": "Tau",
          "phone": "100200300",
          "username": "KennyOK",
          "createDate": "19-02-2019",
          "avatar": 'svg-3'

        },
        {
          "id": 4,
          "firstName": "George",
          "lastName": "Wakama",
          "phone": "100200300",
          "username": "JustGeorge",
          "createDate": "21-02-2022",
          "avatar": 'svg-4'
        }
      ];
    const comment: IComment[] =
      [
        {
          "id": 1,
          "authorId": 1,
          "targetUserId": 4,
          "content": "Good seller!",
          "create_date": "2022-06-11 10:58",
          "rating": 4
        },
        {
          "id": 2,
          "authorId": 2,
          "targetUserId": 4,
          "content": "Good seller again!",
          "create_date": "2022-06-10 22:22",
          "rating": 4
        },
        {
          "id": 3,
          "authorId": 2,
          "targetUserId": 5,
          "content": "Good communication",
          "create_date": "2022-06-09 10:45",
          "rating": 4
        },
        {
          "id": 4,
          "authorId": 3,
          "targetUserId": 1,
          "content": "Very impatient",
          "create_date": "2022-06-12 10:45",
          "rating": 2
        },
        {
          "id": 5,
          "authorId": 4,
          "targetUserId": 1,
          "content": "Very nice, Thanks!",
          "create_date": "2022-05-10 10:47",
          "rating": 4.5
        }
      ];
    const login =
      [
        {
          "id": 1,
          "username": 'first',
          "password": 'first',
        },
        {
          "id": 2,
          "username": 'second',
          "password": 'second',
        }
      ];
    const swaprequests: ISwapRequest[] =
      [
        {
          "id": 1,
          "requesterUserId": 1,
          "targetUserId": 2,
          "inExchangeOfferId": 1,
          "targetOfferId": 3,
          "acceptedByTargetUser": null,
          "targetToyName": 'Turbo Skateboard 3',
          "inExchangeToyName": 'LandyAchtz Mini Skateboard'
        },
        {
          "id": 2,
          "requesterUserId": 3,
          "targetUserId": 1,
          "inExchangeOfferId": 5,
          "targetOfferId": 1,
          "acceptedByTargetUser": null,
          "targetToyName": 'LandyAchtz Mini Skateboard',
          "inExchangeToyName": 'Truck mini'
        },
        {
          "id": 3,
          "requesterUserId": 3,
          "targetUserId": 3,
          "inExchangeOfferId": 5,
          "targetOfferId": 2,
          "acceptedByTargetUser": null,
          "targetToyName": 'Truck BigWheels',
          "inExchangeToyName": 'Truck mini'
        },
        {
          "id": 4,
          "requesterUserId": 2,
          "targetUserId": 1,
          "inExchangeOfferId": 3,
          "targetOfferId": 2,
          "acceptedByTargetUser": null,
          "targetToyName": 'Truck BigWheels',
          "inExchangeToyName": 'Turbo Skateboard 3'
        },
      ]
    ;

    return {offers, profile, comment, login, swaprequests};
  }


}
