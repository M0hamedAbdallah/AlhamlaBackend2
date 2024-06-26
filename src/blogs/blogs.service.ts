import { Injectable , NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BlogsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addBlog(createBlogDto: Prisma.blogCreateInput) {
    return this.databaseService.blog.create({ data: createBlogDto });
  }
  async getAllPostsByCategoryIdOrName(Category_id?: string, Category_name_AR?: string, Category_name_EN?: string) {
    if(Category_id || Category_name_AR || Category_name_EN){
      return this.databaseService.blog.findMany({
        where: {
          OR: [
            { Category_id },
            { category: 
              { 
                OR: [
                  { Category_name_AR }, 
                  { Category_name_EN }
                ] 
              } 
            },
          ],
        },
      })
    }else{
      return this.databaseService.blog.findMany();
    }
  }
  async getAllBlogsDesc() {
    return this.databaseService.blog.findMany({where: {Post_date:'desc'}}); // from latest to oldest articles
  }
  async getAllBlogsAsc() {
    return this.databaseService.blog.findMany({where: {Post_date:'asc'}}); // from oldest to latest articles
  }
  async getBlogById(Article_id: string) {
    return this.databaseService.blog.findUnique({ where: { Article_id } }); // where takes the name of the column , if not the name of the column we write it as {columnName: variable}
  }

  async updateBlog(Article_id: string, updateBlogDto: Prisma.blogUpdateInput) {
    return this.databaseService.blog.update({
      where: { Article_id },
      data: updateBlogDto,
    });
  }

  async deleteBlog(Article_id: string) {
    return this.databaseService.blog.delete({ where: { Article_id } });
  }
}
