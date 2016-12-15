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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(http, router) {
        this.http = http;
        this.router = router;
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "<nav class=\"navbar navbar-inverse navbar-static-top\">\n    <a class=\"navbar-brand\" href=\"#\">Spring Boot - AngularJS 2 - WebSocket</a>\n</nav>\n<div class=\"container\">\n    <div class=\"panel panel-primary\">\n        <div class=\"panel-heading\">\n            <h3 class=\"panel-title\">\n                <span class=\"glyphicon glyphicon-envelope\"></span>\n                Poll Messages\n            </h3>\n        </div>\n        \n        <div class=\"panel-body\">\n            \n            <router-outlet></router-outlet>\n            \n        </div> <!-- End of panel body -->\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map