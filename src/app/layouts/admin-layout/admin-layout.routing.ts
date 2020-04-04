import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { MapsComponent } from '../../maps/maps.component';
import { TaskdetailsComponent } from 'app/taskdetails/taskdetails.component';
import { TaskListComponent } from 'app/task-list/task-list.component';

export const AdminLayoutRoutes: Routes = [
   
    { path: '',  redirectTo:"dashboard" },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'task',           component: TaskdetailsComponent },
    { path: 'tasklist',           component: TaskListComponent},
];
