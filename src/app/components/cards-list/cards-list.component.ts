import {Component, Input, OnInit} from '@angular/core';

import {Location} from "../../types/location.interface"
import {CardComponent} from "../card/card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf
  ],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent implements OnInit {

  @Input() unitsList: Location[] = []

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.unitsList)
  }


}
