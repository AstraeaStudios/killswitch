/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import c from '../constants'
import { Posts } from './types'
type site = 'e621' | 'e926' | 'gelbooru' | 'furrybot' | 'yiffrest' | 'sheri' | 'floofy' | 'shibe' | 'fox' | 'thaldrin'

export default async function request (url: site, options:
{
	endpoint?: string
	category?: string
	tags?: string | string[]
	apikey?: string
	limit?: number
	useragent?: string
	animal?: string
}): Promise<unknown> {
	switch (url) {
		case 'e621': {
			if (!options.tags) throw Error('No Tags provided')
			let e6request: Posts = await fetch(`${c.e621}/posts.json?tags=limit:${Number(options.limit) || 1} order:random -young ${options.tags.toString()}`, {
				method: FetchMethods.Get,
				headers: {
					'User-Agent': `${c.useragent} ${options.useragent ?? ''}`,
					...(options.apikey
						? {
							Authorization: options.apikey
						}
						: {})
				}
			}, FetchResultTypes.JSON)
			return e6request.posts
		}
		/* case 'gelbooru': {
			if (!options.tags) throw Error('No Tags provided')
			console.log(`sort:random+${options.tags.toString().split(' ').join('+')}`)
			let gelboorureq = await axios({
				method: 'get',
				url: `${c.gelbooru}/index.php?page=dapi&s=post&json=1&q=index&limit=${Number(options.limit) || 1}&tags=sort:random+${options.tags.toString().split(' ').join('+')}`,
				headers: {
					'User-Agent': `${c.useragent} ${options.useragent ?? ''}`,
					...(options.apikey
						? {
							Authorization: options.apikey
						}
						: {})
				}
			})
			return gelboorureq.data } */
		case 'e926': {
			if (!options.tags) throw Error('No Tags provided')
			let e6request: Posts = await fetch(`${c.e926}/posts.json?tags=limit:${Number(options.limit) || 1} order:random -young ${options.tags.toString()}`, {
				method: FetchMethods.Get,
				headers: {
					'User-Agent': `${c.useragent} ${options.useragent ?? ''}`,
					...(options.apikey
						? {
							Authorization: options.apikey
						}
						: {})
				}
			}, FetchResultTypes.JSON)
			return e6request.posts }

		/* case 'furrybot':
		case 'yiffrest': {
			let yiffreq = await axios({
				method: 'get',
				url: `${c.yiffrest}/${options.category}/${options.endpoint}`,
				headers: {
					'User-Agent': `${c.useragent} ${options.useragent ?? ''}`,
					...(options.apikey
						? {
							Authorization: options.apikey
						}
						: {})
				}
			})
			return yiffreq.data } */
		/* case 'sheri': {
			let sherireq = await axios({
				method: 'get',
				params: {
					format: 'json'
				},
				url: `${c.sheri}/${options.endpoint}`,
				headers: {
					'User-Agent': `${c.useragent} ${options.useragent ?? ''}`,
					...(options.apikey
						? {
							Authorization: options.apikey
						}
						: {})
				}
			})
			return sherireq.data } */
		case 'floofy': {
			let e6request: Posts = await fetch(`${c.floofy}/yiff`, {
				method: FetchMethods.Get,
				headers: {
					'User-Agent': `${c.useragent} ${options.useragent ?? ''}`
				}
			}, FetchResultTypes.JSON)
			return e6request.posts }
		/* case 'shibe': {
			let shibereq = await axios({
				method: 'get',
				url: `${c.shibe}/${options.animal}?count=${options.limit}&urls=true&httpsUrls=true`,
				headers: {
					'User-Agent': `${c.useragent} ${options.useragent ?? ''}`
					// ...(options.apikey ? {
					//     "Authorization": options.apikey
					// } : {})
				}
			})
			return shibereq.data } */
		/* case 'fox': {
			let randomfoxreq = await axios({
				method: 'get',
				url: `${c.fox}`,
				headers: {
					'User-Agent': `${c.useragent} ${options.useragent ?? ''}`
					// ...(options.apikey ? {
					//     "Authorization": options.apikey
					// } : {})
				}
			})
			return randomfoxreq.data } */
		/* case 'thaldrin': {
			let thaldrinreq = await axios({
				method: 'get',
				url: `${c.thaldrin}/categories/${options.endpoint}`,
				headers: {
					'User-Agent': `${c.useragent} ${options.useragent ?? ''}`,
					...(options.apikey
						? {
							Authorization: options.apikey
						}
						: {})
				}
			})
			return thaldrinreq.data } */
		default:
			return {
				success: false,
				message: 'No URL provided'
			}
	}
}
