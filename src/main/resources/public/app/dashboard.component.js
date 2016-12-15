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
var DashboardComponent = (function () {
    function DashboardComponent(http) {
        var _this = this;
        this.http = http;
        this.formatChartData = function (stats) {
            //we need to reformat the data a bit to use in pie chart
            for (var i = 0; i < stats.length; i++) {
                var stat = _this.stats[i];
                stat.data = [];
                for (var j = 0; j < stat.choices.length; j++) {
                    var choice = stat.choices[j];
                    stat.data.push({
                        "key": choice.choice,
                        "y": choice.totalVote
                    });
                }
            }
            console.log(stats);
        };
        this.stompAnswerSubmittedCallback = function (message) {
            _this.stats = JSON.parse(message.body);
            _this.formatChartData(_this.stats);
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = {
            "chart": {
                type: 'pieChart',
                height: 500,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                },
            }
        };
        this.http.get("/api/poll/stats").subscribe(function (res) {
            _this.stats = res.json();
            _this.formatChartData(_this.stats);
        });
        //subscribe to the websocket
        this.connect();
    };
    /**
     * Connect to SpringBoot Websocket
     */
    DashboardComponent.prototype.connect = function () {
        var _this = this;
        var socket = new SockJS('/message');
        this.stompClient = Stomp.over(socket);
        var stompConnect = function (frame) {
            //subscribe to /user/queue/polls if you only want messages for the current user
            _this.stompClient.subscribe('/queue/answerSubmitted', _this.stompAnswerSubmittedCallback);
        };
        this.stompClient.connect({}, stompConnect);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        template: "<h2>Realtime</h2>\n<div class=\"row\">\n    <div class=\"col-md-4\" *ngFor=\"let stat of stats\">\n        <h3>{{ stat.name }}</h3>\n        <nvd3 [options]=\"options\" [data]=\"stat.data\"></nvd3>\n        \n        <h4>Number of Votes: {{ stat.totalVote}}</h4>\n    </div>\n</div>" //,
    }),
    __metadata("design:paramtypes", [http_1.Http])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map