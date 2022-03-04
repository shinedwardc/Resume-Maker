import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeTemplatesComponent } from './resume-templates.component';
import { CleanComponent } from './clean/clean.component';

@NgModule({
  declarations: [ResumeTemplatesComponent, CleanComponent],
  imports: [CommonModule],
  exports: [ResumeTemplatesComponent, CleanComponent],
})
export class ResumeTemplatesModule {}
