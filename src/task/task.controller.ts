import { JwtGuard } from './../auth/guard/jwt.guard';
import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { createTaskDto, updateTaskDto } from './dto';
import { getUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private task: TaskService) {}
  @Post()
  createTask(@getUser('id') userId: number, @Body() dto: createTaskDto) {
    return this.task.createTask(dto, userId);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) taskId: number,
    @getUser('id') userId: number,
  ) {
    return this.task.getOneTask(taskId, userId);
  }

  @Patch('/:id')
  updateTaskById(
    @Param('id', ParseIntPipe) taskId: number,
    @getUser('id') userId: number,
    @Body() dto: updateTaskDto,
  ) {
    return this.task.updateTaskById(taskId, userId, dto);
  }
}
