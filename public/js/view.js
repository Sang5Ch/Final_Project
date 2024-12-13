const output = document.querySelector("#output");

document.querySelector("#viewAll").addEventListener("click", async function () {
    try {
        const response = await fetch("/api/registrations");
        const registrations = await response.json();
        displayResults(registrations);
    } catch (error) {
        console.error("Error:", error);
    }
});

document.querySelector("#searchByName").addEventListener("click", async function () {
    const name = document.querySelector("#searchName").value;
    if (!name) return;

    try {
        const response = await fetch(`/api/registrations/byname/${name}`);
        const results = await response.json();
        displayResults(results);
    } catch (error) {
        console.error("Error:", error);
    }
});

document.querySelector("#searchByEvent").addEventListener("click", async function () {
    const eventName = document.querySelector("#searchEvent").value;
    if (!eventName) return;

    try {
        const response = await fetch(`/api/registrations/event/${eventName}`);
        const results = await response.json();
        displayResults(results);
    } catch (error) {
        console.error("Error:", error);
    }
});

document.querySelector("#deleteTicketButton").addEventListener("click", async function () {
    const ticketNumber = document.querySelector("#deleteTicket").value;
    if (!ticketNumber) return;

    try {
        const response = await fetch(`/api/registrations/${ticketNumber}`, { method: "DELETE" });
        const result = await response.json();
        output.innerText = result.message || result.error;
    } catch (error) {
        console.error("Error:", error);
    }
});

function displayResults(results) {
    if (!results || results.length === 0) {
        output.innerHTML = "<p>No results found.</p>";
        return;
    }

    output.innerHTML = `<ul>${results.map(result => `<li>${JSON.stringify(result)}</li>`).join("")}</ul>`;
}
