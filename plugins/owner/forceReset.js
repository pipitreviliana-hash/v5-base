export const run = {
   usage: ['reset'],
   category: 'owner',
   async: async (m, {
      client,
      args,
      setting,
      hostJid,
      clientJid,
      findJid,
      Config,
      Utils
   }) => {
      try {
         let users = hostJid ? global.db.users : findJid.bot(clientJid) ? findJid.bot(clientJid)?.data?.users : global.db.users
         let chats = hostJid ? global.db.chats : findJid.bot(clientJid) ? findJid.bot(clientJid)?.data?.chats : global.db.chats
         users.filter(v => v.limit < Config.limit && !v.premium).map(v => v.limit = args[0] ? args[0] : Config.limit)
         users.filter(v => v.limit_game < Config.limit_game && !v.premium).map(v => v.limit_game = Config.limit_game)
         chats.map(v => v.lastreply = 0)
         setting.lastReset = new Date * 1
         client.reply(m.chat, Utils.texted('bold', `🚩 Successfully reset limit for user free to default.`), m)
      } catch (e) {
         return client.reply(m.chat, Utils.jsonFormat(e), m)
      }
   },
   owner: true
}