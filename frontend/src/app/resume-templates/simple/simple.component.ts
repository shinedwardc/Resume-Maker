import { Component, Input } from '@angular/core';
import { type User } from 'shared';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css'],
})
export class SimpleComponent {
  @Input() public user: User | undefined;
  constructor() {}
}
