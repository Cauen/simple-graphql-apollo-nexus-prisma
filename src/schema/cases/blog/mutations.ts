import { mutationField } from 'nexus'

export default mutationField((t) => {
  t.crud.createOneUser({
    async resolve(root, args, ctx, info, originalResolve) {
      console.log({ ctx })
      const data = originalResolve(root, args, ctx, info)
      return data
    },
  })
  t.crud.createOnePost({ type: 'CustomPost' })
  t.crud.deleteOnePost({ type: 'CustomPost' })
  t.crud.deleteOneUser()
  t.crud.createOneBlog({})
  t.field('resendEmail', {
    type: 'Boolean',
    authorize: (root, args, ctx, info) => {
      if (ctx.params.req.headers.authorization) return true
      throw new Error('Não autorizado')
    },
    resolve(_root, args, ctx, info) {
      console.log({ _root, args, ctx, info })
      return true
    },
  })
})
