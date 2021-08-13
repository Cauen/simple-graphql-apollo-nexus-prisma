import { intArg, nonNull, objectType, queryField, stringArg, mutationType, mutationField, queryType } from 'nexus'

export const Custom = mutationField(t => {
  t.field('resendEmailx', {
    authorize: (root, args, ctx, info) => { 
      if (ctx.params.req.headers.authorization) return true
      throw new Error("Não autorizado")
    },
    type: 'Boolean',
    resolve (_root, args, ctx, info) {
      console.log({ _root, args, ctx, info })
      return true
    }
  })
})

export const Mutation = mutationField(t => {
    t.crud.createOneUser({
      async resolve(root, args, ctx, info, originalResolve) {
        console.log({ ctx })
        const data = originalResolve(root, args, ctx, info)
        return data
      },
    })
    t.crud.createOnePost({ type: "CustomPost" })
    t.crud.deleteOnePost({ type: "CustomPost" })
    t.crud.deleteOneUser()
    t.crud.createOneBlog({})
    t.field('resendEmail', {
      authorize: (root, args, ctx, info) => { 
        if (ctx.params.req.headers.authorization) return true
        throw new Error("Não autorizado")
      },
      type: 'Boolean',
      resolve (_root, args, ctx, info) {
        console.log({ _root, args, ctx, info })
        return true
      }
    })
})

export const Query = queryField((t) => {
  t.crud.blogs({ pagination: false, filtering: true })
  t.crud.users({ filtering: true, alias: 'people' })
  t.crud.posts({ type: 'CustomPost', ordering: true, filtering: true })

  t.field('blogCount', {
    type: 'Int',
    args: {
      where: 'BlogWhereInput'
    },
    resolve(_root, args, ctx) {
      return ctx.prisma.blog
        .count({
          where: args.where ?? undefined,
        })
        .then((result) => {
          if (result === null) {
            throw new Error(`No blog`)
          }
          return result
        })
    },
  })

  t.field('blog', {
    type: 'Blog',
    args: {
      id: nonNull(intArg()),
    },
    resolve(_root, args, ctx) {
      return ctx.prisma.blog
        .findUnique({
          where: {
            id: args.id,
          },
        })
        .then((result) => {
          if (result === null) {
            throw new Error(`No blog with id of "${args.id}"`)
          }
          return result
        })
    },
  })

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
