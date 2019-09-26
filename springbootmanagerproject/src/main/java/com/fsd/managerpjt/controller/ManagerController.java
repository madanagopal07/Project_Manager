package com.fsd.managerpjt.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.managerpjt.model.Project;
import com.fsd.managerpjt.model.ProjectDto;
import com.fsd.managerpjt.model.Task;
import com.fsd.managerpjt.model.UserDto;
import com.fsd.managerpjt.model.Users;
import com.fsd.managerpjt.service.ManagerServiceImpl;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@CrossOrigin("*")
@RestController
@RequestMapping(value="/controlmanager", produces="application/json")
public class ManagerController {
	
	@Autowired
	ManagerServiceImpl managerServiceImpl;
	
	@PostMapping("/projects")
	public ProjectDto createProject(@Valid @RequestBody ProjectDto project) {
		Project projectin=new Project();
		projectin.setProjectId(project.getProjectId());
		projectin.setProject(project.getProject());
		projectin.setPriority(project.getPriority());
		projectin.setStartDate(project.getStartDate());
		projectin.setEndDate(project.getEndDate());
		
		//get manager by users first name
		Users user=managerServiceImpl.getUserByUserName(project.getManager());
		projectin.setManager(user);
		
		managerServiceImpl.insertProject(projectin);
		
		return project;
	}

	@GetMapping("/projects")
	public List<ProjectDto> getAllProjects() {
		
		List<Project> projectsList=managerServiceImpl.getAllProjects();
		List<ProjectDto> projects=new ArrayList<>();
		for (Project project : projectsList) {
			
			ProjectDto projectDto=new ProjectDto();
			projectDto.setProjectId(project.getProjectId());
			projectDto.setProject(project.getProject());
			projectDto.setPriority(project.getPriority());
			projectDto.setStartDate(project.getStartDate());
			projectDto.setEndDate(project.getEndDate());
			if(project.getManager()!=null){
				projectDto.setManager(project.getManager().getFirstName());
			}
			
			int projectCount=managerServiceImpl.getTasksByProjectName(project.getProject()).size();
			System.out.println("*********************projectCount is  :"+projectCount);
			projectDto.setNoOfTasks(projectCount);
			projectDto.setStatus(project.getStatus());
			projects.add(projectDto);
		}
		
		return projects;
	}

	@GetMapping("/projects/{id}")
	public ResponseEntity<ProjectDto> getProjectById(@PathVariable(value="id") Long projectid) {
		Project project=managerServiceImpl.getProjectById(projectid);
		
		if(project==null) {
			return ResponseEntity.notFound().build();
		}
		
		ProjectDto projectDto=new ProjectDto();
		projectDto.setProjectId(project.getProjectId());
		projectDto.setProject(project.getProject());
		projectDto.setPriority(project.getPriority());
		projectDto.setStartDate(project.getStartDate());
		projectDto.setEndDate(project.getEndDate());
		if(project.getManager()!=null){
			projectDto.setManager(project.getManager().getFirstName());
		}
		int projectCount=managerServiceImpl.getTasksByProjectName(project.getProject()).size();
		projectDto.setNoOfTasks(projectCount);
		projectDto.setStatus(project.getStatus());
		
		return ResponseEntity.ok().body(projectDto);
	}
	
	//update an project by projectid
	@PutMapping("/projects/{id}")
	public ResponseEntity<ProjectDto> updateProject(@PathVariable(value="id") Long projectid,@Valid @RequestBody ProjectDto projectDetails){
		
		Project project=managerServiceImpl.getProjectById(projectid);
		if(project==null) {
			return ResponseEntity.notFound().build();
		}
		
		project.setProjectId(projectDetails.getProjectId());
		project.setProject(projectDetails.getProject());
		project.setPriority(projectDetails.getPriority());
		project.setStartDate(projectDetails.getStartDate());
		project.setEndDate(projectDetails.getEndDate());
		
		//get manager by users first name
		Users user=managerServiceImpl.getUserByUserName(projectDetails.getManager());
		project.setManager(user);
		project.setStatus(project.getStatus());
		
		managerServiceImpl.insertProject(project);
		
		return ResponseEntity.ok().body(projectDetails);
	}

