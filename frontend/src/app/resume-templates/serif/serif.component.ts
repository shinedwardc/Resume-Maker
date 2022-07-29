import { Component, Input } from '@angular/core';
import { type User } from 'shared';

@Component({
  selector: 'app-serif',
  templateUrl: './serif.component.html',
  styleUrls: ['./serif.component.css'],
})
export class SerifComponent {
  @Input() public user: User | undefined;
  constructor() {}
}
