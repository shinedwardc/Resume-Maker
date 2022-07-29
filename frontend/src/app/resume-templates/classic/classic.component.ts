import { Component, Input } from '@angular/core';
import { type User } from 'shared';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.css'],
})
export class ClassicComponent {
  @Input() public user: User | undefined;
  constructor() {}
}
