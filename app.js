document.addEventListener("DOMContentLoaded", () => {
    const weddingDate = new Date("2026-09-11T17:00:00").getTime();

    function updateCountdown() {
        const countdown = document.getElementById("countdown");
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");

        if (!countdown || !daysEl || !hoursEl || !minutesEl) return;

        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) {
            countdown.innerHTML = "È il grande giorno! 🎉";
            return;
        }

        daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
        hoursEl.textContent = String(
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0");

        minutesEl.textContent = String(
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);

    const form = document.getElementById("rsvp-form");
    const addParticipantBtn = document.getElementById("add-participant");
    const participantsContainer = document.getElementById("participants-container");
    const attendance = document.getElementById("attendance");
    const weddingFields = document.getElementById("wedding-fields");

    function createParticipantRow(showMenu = false) {
        return `
            <div class="participant-row ${showMenu ? "with-menu" : ""}">
                <input
                    type="text"
                    name="guest_name[]"
                    placeholder="Nome e cognome invitato"
                    required
                >

                <select
                    name="guest_menu[]"
                    class="guest-menu"
                    ${showMenu ? "required" : ""}
                >
                    <option value="">Menu</option>
                    <option value="carne">Carne</option>
                    <option value="vegetariano">Vegetariano</option>
                </select>

                <button type="button" class="remove-btn">×</button>
            </div>
        `;
    }

    function toggleWeddingFields() {
        if (!attendance || !weddingFields) return;

        const show = attendance.value === "yes";

        weddingFields.classList.toggle("show", show);

        document.querySelectorAll(".participant-row").forEach(row => {
            row.classList.toggle("with-menu", show);

            const menu = row.querySelector(".guest-menu");

            if (menu) {
                if (show) {
                    menu.setAttribute("required", "required");
                } else {
                    menu.removeAttribute("required");
                    menu.value = "";
                }
            }
        });
    }

    if (addParticipantBtn && participantsContainer) {
        addParticipantBtn.addEventListener("click", () => {
            const showMenu = attendance && attendance.value === "yes";

            participantsContainer.insertAdjacentHTML(
                "beforeend",
                createParticipantRow(showMenu)
            );
        });

        participantsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove-btn")) {
                const row = e.target.closest(".participant-row");
                if (row) row.remove();
            }
        });
    }

    if (attendance && weddingFields) {
        attendance.addEventListener("change", toggleWeddingFields);
        toggleWeddingFields();
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            if (attendance && attendance.value === "yes") {
                const guests = document.querySelectorAll(".participant-row");

                for (const row of guests) {
                    const name = row.querySelector('input[name="guest_name[]"]');
                    const menu = row.querySelector('select[name="guest_menu[]"]');

                    if (name && !name.value.trim()) {
                        alert("Inserisci il nome di tutti gli invitati");
                        name.focus();
                        e.preventDefault();
                        return;
                    }

                    if (menu && !menu.value.trim()) {
                        alert("Scegli il menu per tutti gli invitati");
                        menu.focus();
                        e.preventDefault();
                        return;
                    }
                }
            }

            setTimeout(() => {
                alert("Conferma ricevuta! 🎉");
                form.reset();

                if (weddingFields) {
                    weddingFields.classList.remove("show");
                }

                if (participantsContainer) {
                    participantsContainer.innerHTML = "";
                }
            }, 500);
        });
    }

    const roomBtn = document.getElementById("room-btn");
    const roomFields = document.getElementById("room-fields");

    if (roomBtn && roomFields) {
        roomBtn.addEventListener("click", () => {
            roomFields.classList.toggle("show");

            roomBtn.textContent = roomFields.classList.contains("show")
                ? "Nascondi richiesta stanza"
                : "Voglio una stanza medievale";
        });
    }
    
    const btn = document.getElementById("show-iban-btn");
    const iban = document.getElementById("iban-text");

    if (btn && iban) {
        btn.addEventListener("click", () => {
            if (iban.textContent.trim() === "") {
                iban.innerHTML = "IT22T0501801000000020001123<br>Banca Etica<br>Conto cointestato, potete scegliere uno dei due come destinatario";
                btn.textContent = "Nascondi IBAN";
            } else {
                iban.textContent = "";
                btn.textContent = "Mostra IBAN";
            }
        });
    }

    const numbers = [
        "+39 331 293 5719",
        "+39 351 201 8868"
    ];

    const clean = n => n.replace(/\s/g, "");

    const phone1 = document.getElementById("phone1");
    const phone2 = document.getElementById("phone2");

    if (phone1) {
        phone1.href = `tel:${clean(numbers[0])}`;
        phone1.textContent = numbers[0];
    }

    if (phone2) {
        phone2.href = `tel:${clean(numbers[1])}`;
        phone2.textContent = numbers[1];
    }
});

