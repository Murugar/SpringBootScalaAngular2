import { PollComponent } from './poll.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';




describe( 'PollComponent', function() {
    let de: DebugElement;
    let comp: PollComponent;
    let testCmpDebugElement: DebugElement;
    let fixture: ComponentFixture<PollComponent>;

    beforeEach( async(() => {
        TestBed.configureTestingModule( {

            imports: [
                HttpModule
            ],
            declarations: [PollComponent]
        })
            .compileComponents();
    }) );

    beforeEach(() => {
        fixture = TestBed.createComponent( PollComponent );
        comp = fixture.componentInstance;
        testCmpDebugElement = fixture.debugElement;
        de = fixture.debugElement.query( By.css( '.panel-title' ) );
    });

    it( 'should create component', () => expect( comp ).toBeDefined() );

    it( 'can be shown', () => {
        expect( de ).toBeTruthy();
    });
    
    it( 'div tag', () => {
        de = fixture.debugElement.query(By.css('div'));
        expect( de ).toBeTruthy();
    });
 
    it( 'h3 tag', () => {
        de = fixture.debugElement.query(By.css('h3'));
        expect( de ).toBeTruthy();
    });
    
   
    
    
    it( 'panel shown', () => {
        de = fixture.debugElement.query( By.css('.panel-heading' ) );
        expect( de ).toBeTruthy();
    });
    
    it( 'panel primary shown', () => {
        de = fixture.debugElement.query( By.css( '.panel-primary' ) );
        expect( de ).toBeTruthy();
    });
    
    
    it( 'panel body shown', () => {
        de = fixture.debugElement.query( By.css( '.panel-body' ) );
        expect( de ).toBeTruthy();
        
      
    });
    
    it( 'form group shown', () => {
        de = fixture.debugElement.query( By.css( '.form-group' ) );
        expect( de ).toBeTruthy();
    });
    
    it( 'button is shown', () => {
        de = fixture.debugElement.query( By.css( '.btn-primary' ) );
        expect( de ).toBeTruthy();
    });

    it( 'has methods', () => {



        spyOn( comp, 'selectChoice' );
        spyOn( comp, 'submitPoll' );
        spyOn( comp, 'stompSelectChoiceCallback' );
        spyOn( comp, 'ngOnInit' );

    });

});
