// src/app/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Task interface for the service's data
export interface Task {
  id?: number;
  title: string;
  completed: boolean;
  deadline?: string;
}

@Injectable({
  providedIn: 'root' // Service is available application-wide
})
export class TaskService {
  private apiUrl = 'https://todo-backend1-2d01351f2790.herokuapp.com/api/tasks'; // Replace this with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Add a new task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Delete a task by ID
  removeTask(taskId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
