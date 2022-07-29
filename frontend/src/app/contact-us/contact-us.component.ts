import { Component, OnInit } from '@angular/core';
//import { ConnectionService } from '../connection.service';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as data from '../../assets/json/staff.json';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  developers = data.default;

  constructor(private fb: FormBuilder, private connection: UserService) {
    this.contactForm = fb.group({
      'contactFormName': ['', Validators.required],
      'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
      'contactFormSubjects': ['', Validators.required],
      'contactFormMessage': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.developers);
  }
  contactForm: FormGroup;
  //disabledSubmitButton = true;

  /*@HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }*/

  onSubmit() {
    this.connection.sendMessage({
      name: this.contactForm.value.contactFormName,
      email: this.contactForm.value.contactFormEmail,
      subject: this.contactForm.value.contactFormSubjects,
      message: this.contactForm.value.contactFormMessage
    }).subscribe(() => {
      alert('Your message has been sent.');
      this.contactForm.reset();
    }, error => {
      console.log('Error', error);
    });
  }
}
