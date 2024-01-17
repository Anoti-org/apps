import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownTextComponent } from './components/drop-down-text/drop-down-text.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LegalMentionsComponent } from './components/legal-mentions/legal-mentions.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LegalMentionsComponent,
    DropDownTextComponent,
    SupplierComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
