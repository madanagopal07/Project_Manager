import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectDetail } from './project';


@Injectable()
export class ProjectService{
	apiAddress:string;
	apiUserAddress:string;
	data:Array<ProjectDetail> = [];
	constructor(private http: HttpClient) { 
	
	this.apiAddress='http://localhost:8080/controlmanager/projects/';
	
	}


getProject() {
   return this.http.get<Array<ProjectDetail>>(this.apiAddress);
}

addProject(projectDetail : ProjectDetail){
	return this.http.post<ProjectDetail>(this.apiAddress, projectDetail);
}

updateProject(projectDetail : ProjectDetail){
	return this.http.put<ProjectDetail>(`${this.apiAddress}${projectDetail.projectId}`, projectDetail);
}

getProjectById(id: number) {
    return this.http.get<ProjectDetail>(`${this.apiAddress}${id}`);
}

deleteProjectById(id: number)
 {
 return this.http.delete(`${this.apiAddress}${id}`,
	   { responseType: 'text' });
 }
 

}