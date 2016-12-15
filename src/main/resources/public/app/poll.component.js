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
var poll_domain_1 = require("./poll.domain");
var PollComponent = (function () {
    function PollComponent(http) {
        var _this = this;
        this.http = http;
        this.stompSelectChoiceCallback = function (message) {
            _this.selectedChoice = JSON.parse(message.body);
        };
    }
    PollComponent.prototype.ngOnInit = function () {
        //subscribe to the websocket
        this.stompClient.subscribe('/queue/selectChoice', this.stompSelectChoiceCallback);
    };
    PollComponent.prototype.selectChoice = function (pollChoice) {
        this.stompClient.send('/websocket/selectChoice', {}, JSON.stringify(pollChoice));
    };
    PollComponent.prototype.submitPoll = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log('Poll Submit');
        console.log(JSON.stringify(this.selectedChoice));
        this.http.post("/api/poll/" + this.poll.id + "/submit", JSON.stringify(this.selectedChoice), { "headers": headers })
            .subscribe(function (res) {
            var data = res.json();
        });
    };
    return PollComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", poll_domain_1.Poll)
], PollComponent.prototype, "poll", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PollComponent.prototype, "stompClient", void 0);
PollComponent = __decorate([
    core_1.Component({
        // moduleId: module.id,    
        selector: 'poll-form',
        template: "<div class=\"panel panel-primary\">\n        <div class=\"panel-heading\">\n<h3 class=\"panel-title\">\n    {{ poll.name }}\n</h3>\n</div>\n\n<div class=\"panel-body\">\n<div class=\"radio\" *ngFor=\"let choice of poll.choices\">\n    <label>\n        <input type=\"radio\" name=\"optradio\" [checked]=\"selectedChoice && choice.id == selectedChoice.id\" \n            value=\"{{ choice.id }}\" (click)=\"selectChoice(choice)\">{{ choice.choice }}\n    </label>\n</div>\n\n<div class=\"form-group\">\n    <button class=\"btn btn-primary\" (click)=\"submitPoll()\">Submit Poll</button>\n</div>\n\n</div> <!-- End of panel body -->\n</div>"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], PollComponent);
exports.PollComponent = PollComponent;
//# sourceMappingURL=poll.component.js.map