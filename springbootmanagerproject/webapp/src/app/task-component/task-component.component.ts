import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from './task-component.service';
import { TaskDetail } from './task';
import { MatSort, MatSortable, MatTableDataSource} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { ProjectService } from '../project-component/project-component.service';
import { UserService } from '../user-component/user-component.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ProjectDetail } from '../project-component/project';
import { UserDetail } from '../user-component/user';
import { formatDate, DatePipe } from '@angular/common';
import { Options } from 'ng5-slider';



@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css'],
   providers: [ TaskService ,ProjectService,UserService,DatePipe]
})
export class TaskComponentComponent implements OnInit {
smpls:string[];
inputtext=null;
sample=null;

data:Array<TaskDetail>=[];
newTask : TaskDetail;
fetchedTask : TaskDetail;

projectdata:Array<ProjectDetail>=[];
userdata:Array<UserDetail>=[];

newProject : ProjectDetail;
fetchedProject : ProjectDetail;

newUser : UserDetail;
fetchedUser : UserDetail;

priorityValue: string;

isActive: boolean;
today= new Date();

options: Options = {
  floor: 0,
  ceil: 30
};

updateTaskId:number;
addEditButtonFlag:boolean=false;

closeResult: string;

displayedColumns=['taskId', 'task', 'parentTask', 'priority', 'startDate', 'endDate','actions'];
@ViewChild(MatSort) sort: MatSort;
dataSource;

constructor(private taskService: TaskService,private projectService: ProjectService, 
  private userService: UserService,private modalService: NgbModal, private datepipe: DatePipe) {
    this.newTask = new TaskDetail(); 
    this.newProject = new ProjectDetail();
    this.fetchedProject=new ProjectDetail();
  
    this.newUser = new UserDetail();
    this.fetchedUser = new UserDetail();
    
    this.isActive=false;
    this.getTask();  
}
    
clickAction()
{
	this.sample=this.inputtext
}
getTask()
{
	this.taskService.getTask().subscribe(response => {
    console.log(response);
    this.data =response;
    console.log(this.data);
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.sort=this.sort;
  });
}

ngOnInit() {
  this.getTask();
  this.getProject();
  this.getUser();
}

 
addTask()
{

  if(this.fetchedProject.project!=null){
    this.newTask.projectName=this.fetchedProject.project;
  }

  if(this.newTask.startDate!=null){
    this.newTask.startDate=this.datepipe.transform(this.newTask.startDate, 'yyyy-MM-dd');
  }else{
    this.newTask.startDate=this.datepipe.transform(this.today, 'yyyy-MM-dd');
  }

  if(this.newTask.endDate!=null){
    this.newTask.endDate=this.datepipe.transform(this.newTask.endDate, 'yyyy-MM-dd');
  }else{
    this.newTask.endDate=this.datepipe.transform(this.today, 'yyyy-MM-dd');
  }

    this.taskService.addTask(this.newTask).subscribe(response => {
      console.log('Receiving Response ');
      console.log(response);
      console.log(this.data);
      this.data.push(response);
      console.log(this.data);
      this.getTask();
    });	  
}

getTaskByID(id: number)
{
    this.taskService.getTaskById(id).subscribe(response => {
    console.log(response);
    this.fetchedTask =response;
    
  });
}

editTaskByID(id: number)
{

  this.addEditButtonFlag=true;
  this.updateTaskId=id;
  this.getTaskByID(id);

  this.newTask.taskId=this.fetchedTask.taskId;
  this.newTask.task=this.fetchedTask.task;
  this.newTask.startDate=this.fetchedTask.startDate;
  this.newTask.endDate=this.fetchedTask.endDate;
  this.newTask.priority=this.fetchedTask.priority;
  this.newTask.projectName=this.fetchedTask.projectName;
  this.newTask.parentTaskName=this.fetchedTask.parentTaskName;
  this.newTask.userName=this.fetchedTask.userName;
}

updateTask(updateTaskInfo:TaskDetail){
  updateTaskInfo.taskId=this.updateTaskId;
  this.taskService.updateTask(updateTaskInfo).subscribe(response => {
    this.data.push(response);
  });
  this.getTask();
}

deleteTaskById(id: number)
{
  this.taskService.deleteTaskById(id).subscribe();
  this.getTask();
}

searchProject(){
  this.getProject();
}

//---- project services
getProject()
{
	this.projectService.getProject().subscribe(response => {
  console.log('modal getPrject is');
    console.log(response);
    this.projectdata =response;
  });
}

getProjectByID(id: number)
{
this.projectService.getProjectById(id).subscribe(response => {
    console.log(response);
    this.fetchedProject =response;
	console.log('fetched Project is');
	console.log(this.fetchedProject);
    
  });
}
//---------

//---- user services
getUser()
{
	this.userService.getUser().subscribe(response => {
    console.log(response);
    this.userdata =response;
    
  });
}

getUserByID(id: number)
{
this.userService.getUserById(id).subscribe(response => {
    console.log(response);
    this.fetchedUser =response;
	console.log('fetched user is');
	console.log(this.fetchedUser);
    
  });
}
//-----------


open(content) {
  console.log(content);

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    console.log(result);
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
Search(){
console.log('inSearch ()');
}

}
