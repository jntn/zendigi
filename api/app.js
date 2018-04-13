const Schema = require('graph.ql')
const json = require('koa-json')
const body = require('co-body')
const Koa = require('koa')
const yesql = require('yesql')
const { Client } = require('pg')

const { PORT = 3000 } = process.env

require('dotenv').config()

var sql = yesql(__dirname + '/sql/', { type: 'pg' })

const client = new Client()
client.connect()

client.query(sql.getAllPosts(), function(err, result) {
  console.log(result.rows)
})

const pets = [
  { id: '0', name: 'Tobi' },
  { id: '1', name: 'Loki' },
  { id: '2', name: 'Jane' }
]

const schema = Schema(
  `
  type Pet {
    id: Int!
    name: String!
  }

  type Query {
    pet(id: Int!): Pet
  }
`,
  {
    Query: {
      pet(root, args) {
        return pets[args.id]
      }
    }
  }
)

const app = new Koa()

// formatted json output when using ?pretty
app.use(json({ pretty: false, param: 'pretty' }))

// execute the query, expects json input as { query: ... }
// for example try the following request:
// curl -d '{ "query": "{ pet(id: 0) { name }}" }' ':3000/?pretty'
app.use(async ctx => {
  const { query } = await body.json(ctx)
  const { data } = await schema.query(query)
  ctx.body = data
})

app.listen(PORT)
