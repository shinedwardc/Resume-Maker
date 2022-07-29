import { Component, Input } from '@angular/core';
import { type User } from 'shared';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent  {

  @Input() public user: User | undefined;
  constructor() {}

  

}
