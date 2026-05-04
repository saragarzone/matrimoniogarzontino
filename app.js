document.addEventListener("DOMContentLoaded", () => {

    // ===== COUNTDOWN =====
    const weddingDate = new Date("2026-09-11T17:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) {
            document.getElementById("countdown").innerHTML = "È il grande giorno! 🎉";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("countdown").innerHTML =
            `${days} giorni ${hours} ore ${minutes} minuti`;
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);


    // ===== FORM RSVP =====


    const addGuestBtn = document.getElementById("add-guest");

    addGuestBtn.addEventListener("click", () => {
        const container = document.getElementById("guests-container");

        const guestDiv = document.createElement("div");
        guestDiv.classList.add("guest");

        guestDiv.innerHTML = `
            <input type="text" name="guest_name[]" placeholder="Nome ospite">
            <select name="menu[]">
                <option value="">Menù</option>
                <option value="carne">Carne</option>
                <option value="vegano">Vegano</option>
            </select>
            <input type="text" name="allergies[]" placeholder="Allergie">
        `;

        container.appendChild(guestDiv);
    });

    // ===== SUBMIT FORM =====
    const form = document.getElementById("rsvp-form");

    form.addEventListener("submit", function () {
        setTimeout(() => {
            alert("Conferma ricevuta! 🎉");
            form.reset();
        }, 500);
    });


});
document.getElementById("room-btn").addEventListener("click", toggleRoomForm);

