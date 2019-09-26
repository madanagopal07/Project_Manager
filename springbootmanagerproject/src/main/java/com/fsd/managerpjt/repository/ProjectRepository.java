package com.fsd.managerpjt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fsd.managerpjt.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	
	@Query(value = "SELECT * FROM project WHERE project = ?1", nativeQuery = true)
	public Project findProjectByProjectName(String project);
}
