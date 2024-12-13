document.querySelector("#registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const date = document.querySelector("#date").value;
    const eventName = document.querySelector("#eventName").value;

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, date, eventName })
        });

        const result = await response.json();
        const responseMessage = document.querySelector("#responseMessage");
        responseMessage.innerText = result.message 
            ? `Success! Ticket Number: ${result.ticketNumber}` 
            : `Error: ${result.error}`;
    } catch (error) {
        console.error("Error:", error);
    }
});
