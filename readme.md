# Struktur Proyek

Proyek ini memiliki struktur direktori yang terorganisir untuk memudahkan pengembangan dan pemeliharaan kode.

## Struktur Direktori

- **src**: Direktori utama yang berisi seluruh kode sumber proyek.
  - **config**: Konfigurasi proyek, seperti konfigurasi database dan RabbitMQ.
  - **controller**: Fungsi-fungsi pengendali (controllers) yang mengatur logika bisnis dan respons HTTP.
  - **helper**: Fungsi-fungsi bantuan dan utilitas yang dapat digunakan di seluruh proyek.
  - **migrations**: Berkas-berkas migrasi database untuk mengelola perubahan skema.
  - **model**: Model data yang merepresentasikan struktur tabel dalam database.
  - **request**: Validasi dan definisi skema data untuk permintaan HTTP.
  - **routes**: Definisi rute HTTP yang terkait dengan pengendali (controllers) tertentu.
  - **service**: Logika bisnis dan fungsi-fungsi yang mengelola interaksi dengan database dan layanan lainnya.

- **test**: Direktori yang berisi unit test untuk menguji fungsionalitas berbagai bagian kode.

## Penjelasan Struktur

- **config**: Direktori ini berisi konfigurasi proyek seperti pengaturan database dan RabbitMQ. Pengaturan ini biasanya dimuat dan digunakan oleh bagian lain dari proyek.

- **controller**: Direktori ini berisi pengendali (controllers) yang mengontrol alur logika bisnis dan mengelola respons HTTP. Setiap pengendali dapat bertanggung jawab untuk satu jenis entitas atau fitur tertentu.

- **helper**: Direktori ini berisi fungsi-fungsi bantuan dan utilitas yang dapat digunakan di seluruh proyek. Fungsi-fungsi ini biasanya digunakan untuk tugas-tugas umum seperti mengirim email, menghasilkan kode verifikasi, dll.

- **migrations**: Direktori ini berisi berkas-berkas migrasi database yang mengelola perubahan skema database. Setiap berkas migrasi biasanya mencakup satu perubahan skema atau tabel tertentu.

- **model**: Direktori ini berisi definisi model data yang merepresentasikan struktur tabel dalam database. Setiap model biasanya mencakup satu tabel atau entitas dalam basis data.

- **request**: Direktori ini berisi definisi skema data untuk permintaan HTTP. Skema ini digunakan untuk memvalidasi dan memproses data yang diterima dari permintaan pengguna.

- **routes**: Direktori ini berisi definisi rute HTTP yang terkait dengan pengendali (controllers) tertentu. Setiap berkas rute biasanya mencakup rute-rute yang berkaitan dengan satu pengendali.

- **service**: Direktori ini berisi logika bisnis dan fungsi-fungsi yang mengelola interaksi dengan database dan layanan lainnya. Fungsi-fungsi ini dapat dipanggil oleh pengendali atau bagian-bagian lain dari proyek.

- **test**: Direktori ini berisi unit test yang mencakup pengujian fungsionalitas berbagai bagian kode. Setiap berkas unit test dapat berkaitan dengan satu atau lebih bagian kode.


# Menggunakan Knex dalam Proyek

Proyek ini menggunakan Knex sebagai _query builder_ untuk mengelola kueri database PostgreSQL. Knex menyediakan cara yang ekspresif dan nyaman untuk berinteraksi dengan database.

## Cara Menggunakan Knex

1. **Instal Knex**: Pastikan Knex telah terinstal sebagai dependensi proyek. Jika belum, instal dengan perintah:

    ```bash
    npm install knex --save
    ```

2. **Konfigurasi Knex**: Pada direktori `src/config`, konfigurasi koneksi database terletak dalam file `databaseConfig.ts`. Pastikan konfigurasi tersebut sesuai dengan lingkungan pengembangan Anda.

3. **Gunakan Knex dalam Service atau Controller**: Dalam berkas service atau controller yang membutuhkan akses ke database, impor dan gunakan Knex sebagai berikut:

    ```typescript
    import { pool } from '../config/databaseConfig';
    import * as Knex from 'knex';

    // Contoh penggunaan Knex dalam sebuah service
    export const getUserList = async () => {
        const knex: Knex = await pool.connect();
        try {
            // Gunakan Knex untuk mengeksekusi kueri ke database
            const queryResult = await knex.select('*').from('users');

            return queryResult;
        } finally {
            knex.release();
        }
    };
    ```

4. **Gunakan Migrasi Database**: Knex juga mendukung migrasi database untuk mengelola perubahan skema. Migrasi dapat dijalankan dengan perintah:

    ```bash
    npx knex migrate:latest
    ```

    Perintah tersebut akan menjalankan seluruh berkas migrasi yang ada dalam direktori `src/migrations`.

5. **Gunakan Fungsi-Fungsi Knex Lainnya**: Knex menyediakan berbagai fungsi untuk membangun kueri seperti `select`, `insert`, `update`, `delete`, dan sebagainya. Pelajari lebih lanjut tentang fungsionalitas Knex pada [dokumentasi resmi](https://knexjs.org/).

Jika Anda belum familiar dengan Knex, disarankan untuk membaca dokumentasinya dan memahami cara penggunaannya untuk mengoptimalkan interaksi dengan database dalam proyek Anda.


## Requirement

- Node.js
- Typescript
- PostgreSQL
- RabbitMQ

## How to Install

1. Clone repository ini:

    ```bash
    git clone https://github.com/juanvaleriand/user-service.git
    cd user-service
    ```

2. Instal dependencies:

    ```bash
    npm install
    ```

3. Konfigurasi file `.env` sesuai dengan kebutuhan Anda. Contoh:

    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=user_db
    AMQP_HOST=localhost
    AMQP_PORT=5672
    AMQP_USERNAME=your_rabbitmq_username
    AMQP_PASSWORD=your_rabbitmq_password
    ```

4. Jalankan migrasi database:

    ```bash
    npx knex migrate:latest
    ```

## How to Run This Project

```bash
npm start
```

## How to Run Rabbitmq(Consumer)

```bash
npx ts-node src/helper/rabbitmq/consumer/verificationConsumer.ts
```

## How to Run Unit Test With Coverage

```bash
npm run test:coverage
```

## API Documentation

For detailed documentation on API endpoints, please refer to the [Postman Collection](https://documenter.getpostman.com/view/7215921/2s9YeK3A3r).
