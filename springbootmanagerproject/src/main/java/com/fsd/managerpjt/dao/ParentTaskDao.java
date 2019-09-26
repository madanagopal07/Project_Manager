package com.fsd.managerpjt.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fsd.managerpjt.model.ParentTask;
import com.fsd.managerpjt.repository.ParentTaskRepository;

@Repository
public class ParentTaskDao {
	
	@Autowired
	ParentTaskRepository parentTaskRepository;
	
	/*//save the parent task
	public ParentTask insertParentTask(ParentTask parentTask) {
		return parentTaskRepository.save(parentTask);
	}

	//getAllParentTasks
	public List<ParentTask> getAllParentTasks(){
		return parentTaskRepository.findAll();
	}
		
	//get parent task by id
	public Optional<ParentTask> getParentTaskById(Long parentId) {
		return parentTaskRepository.findById(parentId);
	}
	*/
	//get ParentTask by parent task name
	public ParentTask getParentTaskName(String parentTask) {
		return parentTaskRepository.findParentTaskByPatentTaskName(parentTask);
	}

	/*//delete parent task
	public void deleteParentTask(ParentTask parentTask) {
		parentTaskRepository.delete(parentTask);
	}*/

}
