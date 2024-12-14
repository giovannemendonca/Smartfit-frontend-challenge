import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {GetUnitsService} from "../../services/get-units.service";
import {Location} from "../../types/location.interface";
import {FilterUnitsService} from "../../services/filter-units.service";


@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})

export class FormsComponent implements OnInit {

  @Output() submitEnvent = new EventEmitter();

  results: Location[] = [];
  filteredResult: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private unitService: GetUnitsService,
              private filterUnitsService: FilterUnitsService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })

    this.unitService.getAllUnits().subscribe(data => {
        this.results = data;
        this.filteredResult = data;
      }
    )

  }

  onSubmit(): void {
    let {showClosed, hour} = this.formGroup.value;
    this.filteredResult = this.filterUnitsService.filter(this.results, showClosed, hour)
    this.unitService.setFilteredUnits(this.filteredResult)

    this.submitEnvent.emit()
  }

  onClear(): void {
    this.formGroup.reset()
  }

}
