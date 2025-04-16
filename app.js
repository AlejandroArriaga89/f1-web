
async function fetchF1Data(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// 2. Mostrar próximas carreras
async function loadRaces() {
    const data = await fetchF1Data("https://api.openf1.org/v1/sessions?year=2025&session_type=Race");
    const races = data;
    const racesList = document.getElementById("races-list");

    races.forEach(race => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
            <strong>${race.location} ${race.country_name}</strong><br>
            <small>${race.country_code} (${race.date_start})</small>
        `;
        racesList.appendChild(listItem);
    });
}

// 3. Mostrar pilotos (ejemplo: temporada 2024)
async function loadDrivers() {
    const data = await fetchF1Data("https://api.openf1.org/v1/drivers?meeting_key=1257");
    const drivers = data;
    const driversTable = document.querySelector("#drivers-table tbody");

    drivers.forEach((driver, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${driver.full_name}</td>
            <td>${driver.driver_number || "N/A"}</td>
        `;
        driversTable.appendChild(row);
    });
}

// Cargar datos al iniciar
document.addEventListener("DOMContentLoaded", () => {
    loadRaces();
    loadDrivers();
});