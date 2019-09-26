package com.fsd.managerpjt.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fsd.managerpjt.model.Project;
import com.fsd.managerpjt.repository.ProjectRepository;

@Repository
public class ProjectDao {
	
	@Autowired
	ProjectRepository projectRepository;
	
	//save the project
	public Project insertProject(Project project) {
		return projectRepository.save(project);
	}

	//getAllProjects
	public List<Project> getAllProjects(){
		return projectRepository.findAll();
	}
	
	//get project by id
	public Optional<Project> getProjectById(Long projectid) {
		return projectRepository.findById(projectid);
	}
	
	//get Project by project name
	public Project getProjectByName(String project) {
		return projectRepository.findProjectByProjectName(project);
	}

	//delete project
	public void deleteProject(Project project) {
		projectRepository.delete(project);
	}
}
