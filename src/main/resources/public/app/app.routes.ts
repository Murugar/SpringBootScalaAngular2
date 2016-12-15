/*
* http://usejsdoc.org/
*/
import { Routes } from '@angular/router';

import { PollListComponent } from './poll.list.component';
import { DashboardComponent } from './dashboard.component';


export const ROUTE: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'poll', component: PollListComponent },
    { path: '', component: PollListComponent }
];


