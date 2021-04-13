import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user.model';
import {ExerciseService} from '../../shared/services/exercise.service';
import {Exercise} from '../../shared/models/exercise';
import {ExerciseDetails} from '../../shared/models/exercise-details';
import {ExerciseEquipment} from '../../shared/models/exercise-equipment';
import {ModalType} from 'src/app/shared/utils/modal-type.enum'
import {Diaries} from '../../shared/models/diaries.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  user: User;

  exercises: Exercise[] = [];
  exerciseDetails: ExerciseDetails[] = [];
  exerciseEquipments: ExerciseEquipment[] = [];

  modalToDisplay = false;

  ModalType = ModalType;

  operationType: ModalType;

  constructor(private _exerciseService: ExerciseService) {
    this._exerciseService.exercises$.subscribe((res: Exercise[]) => {
      this.exercises = res;
    });

    this._exerciseService.exerciseDetails$.subscribe((res: ExerciseDetails[]) => {
      this.exerciseDetails = res
    });

    this._exerciseService.exerciseEquipment$.subscribe((res: ExerciseEquipment[]) => {
      this.exerciseEquipments = res
    })
  }

  ngOnInit(): void {
    this._exerciseService.getAllExercises().then();
    this._exerciseService.getAllExerciseDetails().then();
    this._exerciseService.getAllExerciseEquipments().then();
  }

  toggleModal(operationType: ModalType, diary?: Diaries): void {
    this.operationType = operationType;
    // this._diaryService.setCurrentDiary(diary);
    this.modalToDisplay = true;
  }

}
