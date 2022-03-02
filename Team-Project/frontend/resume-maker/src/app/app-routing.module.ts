import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ResumeTemplatesComponent } from './resume-templates/resume-templates.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path : '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path : 'templates', component: ResumeTemplatesComponent},
  { path : 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
