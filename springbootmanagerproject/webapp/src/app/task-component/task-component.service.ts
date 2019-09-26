import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDetail } from './task';


@Injectable()
export class TaskService{
	apiAddress:string;
	delAddress:string;
	data:Array<TaskDetail> = [];
	constructor(private http: HttpClient) { 
	
	this.apiAddress='http://localhost:8080/controlmanager/tasks';
	
	}


getTask() {
   return this.http.get<Array<TaskDetail>>(this.apiAddress); 
}

addTask(taskdetail : TaskDetail){
	return this.http.post<TaskDetail>(this.apiAddress, taskdetail);
}

updateTask(taskdetail : TaskDetail){
	return this.http.put<TaskDetail>(`${this.apiAddress}${taskdetail.taskId}`, taskdetail);
}

getTaskById(id: number) {
	return this.http.get<TaskDetail>(`${this.apiAddress}${id}`);
}

deleteTaskById(id: number)
{
  return this.http.delete(`${this.apiAddress}${id}`,
		{ responseType: 'text' });
}

}