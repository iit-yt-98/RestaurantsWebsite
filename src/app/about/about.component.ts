import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  leaders:Leader[];

  constructor(private leaderService:LeaderService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.leaders = this.leaderService.getLeader();
  }
  

}
