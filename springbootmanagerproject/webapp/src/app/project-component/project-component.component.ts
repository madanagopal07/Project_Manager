import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project-component.service';
import { UserService } from '../user-component/user-component.service';
import { ProjectDetail } from './project';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserDetail } from '../user-component/user';
import { formatDate, DatePipe } from '@angular/common';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.css'],
   providers: [ ProjectService, UserService, DatePipe ]
})
export class ProjectComponentComponent implements OnInit {
smpls:string[];
inputtext=null;
sample=null
data:Array<ProjectDetail>=[];
userdata:Array<UserDetail>=[];
newProject : ProjectDetail;
fetchedProject : ProjectDetail;
priorityValue: string;
newUser : UserDetail;
fetchedUser : UserDetail;
userId:number;
isActive: boolean;
//myDate:date;

today= new Date();
pjtstrDate:string;
pjtendDate:string;

options: Options = {
  floor: 0,
  ceil: 30
};

updatePjtId:number;
addEditButtonFlag:boolean=false;

closeResult: string;
sampleDate:string;

  constructor(private projectService: ProjectService, private userService: UserService,
    private modalService: NgbModal , private datepipe: DatePipe) {
    this.newProject = new ProjectDetail();
    this.fetchedProject=new ProjectDetail();

    this.newUser = new UserDetail();
    this.fetchedUser = new UserDetail();
  
    this.isActive=false;
    this.getProject();
    //this.pjtstrDate= formatDate(this.today.getDate()-1, 'yyyy-MM-dd', 'en-US', '+0530');
    this.pjtendDate= formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    //this.datepipe=
  }
  
clickAction()
{
	this.sample=this.inputtext
}

getProject()
{
	this.projectService.getProject().subscribe(response => {
    console.log(response);
    this.data =response;
  });
}

ngOnInit() {
  this.getProject();
  this.getUser();
}

addProject()
  {
  //this.newProject.startDate=this.today.getFullYear()+'-'+this.today.getMonth()+'-'+this.today.getDate()-1;
  if(this.fetchedUser.firstName!=null){
    this.newProject.manager=this.fetchedUser.firstName;
  }

  if(this.newProject.startDate!=null){
    this.newProject.startDate=this.datepipe.transform(this.newProject.startDate, 'yyyy-MM-dd');
  }else{
    this.newProject.startDate=this.datepipe.transform(this.today, 'yyyy-MM-dd');
  }

  if(this.newProject.endDate!=null){
    this.newProject.endDate=this.datepipe.transform(this.newProject.endDate, 'yyyy-MM-dd');
  }else{
    this.newProject.endDate=this.datepipe.transform(this.today, 'yyyy-MM-dd');
  }
 
  console.log(this.newProject);
   // this.newProject.first_name=this.fetchedProject.first_name;
    this.projectService.addProject(this.newProject).subscribe(response => {
      this.data.push(response);
      console.log(this.data);
    });  
}

getProjectByID(id: number)
{
this.projectService.getProjectById(id).subscribe(response => {
    this.fetchedProject =response;
  
  this.newProject.projectId=this.fetchedProject.projectId;
  this.newProject.project=this.fetchedProject.project;
  this.newProject.priority=this.fetchedProject.priority;
  this.newProject.startDate=this.fetchedProject.startDate;
  this.newProject.endDate=this.fetchedProject.endDate;
  this.fetchedUser.firstName=this.fetchedProject.manager;
  console.log(this.fetchedProject);
  });
}

editProjectByID(id: number)
{

  this.addEditButtonFlag=true;
  this.updatePjtId=id;
  this.getProjectByID(id);
  this.newProject.projectId=this.fetchedProject.projectId;
  this.newProject.project=this.fetchedProject.project;
  this.newProject.priority=this.fetchedProject.priority;
  this.newProject.startDate=this.fetchedProject.startDate;
  this.newProject.endDate=this.fetchedProject.endDate;
  //this.newProject.noOfTasks=this.fetchedProject.noOfTasks;
  this.newProject.status=this.fetchedProject.status;
  this.fetchedProject.manager=this.fetchedUser.firstName;
}

updateProject(updatePjtInfo:ProjectDetail){
  updatePjtInfo.projectId=this.updatePjtId;
  updatePjtInfo.manager=this.fetchedUser.firstName;
  console.log('updatePjtInfo.manager'+updatePjtInfo.manager);
  this.projectService.updateProject(updatePjtInfo).subscribe(response => {
    this.data.push(response);
  });
  this.getProject();
}

deleteProjectById(id: number)
{
  this.projectService.deleteProjectById(id).subscribe();
  this.getProject();
}

//user services ------

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

open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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