import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CactusComponent } from './cactus/cactus.component';
import { MainComponent } from './main/main.component';
import { AutomaticComponent } from './rose/automatic/automatic.component';
import { DashboardComponent } from './rose/dashboard/dashboard.component';
import { ManualComponent } from './rose/manual/manual.component';
import { RoseComponent } from './rose/rose.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: MainComponent },
      { path: ':flower', component: RoseComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'automatic', component: AutomaticComponent },
        { path: 'manual', component: ManualComponent }
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
