import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RidersService } from 'src/app/_services/riders/riders.service';

@Component({
  selector: 'app-rider-details',
  templateUrl: './rider-details.component.html',
  styleUrls: ['./rider-details.component.css']
})
export class RiderDetailsComponent implements OnInit {
  id: number;
  data: any;
  rider: any;

  constructor(private route: ActivatedRoute,
              private riderService: RidersService,
              ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const key = 'id';
      this.id = params[key];
      this.getRiderById();
  });
}

getRiderById() {
  this.riderService.getRiderId(this.id)
    .subscribe( res => {
      this.data = res;
      this.rider = this.data.data;
    });
}

}

