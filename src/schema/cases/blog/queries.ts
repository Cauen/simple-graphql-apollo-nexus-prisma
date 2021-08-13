import { intArg, nonNull, queryField, stringArg } from 'nexus'
import { Prisma } from '@prisma/client'

export default queryField((t) => {
  t.crud.blogs({ pagination: false, filtering: true })
  t.crud.users({ filtering: true, alias: 'people' })
  t.crud.posts({ type: 'CustomPost', ordering: true, filtering: true })
  
  t.field('blogCount', {
    type: 'Int',
    args: {
      where: 'BlogWhereInput',
    },
    async resolve(_root, args, ctx) {
      const count = await ctx.prisma.blog.count({
        where: (args.where as Prisma.BlogWhereInput) ?? undefined,
      })
      return count
    },
  })
  // Return an item of type blog
  t.field('blog', {
    type: 'Blog',
    args: {
      id: nonNull(intArg()),
    },
    async resolve(_root, args, ctx) {
      const blog = await ctx.prisma.blog.findUnique({
        where: {
          id: args.id,
        },
      })
      if (!blog) throw new Error(`No blog with id of "${args.id}"`)
      return blog
    },
  })
  // Returns a list of type Blog
  t.list.field('blogsLike', {
    type: 'Blog',
    args: {
      name: stringArg(),
      viewCount: intArg(),
    },
    resolve(_root, args, ctx) {
      return ctx.prisma.blog.findMany({
        where: {
          name: args.name ?? undefined,
          viewCount: args.viewCount ?? undefined,
        },
      })
    },
  })
})
