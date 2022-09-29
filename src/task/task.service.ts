import { updateTaskDto } from './dto/update-task.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: createTaskDto, userId: number) {
    console.log(dto);
    const newTask = await this.prisma.task.create({
      data: {
        ...dto,
        createdBy: userId,
      },
    });
    return newTask;
  }

  async getOneTask(taskId: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        // userId,
      },
      include: { users: { include: { user: true } } },
    });
    return task;
  }

  async updateTaskById(taskId: number, userId: number, dto: updateTaskDto) {
    const updatedTask = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: { users: { include: { user: true } } },
    });

    updatedTask['users'].forEach((user) => {
      if (user.userId == userId) {
        throw new ForbiddenException('You has assign this task');
      }
    });

    if (!updatedTask) {
      throw new ForbiddenException('Access to resources denied');
    }

    return await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
        users: { create: { userId: userId } },
      },
    });
  }
}
