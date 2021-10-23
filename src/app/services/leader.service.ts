import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  
  getLeader(): Leader[]{
    return LEADERS;
  }
  getDet(abbr:string) : Leader{
    return LEADERS.filter( (lead) => (lead.abbr === abbr))[0];
  }
}
