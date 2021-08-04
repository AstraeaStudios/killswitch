export interface Posts {
	posts: Post
}
export interface Post {
	id: number
	created_at: Date
	updated_at: Date
	file: {
		width: number
		height: number
		ext: string
		size: number
		md5: string
		url: string
	}
	preview: {
		width: number
		height: number
		url: string
	}
	sample: {
		has: true
		height: number
		width: number
		url: string
		alternates: Record<string, unknown>
	}
	score: {
		up: number
		down: number
		total: number
	}
	tags: {
		general: string[]
		species: string[]
		character: string[]
		copyright: string[]
		artist: string[]
		invalid: unknown[]
		lore: string[]
		meta: unknown[]
	}
	locked_tags: []
	change_seq: number
	flags: {
		pending: boolean
		flagged: boolean
		note_locked: boolean
		status_locked: boolean
		rating_locked: boolean
		deleted: boolean
	}
	rating: string
	fav_count: number
	sources: string[]
	pools: string[]
	relationships: {
		parent_id: null
		has_children: boolean
		has_active_children: boolean
		children: string[]
	}
	approver_id: number
	uploader_id: number
	description: string
	comment_count: number
	is_favorited: boolean
	has_notes: boolean
	duration: null
}
