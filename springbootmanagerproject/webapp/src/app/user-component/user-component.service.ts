import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetail } from './user';


@Injectable()
export class UserService{
	apiAddress:string;
	data:Array<UserDetail> = [];
	constructor(private http: HttpClient) { 
	
	this.apiAddress='http://localhost:8080/controlmanager/users/';
	}


getUser() {
 
   return this.http.get<Array<UserDetail>>(this.apiAddress);
   
}

addUser(userDetail : UserDetail){
	return this.http.post<UserDetail>(this.apiAddress, userDetail);
}

updateUser(userDetail : UserDetail){
	console.log(userDetail.userId);
	console.log(userDetail.firstName);
	console.log(userDetail.lastName);
	console.log(userDetail.employeeId);
	return this.http.put<UserDetail>(`${this.apiAddress}${userDetail.userId}`, userDetail);
}

deleteUserById(id: number)
{
	console.log(id);
return this.http.delete(`${this.apiAddress}${id}`,
      { responseType: 'text' });
}

getUserById(id: number) {
    return this.http.get<UserDetail>(`${this.apiAddress}${id}`);
  }
  
}