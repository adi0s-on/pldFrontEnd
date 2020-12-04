import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Diaries} from 'src/app/shared/models/diaries.model';
import {DiaryService} from 'src/app/shared/services/diary.service';
import {Day} from '../../../models/day.model';
import {DayService} from '../../../services/day.service';
import {Dream} from '../../../models/dream';
import {ExerciseService} from '../../../services/exercise.service';
import {Exercise} from '../../../models/exercise';
import {ExerciseDetails} from '../../../models/exercise-details';
import {TrainingService} from '../../../services/training.service';

@Component({
  selector: 'app-training-days',
  templateUrl: './training-days.component.html',
  styleUrls: ['./training-days.component.css']
})
export class TrainingDaysComponent implements OnInit {

  @Input() diary: Diaries;

  @Output() closeModal = new EventEmitter<boolean>();

  currentDay: Day;

  date: string;

  isAddingNewDay: boolean = false;
  isEdittingDay: boolean = false;
  isAddingDreamOrUnit: boolean = false;

  addingType: string;

  addDreamForm: FormGroup;
  Id: FormControl;
  Length: FormControl;
  Quality: FormControl;

  addTrainingUnit: FormGroup;
  ExerciseId: FormControl;
  ExerciseDetailsId: FormControl;

  exercises: Exercise[] = [];
  exerciseDetails: ExerciseDetails[] = [];

  constructor(private _dayService: DayService,
              private _diaryService: DiaryService,
              private _formBuilder: FormBuilder,
              private _exerciseService: ExerciseService,
              private _trainingService: TrainingService) {
    this._diaryService.currentDiary$.subscribe((res: Diaries) => {
      if (!res) {
        this.currentDay = null;
        this.isAddingNewDay = false;
        this.isEdittingDay = false;
        this.resetForm();
        this.date = '';
      }
    });

    this._dayService.currentDay$.subscribe((res: Day) => {
      this.currentDay = res;
      this.isEdittingDay = false;
      this.isAddingDreamOrUnit = false;
      this.resetForm();
    });

    this._exerciseService.exercises$.subscribe((_exercises: Exercise[]) => {
      this.exercises = _exercises
    });

    this._exerciseService.exerciseDetails$.subscribe((_exerciseDetails: ExerciseDetails[]) => {
      console.log(_exerciseDetails)
      if (_exerciseDetails) {
        _exerciseDetails.forEach((_ed) => {
          _ed.display = `C: ${_ed.Concetric}, CP: ${_ed.ConcetricPause}, E: ${_ed.Eccentric}, EP: ${_ed.EccentricPause}, S: ${_ed.Series}, R: ${_ed.Repeats}`;
        });
        this.exerciseDetails = _exerciseDetails;
      }
    })
  }

  ngOnInit(): void {
    this._exerciseService.getAllExercises().then();
    this._exerciseService.getAllExerciseDetails().then();
    this.buildForm();
  }

  buildForm(): void {
    this.createFormControls();
    this.createForm();
  }

  createForm(): void {
    if (this.addingType === 'dream') {
      this.addDreamForm = this._formBuilder.group({
        Id: this.Id,
        Quality: this.Quality,
        Length: this.Length
      })
    } else if (this.addingType === 'unit') {
      this.addTrainingUnit = this._formBuilder.group({
        ExerciseId: this.ExerciseId,
        ExerciseDetailsId: this.ExerciseDetailsId
      })
    } else {

    }
  }

  createFormControls(): void {
    if (this.addingType === 'dream') {
      this.Id = new FormControl('', []);
      this.Quality = new FormControl('', [Validators.required]);
      this.Length = new FormControl('', [Validators.required]);
    } else if (this.addingType === 'unit' ) {
      this.ExerciseId = new FormControl(null, [Validators.required]);
      this.ExerciseDetailsId = new FormControl(null, [Validators.required]);
    } else {

    }
  }

  setCurrentDay(day: Day) {
    if (day !== this.currentDay && day !== null) {
      this._dayService.currentDay.next(day);
    } else {
      this._dayService.currentDay.next(null);
      this.isEdittingDay = false;
      this.isAddingNewDay = false;
    }
  }

  toggleAddingNewDay(status: boolean): void {
    this.isAddingNewDay = status;
  }

  toggleEdittingDay(status: boolean): void {
    this.isEdittingDay = status;
  }

  toggleAddingDreamOrUnit(status: boolean, type?: string): void {
    this.isAddingDreamOrUnit = status;
    this.addingType = type;

    if (status) {
      this.buildForm();
    }
  }

  addNewDay(): void {
    this._dayService.createDay({Date: this.date, DiaryId: this.diary.Id}).then((response: Day) => {
      this.toggleAddingNewDay(false);
      this.date = '';
    })
  }

  addNewDream(value: any): void {
    value.Id = this.currentDay.Id;
    this._dayService.addDream(value).then((res: Dream) => {
      this.currentDay.Dream = res;
      this._dayService.currentDay.next(this.currentDay);
    });
  }

  addNewTrainingUnit(value: any): void {
    value.ExerciseId = value.ExerciseId.Id;
    value.ExerciseDetailsId = value.ExerciseDetailsId.Id;
    console.log(value)
    this._trainingService.createNewExerciseTraining(this.currentDay.Id, value);
  }

  resetForm(): void {
    if (this.addDreamForm) {
      this.addDreamForm.reset();
    }
  }
}
