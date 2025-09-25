document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin-btn');
    const popup = document.getElementById('popup');

    // Array hadiah sesuai urutan pada roda (0-7)
    // $50 adalah hadiah di index ke-7
    const prizes = [10, 'Try Again', 20, '5% OFF', 'No Luck', 5, '10% OFF', 50];
    const grandPrizeIndex = 7; // Index untuk hadiah $50

    let isSpinning = false;

    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;

        // Tentukan hasil putaran. Untuk demonstrasi, kita akan membuatnya selalu menang.
        // Untuk acak sungguhan, gunakan: const resultIndex = Math.floor(Math.random() * prizes.length);
        const resultIndex = grandPrizeIndex;

        // Hitung derajat putaran
        const totalDegrees = 360 * 5; // 5 putaran penuh
        const prizeDegree = resultIndex * 45; // Setiap hadiah berjarak 45 derajat
        const randomOffset = Math.floor(Math.random() * 40 - 20); // Sedikit acak agar tidak selalu berhenti di tempat yang sama
        const finalDegree = totalDegrees + prizeDegree + randomOffset;
        
        // Atur transisi dan rotasi
        wheel.style.transition = 'transform 5s ease-in-out';
        wheel.style.transform = `rotate(${finalDegree}deg)`;

        // Setelah animasi selesai
        setTimeout(() => {
            isSpinning = false;
            wheel.style.transition = 'none';
            const actualRotation = finalDegree % 360;
            wheel.style.transform = `rotate(${actualRotation}deg)`;

            // Tampilkan popup jika menang hadiah utama
            if (resultIndex === grandPrizeIndex) {
                popup.classList.add('show');
            } else {
                // Tampilkan pesan lain jika tidak menang
                Swal.fire({
                    title: 'Oops!',
                    text: `You got: ${prizes[resultIndex]}. Better luck next time!`,
                    icon: 'info'
                });
            }

        }, 5500); // Waktu harus sedikit lebih lama dari durasi transisi
    });
});