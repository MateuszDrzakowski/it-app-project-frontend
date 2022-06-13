import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../../shared/login-dialog/login-dialog.component";
import {AuthenticationService} from "../../shared/authentication.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  pageTitle: string = "Toy4Toy";
  @Output()
  toggleSidenav = new EventEmitter<void>();

  constructor(private logInDialog: MatDialog, public authenticationService: AuthenticationService) {
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
}
