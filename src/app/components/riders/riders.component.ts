import { Component, OnInit } from '@angular/core';
import { RidersService } from 'src/app/_services/riders/riders.service';
import { Constants } from 'src/app/constants';


@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.css']
})
export class RidersComponent implements OnInit {
 riders: [];

  constructor(private riderService: RidersService, private constants: Constants) { }

  riderUrl = this.constants.RIDERS_ROUTE;
  ngOnInit() {
    this.getRiders();
  }

  getRiders() {
    this.riderService.getRiders()
    .subscribe( data => {
        this.riders = data.items;
    });
  }
}
