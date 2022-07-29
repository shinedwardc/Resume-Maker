import { Component, Input } from '@angular/core';
import { type User } from 'shared';

@Component({
  selector: 'app-cubic',
  templateUrl: './cubic.component.html',
  styleUrls: ['./cubic.component.css'],
})
export class CubicComponent {
  @Input() public user: User | undefined;
  constructor() {}
}
