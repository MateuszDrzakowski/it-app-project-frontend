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
          "id": 4,
          "toy": {
            "id": 4,
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
          "id": 5,
          "toy": {
            "id": 5,
            "toyName": "Truck",
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
          "userId": 2
        },
        {
          "id": 6,
          "toy": {
            "id": 4,
            "toyName": "LandyAchtz Mini Skateboard 222",
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
          "userId": 1
        },
        {
          "id": 7,
          "toy": {
            "id": 5,
            "toyName": "Truck mini",
            "toyType": "Small Truck",
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
          "userId": 2
        }
      ];
    const profile: IUser[] =
      [
        {
          "id": 1,
          "firstName": "John",
          "lastName": "Bush",
          "phone": "100200300",
          "username": "username100",
          "createDate": "19-02-2019",
          "avatar": 'svg-1'

        },
        {
          "id": 2,
          "firstName": "John",
          "lastName": "Bush",
          "phone": "100200300",
          "username": "username100",
          "createDate": "19-02-2022",
          "avatar": 'svg-2'
        },
        {
          "id": 3,
          "firstName": "asas",
          "lastName": "Bushd",
          "phone": "100200300",
          "username": "username100",
          "createDate": "19-02-2019",
          "avatar": 'svg-3'

        },
        {
          "id": 4,
          "firstName": "John",
          "lastName": "Bush",
          "phone": "100200300",
          "username": "username100",
          "createDate": "19-02-2022",
          "avatar": 'svg-4'
        }
      ];
    const comment: IComment[] =
      [
        {
          "id": 4,
          "authorId": 2,
          "targetUserId": 4,
          "content": "Good seller!",
          "create_date": "2022-06-11 10:58",
          "rating": 1
        },
        {
          "id": 5,
          "authorId": 3,
          "targetUserId": 4,
          "content": "Good seller again!",
          "create_date": "2022-06-10 22:22",
          "rating": 2
        },
        {
          "id": 6,
          "authorId": 3,
          "targetUserId": 5,
          "content": "Good seller again 222!",
          "create_date": "2022-06-09 10:45",
          "rating": 2
        },
        {
          "id": 7,
          "authorId": 3,
          "targetUserId": 1,
          "content": "Good seller again 222!",
          "create_date": "2022-06-12 10:45",
          "rating": 2
        },
        {
          "id": 8,
          "authorId": 3,
          "targetUserId": 1,
          "content": "Good seller again 2323222!",
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
          "requesterUserId": 2,
          "targetUserId": 1,
          "inExchangeOfferId": 4,
          "targetOfferId": 5,
          "acceptedByTargetUser": null,
          "targetToyName": 'Landy achtz',
          "inExchangeToyName": 'Small Truck'
        },
        {
          "id": 2,
          "requesterUserId": 3,
          "targetUserId": 1,
          "inExchangeOfferId": 6,
          "targetOfferId": 7,
          "acceptedByTargetUser": null,
          "targetToyName": 'Landy achtz',
          "inExchangeToyName": 'Small Truck'
        },
        {
          "id": 3,
          "requesterUserId": 1,
          "targetUserId": 3,
          "inExchangeOfferId": 6,
          "targetOfferId": 7,
          "acceptedByTargetUser": null,
          "targetToyName": 'Landy achtz',
          "inExchangeToyName": 'Small Truck'
        },
        {
          "id": 5,
          "requesterUserId": 1,
          "targetUserId": 2,
          "inExchangeOfferId": 4,
          "targetOfferId": 5,
          "acceptedByTargetUser": false,
          "targetToyName": 'Landy achtz',
          "inExchangeToyName": 'Small Truck'
        },
        {
          "id": 4,
          "requesterUserId": 1,
          "targetUserId": 1,
          "inExchangeOfferId": 4,
          "targetOfferId": 5,
          "acceptedByTargetUser": false,
          "targetToyName": 'Landy achtz',
          "inExchangeToyName": 'Small Truck'
        }
      ]
    ;

    return {offers, profile, comment, login, swaprequests};
  }


}
