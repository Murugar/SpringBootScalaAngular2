import { Http } from '@angular/http';
import { Poll } from './poll.domain';
import { PollChoice } from './poll.choice.domain';
export declare class PollComponent {
    http: Http;
    poll: Poll;
    stompClient: any;
    selectedChoice: PollChoice;
    stompSelectChoiceCallback: (message: any) => void;
    constructor(http: Http);
    ngOnInit(): void;
    selectChoice(pollChoice: PollChoice): void;
    submitPoll(): void;
}
