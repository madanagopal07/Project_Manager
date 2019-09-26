package com.fsd.managerpjt.service;

import java.util.List;

import com.fsd.managerpjt.model.ParentTask;
import com.fsd.managerpjt.model.Project;
import com.fsd.managerpjt.model.Task;
import com.fsd.managerpjt.model.Users;

public interface ManagerService {
	
	public Project insertProject(Project project);
	public List<Project> getAllProjects();
	public Project getProjectById(Long projectid);
	public void deleteProject(Project project);
	
	public Task insertTask(Task task);
	public List<Task> getAllTasks();
	public Task getTaskById(Long taskid);
	public void deleteTask(Task task);
	
	public Users insertUser(Users user);
	public List<Users> getAllUsers();
	public Users getUserById(Long userid);
	public void deleteUser(Users user);
	
	/*public ParentTask insertParentTask(ParentTask parentTask);
	public List<ParentTask> getAllParentTasks();
	public ParentTask getParentTaskById(Long parentId);
	public void deleteParentTask(ParentTask parentTask);*/

}
