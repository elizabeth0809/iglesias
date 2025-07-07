import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import { BlogStatus } from '../../interfaces/blogs/blog.interfaces';

interface IStrapiGraphQLBlogResponse {
  data: {
    blogs: {
      data: IStrapiGraphQLBlogData[];
      meta: {
        pagination: {
          total: number;
          page: number;
          pageSize: number;
          pageCount: number;
        };
      };
    };
  };
}

interface IStrapiGraphQLBlogData {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description: string;
    content: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    image?: {
      data?: {
        attributes: {
          name: string;
          url: string;
        };
      };
    };
    category?: {
      data?: {
        id: string;
        attributes: {
          name: string;
        };
      };
    };
  };
}

export class BlogMappers {
  static fromStrapiGraphQLToEntity(result: IStrapiGraphQLBlogData): IBlogResponse {
    return {
      id: parseInt(result.id),
      title: result.attributes.name,
      description: result.attributes.description,
      content: result.attributes.content,
      slug: result.attributes.slug,
      image: result.attributes.image?.data?.attributes?.url || "",
      status: 'published' as BlogStatus,
      category_id: result.attributes.category?.data?.attributes?.name || "",
      created_at: result.attributes.createdAt,
      updated_at: result.attributes.updatedAt,
    };
  }

  static fromStrapiGraphQLArrayToEntity(results: IStrapiGraphQLBlogData[]): IBlogResponse[] {
    return results.map(result => this.fromStrapiGraphQLToEntity(result));
  }

  static fromStrapiGraphQLResponseToEntity(response: IStrapiGraphQLBlogResponse): {
    blogs: IBlogResponse[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };
  } {
    return {
      blogs: this.fromStrapiGraphQLArrayToEntity(response.data.blogs.data),
      pagination: response.data.blogs.meta.pagination,
    };
  }
}