	@DeleteMapping("/projects/{id}")
	public ResponseEntity<Project> deleteProject(@PathVariable(value="id") Long projectid) {
		Project project=managerServiceImpl.getProjectById(projectid);
		if(project==null) {
			return ResponseEntity.notFound().build();
		}
		
		managerServiceImpl.deleteProject(project);	
		
		return ResponseEntity.ok().build();
	}
	

	@PostMapping("/tasks")
	public Task createTask(@Valid @RequestBody Task task) {
		return managerServiceImpl.insertTask(task);
	}

	@GetMapping("/tasks")
	public List<Task> getAllTasks() {
		return managerServiceImpl.getAllTasks();
	}

	@GetMapping("/tasks/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable(value="id") Long taskid) {
		Task task=managerServiceImpl.getTaskById(taskid);
		
		if(task==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(task);
	}
	
	//update an task by taskid
	@PutMapping("/tasks/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable(value="id") Long taskid,@Valid @RequestBody Task taskDetails){
		
		Task task=managerServiceImpl.getTaskById(taskid);
		if(task==null) {
			return ResponseEntity.notFound().build();
		}
		
		task.setTaskId(taskDetails.getTaskId());
		task.setTask(taskDetails.getTask());
		task.setStartDate(taskDetails.getStartDate());
		task.setEndDate(taskDetails.getEndDate());
		task.setPriority(taskDetails.getPriority());
		task.setStatus(taskDetails.getStatus());
		task.setProjectName(taskDetails.getProjectName());
		task.setParentTaskName(taskDetails.getParentTaskName());
		task.setUserName(taskDetails.getUserName());
		
		Task updateTask=managerServiceImpl.insertTask(task);
		return ResponseEntity.ok().body(updateTask);
		
	}

	@DeleteMapping("/tasks/{id}")
	public ResponseEntity<Task> deleteTask(@PathVariable(value="id") Long taskid) {
		Task task=managerServiceImpl.getTaskById(taskid);
		
		if(task==null) {
			return ResponseEntity.notFound().build();
		}
		
		managerServiceImpl.deleteTask(task);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/users")
	public UserDto createUser(@Valid @RequestBody UserDto user) {
		
		Users userin=new Users();
		userin.setUserId(user.getUserId());
		userin.setFirstName(user.getFirstName());
		userin.setLastName(user.getLastName());
		userin.setEmployeeId(user.getEmployeeId());
		 
		managerServiceImpl.insertUser(userin);
		return user;
	}

	@GetMapping("/users")
	public List<UserDto> getAllUsers() {
		List<UserDto> users=new ArrayList<>();
		List<Users> usersList=managerServiceImpl.getAllUsers();
		for (Users user : usersList) {
			UserDto userout=new UserDto();
			userout.setUserId(user.getUserId());
			userout.setFirstName(user.getFirstName());
			userout.setLastName(user.getLastName());
			userout.setEmployeeId(user.getEmployeeId());
			
			users.add(userout);
		}
		
		return users;
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<UserDto> getUserById(@PathVariable(value="id") Long userid) {
		Users user=managerServiceImpl.getUserById(userid);
		if(user==null) {
			return ResponseEntity.notFound().build();
		}
		
		UserDto userout=new UserDto();
		userout.setUserId(user.getUserId());
		userout.setFirstName(user.getFirstName());
		userout.setLastName(user.getLastName());
		userout.setEmployeeId(user.getEmployeeId());
		
		return ResponseEntity.ok().body(userout);
	}
	
	//update an user by userid
	@PutMapping("/users/{id}")
	public ResponseEntity<UserDto> updateUser(@PathVariable(value="id") Long userid,@Valid @RequestBody UserDto userDetails){
			
		Users user=managerServiceImpl.getUserById(userid);
		if(user==null) {
			return ResponseEntity.notFound().build();
		}
			
		user.setUserId(userDetails.getUserId());
		user.setFirstName(userDetails.getFirstName());
		user.setLastName(userDetails.getLastName());
		user.setEmployeeId(userDetails.getEmployeeId());
			
		managerServiceImpl.insertUser(user);
			
		return ResponseEntity.ok().body(userDetails);
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<Users> deleteUser(@PathVariable(value="id") Long userid) {
		
		Users user=managerServiceImpl.getUserById(userid);
		if(user==null) {
			return ResponseEntity.notFound().build();
		}
		managerServiceImpl.deleteUser(user);
		
		return ResponseEntity.ok().build();
	}
	

}
