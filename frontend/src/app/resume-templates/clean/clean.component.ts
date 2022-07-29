import { Component, Input } from '@angular/core';
import { type User } from 'shared';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.css'],
})
export class CleanComponent {
  @Input() public user: User | undefined;
  constructor() {}
}
