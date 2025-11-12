export const run = {
   usage: ['changepin'],
   use: 'old new',
   category: 'operator',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Utils
   }) => {
      try {
         if (!args || !args[0] || !args[1]) return m.reply(Utils.example(isPrefix, command, '1234 5678'))
         await client.sendReact(m.chat, '🕒', m.key)
         const [oldPin, newPin] = args
         const json = await client.changePin(oldPin, newPin)
         if (!json.status) return m.reply(json.msg)
         m.reply(Utils.texted('bold', `✅ Passcode/Pin has been successfully changed.`))
      } catch (e) {
         m.reply(Utils.jsonFormat(e))
      }
   },
   error: false,
   operator: true
}