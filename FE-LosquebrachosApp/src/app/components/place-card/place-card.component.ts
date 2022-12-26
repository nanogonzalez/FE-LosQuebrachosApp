import { Component, Input, OnInit } from '@angular/core';
import { PlaceSearchResult } from '../place-autocomplete/place-autocomplete.component';


@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {

  @Input() data: PlaceSearchResult | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
