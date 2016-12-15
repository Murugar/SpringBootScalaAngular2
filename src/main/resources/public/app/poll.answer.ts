import { PollChoice } from './poll.choice.domain';
import { Poll } from './poll.domain';

export class PollAnswer {
    id: number;
    user: String;
    pollChoice: PollChoice; //the question that was selected
}