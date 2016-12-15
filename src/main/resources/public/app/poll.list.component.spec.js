"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var poll_list_component_1 = require("./poll.list.component");
var poll_component_1 = require("./poll.component");
var poll_domain_1 = require("./poll.domain");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_3 = require("@angular/http/testing");
require("rxjs/add/operator/map");
var MockError = (function (_super) {
    __extends(MockError, _super);
    function MockError() {
        return _super.apply(this, arguments) || this;
    }
    return MockError;
}(http_1.Response));
exports.MockError = MockError;
var HelloService = (function () {
    function HelloService(http) {
        this.http = http;
    }
    HelloService.prototype.greet = function (name) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', 'secret');
        headers.append('uname', 'test');
        headers.append('pwd', 'test');
        return this.http
            .get("/api/hello?name=" + name, { headers: headers })
            .map(function (res) {
            return res.json();
        });
    };
    return HelloService;
}());
HelloService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HelloService);
exports.HelloService = HelloService;
var PollService = (function () {
    function PollService(http) {
        this.http = http;
    }
    PollService.prototype.greet = function (name) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .get("/api/polls?name=" + name, { headers: headers })
            .map(function (res) {
            return res.text();
        });
    };
    PollService.prototype.greetpost = function (name, pwd) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post("/api/polls", JSON.stringify({ uname: name, pword: pwd }), { headers: headers })
            .map(function (res) {
            return res.text();
        });
    };
    PollService.prototype.greetput = function (name, pwd) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put("/api/polls", JSON.stringify({ uname: name, pword: pwd }), { headers: headers })
            .map(function (res) {
            return res.text();
        });
    };
    PollService.prototype.greetdelete = function (name, pwd) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.
            delete("/api/polls/1", { headers: headers })
            .map(function (res) {
            return res.text();
        });
    };
    PollService.prototype.greetpatch = function (name, pwd) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .patch("/api/polls", JSON.stringify({ uname: name, pword: pwd }), { headers: headers })
            .map(function (res) {
            return res.text();
        });
    };
    return PollService;
}());
PollService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PollService);
exports.PollService = PollService;
var fetchMock = require('fetch-mock');
fetchMock.get('*', { hello: 'world' });
var payload = {
    "never": "Hello World",
    "gonna": true,
    "give": 123,
    "you": ["up"]
};
var server = sinon.fakeServer.create();
//myResults = [1, 2, 3];
var WsServerMock = require('ws-mock').WsServer;
var SocketMock = require('socket-io-mock'), should = require('chai').should(), eventPayload = payload, socket, roomKey = 'room';
var StompServerMock = require('./server.mock.js').StompServerMock;
describe("SinonFakeServerWithJasmine", function () {
    var server;
    var assert = require('chai').assert;
    beforeEach(function () {
        server = sinon.fakeServer.create();
    });
    afterEach(function () {
        server.restore();
    });
    it("should fake a request", function () {
        server.respondWith("GET", "/api/polls", [200, { "Content-Type": "application/json" },
            '{ "stuff": "is", "awesome": "in here" }']);
    });
    it("should spy and callFake WebSocket constructor, and stub prototype methods", function (done) {
        var realWS = WebSocket;
        var sendSpy = spyOn(WebSocket.prototype, "send").and.callFake(function (outMsg) {
            if (outMsg == "outgoing message") {
                this.onmessage("incoming mocked message goes here");
            }
            if (outMsg == "another outgoing message") {
                this.onmessage("another incoming mocked message goes here");
            }
        });
        var WSSpy = spyOn(window, "WebSocket").and.callFake(function (url, protocols) {
            return new realWS(url, protocols);
        });
        var onmessageCallbackSpy = jasmine.createSpy('onmessageCallback');
        var ws = new WebSocket("ws://localhost:9000/message");
        ws.onmessage = onmessageCallbackSpy;
        ws.send("outgoing message");
        ws.send("another outgoing message");
        expect(WSSpy).toHaveBeenCalledWith("ws://localhost:9000/message");
        expect(onmessageCallbackSpy).toHaveBeenCalledWith("incoming mocked message goes here");
        expect(onmessageCallbackSpy).toHaveBeenCalledWith("another incoming mocked message goes here");
        done();
    });
    it('should echo', function () {
        var ws = {
            send: function (msg) {
                this.onmessage({ data: msg });
            },
            onmessage: function (e) {
                // stub
            }
        };
        var spy = sinon.spy(ws, 'onmessage');
        ws.send('this is a test');
        ws.send('this is a test1');
        assert(spy.args[0][0].data, 'this is a test');
    });
    it('Should Stomp Frame', function () {
        var out = Stomp.Frame.marshall("CONNECT", { login: 'jmesnil', passcode: 'wombats' }, function () {
            var message = "Hello world!";
        });
        var out1 = Stomp.Frame.marshall("SEND", { destination: '/queue/test' }, "hello, world!");
        var out2 = Stomp.Frame.marshall("SEND", { destination: '/queue/test', 'content-length': false }, "hello, world!");
        var data = "CONNECTED\nsession-id: 1234\n\n\0";
        var frame = Stomp.Frame.unmarshall(data).frames[0];
    });
    it('Should Stomp Connect', function (done) {
        Stomp.WebSocketClass = StompServerMock;
        var wsss = new StompServerMock("http://localhost:9001/stomp/server");
        var client = Stomp.over(wsss);
        var connected = false;
        var messages = [];
        client.connect("guest", "guest", function () {
            var message = "Hello Fucking world!";
            client.send("/queue/test", {}, message);
            return connected = true;
        });
        setTimeout(function () {
            if (connected) {
                console.log('Connected...........');
                messages.push('test1');
                messages.push('test1');
                expect(connected).toBe(true);
                expect(messages.length).toEqual(2);
                expect(client.ws.messages.length).toEqual(1);
                expect(client.ws.messages.pop().toString()).toContain('Hello Fucking world!');
                done();
            }
        }, 1000);
    });
    it("lets you send messages in a transaction", function (done) {
        var client, connected;
        Stomp.WebSocketClass = StompServerMock;
        var wsss = new StompServerMock("http://localhost:9001/stomp/server");
        client = Stomp.over(wsss);
        connected = false;
        client.connect("guest", "guest", function () {
            return connected = true;
        });
        setTimeout(function () {
            if (connected) {
                var txid = void 0;
                txid = "123";
                client.begin(txid);
                client.send("/queue/test", {
                    transaction: txid
                }, "messages 1");
                client.send("/queue/test", {
                    transaction: txid
                }, "messages 2");
                expect(client.ws.messages.length).toEqual(0);
                client.send("/queue/test", {
                    transaction: txid
                }, "messages 3");
                client.commit(txid);
                expect(client.ws.messages.length).toEqual(3);
                console.log('Transactions Done...........');
                done();
            }
        }, 1000);
    });
    it("lets you abort a transaction", function (done) {
        var client, connected;
        Stomp.WebSocketClass = StompServerMock;
        var wsss = new StompServerMock("http://localhost:9001/stomp/server");
        client = Stomp.over(wsss);
        connected = false;
        client.connect("guest", "guest", function () {
            return connected = true;
        });
        setTimeout(function () {
            if (connected) {
                var txid = void 0;
                txid = "123";
                client.begin(txid);
                client.send("/queue/test", {
                    transaction: txid
                }, "messages 1");
                client.send("/queue/test", {
                    transaction: txid
                }, "messages 2");
                expect(client.ws.messages.length).toEqual(0);
                client.send("/queue/test", {
                    transaction: txid
                }, "messages 3");
                client.abort(txid);
                expect(client.ws.messages.length).toEqual(0);
                console.log('Transactions Abort Done...........');
                done();
            }
        }, 1000);
    });
    it('Should Stomp Subscribe', function (done) {
        var client, subscription, unsubscribed;
        Stomp.WebSocketClass = StompServerMock;
        //let wsss = new StompServerMock("http://localhost:9001/stomp/server");
        client = Stomp.client("http://localhost:9001/stomp/server");
        unsubscribed = false;
        var messages = [];
        client.connect("guest", "guest", function () {
            return subscription = client.subscribe("/queue/test1", function (msg) {
                return messages.push(msg);
            });
        });
        setTimeout(function () {
            if (!unsubscribed) {
                console.log('Subscribed...........');
                console.log('Subscriptions...........' + client.ws.subscriptions);
                expect(Object.keys(client.ws.subscriptions)).toContain(subscription.id);
                client.ws.test_send(subscription.id, Math.random());
                client.ws.test_send(subscription.id, Math.random());
                expect(messages.length).toEqual(2);
                subscription.unsubscribe();
                try {
                    client.ws.test_send('shit', Math.random());
                }
                catch (err) {
                    null;
                }
                expect(messages.length).toEqual(2);
                done();
            }
        }, 1000);
    });
});
describe('Fast and isolated socket tests', function () {
    beforeEach(function (done) {
        socket = new SocketMock();
        done();
    });
    it('Sockets should be able to talk to each other without a server', function (done) {
        socket.on('message', function (message) {
            message.should.be.equal('Hello World!');
            done();
        });
        socket.socketClient.emit('message', 'Hello World!');
    });
    it('Sockets should be able to talk to each other without a server', function (done) {
        socket.on("test", function (payload) {
            payload.should.have.property('never');
            payload.should.have.property('gonna');
            payload.should.have.property('give');
            payload.should.have.property('you');
            payload.never.should.be.equal(eventPayload.never);
            payload.gonna.should.be.equal(eventPayload.gonna);
            payload.give.should.be.equal(eventPayload.give);
            payload.you[0].should.be.equal(eventPayload.you[0]);
            done();
        });
        socket.socketClient.emit("test", eventPayload);
    });
    it('should fire event on the client side when on() is assigned', function (done) {
        socket.socketClient.on("test", function (payload) {
            payload.should.have.property('never');
            payload.should.have.property('gonna');
            payload.should.have.property('give');
            payload.should.have.property('you');
            payload.never.should.be.equal(eventPayload.never);
            payload.gonna.should.be.equal(eventPayload.gonna);
            payload.give.should.be.equal(eventPayload.give);
            payload.you[0].should.be.equal(eventPayload.you[0]);
            done();
        });
        socket.emit("test", eventPayload);
    });
    it('Should add a room to `joinedRooms` when join() is called', function (done) {
        socket.join(roomKey);
        socket.joinedRooms[0].should.be.equal(roomKey);
        done();
    });
    it('Should remove a room in `joinedRooms` when leave() is called', function (done) {
        socket.join(roomKey);
        socket.joinedRooms[0].should.be.equal(roomKey);
        socket.leave(roomKey);
        socket.joinedRooms.should.have.length(0);
        done();
    });
    it('Should fire `onEmit()` callback when a event is fired in the room', function (done) {
        socket.join(roomKey);
        var eventPayload = {
            "test": "123"
        };
        socket.onEmit('test', function (payload, roomEvent) {
            roomEvent.should.be.equal(roomKey);
            payload.should.have.property("test");
            payload.test.should.be.equal("123");
            done();
        });
        socket.broadcast.to(roomKey).emit('test', eventPayload);
    });
});
//let io = require( 'socket.io-client' )
//, assert = require('assert')
describe('PollListComponent', function () {
    var de;
    var testCmpDebugElement;
    var comp;
    var fixture;
    var socket;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                http_1.HttpModule
            ],
            declarations: [poll_list_component_1.PollListComponent,
                poll_component_1.PollComponent],
            providers: [
                http_1.BaseRequestOptions,
                testing_3.MockBackend,
                {
                    provide: http_1.Http,
                    useFactory: function (backendInstance, defaultOptions) {
                        return new http_1.Http(backendInstance, defaultOptions);
                    },
                    deps: [testing_3.MockBackend, http_1.BaseRequestOptions]
                }
            ]
        })
            .compileComponents();
    }));
    var backend = null;
    beforeEach(testing_2.inject([testing_3.MockBackend], function (mockBackend) {
        backend = mockBackend;
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(poll_list_component_1.PollListComponent);
        comp = fixture.componentInstance;
        testCmpDebugElement = fixture.debugElement;
        de = fixture.debugElement.query(platform_browser_1.By.css('ul'));
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('Mock Http Requests', function () {
        backend.connections.subscribe(function (connection) {
            if (connection.request.url.endsWith('/api/polls')
                && connection.request.method === http_1.RequestMethod.Get) {
                var options = new http_1.ResponseOptions({
                    body: JSON.stringify({ status: 200, body: { test: 'fake get all polls response', msg: 'success', success: true } })
                });
                var res = new http_1.Response(options);
                connection.mockRespond(res);
            }
            else if (connection.request.url.endsWith('/api/poll/stats')
                && connection.request.method === http_1.RequestMethod.Get) {
                var options = new http_1.ResponseOptions({
                    body: JSON.stringify({ status: 200, body: { test: 'fake get poll stats response', msg: 'success', success: true } })
                });
                var res = new http_1.Response(options);
                connection.mockRespond(res);
            }
            else if (connection.request.url.endsWith('/api/poll/1/submit')
                && connection.request.method === http_1.RequestMethod.Post) {
                var bad = JSON.parse(connection.request.getBody());
                var options = new http_1.ResponseOptions({
                    body: JSON.stringify({ status: 200, body: { test: 'fake post response', msg: 'success', success: true } })
                });
                var res = new http_1.Response(options);
                connection.mockRespond(res);
            }
            else if (connection.request.url.endsWith('/api/poll/1/submit')
                && connection.request.method === http_1.RequestMethod.Put) {
                var bad = JSON.parse(connection.request.getBody());
                var options = new http_1.ResponseOptions({
                    body: JSON.stringify({ status: 200, body: { test: 'fake put response', msg: 'success', success: true } })
                });
                var res = new http_1.Response(options);
                connection.mockRespond(res);
            }
            else if (connection.request.url.endsWith('/api/poll/1')
                && connection.request.method === http_1.RequestMethod.Delete) {
                var options = new http_1.ResponseOptions({
                    body: JSON.stringify({ status: 200, body: { test: 'fake delete response', msg: 'success', success: true } })
                });
                var res = new http_1.Response(options);
                connection.mockRespond(res);
            }
            else if (connection.request.url.endsWith('/api/poll/1/submit')
                && connection.request.method === http_1.RequestMethod.Patch) {
                var bad = JSON.parse(connection.request.getBody());
                var options = new http_1.ResponseOptions({
                    body: JSON.stringify({ status: 200, body: { test: 'fake patch response', msg: 'success', success: true } })
                });
                var res = new http_1.Response(options);
                connection.mockRespond(res);
            }
        });
    });
    it('can be shown', function (done) {
        var wsServer = new WsServerMock();
        var realWS = WebSocket;
        var sendSpy = spyOn(WebSocket.prototype, "send").and.callFake(function (outMsg) {
            if (outMsg == "outgoing message") {
                this.onmessage("incoming mocked message goes here");
            }
            if (outMsg == "another outgoing message") {
                this.onmessage("another incoming mocked message goes here");
            }
        });
        var WSSpy = spyOn(window, "WebSocket").and.callFake(function (url, protocols) {
            return new realWS(url, protocols);
        });
        var onmessageCallbackSpy = jasmine.createSpy('onmessageCallback');
        var ws = new WebSocket("ws://localhost:9000/message");
        ws.onmessage = onmessageCallbackSpy;
        ws.send("outgoing message");
        ws.send("another outgoing message");
        expect(WSSpy).toHaveBeenCalledWith("ws://localhost:9000/message");
        expect(onmessageCallbackSpy).toHaveBeenCalledWith("incoming mocked message goes here");
        expect(onmessageCallbackSpy).toHaveBeenCalledWith("another incoming mocked message goes here");
        var socket = new SockJS('ws://localhost:9000/message');
        var poll = new poll_domain_1.Poll();
        poll.id = 1;
        poll.name = 'test';
        wsServer.on('connection', function (ws) {
            console.log("new connection...");
            ws.on('message', function (msg) {
                console.log("incoming message:", msg);
            });
            ws.on('close', function () {
                console.log("connection closed...");
            });
        });
        var wsConn = wsServer.addConnection(); // "new connection..." 
        // send message that will be received by wsServer   
        wsConn.sendMsgToServer(JSON.stringify(poll)); // "incoming message: dummy message" 
        // close a ws connection 
        wsConn.closeConnection(); // "connection closed..." 
        // clear all current connections 
        wsServer.clearConnections();
        // let socket1 : any = new SockJS('/message');
        comp.stompClient = Stomp.over(ws);
        var stompConnect = function (frame) {
            var whoami = frame.headers['user-name'];
            //subscribe to /user/queue/polls if you only want messages for the current user
            //   comp.stompClient.subscribe('/queue/polls', comp.stompPollCallback);
            //   comp.stompClient.subscribe('/queue/selectPoll', comp.stompSelectPollCallback);
        };
        comp.stompClient.connect({}, stompConnect);
        comp.connect();
        // comp.ngOnInit();  
        spyOn(Stomp, 'over');
        spyOn(comp, 'connect');
        spyOn(comp.stompClient, 'connect');
        //  spyOn(comp,'ngOnInit') 
        ws.send(JSON.stringify(poll));
        //comp.stompClient.send
        // ('ws://localhost:9000/message',{},JSON.stringify(poll));
        //  expect( onmessageCallbackSpy ).
        // toHaveBeenCalledWith(Object({ id: 1, name: 'test' }));
        expect(de).toBeTruthy();
        done();
    });
    it('has methods', function () {
        var ws = {
            send: function (msg) {
                this.onmessage({ data: msg });
            },
            onmessage: function (e) {
                // stub
            }
        };
        //  let spy = sinon.spy(ws, 'onmessage');
        ws.send('this is a test');
        ws.send('this is a test1');
        var poll = new poll_domain_1.Poll();
        poll.id = 1;
        poll.name = 'test';
        comp.ngOnInit();
        spyOn(comp, 'connect');
        spyOn(comp, 'showPoll');
        spyOn(comp, 'stompPollCallback');
        spyOn(comp, 'stompSelectPollCallback');
        spyOn(comp, 'ngOnInit');
    });
});
describe('Fetch Mock Test', function () {
    var expect = require('chai').expect;
    beforeEach(function () {
        fetchMock.restore();
    });
    it('fetch mock1', function () {
        fetchMock.mock('/api/v1/new', {
            status: 200,
            body: { responseCode: 100 },
        });
    });
    it('fetch mock', function () {
        fetchMock.mock('/api/polls', {
            status: 200,
            body: { responseCode: 100 },
        });
    });
    it('create - success', function () {
        fetchMock.mock('^http://route1', 200);
        expect(function () {
            fetchMock.mock('^http://route2', 200);
        }).not.to.throw();
        //  fetch('http://route1.com')
        //   fetch('http://route2.com')
        expect(fetchMock.calls().matched.length).to.equal(0);
    });
});
describe('Http HelloService Tests', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    }, deps: [testing_3.MockBackend, http_1.BaseRequestOptions]
                },
                HelloService,
                testing_3.MockBackend,
                http_1.BaseRequestOptions
            ]
        });
    });
    it("call the greet url error", testing_2.inject([HelloService, testing_3.MockBackend], testing_2.fakeAsync(function (helloService, mockBackend) {
        var name = "Shit";
        var mockResponseBody = {
            title: 'title',
            content: 'Testing is a good thing',
            status: 200
        };
        var options = new http_1.ResponseOptions({
            body: { name: 'Jeff' },
            status: 200,
            statusText: 'good'
        });
        var body = JSON.stringify({ key: 'val' });
        var opts = { type: http_1.ResponseType.Error, status: 404, body: body, url: 'shit' };
        var responseOpts = new http_1.ResponseOptions(opts);
        mockBackend.connections.subscribe(function (c) {
            expect(c.request.url).toBe("/api/hello?name=" + name);
            expect(c.request.method).toEqual(http_1.RequestMethod.Get);
            c.mockError(new MockError(responseOpts));
            //c.mockRespond(new Response(new ResponseOptions
            // ({body: JSON.stringify(mockResponseBody), status: 200, statusText: 'Success', type : ResponseType.Basic})));
        });
        helloService.greet(name).subscribe(function (data) {
            expect(data).toEqual('dirtything');
            expect(data).toBeDefined();
            expect(data.content).toEqual('Testing is a good thing');
            expect(data.title).toEqual('title');
            expect(data.status).toEqual(404);
        }, function (err) {
            expect(err).toBeDefined();
            expect(err.status).toEqual(404);
            expect(err.url).toEqual('shit');
        });
        testing_1.tick();
        expect(options.body).toEqual(Object({ name: 'Jeff' }));
        expect(options.status).toEqual(200);
    })));
    it("call the greet url ", testing_2.inject([HelloService, testing_3.MockBackend], testing_2.fakeAsync(function (helloService, mockBackend) {
        var name = 'Shit';
        var mockResponseBody = {
            title: 'title',
            content: 'Testing is a good thing',
            status: 200
        };
        var options = new http_1.ResponseOptions({
            body: { name: 'Jeff' },
            status: 200,
            statusText: 'good'
        });
        var body = JSON.stringify({ msg: 'not found' });
        var opts = { type: http_1.ResponseType.Error, status: 404, body: body };
        var responseOpts = new http_1.ResponseOptions(opts);
        mockBackend.connections.subscribe(function (c) {
            if (c.request.headers.get('token') !== 'secret') {
                var body_1 = JSON.stringify({ msg: 'UnAuthorized' });
                var opts_1 = { type: http_1.ResponseType.Error, status: 401, body: body_1 };
                var responseOpts_1 = new http_1.ResponseOptions(opts_1);
                c.mockError(new MockError(responseOpts_1));
            }
            if (c.request.headers.get('uname') !== 'test') {
                var body_2 = JSON.stringify({ msg: 'UnAuthorized' });
                var opts_2 = { type: http_1.ResponseType.Error, status: 401, body: body_2 };
                var responseOpts_2 = new http_1.ResponseOptions(opts_2);
                c.mockError(new MockError(responseOpts_2));
            }
            if (c.request.headers.get('pwd') !== 'test') {
                var body_3 = JSON.stringify({ msg: 'UnAuthorized' });
                var opts_3 = { type: http_1.ResponseType.Error, status: 401, body: body_3 };
                var responseOpts_3 = new http_1.ResponseOptions(opts_3);
                c.mockError(new MockError(responseOpts_3));
            }
            if (name === undefined) {
                c.mockError(new MockError(responseOpts));
            }
            else {
                expect(c.request.url).toBe("/api/hello?name=" + name);
                expect(c.request.method).toEqual(http_1.RequestMethod.Get);
                c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: JSON.stringify(mockResponseBody), status: 200, statusText: 'Success', type: http_1.ResponseType.Basic })));
            }
        });
        helloService.greet(name).subscribe(function (data) {
            expect(data).toBeDefined();
            expect(data.content).toEqual('Testing is a good thing');
            expect(data.title).toEqual('title');
        }, function (err) {
            expect(err).toBeDefined();
            expect(err.status).toBeGreaterThan(400);
        });
        testing_1.tick();
        expect(options.body).toEqual(Object({ name: 'Jeff' }));
        expect(options.status).toEqual(200);
    })));
});
describe('Http Poll Service Tests', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    }, deps: [testing_3.MockBackend, http_1.BaseRequestOptions]
                },
                PollService,
                testing_3.MockBackend,
                http_1.BaseRequestOptions
            ]
        });
    });
    it("call the greet url", testing_2.inject([PollService, testing_3.MockBackend], testing_2.fakeAsync(function (pollService, mockBackend) {
        var name = "Shit";
        var response;
        expect(mockBackend).toBeDefined();
        mockBackend.connections.subscribe(function (c) {
            expect(c.request.url).toBe("/api/polls?name=" + name);
            expect(c.request.method).toEqual(http_1.RequestMethod.Get);
            expect(c.request.headers.get('Content-Type')).toEqual('application/json');
            c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: "Hello " + name })));
        });
        expect(pollService).toBeDefined();
        spyOn(pollService, 'greet').and.callThrough();
        pollService.greet(name).subscribe(function (data) {
            response = data;
        }, function (err) {
            expect(err).toBeDefined();
            expect(err.status).toEqual(404);
        });
        testing_1.tick();
        expect(pollService.greet).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response).toBe("Hello " + name);
    })));
    it("call the greet post url", testing_2.inject([PollService, testing_3.MockBackend], testing_2.fakeAsync(function (helloService, mockBackend) {
        var body = JSON.stringify({ msg: 'not found' });
        var opts = { type: http_1.ResponseType.Error, status: 404, body: body };
        var responseOpts = new http_1.ResponseOptions(opts);
        var name = "admin";
        var pwd = "secret";
        var response;
        expect(mockBackend).toBeDefined();
        mockBackend.connections.subscribe(function (c) {
            if (name === undefined) {
                c.mockError(new MockError(responseOpts));
            }
            else {
                expect(c.request.url).toBe("/api/polls");
                expect(c.request.method).toEqual(http_1.RequestMethod.Post);
                expect(c.request.headers.get('Content-Type')).toEqual('application/json');
                c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: "Success Posted " + name })));
            }
        });
        expect(helloService).toBeDefined();
        spyOn(helloService, 'greetpost').and.callThrough();
        helloService.greetpost(name, pwd).subscribe(function (data) {
            response = data;
        }, function (err) {
            expect(err).toBeDefined();
            expect(err.status).toEqual(404);
        });
        testing_1.tick();
        expect(helloService.greetpost).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response).toBe("Success Posted " + name);
    })));
    it("call the greet put url", testing_2.inject([PollService, testing_3.MockBackend], testing_2.fakeAsync(function (helloService, mockBackend) {
        var body = JSON.stringify({ msg: 'not found' });
        var opts = { type: http_1.ResponseType.Error, status: 404, body: body };
        var responseOpts = new http_1.ResponseOptions(opts);
        var name = "admin";
        var pwd = "secret";
        var response;
        expect(mockBackend).toBeDefined();
        mockBackend.connections.subscribe(function (c) {
            if (name === undefined) {
                c.mockError(new MockError(responseOpts));
            }
            else {
                expect(c.request.url).toBe("/api/polls");
                expect(c.request.method).toEqual(http_1.RequestMethod.Put);
                expect(c.request.headers.get('Content-Type')).toEqual('application/json');
                c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: "Success Update " + name })));
            }
        });
        expect(helloService).toBeDefined();
        spyOn(helloService, 'greetput').and.callThrough();
        helloService.greetput(name, pwd).subscribe(function (data) {
            response = data;
        }, function (err) {
            expect(err).toBeDefined();
            expect(err.status).toEqual(404);
        });
        testing_1.tick();
        expect(helloService.greetput).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response).toBe("Success Update " + name);
    })));
    it("call the greet delete url", testing_2.inject([PollService, testing_3.MockBackend], testing_2.fakeAsync(function (helloService, mockBackend) {
        var name = "admin";
        var pwd = "secret";
        var body = JSON.stringify({ msg: 'not found' });
        var opts = { type: http_1.ResponseType.Error, status: 404, body: body };
        var responseOpts = new http_1.ResponseOptions(opts);
        expect(mockBackend).toBeDefined();
        mockBackend.connections.subscribe(function (c) {
            if (name === undefined) {
                c.mockError(new MockError(responseOpts));
            }
            else {
                expect(c.request.url).toBe("/api/polls/1");
                expect(c.request.method).toEqual(http_1.RequestMethod.Delete);
                expect(c.request.headers.get('Content-Type')).toEqual('application/json');
                c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: 'Success Delete ' + name, status: 200 })));
            }
        });
        expect(helloService).toBeDefined();
        spyOn(helloService, 'greetdelete').and.callThrough();
        helloService.greetdelete(name, pwd).subscribe(function (res) {
            expect(res).toBeDefined();
            expect(res).toBe("Success Delete " + name);
        }, function (err) {
            expect(err).toBeDefined();
            expect(err.status).toEqual(404);
        });
        testing_1.tick();
        expect(helloService.greetdelete).toHaveBeenCalled();
    })));
    it("call the greet patch url", testing_2.inject([PollService, testing_3.MockBackend], testing_2.fakeAsync(function (helloService, mockBackend) {
        var name = "admin";
        var pwd = "secret";
        var response;
        var body = JSON.stringify({ msg: 'not found' });
        var opts = { type: http_1.ResponseType.Error, status: 404, body: body };
        var responseOpts = new http_1.ResponseOptions(opts);
        expect(mockBackend).toBeDefined();
        mockBackend.connections.subscribe(function (c) {
            if (name === undefined) {
                c.mockError(new MockError(responseOpts));
            }
            else {
                expect(c.request.url).toBe("/api/polls");
                expect(c.request.method).toEqual(http_1.RequestMethod.Patch);
                expect(c.request.headers.get('Content-Type')).toEqual('application/json');
                c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: "Success Patch " + name })));
            }
        });
        expect(helloService).toBeDefined();
        spyOn(helloService, 'greetpatch').and.callThrough();
        helloService.greetpatch(name, pwd).subscribe(function (data) {
            response = data;
        }, function (err) {
            expect(err).toBeDefined();
            expect(err.status).toEqual(404);
        });
        testing_1.tick();
        expect(helloService.greetpatch).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response).toBe("Success Patch " + name);
    })));
});
var io = require('socket.io-client');
// , assert = require('assert')
describe('Suite of Socket tests', function () {
    var socket;
    beforeEach(function (done) {
        // Setup
        socket = io.connect('http://localhost:3001', {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true
        });
        socket.on('connect', function () {
            console.log('worked...');
            done();
        });
        socket.on('disconnect', function () {
            console.log('disconnected...');
        });
    });
    afterEach(function (done) {
        // Cleanup
        if (socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        }
        else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });
});
//# sourceMappingURL=poll.list.component.spec.js.map