import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateroleComponent } from './createrole/createrole.component';

const routes: Routes = [
  {
    path: 'createrole',
     component: CreateroleComponent,
    data: {
      title: 'Add Role'
    },
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
