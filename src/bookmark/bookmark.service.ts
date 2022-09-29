import { EditBookmark } from './dto/edit-bookmark.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateBookmark } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(dto: CreateBookmark, userId: number) {
    const newBookmark = await this.prisma.bookmark.create({
      data: {
        title: dto.title,
        description: dto.description,
        link: dto.link,
        userId: userId,
      },
    });
    return newBookmark;
  }

  async getBookmark(userId: number) {
    return await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async getBookmarkById(bookmarkId: number, userId: number) {
    const bookMark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
      include: {
        user: true,
      },
    });
    return bookMark;
  }

  async editBookmarkById(
    bookmarkId: number,
    userId: number,
    dto: EditBookmark,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(bookmarkId: number, userId: number) {
    const deletedBookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!deletedBookmark || deletedBookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    return this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
