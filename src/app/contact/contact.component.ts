import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder , FormGroup ,  Validators} from '@angular/forms';
import { Feedback, ContactType } from '../shared/feeedback';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formError= {
    'firstname' :'',
    'lastname':'',
    'telnum':'',
    'email':''
  };

  validationMessages = {
    'firstname': {
      'required':'First name is required.',
      'minlength':'First name must be at least 2 characters.',
      'maxlength':'First name must be less than 25 characters.'
    },
    'lastname': {
      'required':'Last name is required.',
      'minlength':'Last name must be at least 2 characters.',
      'maxlength':'Last name must be less than 25 characters.'
    },
    'telnum':{
      'required':'Tel. Number is required.',
      'pattern': 'Tel. Number must contain numbers.'
    },
    'email':{
      'required':'Email is required.',
      'email':'Email not in valid format.'
    }
  };

  constructor(private fb : FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
    firstname: ['', [Validators.required , Validators.minLength(2) , Validators.maxLength(25)]],
    lastname: ['', [Validators.required , Validators.minLength(2) , Validators.maxLength(25)]],
    telnum:[0, [Validators.required , Validators.pattern]],
    email:['', [Validators.required , Validators.email]],
    agree: false,
    contacttype:'None',
    message:''
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }


  onValueChanged(data? : any){
    if(!this.feedbackForm){
      return ;
    }

    const form = this.feedbackForm;
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
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum:0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackFormDirective.resetForm();
  }

}
