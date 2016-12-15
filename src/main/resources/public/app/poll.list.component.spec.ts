/*
* http://usejsdoc.org/
*/
import { PollListComponent } from './poll.list.component';
import { PollComponent } from './poll.component';
import { Poll } from './poll.domain';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement, Injector, Injectable} from '@angular/core';
import { inject,
    fakeAsync

}   from '@angular/core/testing';
import {Http, HttpModule, JsonpModule, BaseRequestOptions, Response,
    ResponseOptions, ResponseType, RequestMethod, ConnectionBackend, Headers } from '@angular/http';

import {MockBackend, MockConnection } from '@angular/http/testing';

import {Observable, } from "rxjs/Rx";
import "rxjs/add/operator/map";


export class MockError extends Response implements Error {
    name: any
    message: any
}

@Injectable()
export class HelloService {

    constructor( private http: Http ) {

    }

    greet( name: string ): Observable<any> {
        let headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        headers.append( 'token', 'secret' );
        headers.append( 'uname', 'test' );
        headers.append( 'pwd', 'test' );

        return this.http
            .get( `/api/hello?name=${name}`, { headers })
            .map( res => {
                return res.json()
            });
    }
}

@Injectable()
export class PollService {

    constructor( private http: Http ) {

    }

    greet( name: string ): Observable<string> {
        let headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );

        return this.http
            .get( `/api/polls?name=${name}`, { headers })
            .map( res => {
                return <string>res.text();
            });
    }

    greetpost( name: string, pwd: string ): Observable<string> {
        let headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );

        return this.http
            .post( `/api/polls`, JSON.stringify( { uname: name, pword: pwd }), { headers })
            .map( res => {
                return <string>res.text();
            });
    }

    greetput( name: string, pwd: string ): Observable<string> {
        let headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );

        return this.http
            .put( `/api/polls`, JSON.stringify( { uname: name, pword: pwd }), { headers })
            .map( res => {
                return <string>res.text();
            });
    }

    greetdelete( name: string, pwd: string ): Observable<string> {
        let headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );

        return this.http.
            delete( `/api/polls/1`, { headers })
            .map( res => {
                return <string>res.text();
            });
    }

    greetpatch( name: string, pwd: string ): Observable<string> {
        let headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );

        return this.http
            .patch( `/api/polls`, JSON.stringify( { uname: name, pword: pwd }), { headers })
            .map( res => {
                return <string>res.text();
            });
    }

}

let fetchMock = require( 'fetch-mock' );

fetchMock.get( '*', { hello: 'world' });




declare let SockJS;
declare let Stomp;
declare let sinon: any;

let payload = {
    "never": "Hello World"
    , "gonna": true
    , "give": 123
    , "you": ["up"]
}



let server = sinon.fakeServer.create()
//myResults = [1, 2, 3];








let WsServerMock = require( 'ws-mock' ).WsServer;

let SocketMock = require( 'socket-io-mock' )
    , should = require( 'chai' ).should()
    , eventPayload = payload
    , socket
    , roomKey = 'room';

let StompServerMock = require( './server.mock.js' ).StompServerMock;

