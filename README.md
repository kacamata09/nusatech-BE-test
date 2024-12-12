### Pertama yang paling pertama
1. Buat salinan atau copy .env.example dan ubah nama .env
1. Buat semua environment yang anda mau di .env 
3. Jalankan command dibawah untuk menginstall semua module dependency
```
yarn
```

### Database migration
1. Buat database mysql sesuai dengan nama yang di .env
2. Jalankan command dibawah
```
yarn migrate:up
```
3. Jika mau rollback maka
```
yarn migrate:down
```

### Menjalankan aplikasi
Jalankan aplikasi di root directory aplikasinya
```
yarn start
```

