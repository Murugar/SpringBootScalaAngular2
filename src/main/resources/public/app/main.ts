export * from './app.component';
export * from './app.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Http} from '@angular/http';
import { Router} from '@angular/router';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
