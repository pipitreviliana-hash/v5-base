import { format } from 'date-fns'
import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'

export const run = {
   usage: ['license'],
   hidden: ['lsc'],
   category: 'operator',
   async: async (m, { client, Config }) => {
      await client.sendReact(m.chat, '🕒', m.key)

      const license = fs.existsSync('./license.json')
         ? JSON.parse(fs.readFileSync('./license.json'))
         : {}

      const json = await client.license(license)
      if (!json.status) return m.reply(json.msg)

      let pr = `▦ *Owner* : ${new PhoneNumber('+' + json.data.owner).getNumber('international')}\n`
      pr += `▦ *Pin* : ${json.data.pin}\n`
      pr += `▦ *Active* : ${json.data.is_active ? '√' : '×'}\n`
      pr += `▦ *Register* : ${format(new Date(json.data.created_at), 'EEEE, dd MMMM yyyy')}\n`
      pr += `▦ *Expired* : ${format(new Date(license?.expired_at || 0), 'EEEE, dd MMMM yyyy')}\n\n`
      pr += `> This license has an expiration date, but you're free to renew it anytime.`

      m.reply(pr)
   },
   error: false,
   operator: true,
   private: true
}
