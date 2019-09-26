package com.fsd.managerpjt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsd.managerpjt.dao.ParentTaskDao;
import com.fsd.managerpjt.dao.ProjectDao;
import com.fsd.managerpjt.dao.TaskDao;
import com.fsd.managerpjt.dao.UsersDao;
import com.fsd.managerpjt.model.ParentTask;
import com.fsd.managerpjt.model.Project;
import com.fsd.managerpjt.model.Task;
import com.fsd.managerpjt.model.Users;

@Service
public class ManagerServiceImpl implements ManagerService {
	
	@Autowired
	ProjectDao projectDao;
	
	@Autowired
	TaskDao taskDao;
	
	@Autowired
	UsersDao usersDao;
	
	@Autowired
	ParentTaskDao parentTaskDao;

	@Override
	public Project insertProject(Project project) {
		return projectDao.insertProject(project);
	}

	@Override
	public List<Project> getAllProjects() {
		return projectDao.getAllProjects();
	}

	@Override
	public Project getProjectById(Long projectid) {
		Optional<Project> projectEntity= projectDao.getProjectById(projectid);
		return projectEntity.get();
	}
	
	//get Project by project name
	public Project getProjectByName(String project) {
		return projectDao.getProjectByName(project);
	}

	@Override
	public void deleteProject(Project project) {
		projectDao.deleteProject(project);		
	}

	@Override
	public Task insertTask(Task task) {
		return taskDao.insertTask(task);
	}

	@Override
	public List<Task> getAllTasks() {
		return taskDao.getAllTasks();
	}

	@Override
	public Task getTaskById(Long taskid) {
		Optional<Task> taskEntity=taskDao.getTaskById(taskid);
		return taskEntity.get();
	}
	
	//get tasks list by project name 
	public List<Task> getTasksByProjectName(String projectName){
		return taskDao.getTasksByProjectName(projectName);
	}

	@Override
	public void deleteTask(Task task) {
		taskDao.deleteTask(task);
	}

	@Override
	public Users insertUser(Users user) {
		return usersDao.insertUser(user);
	}

	@Override
	public List<Users> getAllUsers() {
		return usersDao.getAllUsers();
	}

	@Override
	public Users getUserById(Long userid) {
		Optional<Users> userEntity=usersDao.getUserById(userid);
		return userEntity.get();
	}
	
	//get user by first name
	public Users getUserByUserName(String firstName) {
		return usersDao.getUserByUserName(firstName);
	}

	@Override
	public void deleteUser(Users user) {
		usersDao.deleteUser(user);
	}

	/*@Override
	public ParentTask insertParentTask(ParentTask parentTask) {
		return parentTaskDao.insertParentTask(parentTask);
	}

	@Override
	public List<ParentTask> getAllParentTasks() {
		return parentTaskDao.getAllParentTasks();
	}

	@Override
	public ParentTask getParentTaskById(Long parentId) {
		Optional<ParentTask> parentTaskEntity= parentTaskDao.getParentTaskById(parentId);
		return parentTaskEntity.get();
	}*/
	
	public ParentTask getParentTaskName(String parentTask) {
		return parentTaskDao.getParentTaskName(parentTask);
	}
	
	/*@Override
	public void deleteParentTask(ParentTask parentTask) {
		parentTaskDao.deleteParentTask(parentTask);
	}*/
	 
}
