import { objectType } from 'nexus'

export default objectType({
  name: 'CustomPost',
  definition(t) {
    t.model('Post').id()
    t.model('Post').title()
    t.model('Post').tags()
    t.model('Post').status()
    t.model('Post').user()
    t.model("Post").blog()
  },
})
