/*
* http://usejsdoc.org/
*/
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, PreloadAllModules} from "@angular/router";
import { HttpModule, JsonpModule } from '@angular/http';
//import {ENV_PROVIDERS} from "./environment";
import {ROUTE} from "./app.routes";
import {AppComponent} from "./app.component";
//mport {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PollListComponent } from './poll.list.component';
import { DashboardComponent } from './dashboard.component';
import { PollComponent } from './poll.component';
import {nvD3} from 'ng2-nvd3';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DashboardComponent,
    PollListComponent,
    PollComponent,
    nvD3
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTE, {
      preloadingStrategy: PreloadAllModules
    })//,
    //FormsModule,
    //ReactiveFormsModule
  ],
  providers: [
    //ENV_PROVIDERS,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
