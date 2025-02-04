import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalsComponent } from './component/locals/locals.component';
import { LoginComponent } from './component/login/login.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { LocalListComponent } from './component/homepage-locals/local-list.component';
import { HomepageEventsComponent } from './component/homepage-events/homepage-events.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { FooterComponent } from './component/footer/footer.component';
import { EventsComponent } from './component/events/events.component';
import { LocalShowComponent } from './component/local-show/local-show.component';
import { RegisterComponent } from './component/register/register.component';
import { ImagesComponent } from './component/images/images.component';
import { EventShowComponent } from './component/event-show/event-show.component';
import { MapsComponent } from './component/maps/maps.component';
import { CheckoutEventsComponent } from './component/checkout-events/checkout-events.component';
import { CheckoutLocalsComponent } from './component/checkout-locals/checkout-locals.component';
import { PerfilComponent } from './component/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LocalsComponent,
    LoginComponent,
    NavBarComponent,
    LocalListComponent,
    HomepageEventsComponent,
    HomepageComponent,
    FooterComponent,
    EventsComponent,
    LocalShowComponent,
    RegisterComponent,
    ImagesComponent,
    EventShowComponent,
    MapsComponent,
    CheckoutEventsComponent,
    CheckoutLocalsComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
