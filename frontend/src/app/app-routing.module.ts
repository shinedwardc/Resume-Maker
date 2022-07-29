import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { ResumeTemplatesComponent } from './resume-templates/resume-templates.component';
import { ProfileComponent } from './profile/profile.component';
import { PreviewComponent } from './preview/preview.component';
import { RenderResumeComponent } from './resume-templates/render-resume/render-resume.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'templates',
    component: ResumeTemplatesComponent,
    /*children: [
      {path: 'classic',component: ClassicComponent},
      {path: 'clean', component: CleanComponent},
      {path: 'crisp', component: CrispComponent},
      {path: 'cubic', component: CubicComponent},
      {path: 'serif', component: SerifComponent},
      {path: 'simple', component: SimpleComponent}
    ] */
  },
  { path: 'preview', component: PreviewComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'render', component: RenderResumeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
