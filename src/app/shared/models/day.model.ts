import { from } from 'rxjs';
import { Dream } from './dream';
import {TrainingUnit} from './training-unit';

export class Day{
    Id: string;
    DiaryId: string;
    Date: string;
    Dream: Dream;
    TrainingUnits: TrainingUnit[];
}
