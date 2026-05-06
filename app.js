document.addEventListener("DOMContentLoaded", () => {
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

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);
});

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

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("show-iban-btn");
    const iban = document.getElementById("iban-text");

    btn.addEventListener("click", () => {
        if (iban.textContent === "") {
            iban.innerHTML = "IT22T0501801000000020001123<br>Banca Etica<br>Conto cointestato, potete scegliere uno dei due come destinatario";
            btn.textContent = "Nascondi IBAN";
        } else {
            iban.textContent = "";
            btn.textContent = "Mostra IBAN";
        }
    });
});

const numbers = [
  "+39 331 293 5719",
  "+39 351 201 8868"
];

const clean = n => n.replace(/\s/g, '');

document.getElementById("phone1").href = `tel:${clean(numbers[0])}`;
document.getElementById("phone1").textContent = numbers[0];

document.getElementById("phone2").href = `tel:${clean(numbers[1])}`;
document.getElementById("phone2").textContent = numbers[1];
