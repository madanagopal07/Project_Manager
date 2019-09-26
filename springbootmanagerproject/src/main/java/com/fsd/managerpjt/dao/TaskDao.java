package com.fsd.managerpjt.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fsd.managerpjt.model.Task;
import com.fsd.managerpjt.repository.TaskRepository;

@Repository
public class TaskDao {

	
	@Autowired
	TaskRepository taskRepository;
	
	//save the task
	public Task insertTask(Task task) {
		return taskRepository.save(task);
	}
	
	//get all the tasks
	public List<Task> getAllTasks(){
		return taskRepository.findAll();
	}
	
	//get task by id
	public Optional<Task> getTaskById(Long taskid) {
		return taskRepository.findById(taskid);
	}
	
	//get tasks list by project name 
	public List<Task> getTasksByProjectName(String projectName){
		return taskRepository.getTasksByProjectName(projectName);
	}

	//delete task
	public void deleteTask(Task task) {
		taskRepository.delete(task);
	}
	
}
