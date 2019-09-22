import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', new TaskStatusValidationPipe()) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }
}
