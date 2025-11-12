export const run = {
   usage: ['autobackup', 'autodownload', 'antispam', 'chatbot', 'debug', 'groupmode', 'multiprefix', 'noprefix', 'online', 'self', 'games', 'verify', 'levelup', 'notifier'],
   use: 'on / off',
   category: 'owner',
   async: async (m, {
      client,
      args,
      command,
      isOperator,
      setting: system,
      Utils
   }) => {
      if (!args || !args[0]) return client.reply(m.chat, `🚩 *Current status* : [ ${system[command] ? 'ON' : 'OFF'} ] (Enter *On* or *Off*)`, m)
      if (!isOperator && command === 'autobackup') return m.reply(global.status.operator)
      if (!process.env.GOOGLE_API && command === 'chatbot') return m.reply(Utils.texted('bold', `🚩 GOOGLE_API isn't not set.`))
      const option = args[0].toLowerCase()
      const optionList = ['on', 'off']
      if (!optionList.includes(option)) return client.reply(m.chat, `🚩 *Current status* : [ ${system[command] ? 'ON' : 'OFF'} ] (Enter *On* or *Off*)`, m)
      let status = option != 'on' ? false : true
      if (system[command] == status) return client.reply(m.chat, Utils.texted('bold', `🚩 ${Utils.ucword(command)} has been ${option == 'on' ? 'activated' : 'inactivated'} previously.`), m)
      system[command] = status
      client.reply(m.chat, Utils.texted('bold', `🚩 ${Utils.ucword(command)} has been ${option == 'on' ? 'activated' : 'inactivated'} successfully.`), m)
   },
   owner: true
}