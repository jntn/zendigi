const Schema = require('graph.ql')
const json = require('koa-json')
const body = require('co-body')
const Koa = require('koa')
const _ = require('koa-route')
const puresql = require('puresql')
const { Client } = require('pg')

const { PORT = 3001 } = process.env

require('dotenv').config()

const client = new Client()

const adapter = puresql.adapters.pg(client)
client.connect()

var queries = puresql.loadQueries('sql/posts.sql')

const schema = Schema(
  `
  scalar Date

  type Event {
    id: Int!
    title: String!
    startTime: Date
    endTime: Date
  }

  type Category {
    id: Int!
    title: String!
    events: [Event]
  }

  type Query {
    category(id: Int!): Category
  }
`,
  {
    Date: {
      serialize(date) {
        return new Date(date)
      }
    },
    Category: {
      events(category) {
        return queries.getEventsForCategory({ id: category.id }, adapter)
      }
    },
    Query: {
      category(root, { id }) {
        return queries.getCategory({ id }, adapter).then(x => x[0])
      }
    }
  }
)

const app = new Koa()

// formatted json output when using ?pretty
app.use(json({ pretty: false, param: 'pretty' }))

app.use(
  _.post('/api', async ctx => {
    const { query } = await body.json(ctx)
    const result = await schema.query(query)

    ctx.body = result
  })
)

console.log('🚀 zendigi-api is now listening on port ' + PORT)

app.listen(PORT)
