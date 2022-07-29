import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    public route: ActivatedRoute
  ) {}
  public submit() {
    this.userService.login();
  }
  public ngOnInit(): void {
    this.userService
      .checkLoginResult()
      .then((result) => {
        if (result === null) {
          return;
        }
        console.log(result);
        this.userService
          .getUser()
          .pipe(
            catchError((err, _caught) => {
              if (!(err instanceof HttpErrorResponse)) {
                throw err;
              }
              if (err.status === 404) {
                return this.userService.makeUser({
                  name: result.user.displayName!,
                  email: result.user.email!,
                });
              } else {
                throw err;
              }
            })
          )
          .subscribe((user) => {
            console.dir(user);
            const target = this.route.snapshot.queryParams['register']
              ? '/register'
              : '/home';
            this.router.navigate([
              target, // TODO: change to user's resume page
              { notice: `logged in as user ${result.user.displayName}` },
            ]);
          });
        // if (result !== null) {
        //   this.router.navigate([
        //     '/home', // TODO: change to user's resume page
        //     { notice: `logged in as user ${result.user.displayName}` },
        //   ]);
        // }
      })
      .catch((err) => {
        alert('Authentication failed: ' + err);
      });
  }
}
