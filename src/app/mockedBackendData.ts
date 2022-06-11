import {InMemoryDbService} from "angular-in-memory-web-api";
import {Offer} from "./offers/offer";
import {IOffer} from "./offers/ioffer";
import {IUser} from "./profiles/iuser";
import {IComment} from "./profiles/icomment";


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
            "imageURL": "assets/images/xbox-controller.png"
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
            "imageURL": "assets/images/xbox-controller.png"
          },
          "city": "Długołęka",
          "offerType": "sell",
          "price": "3.99",
          "deliveryOption": "courier",
          "description": "Offer description",
          "userId": 2
        }
      ];
    const profile: IUser[] =
      [
        {
          "id": 4,
          "firstName": "John",
          "lastName": "Bush",
          "phone": "100200300",
          "username": "username100"
        }
      ];
    const comment: IComment[] =
      [
        {
          "id": 4,
          "authorId": 2,
          "targetUserId": 4,
          "content": "Good seller!",
          "create_date": "19-02-2019 10:58",
          "rating": 1
        },
        {
          "id": 5,
          "authorId": 3,
          "targetUserId": 4,
          "content": "Good seller again!",
          "create_date": "20-02-2019 22:22",
          "rating": 2
        },
        {
          "id": 6,
          "authorId": 3,
          "targetUserId": 5,
          "content": "Good seller again 222!",
          "create_date": "20-02-2019 10:45",
          "rating": 2
        }
      ]


    return { offers, profile, comment };
  }


}
