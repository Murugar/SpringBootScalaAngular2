import { Http } from '@angular/http';
import { Poll } from './poll.domain';
export declare class PollListComponent {
    http: Http;
    polls: Poll[];
    currentPoll: Poll;
    stompClient: any;
    stompPollCallback: (message: any) => void;
    stompSelectPollCallback: (message: any) => void;
    constructor(http: Http);
    ngOnInit(): void;
    /**
     * Connect to SpringBoot Websocket
     */
    connect(): void;
    showPoll(poll: Poll): void;
}
