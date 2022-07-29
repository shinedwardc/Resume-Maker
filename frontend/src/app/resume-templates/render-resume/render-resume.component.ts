import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { type User } from 'shared';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-render-resume',
  templateUrl: './render-resume.component.html',
  styleUrls: ['./render-resume.component.css'],
})
export class RenderResumeComponent implements OnInit {
  public user: User | undefined;
  constructor(
    public route: ActivatedRoute,
    private usersvc: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.usersvc
      .loggedInState()
      .pipe(
        mergeMap((user) => {
          if (user === null) {
            throw new Error('not signed in');
          } else {
            return this.usersvc.getUser();
          }
        })
      )
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: () => {
          this.router.navigate(['/login'], {
            queryParams: { register: true },
          });
        },
      });
  }
}
