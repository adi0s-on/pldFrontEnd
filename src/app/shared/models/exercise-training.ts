import {Exercise} from './exercise';
import {ExerciseDetails} from './exercise-details';
import {TrainingUnit} from './training-unit';

export class ExerciseTraining {
  Id: string;
  TrainingUnitId: TrainingUnit;
  Exercise: Exercise;
  ExerciseDetails: ExerciseDetails
}
