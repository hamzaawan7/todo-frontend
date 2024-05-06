// src/app/task-list/task-list.component.ts
import { Component } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, HttpClientModule],
  providers: [TaskService] // Provide TaskService
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Fetch tasks from the API on initialization
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // Add a new task using the API
  addTask(title: string, deadline: string): void {
    if (title.trim().length === 0) {
      return;
    }
    const newTask: Task = { id: 0, title, completed: false, deadline };
    this.taskService.addTask(newTask).subscribe((task) => {
      this.tasks.push(task);
    });
  }

  // Remove a task using the API
  removeTask(task: Task): void {
    this.taskService.removeTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t !== task);
    });
  }

  // Toggle task completion status (local change)
  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(() => {
      // Resort tasks after updating completion status
      this.tasks = this.tasks.sort((a, b) => Number(a.completed) - Number(b.completed));
    });
  }
}
