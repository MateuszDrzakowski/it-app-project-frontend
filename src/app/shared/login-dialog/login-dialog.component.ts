import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IAuth} from "../iauth";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  hide = true;
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  username: string | null = null;
  password: string | null = null;
  userId: number | null = null;

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }

    return formControl.hasError('email') ? 'Not a valid email' : '';
  }

  logIn() {
    this.username = this.usernameFormControl.value;
    this.password = this.passwordFormControl.value;
    if (this.username != null && this.password != null) {
      this.requestLogin(this.username, this.password)
    }
  }

  private requestLogin(username: string, password: string) {
    return this.authenticationService.login(username, password).subscribe({
      next: response => {
        this.userId = response.length != 0 ? response["0"].id : null;
        if(this.userId == null) {
          this.openSnackBar("Invalid username or password!", "Close");
        }
        else {
          this.dialogRef.close();
          this.openSnackBar("Logged in successfully!", "Close");
        }
        console.log('LOGIN RESPONSE: ',response)
      },
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
