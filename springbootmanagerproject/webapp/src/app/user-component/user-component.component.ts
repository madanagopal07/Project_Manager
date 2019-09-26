import { Component, OnInit } from '@angular/core';
import { UserService } from './user-component.service';
import { UserDetail } from './user';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css'],
  providers: [ UserService ]
})
export class UserComponentComponent implements OnInit {
smpls:string[];
inputtext=null;
sample=null
data:Array<UserDetail>=[];
newUser : UserDetail;
fetchedUser : UserDetail;
value: number = 100;
updaeId: number;

addEditButtonFlag:boolean=false;

  constructor(private sm: UserService) {
    this.newUser = new UserDetail();
    this.fetchedUser=new UserDetail();
    }

clickAction()
{
	this.sample=this.inputtext
}
getUser()
{
	this.sm.getUser().subscribe(response => {
    console.log(response);
    this.data =response;
    
  });
}

  ngOnInit() {
	  this.getUser();
  }
  addMore()
  {
    
    this.sm.addUser(this.newUser).subscribe(response => {
      console.log(response);
      console.log(this.data);
      this.data.push(response);
      console.log(this.data);
    });
	  
}

getUserByID(id: number)
{
this.sm.getUserById(id).subscribe(response => {
    console.log(response);
    this.fetchedUser =response;
	console.log('fetched user is');
	console.log(this.fetchedUser);
    
  });
}

editUserByID(id: number)
{
  this.addEditButtonFlag=true;
  this.updaeId=id;
this.getUserByID(id);
console.log(this.fetchedUser.employeeId);
this.newUser.employeeId=this.fetchedUser.employeeId;
this.newUser.firstName=this.fetchedUser.firstName;
this.newUser.lastName=this.fetchedUser.lastName;
console.log('after edit');
console.log(this.fetchedUser);
}

updateUser(updateUserInfo:UserDetail){
  
  updateUserInfo.userId=this.updaeId;
  this.sm.updateUser(updateUserInfo).subscribe(response => {
    this.data.push(response);
  });
  this.getUser();
}

deleteUserById(id: number)
{
  this.sm.deleteUserById(id).subscribe();
  this.getUser();
}

/*resetData()
{
this.newUser.employee_id='';
this.newUser.project_id='';
this.newUser.task_id='';
this.newUser.first_name='';
this.newUser.last_name='';
}
*/
}
