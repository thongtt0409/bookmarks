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
  createBookmark(@getUser() userId: number, @Body() dto: CreateBookmark) {
    return this.bookmarkService.createBookmark(dto, userId);
  }

  @Get()
  getBookmark() {}

  @Get('/:id')
  getBookmarkById(@Param('id', ParseIntPipe) bookmarkId: number) {}

  @Patch()
  editBookmarkById(@getUser() userId: number) {}

  @Delete()
  deleteBookmarkById(@getUser() userId: number) {}
}
