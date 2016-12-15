import {Component,Input, NgModule} from '@angular/core';
import {Http} from '@angular/http';
import { Poll } from './poll.domain';
import { PollComponent } from './poll.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';



declare var SockJS;
declare var Stomp;

@Component({
    template: `<ul class="list-group">
    <a href="javascript:void(0)" [ngClass]="{'active': currentPoll && poll.id == currentPoll.id}"
        *ngFor="let poll of polls" class="list-group-item"  (click)="showPoll(poll)">
        {{ poll.name }}
    </a>
</ul>
<poll-form *ngIf="currentPoll" [poll]="currentPoll" [stompClient]="stompClient"></poll-form>`,
    entryComponents:[PollComponent]
})
export class PollListComponent {
    polls: Poll[];
    currentPoll: Poll = null;
    stompClient : any;
    


    stompPollCallback = (message) => {
        this.polls = JSON.parse(message.body);
    };
    
    stompSelectPollCallback = (message) => {
        this.currentPoll = JSON.parse(message.body);
    };

    constructor(public http: Http) {      
        
    }
    
    ngOnInit() {
     
    
        this.http.get("/api/poll").subscribe(
            res => {
                let data = res.json();
                this.polls = data;
                console.log("Polls ")
                console.log(data)
            },
            err => {
            }
        );
        
        //subscribe to the websocket
        this.connect();
    }
    
    /**
     * Connect to SpringBoot Websocket
     */
    connect() {
        let socket : any = new SockJS('/message');
        this.stompClient = Stomp.over(socket);
        let stompConnect = (frame) => {
            let whoami : any = frame.headers['user-name'];
            //subscribe to /user/queue/polls if you only want messages for the current user
            this.stompClient.subscribe('/queue/polls', this.stompPollCallback);
            this.stompClient.subscribe('/queue/selectPoll', this.stompSelectPollCallback);
        }
        
        this.stompClient.connect({}, stompConnect);
    }
    
    showPoll(poll : Poll) {
        //this.currentPoll = poll;
        console.log("Poll List " + JSON.stringify(poll))
        this.stompClient.send('/websocket/selectPoll',{},JSON.stringify(poll));
    }
}