import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardStartComponent } from './components/dashboard-start/dashboard-start.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ConfigComponent } from './components/config/config.component';
import { SupportComponent } from './components/support/support.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardStartComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'config', component: ConfigComponent },
      { path: 'support', component: SupportComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