describe( "SinonFakeServerWithJasmine", function() {
    let server;

    const assert = require( 'chai' ).assert;

    beforeEach( function() {
        server = sinon.fakeServer.create();
    });

    afterEach( function() {
        server.restore();
    });



    it( "should fake a request", function() {
        server.respondWith( "GET", "/api/polls",
            [200, { "Content-Type": "application/json" },
                '{ "stuff": "is", "awesome": "in here" }'] );

    });


    it( "should spy and callFake WebSocket constructor, and stub prototype methods", function( done ) {
        let realWS = WebSocket;

        let sendSpy = spyOn( WebSocket.prototype, "send" ).and.callFake( function( outMsg ) {
            if ( outMsg == "outgoing message" ) {
                this.onmessage( "incoming mocked message goes here" );
            }
            if ( outMsg == "another outgoing message" ) {
                this.onmessage( "another incoming mocked message goes here" );
            }
        });

        let WSSpy = spyOn( window, "WebSocket" ).and.callFake( function( url, protocols ) {
            return new realWS( url, protocols );
        });
        let onmessageCallbackSpy = jasmine.createSpy( 'onmessageCallback' );


        let ws = new WebSocket( "ws://localhost:9000/message" );
        ws.onmessage = onmessageCallbackSpy;
        ws.send( "outgoing message" );
        ws.send( "another outgoing message" );

        expect( WSSpy ).toHaveBeenCalledWith( "ws://localhost:9000/message" );
        expect( onmessageCallbackSpy ).toHaveBeenCalledWith( "incoming mocked message goes here" );

        expect( onmessageCallbackSpy ).toHaveBeenCalledWith( "another incoming mocked message goes here" );

        done();


    });


    it( 'should echo', function() {

        let ws = {
            send: function( msg ) {
                this.onmessage( { data: msg });
            },
            onmessage: function( e ) {
                // stub
            }
        };

        let spy = sinon.spy( ws, 'onmessage' );
        ws.send( 'this is a test' );
        ws.send( 'this is a test1' );
        assert( spy.args[0][0].data, 'this is a test' );

    });

    it( 'Should Stomp Frame', function() {

        let out = Stomp.Frame.marshall( "CONNECT", { login: 'jmesnil', passcode: 'wombats' }, function() {
            let message = "Hello world!";
        });

        let out1 = Stomp.Frame.marshall( "SEND", { destination: '/queue/test' }, "hello, world!" );

        let out2 = Stomp.Frame.marshall( "SEND",
            { destination: '/queue/test', 'content-length': false }, "hello, world!" );

        let data = "CONNECTED\nsession-id: 1234\n\n\0";
        let frame = Stomp.Frame.unmarshall( data ).frames[0];

    });

    it( 'Should Stomp Connect', function( done ) {

        Stomp.WebSocketClass = StompServerMock;

        let wsss = new StompServerMock( "http://localhost:9001/stomp/server" );

        let client = Stomp.over( wsss );

        let connected = false;

        let messages = [];

        client.connect( "guest", "guest", function() {
            let message = "Hello Fucking world!";
            client.send( "/queue/test", {}, message );
            return connected = true;
        });

        setTimeout( function() {
            if ( connected ) {
                console.log( 'Connected...........' );
                messages.push( 'test1' );
                messages.push( 'test1' );
                expect( connected ).toBe( true );
                expect( messages.length ).toEqual( 2 );
                expect( client.ws.messages.length ).toEqual( 1 );
                expect( client.ws.messages.pop().toString() ).toContain( 'Hello Fucking world!' );
                done();
            }

        }, 1000 );


    });

    it( "lets you send messages in a transaction", function( done ) {
        let client, connected;

        Stomp.WebSocketClass = StompServerMock;

        let wsss = new StompServerMock( "http://localhost:9001/stomp/server" );

        client = Stomp.over( wsss );

        connected = false;
        client.connect( "guest", "guest", function() {
            return connected = true;
        });

        setTimeout( function() {
            if ( connected ) {

                let txid;
                txid = "123";
                client.begin( txid );
                client.send( "/queue/test", {
                    transaction: txid
                }, "messages 1" );
                client.send( "/queue/test", {
                    transaction: txid
                }, "messages 2" );
                expect( client.ws.messages.length ).toEqual( 0 );
                client.send( "/queue/test", {
                    transaction: txid
                }, "messages 3" );
                client.commit( txid );

                expect( client.ws.messages.length ).toEqual( 3 );

                console.log( 'Transactions Done...........' );

                done();
            }

        }, 1000 );

    });


    it( "lets you abort a transaction", function( done ) {
        let client, connected;

        Stomp.WebSocketClass = StompServerMock;

        let wsss = new StompServerMock( "http://localhost:9001/stomp/server" );

        client = Stomp.over( wsss );

        connected = false;
        client.connect( "guest", "guest", function() {
            return connected = true;
        });

        setTimeout( function() {
            if ( connected ) {

                let txid;
                txid = "123";
                client.begin( txid );
                client.send( "/queue/test", {
                    transaction: txid
                }, "messages 1" );
                client.send( "/queue/test", {
                    transaction: txid
                }, "messages 2" );
                expect( client.ws.messages.length ).toEqual( 0 );
                client.send( "/queue/test", {
                    transaction: txid
                }, "messages 3" );
                client.abort( txid );

                expect( client.ws.messages.length ).toEqual( 0 );

                console.log( 'Transactions Abort Done...........' );

                done();
            }

        }, 1000 );

    });


    it( 'Should Stomp Subscribe', function( done ) {

        let client, subscription, unsubscribed;

        Stomp.WebSocketClass = StompServerMock;

        //let wsss = new StompServerMock("http://localhost:9001/stomp/server");

        client = Stomp.client( "http://localhost:9001/stomp/server" );

        unsubscribed = false;

        let messages = [];

        client.connect( "guest", "guest", function() {

            return subscription = client.subscribe( "/queue/test1", function( msg ) {
                return messages.push( msg );
            });

        });


        setTimeout( function() {
            if ( !unsubscribed ) {
                console.log( 'Subscribed...........' );
                console.log( 'Subscriptions...........' + client.ws.subscriptions );
                expect( Object.keys( client.ws.subscriptions ) ).toContain( subscription.id );

                client.ws.test_send( subscription.id, Math.random() );
                client.ws.test_send( subscription.id, Math.random() );
                expect( messages.length ).toEqual( 2 );

                subscription.unsubscribe();

                try {
                    client.ws.test_send( 'shit', Math.random() );
                } catch ( err ) {
                    null;
                }

                expect( messages.length ).toEqual( 2 );

                done();
            }

        }, 1000 );
    });


});

