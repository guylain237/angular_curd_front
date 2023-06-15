import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-bar-alert',
  templateUrl: './snack-bar-alert.component.html',
  styleUrls: ['./snack-bar-alert.component.scss']
})
export class SnackBarAlertComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public  message : string
  ) { }

  ngOnInit(): void {
  }

}
