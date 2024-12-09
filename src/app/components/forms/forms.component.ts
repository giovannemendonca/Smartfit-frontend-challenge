import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {GetUnitsService} from "../../services/get-units.service";

import {Location} from "../../types/location.interface";

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

  results: Location[] = [];
  filteredResult: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })

    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations
      this.filteredResult = data.locations;
    });
  }

  onSubmit(): void {
    if (!this.formGroup.value.showClosed){
      this.filteredResult = this.results.filter(location => location.opened)
    }else {
      this.filteredResult = this.results
    }
  }

  onClear(): void {
    this.formGroup.reset()
  }

}
