import fetch from 'node-fetch'
import crypto from 'crypto'

const createContentDigest = obj =>
  crypto
    .createHash(`md5`)
    .update(JSON.stringify(obj))
    .digest(`hex`)

exports.sourceNodes = async (
    { actions, createNodeId },
    { profile, name, count = 12}
) => {
    if (!name) {
      throw new Error('name is required.')
    }
  
    if (!profile) {
      throw new Error('profile is required.')
    }
  
    const { createNode } = actions
    
    const feed = await fetch(
        `https://api.github.com/users/${profile}/events?per_page=${count}`
    ).then(res => res.json())

    feed.forEach(item => {
        const nodeId = createNodeId(item.id)
        createNode({
            id: nodeId,
            parent: null,
            children: [],
            ...item,
            internal: {
                contentDigest: createContentDigest(item),
                type: `Feed${name}`
            }
        })
    })

    return
  }
