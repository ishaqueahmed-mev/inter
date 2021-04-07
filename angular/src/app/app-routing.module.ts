import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [{
  path: '', redirectTo: 'user', pathMatch: 'full'
},{
  path: 'user', component: UserComponent
}, {
  path: 'list', component: ListComponent
}, {
  path: '**', component: UserComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
