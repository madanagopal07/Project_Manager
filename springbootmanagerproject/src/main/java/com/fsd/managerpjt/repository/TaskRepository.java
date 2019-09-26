package com.fsd.managerpjt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fsd.managerpjt.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
	
	@Query(value = "SELECT * FROM task WHERE project_name = ?1", nativeQuery = true)
	public List<Task> getTasksByProjectName(String projectName);

}
