import { Component, Input } from '@angular/core';
import { type User } from 'shared';

@Component({
  selector: 'app-crisp',
  templateUrl: './crisp.component.html',
  styleUrls: ['./crisp.component.css'],
})
export class CrispComponent {
  @Input() public user: User | undefined;
  constructor() {}
}
