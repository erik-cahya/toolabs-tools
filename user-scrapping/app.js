// npm init -y
// npm install node-fetch

import fetch from "node-fetch";
import fs from "fs";

const BASE_URL = "https://www.toolabs.live/api/brewox/transactions";
const USER_URL = "https://www.toolabs.live/api/brewox/users";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJlcmlrLmNhaHlhODQxQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkVyaWsiLCJsYXN0TmFtZSI6IkNhaHlhIiwiaWF0IjoxNzU2MzExMzM2LCJleHAiOjE3NTYzMTIyMzZ9.yxsDgHPOIrmEkEsdrtR6Yupp4-EcHj7FvR4Kdcni5DA";

const headers = {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json"
};

async function getEmails() {
    const url = `${BASE_URL}?page=1&limit=100&startDate=2024-05-02&endDate=2024-05-02`;
    const res = await fetch(url, { headers });
    const data = await res.json();

    return [...new Set(data.data.transactions.map(t => t.email))];
}

async function getDetailsByEmail(email) {
    const url = `${BASE_URL}?page=1&limit=1&email=${encodeURIComponent(email)}`;
    const res = await fetch(url, { headers });
    const data = await res.json();

    if (!data.data || !data.data.transactions || data.data.transactions.length === 0) {
        return null;
    }

    const t = data.data.transactions[0];
    return {
        status: t.status,
        email: t.email,
        date: t.date,
        amount: t.amount
    };
}

async function getExpiredByEmail(email) {
    const url = `${USER_URL}?page=1&limit=1&search=${encodeURIComponent(email)}`;
    const res = await fetch(url, { headers });
    const data = await res.json();

    if (!data.data || !data.data.users || data.data.users.length === 0) {
        return null;
    }

    return data.data.users[0].expire_date || null; // sesuaikan field expired date
}

async function main() {
    const emails = await getEmails();
    console.log(`Ditemukan ${emails.length} email.`);

    let results = [];

    for (let email of emails) {
        console.log(`Ambil data untuk: ${email}`);
        let details = await getDetailsByEmail(email);
        let expired = await getExpiredByEmail(email);

        if (details) {
            results.push({
                ...details,
                expiredDate: expired
            });
        }
    }

    console.log("Hasil akhir:", results);

    // Simpan ke CSV
    let csv = "status | email | date | amount | expiredDate\n" +
        results.map(r => `${r.status} | ${r.email} | ${r.date} | ${r.amount} | ${r.expiredDate || "-"}`).join("\n");

    fs.writeFileSync("transactions.csv", csv);

    console.log("Data disimpan ke transactions.csv");
}

main().catch(err => console.error(err));
