import axios from "axios"
import c from "../constants";
export default async function request(url: string, options:
    {
        endpoint?: boolean,
        kind?: string,
        tags?: string | string[],
        apikey?: string,
        limit?: number,
        useragent?: string
        animal?: string
    }) {

    switch (url) {
        case 'e621':
            if (!options.tags) throw Error("No Tags provided")
            let e6request = await axios({
                method: 'get',
                params: {
                    tags: `limit:${Number(options.limit) || 1} order:random -young ${options.tags.toString()}`,
                },
                url: `${c.e621}/posts.json`,
                headers: {
                    "User-Agent": `${c.useragent} ${options.useragent || ""}`,
                    ...(options.apikey ? {
                        "Authorization": options.apikey
                    } : {})
                }
            })
            return e6request.data.posts
        case 'e926':
            if (!options.tags) throw Error("No Tags provided")
            let e9request = await axios({
                method: 'get',
                params: {
                    tags: `limit:${Number(options.limit) || 1} order:random -young ${options.tags.toString()}`,
                },
                url: `${c.e926}/posts.json`,
                headers: {
                    "User-Agent": `${c.useragent} ${options.useragent || ""}`,
                    ...(options.apikey ? {
                        "Authorization": options.apikey
                    } : {})
                }
            })
            return e9request.data.posts


        case 'furrybot':
        case 'yiffrest':
            let yiffreq = await axios({
                method: 'get',
                url: `${c.yiffrest}/${options.kind}/${options.endpoint}`,
                headers: {
                    "User-Agent": `${c.useragent} ${options.useragent || ""}`,
                    ...(options.apikey ? {
                        "Authorization": options.apikey
                    } : {})
                }
            })
            return yiffreq.data
        case 'sheri':
            let sherireq = await axios({
                method: 'get',
                params: {
                    format: "json"
                },
                url: `${c.sheri}/${options.endpoint}`,
                headers: {
                    "User-Agent": `${c.useragent} ${options.useragent || ""}`,
                    ...(options.apikey ? {
                        "Authorization": options.apikey
                    } : {})
                }
            })
            return sherireq.data
        case 'floofy':
            let floofyreq = await axios({
                method: 'get',
                url: `${c.floofy}/yiff`,
                headers: {
                    "User-Agent": `${c.useragent} ${options.useragent || ""}`,
                    // ...(options.apikey ? {
                    //     "Authorization": options.apikey
                    // } : {})
                }
            })
            return floofyreq.data
        case 'shibe':
            let shibereq = await axios({
                method: 'get',
                url: `${c.shibe}/${options.animal}?count=${options.limit}&urls=true&httpsUrls=true`,
                headers: {
                    "User-Agent": `${c.useragent} ${options.useragent || ""}`,
                    // ...(options.apikey ? {
                    //     "Authorization": options.apikey
                    // } : {})
                }
            })
            return shibereq.data
        case 'fox':
            let randomfoxreq = await axios({
                method: 'get',
                url: `${c.fox}`,
                headers: {
                    "User-Agent": `${c.useragent} ${options.useragent || ""}`,
                    // ...(options.apikey ? {
                    //     "Authorization": options.apikey
                    // } : {})
                }
            })
            return randomfoxreq.data


        default:
            return {
                success: false,
                message: "No URL provided"
            }
    }


}