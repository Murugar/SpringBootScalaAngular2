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
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./dashboard.component");
var poll_list_component_1 = require("./poll.list.component");
var poll_component_1 = require("./poll.component");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_2 = require("@angular/http");
var app_routes_1 = require("./app.routes");
var ng2_nvd3_1 = require("ng2-nvd3");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var MockRouter = (function () {
    function MockRouter() {
    }
    MockRouter.prototype.navigate = function (test) { return test; };
    return MockRouter;
}());
var MockLoginComponent = (function () {
    function MockLoginComponent() {
    }
    return MockLoginComponent;
}());
MockLoginComponent = __decorate([
    core_1.Component({
        template: ''
    }),
    __metadata("design:paramtypes", [])
], MockLoginComponent);
var MockModule = (function () {
    function MockModule() {
    }
    return MockModule;
}());
MockModule = __decorate([
    core_1.NgModule({
        declarations: [MockLoginComponent],
        exports: [MockLoginComponent]
    }),
    __metadata("design:paramtypes", [])
], MockModule);
describe('AppComponent', function () {
    var de;
    var comp;
    var fixture;
    var http, router = new MockRouter();
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                http_2.HttpModule,
                MockModule,
                router_1.RouterModule.forRoot(app_routes_1.ROUTE, {
                    preloadingStrategy: router_1.PreloadAllModules
                }),
                testing_2.RouterTestingModule.withRoutes([
                    {
                        path: 'dashboard',
                        component: dashboard_component_1.DashboardComponent
                    },
                    { path: 'poll', component: poll_list_component_1.PollListComponent },
                    { path: '', component: poll_list_component_1.PollListComponent },
                    {
                        path: 'login',
                        component: MockLoginComponent
                    }
                ])
            ],
            declarations: [app_component_1.AppComponent, dashboard_component_1.DashboardComponent, poll_list_component_1.PollListComponent, poll_component_1.PollComponent, ng2_nvd3_1.nvD3],
            providers: [
                { provide: common_1.APP_BASE_HREF, useValue: '/' },
                { provide: router_1.Router, useClass: MockRouter }
            ]
        })
            .compileComponents();
    }));
    beforeEach(testing_1.inject([http_1.Http, router_1.Router], function (_http, _router) {
        http = _http;
        router = _router;
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h3'));
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('can be shown', function () {
        expect(de).toBeTruthy();
    });
    it('panel can be shown', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(de).toBeTruthy();
    });
    it('link can be shown', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('a'));
        expect(de).toBeTruthy();
    });
    it('nav can be shown', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('nav'));
        expect(de).toBeTruthy();
    });
    it('should go dashboard', testing_1.async(function () {
        fixture.detectChanges();
        spyOn(router, 'navigate');
        router.navigate('dashboard');
        expect(router.navigate).toHaveBeenCalledWith('dashboard');
        expect(router.navigate).toHaveBeenCalledTimes(1);
    }));
    it('should go poll', testing_1.async(function () {
        fixture.detectChanges();
        spyOn(router, 'navigate');
        router.navigate('poll');
        expect(router.navigate).toHaveBeenCalledWith('poll');
        expect(router.navigate).toHaveBeenCalledTimes(1);
    }));
    it('should go poll empty ', testing_1.async(function () {
        fixture.detectChanges();
        spyOn(router, 'navigate');
        router.navigate('');
        expect(router.navigate).toHaveBeenCalledWith('');
        expect(router.navigate).toHaveBeenCalledTimes(1);
    }));
    it('should go login empty ', testing_1.async(function () {
        //var moc = sinon.mock(router);
        // var expectation = moc.expects("navigate");
        var stub = sinon.stub(router, 'navigate');
        stub.returns('login');
        var serv = sinon.fakeServer.create();
        serv.respondWith("GET", "/something", [
            200,
            { "Content-Type": "application/json" },
            '[{ "id": 1, "name": "Gwen" },  { "id": 2, "name": "John" }]'
        ]);
        var callbacks = [sinon.spy(), sinon.spy()];
        fixture.detectChanges();
        spyOn(router, 'navigate');
        router.navigate('login');
        expect(router.navigate).toHaveBeenCalledWith('login');
        expect(router.navigate).toHaveBeenCalledTimes(1);
        stub.restore();
    }));
});
//# sourceMappingURL=app.component.spec.js.map