import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { type User, type Experience } from 'shared';
import { UserService } from '../user.service';

class ExperienceGroup extends FormGroup {
  constructor(data?: Partial<Experience>) {
    super({
      company: new FormControl(data?.company ?? '', Validators.required),
      position: new FormControl(data?.position ?? '', Validators.required),
      startDate: new FormControl(data?.startDate ?? '', Validators.required),
      endDate: new FormControl(data?.endDate ?? ''),
      description: new FormControl(
        data?.description ?? '',
        Validators.required
      ),
    });
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  invalid = true;
  submittable = false;
  profileForm = this.fb.group({
    name: ['', Validators.required],
    bio: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^\d{10,}$/), Validators.required]],
    location: [''],
    homepage: [''],
    language: this.fb.array([]),
    skills: this.fb.array([]),
    experience: this.fb.array([]),
    title: [''],
    school: [''],
    major: [''],
  });
  index = 0;
  language = this.profileForm.controls['language'] as FormArray;
  skills = this.profileForm.controls['skills'] as FormArray;
  experience = this.profileForm.controls['experience'] as FormArray;
  get curr() {
    return Object.keys(this.profileForm.controls)[this.index];
  }

  constructor(
    private userService: UserService,
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm.disable();
    this.profileForm.controls['name'].enable();
    this.userService
      .loggedInState()
      .pipe(
        mergeMap((user) => {
          if (user === null) {
            throw new Error('not signed in');
          } else {
            return this.userService.getUser();
          }
        })
      )
      .subscribe({
        next: (user) => {
          console.log(user);
          for (const [key, val] of Object.entries(user)) {
            const target = this.profileForm.get(key);
            if (key === 'experience') {
              for (const exp of val) {
                this.experience.push(
                  new ExperienceGroup(exp as Partial<Experience>)
                );
              }
            } else if (key === 'language') {
              for (const lang of val) {
                this.language.push(new FormControl(lang));
              }
            } else if (key === 'skills') {
              for (const skill of val) {
                this.skills.push(new FormControl(skill));
              }
            } else if (target !== null && target instanceof FormControl) {
              target.setValue(val);
            } else {
              console.log(`Extraneous key: ${key}`);
            }
          }
        },
        error: () => {
          this.router.navigate(['/login'], {
            queryParams: { register: true },
          });
        },
      });
  }

  addSkill() {
    this.skills.push(new FormControl('', Validators.required));
  }
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
  addExperience() {
    this.experience.push(new ExperienceGroup());
  }
  removeExperience(index: number) {
    this.experience.removeAt(index);
  }
  addLanguage() {
    this.language.push(new FormControl('', Validators.required));
  }
  removeLanguage(index: number) {
    this.language.removeAt(index);
  }

  prev() {
    this.profileForm.controls[this.curr].disable();
    this.index--;
    if (this.profileForm.controls[this.curr]) {
      this.profileForm.controls[this.curr].enable();
    }
  }
  next() {
    this.index++;
    if (this.profileForm.controls[this.curr] !== undefined) {
      this.profileForm.controls[this.curr].enable();
    } else {
      this.submittable = true;
    }
  }
  submit() {
    const user: User = this.profileForm.value;
    this.userService.updateUser(user).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
