import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RidersComponent } from './components/riders/riders.component';
import { RiderDetailsComponent} from './components/rider-details/rider-details.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './_guards/auth.guard';
import { RidersFormComponent } from './components/riders-form/riders-form.component';

const routes: Routes = [
  { path: 'ridersform', component: RidersFormComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path:  'riders/:id', component:  RiderDetailsComponent},
  { path: 'riders', component: RidersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // otherwise redirect to login
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
