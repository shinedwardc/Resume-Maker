import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeTemplatesComponent } from './resume-templates.component';
import { CleanComponent } from './clean/clean.component';
import { SerifComponent } from './serif/serif.component';
import { ClassicComponent } from './classic/classic.component';

@NgModule({
  declarations: [
    ResumeTemplatesComponent,
    CleanComponent,
    SerifComponent,
    ClassicComponent,
  ],
  imports: [CommonModule],
  exports: [ResumeTemplatesComponent, CleanComponent],
})
export class ResumeTemplatesModule {}
