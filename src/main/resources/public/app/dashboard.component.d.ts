import { Http } from '@angular/http';
import { PollStats } from './pollStats.domain';
export declare class DashboardComponent {
    http: Http;
    stompClient: any;
    stats: PollStats[];
    options: any;
    constructor(http: Http);
    formatChartData: (stats: any) => void;
    stompAnswerSubmittedCallback: (message: any) => void;
    ngOnInit(): void;
    /**
     * Connect to SpringBoot Websocket
     */
    connect(): void;
}
