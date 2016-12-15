import {Component,Input} from '@angular/core';
import {Http,Headers} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Poll } from './poll.domain';
import { PollChoice } from './poll.choice.domain';

export var module: {
    id: string;
 };


@Component({
   // moduleId: module.id,    
    selector: 'poll-form',
    template: `<div class="panel panel-primary">
        <div class="panel-heading">
<h3 class="panel-title">
    {{ poll.name }}
</h3>
</div>

<div class="panel-body">
<div class="radio" *ngFor="let choice of poll.choices">
    <label>
        <input type="radio" name="optradio" [checked]="selectedChoice && choice.id == selectedChoice.id" 
            value="{{ choice.id }}" (click)="selectChoice(choice)">{{ choice.choice }}
    </label>
</div>

<div class="form-group">
    <button class="btn btn-primary" (click)="submitPoll()">Submit Poll</button>
</div>

</div> <!-- End of panel body -->
</div>` 
        
})

export class PollComponent {
    @Input() poll : Poll;
    @Input() stompClient;
    selectedChoice : PollChoice;
    
    stompSelectChoiceCallback = (message) => {
        this.selectedChoice = JSON.parse(message.body);
    };

    constructor(public http: Http) {
    }
    
    ngOnInit() {
        //subscribe to the websocket
        this.stompClient.subscribe('/queue/selectChoice', this.stompSelectChoiceCallback);
    }
    
    selectChoice(pollChoice : PollChoice) {
        this.stompClient.send('/websocket/selectChoice',{},JSON.stringify(pollChoice));
    }
    
    submitPoll() {
        var headers : Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        console.log('Poll Submit');
        
        console.log(JSON.stringify(this.selectedChoice));
        
        this.http.post("/api/poll/"+this.poll.id+"/submit",JSON.stringify(this.selectedChoice),{"headers": headers})
        .subscribe(
            res => {
                let data = res.json();
            }
        );    
    }
}