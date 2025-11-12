import { writeFileSync as create, readFileSync as read } from 'fs'
import { stringify } from 'flatted'

export const run = {
   usage: ['backup'],
   category: 'operator',
   async: async (m, {
      client,
      system,
      Config,
      Utils
   }) => {
      try {
         await client.sendReact(m.chat, '🕒', m.key)
         await system.database.save(global.db)
         create(Config.database + '.json', stringify(global.db), 'utf-8')
         await client.sendFile(m.chat, read('./' + Config.database + '.json'), Config.database + '.json', '', m)
      } catch (e) {
         return client.reply(m.chat, Utils.jsonFormat(e), m)
      }
   },
   operator: true
}