describe( 'Fast and isolated socket tests', function() {

    beforeEach( function( done ) {
        socket = new SocketMock()
        done()
    })


    it( 'Sockets should be able to talk to each other without a server', function( done ) {


        socket.on( 'message', function( message ) {
            message.should.be.equal( 'Hello World!' )
            done()
        })
        socket.socketClient.emit( 'message', 'Hello World!' )

    })

    it( 'Sockets should be able to talk to each other without a server', function( done ) {


        socket.on( "test", function( payload ) {
            payload.should.have.property( 'never' )
            payload.should.have.property( 'gonna' )
            payload.should.have.property( 'give' )
            payload.should.have.property( 'you' )

            payload.never.should.be.equal( eventPayload.never )
            payload.gonna.should.be.equal( eventPayload.gonna )
            payload.give.should.be.equal( eventPayload.give )
            payload.you[0].should.be.equal( eventPayload.you[0] )

            done()
        })

        socket.socketClient.emit( "test", eventPayload )
    });




    it( 'should fire event on the client side when on() is assigned', function( done ) {
        socket.socketClient.on( "test", function( payload ) {
            payload.should.have.property( 'never' )
            payload.should.have.property( 'gonna' )
            payload.should.have.property( 'give' )
            payload.should.have.property( 'you' )

            payload.never.should.be.equal( eventPayload.never )
            payload.gonna.should.be.equal( eventPayload.gonna )
            payload.give.should.be.equal( eventPayload.give )
            payload.you[0].should.be.equal( eventPayload.you[0] )

            done()
        })

        socket.emit( "test", eventPayload )
    });

    it( 'Should add a room to `joinedRooms` when join() is called', function( done ) {

        socket.join( roomKey )
        socket.joinedRooms[0].should.be.equal( roomKey )

        done()

    });

    it( 'Should remove a room in `joinedRooms` when leave() is called', function( done ) {

        socket.join( roomKey )
        socket.joinedRooms[0].should.be.equal( roomKey )

        socket.leave( roomKey )
        socket.joinedRooms.should.have.length( 0 )

        done()
    });

    it( 'Should fire `onEmit()` callback when a event is fired in the room', function( done ) {

        socket.join( roomKey )

        let eventPayload = {
            "test": "123"
        }

        socket.onEmit( 'test', function( payload, roomEvent ) {
            roomEvent.should.be.equal( roomKey )

            payload.should.have.property( "test" )
            payload.test.should.be.equal( "123" )

            done();
        });

        socket.broadcast.to( roomKey ).emit( 'test', eventPayload )
    });

});


//let io = require( 'socket.io-client' )
//, assert = require('assert')

