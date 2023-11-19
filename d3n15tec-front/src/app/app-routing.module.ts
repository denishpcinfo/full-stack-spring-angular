import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {UnauthorizedComponent} from "./error/unauthorized/unauthorized.component";
import {AuthGuard} from "./guards/auth.guard";
import {Role} from "./models/role";

import { LayoutComponent } from './layout/layout.component';
import { StoreComponent } from './pages/store/store.component';
import { AdminComponent } from './admin/admin/admin.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},

  {path: 'store', component: StoreComponent},
  
  {path: 'register', component: RegisterComponent},
  
  { path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
  
  {path: 'home', component: HomeComponent},

  { path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.USER]}
  },

  { path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.ADMIN]
  }
}
]},  

  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnauthorizedComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
