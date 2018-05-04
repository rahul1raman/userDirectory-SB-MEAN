import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DirectoryComponent } from './directory/directory.component';

const routes: Routes = [
    { path: '', redirectTo: '/directory', pathMatch: 'full'},
    {
      path: 'directory',
      component: DirectoryComponent,
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
