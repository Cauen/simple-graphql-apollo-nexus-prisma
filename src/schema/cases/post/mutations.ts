import {
  intArg,
  nonNull,
  queryField,
} from 'nexus'

export default queryField((t) => {
  t.field('randomPost', {
    type: 'CustomPost',
    args: {
      age: nonNull(intArg({})),
      count: intArg()
    },
    validate: ({ number }, { age }) => ({
      age: number().lessThan(10, `Must be less than 10, we've got ${age}`)
    }),
    resolve(_root, args, ctx) {
      const post = ctx.prisma.post.findFirst({})
      return post
    },
  })
})
