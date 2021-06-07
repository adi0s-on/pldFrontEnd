import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TrainingService} from '../../../../services/training.service';
import {Exercise} from '../../../../models/exercise';
import {ExerciseDetails} from '../../../../models/exercise-details';
import {ExerciseService} from '../../../../services/exercise.service';

@Component({
  selector: 'app-td-add-exercise',
  templateUrl: './td-add-exercise.component.html',
  styleUrls: ['./td-add-exercise.component.scss']
})
export class TdAddExerciseComponent implements OnInit {

  @Output()
  closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  addingExercise: boolean = false;

  @Input() set trainingId(val: string) {
    this._trainingUnitId = val;
    this.createFormControls(val);
    this.createForm();
  }

  _trainingUnitId: string;

  addExerciseForm: FormGroup;

  TrainingUnitId: FormControl;
  ExerciseDetailsId: FormControl;
  ExerciseId: FormControl;

  exercises: Exercise[] = [];
  exerciseDetails: ExerciseDetails[] = [];

  constructor(private _formBuilder: FormBuilder,
              private trainingService: TrainingService,
              private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.createFormControls('');
    this.createForm();

    this.exerciseService.exercises$.subscribe((_exercises: Exercise[]) => {
      this.exercises = _exercises
    });

    this.exerciseService.exerciseDetails$.subscribe((_exerciseDetails: ExerciseDetails[]) => {
      if (_exerciseDetails) {
        _exerciseDetails.forEach((_ed) => {
          _ed.display = `C: ${_ed.Concetric}, CP: ${_ed.ConcetricPause}, E: ${_ed.Eccentric}, EP: ${_ed.EccentricPause}, S: ${_ed.Series}, R: ${_ed.Repeats}`;
        });
        this.exerciseDetails = _exerciseDetails;
      }
    })
  }

  createForm(): void {
    this.addExerciseForm = this._formBuilder.group({
      TrainingUnitId: this.TrainingUnitId,
      ExerciseDetailsId: this.ExerciseDetailsId,
      ExerciseId: this.ExerciseId
    });
  }

  createFormControls(trainingUnitIdVal: string): void {
    this.TrainingUnitId = new FormControl(trainingUnitIdVal, [Validators.required]);
    this.ExerciseDetailsId = new FormControl('', [Validators.required]);
    this.ExerciseId = new FormControl('', [Validators.required]);
  }

  submit(): void {
    this.trainingService.addExerciseToTrainingUnit(this.addExerciseForm.value).then(() => this.close());
  }

  close(): void {
    this.closed.emit(true);
    this.addingExercise = false;
  }
}
