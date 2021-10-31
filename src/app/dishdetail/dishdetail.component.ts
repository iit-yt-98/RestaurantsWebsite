import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Rating } from '../shared/rating';





@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  ratingForm:FormGroup;
  rating : Rating;
  @ViewChild('fform') ratingFormDirective;


  formError ={
    'name':'',
    'comments' : ''
  };


  validationMessages = {
    'name':{
      'required':'Name is required.'
    },
    'comment':{
      'required':'Your comments are required.'
    }
  };


  
  dish : Dish;
  dishIds: string[];
  prev: string;
  next: string;

  constructor(private dishService: DishService ,
    private route: ActivatedRoute,
    private location: Location , private rt:FormBuilder) {
      this.createForm();
     }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    //this.dish = this.dishService.getDish(id);
    this.dishService.getDishIds().subscribe( dishIds => this.dishIds = dishIds);
  }
  goBack(): void{
    this.location.back();
  }
  


  createForm(){
    this.ratingForm = this.rt.group({
      name:['',[Validators.required]],
      comment:['',[Validators.required]]
    });

    this.ratingForm.valueChanges.subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
  }


  onValueChanged(data ? : any){
    if(!this.ratingForm){
      return;
    }
    const form = this.ratingForm;
    for(const field in this.formError){
      if(this.formError.hasOwnProperty(field)){
        this.formError[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formError[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    this.rating = this.ratingForm.value;
    console.log(this.rating);
    this.ratingForm.reset({
      name: '',
      comment: ''
    });

    this.ratingFormDirective.resetForm();
  }


  setPrevNext(dishId: string){
    const index =  this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[ (this.dishIds.length + index -1) % this.dishIds.length];
    this.next = this.dishIds[ (this.dishIds.length + index +1) % this.dishIds.length];
  }

}
