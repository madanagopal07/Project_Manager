import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDetail } from '../task-component/task';


@Injectable()
export class SampleService{
	apiAddress:string;
	delAddress:string;
	data:Array<TaskDetail> = [];

	dialogData: any;
	constructor(private http: HttpClient) { 
	
	this.apiAddress='http://localhost:8080/controlmanager/tasks/';
	this.delAddress='http://localhost:8080/controlmanager/tasks/{id}';
	}
getDialogData() {
	return this.dialogData;
}

getTask() {
   return this.http.get<Array<TaskDetail>>(this.apiAddress);
}

addTask(taskdetail : TaskDetail){
	return this.http.post<TaskDetail>(this.apiAddress, taskdetail);
}

deleteTaskById(id: number)
{
  return this.http.delete(`${this.apiAddress}${id}`,
		{ responseType: 'text' });
}
}