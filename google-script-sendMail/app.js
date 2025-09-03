function kirimEmailToolabs() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var email = data[i][0];   // Kolom 1 = Email
    var nama = data[i][1];    // Kolom 2 = Nama

    var subject = "Kami rindu melihat aktivitasmu di Toolabs!";

    var htmlBody = `
      <p>Halo ${nama},</p>

      <p>Kami perhatikan sudah cukup lama kamu belum menggunakan <b>Toolabs</b>. Kami rindu melihat aktifitas hebatmu berkembang di sini!</p>

      <p>Apa yang membuatmu berhenti atau belum sempat kembali menggunakan Toolabs? Jawaban kamu akan membantu kami memberikan pengalaman yang lebih baik lagi untukmu.</p>

      <p><b>Butuh bantuan atau ingin berbagi saran langsung?</b><br>
      Email komunikasi utama: <a href="mailto:toolabs.care@gmail.com">toolabs.care@gmail.com</a><br>
      Email aktivasi akun: <a href="mailto:hello@toolabs.live">hello@toolabs.live</a><br>
      WhatsApp: <a href="https://wa.me/6281399839938">+62 813-9983-9938</a><br>
      Survey feedback: <a href="https://forms.gle/eATXQYudmHx1eTuz7">Klik di sini</a></p>

      <h3>Apa yang baru di Toolabs?</h3>
      <ul>
        <li>Tampilan baru dengan extension terbaru → <a href="https://www.toolabs.live/">www.toolabs.live</a></li>
        <li>Penambahan paket dengan berbagai tools baru sesuai kebutuhanmu</li>
        <li>Peningkatan performa dashboard dan ekstensi agar lebih cepat</li>
        <li>Update yang mempermudah aktivitasmu sehari-hari</li>
      </ul>

      <p><h3>Ikuti Toolabs di:</h3><br>
      Instagram → <a href="https://www.instagram.com/toolabs.live/">@toolabs.live</a><br>
      TikTok → <a href="https://www.tiktok.com/@toolabs.live">@toolabs.live</a><br>
      YouTube → <a href="https://www.youtube.com/@toolabs-live">Toolabs Live</a><br>
      WA Channel → <a href="https://whatsapp.com/channel/0029Vac7bEfDOQIbnI7hvv1E">Join di sini</a></p>

      <p>Kami tunggu kamu kembali dan semoga kita bisa terus bertumbuh bersama!</p>

      <p>Salam hangat,<br>
      <b>Tim Toolabs</b></p>
    `;

    if (email) {
      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: htmlBody
      });
    }
  }
}



// Jalankan di google sheet -> extension -> app script
