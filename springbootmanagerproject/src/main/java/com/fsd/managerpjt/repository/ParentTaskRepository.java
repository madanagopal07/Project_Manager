package com.fsd.managerpjt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fsd.managerpjt.model.ParentTask;

public interface ParentTaskRepository extends JpaRepository<ParentTask, Long> {
	
	@Query(value = "SELECT * FROM parent_task WHERE parent_task = ?1", nativeQuery = true)
	public ParentTask findParentTaskByPatentTaskName(String parentTask);
}
