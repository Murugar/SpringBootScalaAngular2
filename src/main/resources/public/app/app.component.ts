import {Component} from '@angular/core';
import {Http} from '@angular/http';
import { Poll } from './poll.domain';
import { PollListComponent } from './poll.list.component';
import { DashboardComponent } from './dashboard.component';
import { Router, Routes} from '@angular/router';
import { ROUTE } from './app.routes';


@Component({
    selector: 'my-app',
    template: `<nav class="navbar navbar-inverse navbar-static-top">
    <a class="navbar-brand" href="#">Spring - Boot - Scala - AngularJS 2 - WebSocket</a>
</nav>
<div class="container">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-envelope"></span>
                Poll Messages
            </h3>
        </div>
        
        <div class="panel-body">
            
            <router-outlet></router-outlet>
            
        </div> <!-- End of panel body -->
    </div>
</div>
`
})


export class AppComponent {
    constructor(public http: Http,private router: Router) {
        
    }
}


