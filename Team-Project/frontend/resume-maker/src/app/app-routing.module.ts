import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SubmitResumeComponent } from './submit-resume/submit-resume.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { ResumeTemplatesComponent } from './resume-templates/resume-templates.component';

const routes: Routes = [
  { path : '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path : 'templates', component: ResumeTemplatesComponent},
  { path : 'submit', component: SubmitResumeComponent},
  { path : 'contact', component: ContactUsComponent},
  { path : 'login', component: LoginPageComponent},
  { path : 'register', component: RegisterComponent},
  { path : 'submit', component: SubmitResumeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
