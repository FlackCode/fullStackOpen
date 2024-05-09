import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { drizzle } from 'drizzle-orm/d1'
import { contacts } from './db/schema'
import { eq } from 'drizzle-orm'
export type Env = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()
app.use(cors())

app.get('/contacts', async (c) => {
  const db = drizzle(c.env.DB)
  const response = await db.select().from(contacts).all()
  return c.json(response)
}).post('/contacts', async (c) => {
  const db = drizzle(c.env.DB)
  const { name, number } = await c.req.json()
  const response = await db.insert(contacts).values({ name, number }).returning()
  return c.json(response)
}).delete('/contacts/:id', async (c) => {
  const userID = Number(c.req.param('id'))
  const db = drizzle(c.env.DB)
  const response = await db.delete(contacts).where(eq(contacts.id, userID))
  return c.json({message: 'Contact Deleted'})
})

export default app
