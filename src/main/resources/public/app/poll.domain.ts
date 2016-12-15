import { PollChoice } from './poll.choice.domain';

export class Poll {
    id: number;
    name: String;
    choices : PollChoice[];
}

export class PollStats {
    id: number;
    name: String;
    choices : PollChoice[];
}