import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBookmark } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  createBookmark(dto: CreateBookmark, userId: number) {}
  getBookmark() {}

  getBookmarkById() {}

  editBookmarkById() {}

  deleteBookmarkById() {}
}
