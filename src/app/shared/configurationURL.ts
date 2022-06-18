import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationURLService {

  //Mocked db on front:
  // public backendAddress = "http://localhost:8080/api/" //localhost address of the backend (update accordingly to your server address)
  // public offersUrl = this.backendAddress + "offers";
  // public offerUrl = this.backendAddress + "offers";
  // public swapRequestsUrl = this.backendAddress + "swaprequests"
  // public userUrl = this.backendAddress + "profile";
  // public userProfileUrl = this.backendAddress + "profile";

  //With real backend
  public backendAddress = "localhost:5200/" //localhost address of the backend (update accordingly to your server address)
  public offersUrl = this.backendAddress + "offers";
  public offerUrl = this.backendAddress + "offer";
  public swapRequestsUrl = this.backendAddress + "swaprequests"
  public userUrl = this.backendAddress + "profile";
  public loginUrl = this.backendAddress + "login";
  public logoutUrl = this.backendAddress + "logout";
  public userProfileUrl = this.backendAddress + "profile";


}
