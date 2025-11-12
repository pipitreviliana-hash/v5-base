import { readFileSync as read } from 'fs'
import { parse } from 'flatted'

export const run = {
   usage: ['restore'],
   category: 'operator',
   async: async (m, {
      client,
      system,
      Utils
   }) => {
      try {
         if (m.quoted && /document/.test(m.quoted.mtype) && /json/.test(m.quoted.fileName)) {
            const fn = await Utils.getFile(await m.quoted.download())
            if (!fn.status) return m.reply(Utils.texted('bold', '🚩 File cannot be downloaded.'))
            global.db = parse(read(fn.file, 'utf-8'))
            m.reply('✅ Database was successfully restored.').then(async () => {
               await system.database.save(parse(read(fn.file, 'utf-8')))
            })
         } else m.reply(Utils.texted('bold', '🚩 Reply to the backup file first then reply with this feature.'))
      } catch (e) {
         return client.reply(m.chat, Utils.jsonFormat(e), m)
      }
   },
   operator: true
}