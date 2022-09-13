import { EditBookmark } from './dto/edit-bookmark';
import { BookmarkService } from './bookmark.service';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Patch,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { getUser } from 'src/auth/decorator';
import { CreateBookmark } from './dto/create-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post()
  createBookmark(@getUser('id') userId: number, @Body() dto: CreateBookmark) {
    return this.bookmarkService.createBookmark(dto, userId);
  }

  @Get()
  getBookmark(@getUser('id') userId: number) {
    return this.bookmarkService.getBookmark(userId);
  }

  @Get('/:id')
  getBookmarkById(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @getUser('id') userId: number,
  ) {
    return this.bookmarkService.getBookmarkById(bookmarkId, userId);
  }

  @Patch('/:id')
  editBookmarkById(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @getUser('id') userId: number,
    @Body() dto: EditBookmark,
  ) {
    return this.bookmarkService.editBookmarkById(bookmarkId, userId, dto);
  }

  @Delete('/:id')
  deleteBookmarkById(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @getUser('id') userId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(bookmarkId, userId);
  }
}
