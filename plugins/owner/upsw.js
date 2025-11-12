/* Note
 * This feature sometimes doesn't work, especially if it is used too often.
 */
export const run = {
   usage: ['upsw', 'upsws'],
   use: 'text or reply media',
   category: 'owner',
   async: async (m, {
      client,
      text,
      command,
      Utils
   }) => {
      try {
         const groups = Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1]).map(v => v.id)
         const groupJid = groups?.filter(v => !v.isCommunity && !v.announce)?.slice(0, 5)
         if (!groupJid?.length) return client.reply(m.chat, Utils.texted('bold', `🚩 Error, ID does not exist.`), m)
         const q = m.quoted ? m.quoted : m
         const mime = (q.msg || q).mimetype || ''
         if (/video|image\/(jpe?g|png)/.test(mime)) {
            client.sendReact(m.chat, '🕒', m.key)
            const buffer = await q.download()
            const fn = await Utils.getFile(buffer)
            const type = /video/.test(mime) ? 'video' : 'image'
            const { status } = await client.uploadStory(groupJid, {
               [type]: {
                  url: fn.file
               },
               caption: text || (q?.text || '')
            }, command === 'upsw' ? false : true)
            if (status === 1) return client.reply(m.chat, Utils.texted('bold', `✅ Successfully uploaded stories with tags to ${groupJid.length} groups.`), m)
            client.reply(m.chat, Utils.texted('bold', `❌ Unable to upload stories. Tagging failed in ${groupJid.length} groups.`), m)
         } else if (/audio/.test(mime)) {
            client.sendReact(m.chat, '🕒', m.key)
            const buffer = await q.download()
            const fn = await Utils.getFile(buffer)
            const { status } = await client.uploadStory(groupJid, {
               audio: {
                  url: fn.file,
                  ptt: true
               }
            }, command === 'upsw' ? false : true)
            if (status === 1) return client.reply(m.chat, Utils.texted('bold', `✅ Successfully uploaded stories with tags to ${groupJid.length} groups.`), m)
            client.reply(m.chat, Utils.texted('bold', `❌ Unable to upload stories. Tagging failed in ${groupJid.length} groups.`), m)
         } else if (text) {
            client.sendReact(m.chat, '🕒', m.key)
            const { status } = await client.uploadStory(groupJid, { text }, command === 'upsw' ? false : true)
            if (status === 1) return client.reply(m.chat, Utils.texted('bold', `✅ Successfully uploaded stories with tags to ${groupJid.length} groups.`), m)
            client.reply(m.chat, Utils.texted('bold', `❌ Unable to upload stories. Tagging failed in ${groupJid.length} groups.`), m)
         } else m.reply(Utils.texted('bold', `🚩 Use this command with text or by replying to an image, video or audio.`))
      } catch (e) {
         client.reply(m.chat, Utils.jsonFormat(e), m)
      }
   },
   owner: true
}