import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeTemplatesComponent } from './resume-templates.component';
import { CleanComponent } from './clean/clean.component';
import { SerifComponent } from './serif/serif.component';
import { ClassicComponent } from './classic/classic.component';
import { CubicComponent } from './cubic/cubic.component';
import { CrispComponent } from './crisp/crisp.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SimpleComponent } from './simple/simple.component'
import { RouterModule } from '@angular/router';
import { PreviewComponent } from '../preview/preview.component';
import { RenderResumeComponent } from './render-resume/render-resume.component';
import { DesignComponent } from './design/design.component';

@NgModule({
  declarations: [
    ResumeTemplatesComponent,
    CleanComponent,
    SerifComponent,
    ClassicComponent,
    CubicComponent,
    CrispComponent,
    SimpleComponent,
    PreviewComponent,
    RenderResumeComponent,
    DesignComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [ResumeTemplatesComponent, RenderResumeComponent, PreviewComponent],
})
export class ResumeTemplatesModule {}
