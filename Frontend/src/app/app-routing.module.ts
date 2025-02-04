import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { EventsComponent } from './component/events/events.component';
import { LocalsComponent } from './component/locals/locals.component';
import { LocalShowComponent } from './component/local-show/local-show.component';
import { RegisterComponent } from './component/register/register.component';
import { EventShowComponent } from './component/event-show/event-show.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { CheckoutEventsComponent } from './component/checkout-events/checkout-events.component';
import { CheckoutLocalsComponent } from './component/checkout-locals/checkout-locals.component';
import { PerfilComponent } from './component/perfil/perfil.component';


const routes: Routes = [
  {
    path: "",
    component: HomepageComponent,
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "events",
    component: EventsComponent
  },
  {
    path: "locals",
    component: LocalsComponent
  },
  {
    path: "local-show/:id",
    component: LocalShowComponent
  },
  {
    path: "event-show/:id",
    component: EventShowComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "checkout/events/:id",
    component: CheckoutEventsComponent
  },
  {
    path: "checkout/locals/:id",
    component: CheckoutLocalsComponent
  },
  {
    path: "perfil/:id",
    component: PerfilComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
