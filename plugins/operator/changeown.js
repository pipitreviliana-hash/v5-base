export const run = {
   usage: ['changeown'],
   use: 'old new pin',
   category: 'operator',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Utils
   }) => {
      try {
         if (!args || !args[0] || !args[1] || !args[2]) return m.reply(Utils.example(isPrefix, command, '6285xxxx 6282xxxx 1234'))
         await client.sendReact(m.chat, '🕒', m.key)
         const [oldNumber, newNumber, pin] = args
         const json = await client.changeOwner(oldNumber, newNumber, pin)
         if (!json.status) return m.reply(json.msg)
         m.reply(Utils.texted('bold', `✅ Owner number has been successfully changed. License in ./config.json has been successfully updated.`))
      } catch (e) {
         m.reply(Utils.jsonFormat(e))
      }
   },
   error: false,
   operator: true
}