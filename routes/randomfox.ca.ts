// @ts-expect-error
import { Request, Response } from 'express'
import Logger from '../utils/logger'
import request from '../utils/request'
const paths = [
	'/fox'
]

async function handler (req: Request, res: Response): Promise<void> {
	// console.log(req.body)
	// console.log(req.query)

	let useragent = req.body.useragent

	let response

	try {
		response = await request('fox', {
			useragent
		})
	} catch (error) {
		Logger.error(error)
		response = {
			success: false,
			error: {
				msg: error.message
			}
		}
	}
	res.send(response)
}

export {
	paths,
	handler
}
