import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Import the ROUTE components 
import { LandingPageComponent } from '../app/landing-page/landing-page.component';
import { ParkMeetupsDescComponent } from './park-meetups-desc/park-meetups-desc.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent},
  { path: 'park-meetups-desc', component: ParkMeetupsDescComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
