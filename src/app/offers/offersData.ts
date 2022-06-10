import {InMemoryDbService} from "angular-in-memory-web-api";
import {Offer} from "./offer";
import {IOffer} from "./ioffer";


export class OffersData implements InMemoryDbService {

  createDb(): { offers: IOffer[] } {
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
          "userId": 1
        }
      ];

    return {offers: offers};
  }


}
