import { objectType } from 'nexus'

export default objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.blog()
    t.model.role()
    t.model.posts({ type: 'CustomPost' })
  },
})
