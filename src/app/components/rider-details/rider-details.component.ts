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
  rider: [];

  constructor(
              private route: ActivatedRoute,
              private riderService: RidersService,
              ) { }

  ngOnInit() {
    this.getRiderId();
    this.getRiderById();
 }

 getRiderId() {
  this.route.params.subscribe((params: { [x: string]: any; }) => {
    const key = 'id';
    this.id = params[key];
    // return this.id;
  });
}

getRiderById() {
  console.log(this.id);
  this.riderService.getRiderById(this.id)
    .subscribe( (res: any) => {
      this.data = res;
      this.rider = this.data.data;
      console.log(this.data);
    });
}

}

