import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { ChangesComponent } from './changes/changes.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SecurityGuard } from './security.guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '',          component:LoginComponent, pathMatch:"full"},
  {path: 'home',      component:HomePageComponent, pathMatch:"full", canActivate:[SecurityGuard]},
  {path: 'users',     component:UsersComponent, pathMatch:"full"},
  {path: 'accounts',  component:AccountsComponent, pathMatch:"full"},
  {path: 'changes',   component:ChangesComponent, pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
