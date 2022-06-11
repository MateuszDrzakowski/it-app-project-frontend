import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../../offers/offer.service";
import {UserService} from "../user.service";
import {IUser} from "../iuser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId: number;
  // @ts-ignore
  userProfile: IUser;
  sub!: Subscription;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  private getUserProfile() {
    console.log("this userId: ", this.userId)
    this.sub = this.userService.getProfile(this.userId)
      .subscribe({
        next: userProfile => {
          this.userProfile = userProfile;
        },
        error: error => this.errorMessage = error
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
