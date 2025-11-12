## INFORMASI UPDATE – v5.1

Pada versi 5.1, mungkin masih terdapat beberapa bug setelah proses migrasi dari CJS ke ESM.
Jika menemukan error, silakan buka issue.

Harap diperhatikan:

- Button dan Interactive Message hanya didukung ketika menggunakan **@neoxr/baileys** atau versi Baileys yang sudah dimodifikasi.

- Baileys versi terbaru (v7) sudah tidak lagi mendukung untuk mengirim Button dan Interactive Message

### SETUP BOT

Sebelum melakukan instalasi modul dll, pastikan server yang digunakan memenuhi syarat sebagai berikut:

- [x] Server mendukung instalasi NodeJS >= 20
- [x] Server mendukung instalasi FFMPEG, Git, Canvas, Sharp dan SQLite
- [x] Server bisa untuk mengirim email (SMTP)
- [x] Server vCPU/RAM 1/1GB (Min)

Selanjutnya edit konfigurasi yang ada pada file [config.json](https://github.com/neoxr/v5.1-optima/blob/5.1-ESM/config.json) dan file [.env](https://github.com/neoxr/v5.1-optima/blob/5.1-ESM/.env)

Jika semua sudah, lakukan instalasi dengan menjalankan file [setup.sh](https://github.com/neoxr/v5.1-optima/blob/5.1-ESM/install.sh) menggunakan perintah:

```bash
$ bash setup.sh
```

Lakukan verifikasi lisensi dengan perintah berikut sampai muncul prompt "Passcode" dan masukkan pin

```bash
$ node .
```

Apabila sudah berhasil load semua plugin tekan **CTRL+C** dan jalankan bot menggunakan PM2 agar always on:

```bash
$ pm2 start pm2.config.cjs --only bot && pm2 logs bot
```

### SETUP BOT + GATEWAY (DASHBOARD)

Untuk setup bot sama seperti diatas jadi ini adalah tutorial setup gateway, sebelum melakukan hal lain pastikan port server tidak terhalang firewall dan mempunyai domain yang sudah di kaitkan dengan cloudflare.

Pasang domain di file [nuxt/nuxt.config.ts](https://github.com/neoxr/v5.1-optima/blob/5.1-ESM/nuxt/nuxt.config.ts) dan di file [.env](https://github.com/neoxr/v5.1-optima/blob/5.1-ESM/.env)

Setelah itu jalankan file [setup.sh](https://github.com/neoxr/v5.1-optima/blob/5.1-ESM/setup.sh), dengan perintah:

```bash
$ bash setup.sh domain port
```

Sebagai contoh konfigurasi .env nya seperti ini :

```.env
DOMAIN = 'https://bot.neoxr.eu'
PORT = 3001
JWT_SECRET = 'neoxr'
JWT_EXPIRY = '72h'
```

maka jalankan :

```bash
$ bash setup.sh bot.neoxr.eu 3001
```

kemudian generate template :

```bash
$ yarn run build
```

Selanjutnya buat A record di cloudflare dengan pointing ke IPv4 VPS nya

> [!NOTE]
> Jika menggunakan VPS hostdata tambahkan domain forwarding untuk http dan https

Apabila semua sudah, jalankan dengan perintah:

```bash
$ pm2 start pm2.config.cjs --only gateway && pm2 logs gateway
```