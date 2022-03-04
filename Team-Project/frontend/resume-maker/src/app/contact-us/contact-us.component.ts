import { Component, OnInit } from '@angular/core';
import * as data from '../../assets/json/staff.json'
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {

  developers: any = (data as any).default;

  constructor() { }

  ngOnInit(): void {
    console.log(data);
  }

}
