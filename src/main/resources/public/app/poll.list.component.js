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
var poll_component_1 = require("./poll.component");
var PollListComponent = (function () {
    function PollListComponent(http) {
        var _this = this;
        this.http = http;
        this.currentPoll = null;
        this.stompPollCallback = function (message) {
            _this.polls = JSON.parse(message.body);
        };
        this.stompSelectPollCallback = function (message) {
            _this.currentPoll = JSON.parse(message.body);
        };
    }
    PollListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get("/api/poll").subscribe(function (res) {
            var data = res.json();
            _this.polls = data;
            console.log("Polls ");
            console.log(data);
        }, function (err) {
        });
        //subscribe to the websocket
        this.connect();
    };
    /**
     * Connect to SpringBoot Websocket
     */
    PollListComponent.prototype.connect = function () {
        var _this = this;
        var socket = new SockJS('/message');
        this.stompClient = Stomp.over(socket);
        var stompConnect = function (frame) {
            var whoami = frame.headers['user-name'];
            //subscribe to /user/queue/polls if you only want messages for the current user
            _this.stompClient.subscribe('/queue/polls', _this.stompPollCallback);
            _this.stompClient.subscribe('/queue/selectPoll', _this.stompSelectPollCallback);
        };
        this.stompClient.connect({}, stompConnect);
    };
    PollListComponent.prototype.showPoll = function (poll) {
        //this.currentPoll = poll;
        console.log("Poll List " + JSON.stringify(poll));
        this.stompClient.send('/websocket/selectPoll', {}, JSON.stringify(poll));
    };
    return PollListComponent;
}());
PollListComponent = __decorate([
    core_1.Component({
        template: "<ul class=\"list-group\">\n    <a href=\"javascript:void(0)\" [ngClass]=\"{'active': currentPoll && poll.id == currentPoll.id}\"\n        *ngFor=\"let poll of polls\" class=\"list-group-item\"  (click)=\"showPoll(poll)\">\n        {{ poll.name }}\n    </a>\n</ul>\n<poll-form *ngIf=\"currentPoll\" [poll]=\"currentPoll\" [stompClient]=\"stompClient\"></poll-form>",
        entryComponents: [poll_component_1.PollComponent]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], PollListComponent);
exports.PollListComponent = PollListComponent;
//# sourceMappingURL=poll.list.component.js.map