"use strict";
var poll_component_1 = require("./poll.component");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
describe('PollComponent', function () {
    var de;
    var comp;
    var testCmpDebugElement;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                http_1.HttpModule
            ],
            declarations: [poll_component_1.PollComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(poll_component_1.PollComponent);
        comp = fixture.componentInstance;
        testCmpDebugElement = fixture.debugElement;
        de = fixture.debugElement.query(platform_browser_1.By.css('.panel-title'));
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('can be shown', function () {
        expect(de).toBeTruthy();
    });
    it('div tag', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(de).toBeTruthy();
    });
    it('h3 tag', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('h3'));
        expect(de).toBeTruthy();
    });
    it('panel shown', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('.panel-heading'));
        expect(de).toBeTruthy();
    });
    it('panel primary shown', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('.panel-primary'));
        expect(de).toBeTruthy();
    });
    it('panel body shown', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('.panel-body'));
        expect(de).toBeTruthy();
    });
    it('form group shown', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('.form-group'));
        expect(de).toBeTruthy();
    });
    it('button is shown', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('.btn-primary'));
        expect(de).toBeTruthy();
    });
    it('has methods', function () {
        spyOn(comp, 'selectChoice');
        spyOn(comp, 'submitPoll');
        spyOn(comp, 'stompSelectChoiceCallback');
        spyOn(comp, 'ngOnInit');
    });
});
//# sourceMappingURL=poll.component.spec.js.map