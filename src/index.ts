import { Elysia, t } from 'elysia'
import { PrismaClient } from '@prisma/client'
import { swagger } from '@elysiajs/swagger'

const db = new PrismaClient()

const app = new Elysia()
	.use(swagger())
	.get('/data', async () => {
		const users = await db.user.findMany()
		return users
	})
	.get('/badlist', async () => {
		const users = await db.badPlayers.findMany()
		return users
	})
	.post(
		'/',
		async ({ body }) =>
			db.user.create({
				data: body,
				select: {
					id: true,
					username: true
				}
			}),
		{
			error({ code }) {
				switch (code) {
					// Prisma P2002: "Unique constraint failed on the {constraint}"
					case 'P2002':
						return {
							error: 'Username must be unique'
						}
				}
			},
			body: t.Object({
				username: t.String(),
				password: t.String({
					minLength: 8
				})
			}),
			response: t.Object({
				id: t.Number(),
				username: t.String()
			})
		}
	)

	.post(
		'/badlist',
		async ({ body }) =>
			db.badPlayers.create({
				data: body,
				select: {
					id: true,
					username: true
				}
			}),
		{
			error({ code }) {
				switch (code) {
					// Prisma P2002: "Unique constraint failed on the {constraint}"
					case 'P2002':
						return {
							error: 'Username must be unique'
						}
				}
			},
			body: t.Object({
				username: t.String(),
				rating: t.Numeric({
					minimum: 0,
					maximum: 10
				}),
				kdratio: t.Optional(t.String())
			}),
			response: t.Object({
				id: t.Number(),
				username: t.String()
			})
		}
	)
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)