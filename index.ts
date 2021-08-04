import express, { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import Logger from './utils/logger'
import constants from './constants'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ! Censor the API Key if it's provided
app.use((req: Request, res: Response, next) => {
	let querykey
	let bodykey
	if (req.path === '/log') return next()
	if (req.body.apikey) {
		bodykey = req.body.apikey
		req.body.apikey = 'Censored for Privacy'
	}
	if (req.query.apikey) {
		querykey = req.query.apikey
		req.query.apikey = 'Censored for Privacy'
	}
	let query = req.query
	let body = req.body
	Logger.info(`[ ${new Date().toLocaleString()} ]`, {
		path: req.path,
		query,
		body,
		useragent: req.get('User-Agent')
	})
	req.query.apikey = querykey
	req.body.apikey = bodykey
	next()
})
// ! Redirect to configured redirect site (Killswitch Wiki by Default)
app.get('/', async (_req: Request, res: Response) => {
	res.json({ message: 'This is a fork. Go to the original and fine out more! > https://github.com/himbolion/killswitch' })
})

// ! Route Imports
fs.readdir(path.join(__dirname, 'routes'), (_err, files) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let r: any[] = []
	files.forEach(file => {
		if (file.endsWith('ts')) return
		let pathstring = path.join(__dirname, 'routes', file)
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		let { handler, paths } = require(pathstring)
		r.push({ handler, paths })
	})
	r.forEach(route => {
		app.use(route.paths, route.handler)
	})
})

// ! Provide App Log if wanted (main file by default, erorr if passed ?error=true)
// app.get("/log", async (req, res) => {
//    fs.readFile(`${req.query.error ? constants.error : constants.log}`, 'utf8', function (err, data) {
//        if (err) throw err;
//        res.set({ 'Content-Type': 'text/plain' })
//        return res.send(data);
//   })
// })

app.listen(constants.port, () => Logger.info(`Listening on port ${constants.port}`))

module.exports = app