describe( 'PollListComponent', function() {
    let de: DebugElement;
    let testCmpDebugElement: DebugElement;
    let comp: PollListComponent;
    let fixture: ComponentFixture<PollListComponent>;

    let socket;

    beforeEach( async(() => {
        TestBed.configureTestingModule( {

            imports: [
                HttpModule
            ],

            declarations: [PollListComponent,
                PollComponent],
            providers: [
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: ( backendInstance: MockBackend, defaultOptions: BaseRequestOptions ) => {
                        return new Http( backendInstance, defaultOptions );
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        })
            .compileComponents();
    }) );


    let backend: MockBackend = null;

    beforeEach( inject( [MockBackend], ( mockBackend: MockBackend ) => {
        backend = mockBackend;
    }) );


    beforeEach(() => {
        fixture = TestBed.createComponent( PollListComponent );
        comp = fixture.componentInstance;
        testCmpDebugElement = fixture.debugElement;
        de = fixture.debugElement.query( By.css( 'ul' ) );


    });

    it( 'should create component', () => expect( comp ).toBeDefined() );


    it( 'Mock Http Requests', () => {

        backend.connections.subscribe(( connection: MockConnection ) => {

            if ( connection.request.url.endsWith( '/api/polls' )
                && connection.request.method === RequestMethod.Get ) {

                let options = new ResponseOptions( {
                    body: JSON.stringify( { status: 200, body: { test: 'fake get all polls response', msg: 'success', success: true } })
                });

                let res = new Response( options );
                connection.mockRespond( res );
            }
            else if ( connection.request.url.endsWith( '/api/poll/stats' )
                && connection.request.method === RequestMethod.Get ) {

                let options = new ResponseOptions( {
                    body: JSON.stringify( { status: 200, body: { test: 'fake get poll stats response', msg: 'success', success: true } })
                });

                let res = new Response( options );
                connection.mockRespond( res );
            }
            else if ( connection.request.url.endsWith( '/api/poll/1/submit' )
                && connection.request.method === RequestMethod.Post ) {

                let bad = JSON.parse( connection.request.getBody() );

                let options = new ResponseOptions( {
                    body: JSON.stringify( { status: 200, body: { test: 'fake post response', msg: 'success', success: true } })
                });

                let res = new Response( options );
                connection.mockRespond( res );
            }
            else if ( connection.request.url.endsWith( '/api/poll/1/submit' )
                && connection.request.method === RequestMethod.Put ) {

                let bad = JSON.parse( connection.request.getBody() );

                let options = new ResponseOptions( {
                    body: JSON.stringify( { status: 200, body: { test: 'fake put response', msg: 'success', success: true } })
                });

                let res = new Response( options );
                connection.mockRespond( res );

            }
            else if ( connection.request.url.endsWith( '/api/poll/1' )
                && connection.request.method === RequestMethod.Delete ) {

                let options = new ResponseOptions( {
                    body: JSON.stringify( { status: 200, body: { test: 'fake delete response', msg: 'success', success: true } })
                });

                let res = new Response( options );
                connection.mockRespond( res );

            }
            else if ( connection.request.url.endsWith( '/api/poll/1/submit' )
                && connection.request.method === RequestMethod.Patch ) {

                let bad = JSON.parse( connection.request.getBody() );

                let options = new ResponseOptions( {
                    body: JSON.stringify( { status: 200, body: { test: 'fake patch response', msg: 'success', success: true } })
                });

                let res = new Response( options );
                connection.mockRespond( res );

            }

        });


    });



    it( 'can be shown', ( done ) => {


        let wsServer = new WsServerMock();


        let realWS = WebSocket;

        let sendSpy = spyOn( WebSocket.prototype, "send" ).and.callFake( function( outMsg ) {
            if ( outMsg == "outgoing message" ) {
                this.onmessage( "incoming mocked message goes here" );
            }
            if ( outMsg == "another outgoing message" ) {
                this.onmessage( "another incoming mocked message goes here" );
            }

        });

        let WSSpy = spyOn( window, "WebSocket" ).and.callFake( function( url, protocols ) {
            return new realWS( url, protocols );
        });
        let onmessageCallbackSpy = jasmine.createSpy( 'onmessageCallback' );

        let ws = new WebSocket( "ws://localhost:9000/message" );
        ws.onmessage = onmessageCallbackSpy;
        ws.send( "outgoing message" );
        ws.send( "another outgoing message" );

        expect( WSSpy ).toHaveBeenCalledWith( "ws://localhost:9000/message" );
        expect( onmessageCallbackSpy ).toHaveBeenCalledWith( "incoming mocked message goes here" );

        expect( onmessageCallbackSpy ).toHaveBeenCalledWith( "another incoming mocked message goes here" );

        let socket = new SockJS( 'ws://localhost:9000/message' )

        let poll: Poll = new Poll()
        poll.id = 1;
        poll.name = 'test';

        wsServer.on( 'connection', function( ws ) {
            console.log( "new connection..." );
            ws.on( 'message', function( msg ) {
                console.log( "incoming message:", msg );
            });
            ws.on( 'close', function() {
                console.log( "connection closed..." );
            });
        });

        let wsConn = wsServer.addConnection(); // "new connection..." 
        // send message that will be received by wsServer   
        wsConn.sendMsgToServer( JSON.stringify( poll ) ); // "incoming message: dummy message" 
        // close a ws connection 
        wsConn.closeConnection(); // "connection closed..." 

        // clear all current connections 
        wsServer.clearConnections();

        // let socket1 : any = new SockJS('/message');
        comp.stompClient = Stomp.over( ws );



        let stompConnect = ( frame ) => {
            let whoami: any = frame.headers['user-name'];
            //subscribe to /user/queue/polls if you only want messages for the current user
            //   comp.stompClient.subscribe('/queue/polls', comp.stompPollCallback);
            //   comp.stompClient.subscribe('/queue/selectPoll', comp.stompSelectPollCallback);
        }

        comp.stompClient.connect( {}, stompConnect );


        comp.connect()
        // comp.ngOnInit();  

        spyOn( Stomp, 'over' )

        spyOn( comp, 'connect' )
        spyOn( comp.stompClient, 'connect' )

        //  spyOn(comp,'ngOnInit') 

        ws.send( JSON.stringify( poll ) );

        //comp.stompClient.send
        // ('ws://localhost:9000/message',{},JSON.stringify(poll));

        //  expect( onmessageCallbackSpy ).
        // toHaveBeenCalledWith(Object({ id: 1, name: 'test' }));

        expect( de ).toBeTruthy();

        done();


    });


    it( 'has methods', () => {

        let ws = {
            send: function( msg ) {
                this.onmessage( { data: msg });
            },
            onmessage: function( e ) {
                // stub
            }
        };



        //  let spy = sinon.spy(ws, 'onmessage');
        ws.send( 'this is a test' );
        ws.send( 'this is a test1' );

        let poll: Poll = new Poll()
        poll.id = 1;
        poll.name = 'test';

        comp.ngOnInit()

        spyOn( comp, 'connect' );
        spyOn( comp, 'showPoll' );
        spyOn( comp, 'stompPollCallback' );
        spyOn( comp, 'stompSelectPollCallback' );
        spyOn( comp, 'ngOnInit' );

    });

});



describe( 'Fetch Mock Test', () => {

    const expect = require( 'chai' ).expect;

    beforeEach(() => {
        fetchMock.restore();
    });


    it( 'fetch mock1', function() {
        fetchMock.mock( '/api/v1/new', {
            status: 200,
            body: { responseCode: 100 },
        });
    });

    it( 'fetch mock', function() {
        fetchMock.mock( '/api/polls', {
            status: 200,
            body: { responseCode: 100 },
        });
    });

    it( 'create - success', function() {

        fetchMock.mock( '^http://route1', 200 );
        expect(() => {
            fetchMock.mock( '^http://route2', 200 );
        }).not.to.throw();
        //  fetch('http://route1.com')
        //   fetch('http://route2.com')
        expect( fetchMock.calls().matched.length ).to.equal( 0 );


    });
});


describe( 'Http HelloService Tests', () => {

    beforeEach(() => {
        TestBed.configureTestingModule( {
            providers: [
                {
                    provide: Http,
                    useFactory: ( backend: ConnectionBackend, defaultOptions: BaseRequestOptions ) => {
                        return new Http( backend, defaultOptions );
                    }, deps: [MockBackend, BaseRequestOptions]
                },
                HelloService,
                MockBackend,
                BaseRequestOptions
            ]
        });
    });


    it( "call the greet url error",
        inject( [HelloService, MockBackend], fakeAsync(( helloService: HelloService, mockBackend: MockBackend ) => {

            let name: string = "Shit";

            let mockResponseBody = {
                title: 'title',
                content: 'Testing is a good thing',
                status: 200
            };

            let options = new ResponseOptions( {
                body: { name: 'Jeff' },
                status: 200,
                statusText: 'good'
            });


            let body = JSON.stringify( { key: 'val' });
            let opts = { type: ResponseType.Error, status: 404, body: body, url: 'shit' };
            let responseOpts = new ResponseOptions( opts );


            mockBackend.connections.subscribe( c => {



                expect( c.request.url ).toBe( "/api/hello?name=" + name );
                expect( c.request.method ).toEqual( RequestMethod.Get );

                c.mockError( new MockError( responseOpts ) );


                //c.mockRespond(new Response(new ResponseOptions
                // ({body: JSON.stringify(mockResponseBody), status: 200, statusText: 'Success', type : ResponseType.Basic})));
            });
            helloService.greet( name ).subscribe( data => {

                expect( data ).toEqual( 'dirtything' );
                expect( data ).toBeDefined();
                expect( data.content ).toEqual( 'Testing is a good thing' );
                expect( data.title ).toEqual( 'title' );
                expect( data.status ).toEqual( 404 );
            },
                err => {
                    expect( err ).toBeDefined();
                    expect( err.status ).toEqual( 404 );
                    expect( err.url ).toEqual( 'shit' );
                }
            );
            tick();


            expect( options.body ).toEqual( Object( { name: 'Jeff' }) );
            expect( options.status ).toEqual( 200 );


        }) )
    );


    it( "call the greet url ",
        inject( [HelloService, MockBackend], fakeAsync(( helloService: HelloService, mockBackend: MockBackend ) => {

            let name: string = 'Shit';

            let mockResponseBody = {
                title: 'title',
                content: 'Testing is a good thing',
                status: 200
            };

            let options = new ResponseOptions( {
                body: { name: 'Jeff' },
                status: 200,
                statusText: 'good'
            });


            let body = JSON.stringify( { msg: 'not found' });
            let opts = { type: ResponseType.Error, status: 404, body: body };
            let responseOpts = new ResponseOptions( opts );


            mockBackend.connections.subscribe( c => {

                if ( c.request.headers.get( 'token' ) !== 'secret' ) {

                    let body = JSON.stringify( { msg: 'UnAuthorized' });
                    let opts = { type: ResponseType.Error, status: 401, body: body };
                    let responseOpts = new ResponseOptions( opts );

                    c.mockError( new MockError( responseOpts ) );
                }

                if ( c.request.headers.get( 'uname' ) !== 'test' ) {

                    let body = JSON.stringify( { msg: 'UnAuthorized' });
                    let opts = { type: ResponseType.Error, status: 401, body: body };
                    let responseOpts = new ResponseOptions( opts );

                    c.mockError( new MockError( responseOpts ) );
                }

                if ( c.request.headers.get( 'pwd' ) !== 'test' ) {

                    let body = JSON.stringify( { msg: 'UnAuthorized' });
                    let opts = { type: ResponseType.Error, status: 401, body: body };
                    let responseOpts = new ResponseOptions( opts );

                    c.mockError( new MockError( responseOpts ) );
                }

                if ( name === undefined ) {
                    c.mockError( new MockError( responseOpts ) );
                }
                else {
                    expect( c.request.url ).toBe( "/api/hello?name=" + name );
                    expect( c.request.method ).toEqual( RequestMethod.Get );

                    c.mockRespond( new Response( new ResponseOptions
                        ( { body: JSON.stringify( mockResponseBody ), status: 200, statusText: 'Success', type: ResponseType.Basic }) ) );
                }
            });
            helloService.greet( name ).subscribe( data => {

                expect( data ).toBeDefined();
                expect( data.content ).toEqual( 'Testing is a good thing' );
                expect( data.title ).toEqual( 'title' );

            },
                err => {
                    expect( err ).toBeDefined();
                    expect( err.status ).toBeGreaterThan( 400 );
                }
            );
            tick();


            expect( options.body ).toEqual( Object( { name: 'Jeff' }) );
            expect( options.status ).toEqual( 200 );


        }) )
    );


});

describe( 'Http Poll Service Tests', () => {

    beforeEach(() => {
        TestBed.configureTestingModule( {
            providers: [
                {
                    provide: Http,
                    useFactory: ( backend: ConnectionBackend, defaultOptions: BaseRequestOptions ) => {
                        return new Http( backend, defaultOptions );
                    }, deps: [MockBackend, BaseRequestOptions]
                },
                PollService,
                MockBackend,
                BaseRequestOptions
            ]
        });
    });


    it( "call the greet url",
        inject( [PollService, MockBackend], fakeAsync(( pollService: PollService, mockBackend: MockBackend ) => {



            let name: string = "Shit";
            let response: string;

            expect( mockBackend ).toBeDefined();
            mockBackend.connections.subscribe( c => {
                expect( c.request.url ).toBe( "/api/polls?name=" + name );
                expect( c.request.method ).toEqual( RequestMethod.Get );
                expect( c.request.headers.get( 'Content-Type' ) ).toEqual( 'application/json' );
                c.mockRespond( new Response( new ResponseOptions( { status: 200, body: "Hello " + name }) ) );
            });

            expect( pollService ).toBeDefined();
            spyOn( pollService, 'greet' ).and.callThrough();
            pollService.greet( name ).subscribe( data => {
                response = data;
            },
                err => {
                    expect( err ).toBeDefined();
                    expect( err.status ).toEqual( 404 );
                }
            );
            tick();
            expect( pollService.greet ).toHaveBeenCalled();
            expect( response ).toBeDefined();
            expect( response ).toBe( "Hello " + name );

        }) )
    );

    it( "call the greet post url",
        inject( [PollService, MockBackend], fakeAsync(( helloService: PollService, mockBackend: MockBackend ) => {


            let body = JSON.stringify( { msg: 'not found' });
            let opts = { type: ResponseType.Error, status: 404, body: body };
            let responseOpts = new ResponseOptions( opts );


            let name: string = "admin";
            let pwd: string = "secret";
            let response: string;
            expect( mockBackend ).toBeDefined();
            mockBackend.connections.subscribe( c => {

                if ( name === undefined ) {
                    c.mockError( new MockError( responseOpts ) );
                }
                else {
                    expect( c.request.url ).toBe( "/api/polls" );
                    expect( c.request.method ).toEqual( RequestMethod.Post );
                    expect( c.request.headers.get( 'Content-Type' ) ).toEqual( 'application/json' );
                    c.mockRespond( new Response( new ResponseOptions( { status: 200, body: "Success Posted " + name }) ) );
                }
            });

            expect( helloService ).toBeDefined();
            spyOn( helloService, 'greetpost' ).and.callThrough();
            helloService.greetpost( name, pwd ).subscribe( data => {
                response = data;
            },
                err => {
                    expect( err ).toBeDefined();
                    expect( err.status ).toEqual( 404 );
                });
            tick();
            expect( helloService.greetpost ).toHaveBeenCalled();
            expect( response ).toBeDefined();
            expect( response ).toBe( "Success Posted " + name );

        }) )
    );

    it( "call the greet put url",
        inject( [PollService, MockBackend], fakeAsync(( helloService: PollService, mockBackend: MockBackend ) => {


            let body = JSON.stringify( { msg: 'not found' });
            let opts = { type: ResponseType.Error, status: 404, body: body };
            let responseOpts = new ResponseOptions( opts );

            let name: string = "admin";
            let pwd: string = "secret";
            let response: string;

            expect( mockBackend ).toBeDefined();
            mockBackend.connections.subscribe( c => {

                if ( name === undefined ) {
                    c.mockError( new MockError( responseOpts ) );
                }
                else {
                    expect( c.request.url ).toBe( "/api/polls" );
                    expect( c.request.method ).toEqual( RequestMethod.Put );
                    expect( c.request.headers.get( 'Content-Type' ) ).toEqual( 'application/json' );
                    c.mockRespond( new Response( new ResponseOptions( { status: 200, body: "Success Update " + name }) ) );
                }
            });

            expect( helloService ).toBeDefined();
            spyOn( helloService, 'greetput' ).and.callThrough();
            helloService.greetput( name, pwd ).subscribe( data => {
                response = data;
            },
                err => {
                    expect( err ).toBeDefined();
                    expect( err.status ).toEqual( 404 );
                });
            tick();
            expect( helloService.greetput ).toHaveBeenCalled();
            expect( response ).toBeDefined();
            expect( response ).toBe( "Success Update " + name );

        }) )
    );

    it( "call the greet delete url",
        inject( [PollService, MockBackend], fakeAsync(( helloService: PollService, mockBackend: MockBackend ) => {

            let name: string = "admin";
            let pwd: string = "secret";

            let body = JSON.stringify( { msg: 'not found' });
            let opts = { type: ResponseType.Error, status: 404, body: body };
            let responseOpts = new ResponseOptions( opts );

            expect( mockBackend ).toBeDefined();
            mockBackend.connections.subscribe( c => {

                if ( name === undefined ) {
                    c.mockError( new MockError( responseOpts ) );
                }
                else {

                    expect( c.request.url ).toBe( "/api/polls/1" );
                    expect( c.request.method ).toEqual( RequestMethod.Delete );
                    expect( c.request.headers.get( 'Content-Type' ) ).toEqual( 'application/json' );
                    c.mockRespond( new Response( new ResponseOptions( { body: 'Success Delete ' + name, status: 200 }) ) );
                }
            });

            expect( helloService ).toBeDefined();
            spyOn( helloService, 'greetdelete' ).and.callThrough();
            helloService.greetdelete( name, pwd ).subscribe( res => {
                expect( res ).toBeDefined();
                expect( res ).toBe( "Success Delete " + name );
            },
                err => {
                    expect( err ).toBeDefined();
                    expect( err.status ).toEqual( 404 );
                });
            tick();

            expect( helloService.greetdelete ).toHaveBeenCalled();

        }) )
    );



    it( "call the greet patch url",
        inject( [PollService, MockBackend], fakeAsync(( helloService: PollService, mockBackend: MockBackend ) => {

            let name: string = "admin";
            let pwd: string = "secret";
            let response: string;

            let body = JSON.stringify( { msg: 'not found' });
            let opts = { type: ResponseType.Error, status: 404, body: body };
            let responseOpts = new ResponseOptions( opts );

            expect( mockBackend ).toBeDefined();
            mockBackend.connections.subscribe( c => {

                if ( name === undefined ) {
                    c.mockError( new MockError( responseOpts ) );
                }
                else {

                    expect( c.request.url ).toBe( "/api/polls" );
                    expect( c.request.method ).toEqual( RequestMethod.Patch );
                    expect( c.request.headers.get( 'Content-Type' ) ).toEqual( 'application/json' );
                    c.mockRespond( new Response( new ResponseOptions( { status: 200, body: "Success Patch " + name }) ) );
                }
            });
            expect( helloService ).toBeDefined();
            spyOn( helloService, 'greetpatch' ).and.callThrough();
            helloService.greetpatch( name, pwd ).subscribe( data => {
                response = data;
            },
                err => {
                    expect( err ).toBeDefined();
                    expect( err.status ).toEqual( 404 );
                });
            tick();
            expect( helloService.greetpatch ).toHaveBeenCalled();
            expect( response ).toBeDefined();
            expect( response ).toBe( "Success Patch " + name );

        }) )
    );


});


let io = require( 'socket.io-client' )
// , assert = require('assert')




describe( 'Suite of Socket tests', function() {

    let socket;

    beforeEach( function( done ) {
        // Setup
        socket = io.connect( 'http://localhost:3001', {
            'reconnection delay': 0
            , 'reopen delay': 0
            , 'force new connection': true
        });
        socket.on( 'connect', function() {
            console.log( 'worked...' );
            done();
        });
        socket.on( 'disconnect', function() {
            console.log( 'disconnected...' );
        })
    });

    afterEach( function( done ) {
        // Cleanup
        if ( socket.connected ) {
            console.log( 'disconnecting...' );
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log( 'no connection to break...' );
        }
        done();
    });



});
