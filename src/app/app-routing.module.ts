import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { SecondpageComponent } from './secondpage/secondpage.component';
import { ThirdpageComponent } from './thirdpage/thirdpage.component';


const routes: Routes = [
  {path: '', component: FirstpageComponent},
  {path: 'secondPage', component: SecondpageComponent},
  {path: 'thirdPage', component: ThirdpageComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo:'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
