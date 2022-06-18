import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../../shared/login-dialog/login-dialog.component";
import {AuthenticationService} from "../../shared/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  pageTitle: string = "Toy4Toy";
  @Output()
  toggleSidenav = new EventEmitter<void>();
  private errorMessage: string | any;

  constructor(private logInDialog: MatDialog,
              public authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  openLogInDialog() {
    let dialogRef = this.logInDialog.open(LoginDialogComponent, {
      width: '450px'
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("The logIn dialog was closed", result);
    })
  }

  logOut() {
    this.authenticationService.logout()
      .subscribe({
        next: () => this.onLogoutComplete(),
        error: err => this.errorMessage = err
      })
  }

  private onLogoutComplete() {
    this.authenticationService.loggedUserId = null;
    this.authenticationService.loggedUser = null;
    this.router.navigate(['/offers']);

  }
}
