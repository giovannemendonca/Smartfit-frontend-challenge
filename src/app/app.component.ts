import {Component} from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {FormsComponent} from "./components/forms/forms.component";
import {BehaviorSubject} from "rxjs";
import {CardsListComponent} from "./components/cards-list/cards-list.component";
import {CommonModule, NgIf} from "@angular/common";
import {Location} from "./types/location.interface";
import {GetUnitsService} from "./services/get-units.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsComponent,
    CardsListComponent,
    NgIf,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  unitsList: Location[] = []
  showList = new BehaviorSubject(false)

  constructor(private unitService: GetUnitsService) {}

  onSubmit(){
    this.showList.next(true)
    this.unitsList = this.unitService.getFilteredUnits()
  }
}
