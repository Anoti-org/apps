import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LegalMentionsComponent } from './components/legal-mentions/legal-mentions.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { LandingGuard } from './guards/landing.guard';

const routes: Routes = [
  { path: 'legal-mentions', component: LegalMentionsComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'contractor', component: LandingPageComponent },
  {
    path: '6mois', component: LandingPageComponent,
    canActivate: [LandingGuard],
  },
  { 
    path: '**', component: LandingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
