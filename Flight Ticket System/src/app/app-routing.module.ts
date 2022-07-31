import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FlightInfoComponent } from './component/flight-info/flight-info.component';
import { FlightSearchComponent } from './component/flight-search/flight-search.component';
import { HomeComponent } from './component/home/home.component';
import { PaymentComponent } from './component/payment/payment.component';
import { RegisterComponent } from './component/register/register.component';
import { UnauthorisedComponent } from './component/unauthorised/unauthorised.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'FlightSearch', component: FlightSearchComponent },
  { path: 'FlightInfo', component: FlightInfoComponent },
  { path: 'Cart', component: CartComponent },
  { path: 'Payment', component: PaymentComponent },
  { path: 'bad-creds', component: UnauthorisedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
