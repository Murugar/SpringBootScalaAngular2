"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
* http://usejsdoc.org/
*/
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
//import {ENV_PROVIDERS} from "./environment";
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
//mport {FormsModule, ReactiveFormsModule} from "@angular/forms";
var poll_list_component_1 = require("./poll.list.component");
var dashboard_component_1 = require("./dashboard.component");
var poll_component_1 = require("./poll.component");
var ng2_nvd3_1 = require("ng2-nvd3");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        declarations: [
            app_component_1.AppComponent,
            dashboard_component_1.DashboardComponent,
            poll_list_component_1.PollListComponent,
            poll_component_1.PollComponent,
            ng2_nvd3_1.nvD3
        ],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot(app_routes_1.ROUTE, {
                preloadingStrategy: router_1.PreloadAllModules
            }) //,
        ],
        providers: [],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map