/*
* http://usejsdoc.org/
*/
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { PollListComponent } from './poll.list.component';
import { PollComponent } from './poll.component';
import { Router, Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {Http} from '@angular/http';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement, Component, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import {ROUTE} from "./app.routes";
import {nvD3} from 'ng2-nvd3';
import {APP_BASE_HREF} from '@angular/common';
import {
    RouterTestingModule
} from '@angular/router/testing';

class MockRouter { public navigate( test ) { return test; } }

@Component( {
    template: ''
})
class MockLoginComponent { }

@NgModule( {
    declarations: [MockLoginComponent],
    exports: [MockLoginComponent]
})
class MockModule { }

describe( 'AppComponent', function() {
    let de: DebugElement;
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    let http, router = new MockRouter();

    beforeEach( async(() => {
        TestBed.configureTestingModule( {
            imports: [
                HttpModule,
                MockModule,
                RouterModule.forRoot( ROUTE, {
                    preloadingStrategy: PreloadAllModules
                }),
                RouterTestingModule.withRoutes( [
                    {
                        path: 'dashboard',
                        component: DashboardComponent
                    },
                    { path: 'poll', component: PollListComponent },
                    { path: '', component: PollListComponent },
                    {
                        path: 'login',
                        component: MockLoginComponent
                    }
                ] )
            ],
            declarations: [AppComponent, DashboardComponent, PollListComponent, PollComponent, nvD3],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: Router, useClass: MockRouter }
            ]
        })
            .compileComponents();
    }) );

    beforeEach( inject( [Http, Router], ( _http: Http, _router: Router ) => {
        http = _http;
        router = _router;
    }) );

    beforeEach(() => {
        fixture = TestBed.createComponent( AppComponent );
        comp = fixture.componentInstance;
        de = fixture.debugElement.query( By.css( 'h3' ) );
    });

    it( 'should create component', () => expect( comp ).toBeDefined() );

    it( 'can be shown', () => {
        expect( de ).toBeTruthy();
    });

    it( 'panel can be shown', () => {
        de = fixture.debugElement.query( By.css( 'div' ) );
        expect( de ).toBeTruthy();
    });

    it( 'link can be shown', () => {
        de = fixture.debugElement.query( By.css( 'a' ) );
        expect( de ).toBeTruthy();
    });

    it( 'nav can be shown', () => {
        de = fixture.debugElement.query( By.css( 'nav' ) );
        expect( de ).toBeTruthy();
    });

    it( 'should go dashboard', async(() => {

        fixture.detectChanges();
        spyOn( router, 'navigate' );
        router.navigate( 'dashboard' );

        expect( router.navigate ).toHaveBeenCalledWith( 'dashboard' );
        expect( router.navigate ).toHaveBeenCalledTimes( 1 );

    }) );

    it( 'should go poll', async(() => {

        fixture.detectChanges();
        spyOn( router, 'navigate' );
        router.navigate( 'poll' );

        expect( router.navigate ).toHaveBeenCalledWith( 'poll' );
        expect( router.navigate ).toHaveBeenCalledTimes( 1 );

    }) );

    it( 'should go poll empty ', async(() => {

        fixture.detectChanges();
        spyOn( router, 'navigate' );
        router.navigate( '' );

        expect( router.navigate ).toHaveBeenCalledWith( '' );
        expect( router.navigate ).toHaveBeenCalledTimes( 1 );

    }) );

    it( 'should go login empty ', async(() => {


        //var moc = sinon.mock(router);

        // var expectation = moc.expects("navigate");

        let stub = sinon.stub( router, 'navigate' );

        stub.returns( 'login' );

        let serv = sinon.fakeServer.create();
        serv.respondWith( "GET", "/something", [
            200,
            { "Content-Type": "application/json" },
            '[{ "id": 1, "name": "Gwen" },  { "id": 2, "name": "John" }]'
        ] );

        var callbacks = [sinon.spy(), sinon.spy()];

        fixture.detectChanges();
        spyOn( router, 'navigate' );
        router.navigate( 'login' );

        expect( router.navigate ).toHaveBeenCalledWith( 'login' );
        expect( router.navigate ).toHaveBeenCalledTimes( 1 );

        stub.restore();


    }) );

});