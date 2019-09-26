import { Component, OnInit, ViewChild } from '@angular/core';
import { SampleService } from './main-component.service';
import { TaskDetail } from '../task-component/task';
import { MatSort, MatSortable, MatTableDataSource, MatDialog} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css'],
  providers: [ SampleService, MatDialog ]
})


export class MainComponentComponent implements OnInit {
smpls:string[];
inputtext=null;
sample=null
data:Array<TaskDetail>=[];
newTask : TaskDetail;
displayedColumns=['taskId', 'task', 'parentTaskName', 'priority', 'startDate', 'endDate','actions'];
@ViewChild(MatSort) sort: MatSort;
dataSource;

//exampleDatabase: DataService | null;
//dataSource: ExampleDataSource | null;

index: number;
ctaskId: number;

  constructor(private sm: SampleService ) {
    this.newTask = new TaskDetail();
	
    }
    clickAction()
{
	this.sample=this.inputtext
}
getTask()
{
	this.sm.getTask().subscribe(response => {
    console.log(response);
    this.data =response;
    console.log(this.data);
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.sort=this.sort;
  });
}

  ngOnInit() {
  this.getTask();
  }
  addMore()
  {
    
    this.sm.addTask(this.newTask).subscribe(response => {
      console.log(response);
      console.log(this.data);
      this.data.push(response);
      console.log(this.data);
      this.getTask();
    });
	  
}

editTask(task: TaskDetail){
  console.log(task);
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

// startEditTask(i: number, taskId: number, task: string, parentTaskName: string, priority: string, startDate: string, endDate: string) {
//   this.ctaskId = taskId;
//   // index row is used just for debugging proposes and can be removed
//   this.index = i;
//   console.log(this.index);
//   const dialogRef = this.dialog.open(EditDialogComponent, {
//     data: {taskId: taskId, task: task, parentTaskName: parentTaskName, priority: priority, startDate: startDate, endDate: endDate}
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result === 1) {
//       // When using an edit things are little different, firstly we find record inside DataService by id
//       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.taskId === this.ctaskId);
//       // Then you update that record using data from dialogData (values you enetered)
//       this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
//       // And lastly refresh table
//       this.refreshTable();
//     }
//   });
// }

deleteTask(task: TaskDetail){
  this.sm.deleteTaskById(task.taskId).subscribe();
  this.getTask();
}

}
