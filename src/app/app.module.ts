import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { FooterComponent } from './footer/footer.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { SecondpageComponent } from './secondpage/secondpage.component';
import { ThirdpageComponent } from './thirdpage/thirdpage.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HttpClientModule } from '@angular/common/http';

import { HighchartsChartModule } from 'highcharts-angular';
import { TotalVenteComponent } from './charts/total-vente/total-vente.component';
import { NbrCommandeComponent } from './charts/nbr-commande/nbr-commande.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PanierMoyenComponent } from './charts/panier-moyen/panier-moyen.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidepanelComponent,
    FooterComponent,
    FirstpageComponent,
    SecondpageComponent,
    ThirdpageComponent,
    FourOhFourComponent,
    TotalVenteComponent,
    NbrCommandeComponent,
    PanierMoyenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
