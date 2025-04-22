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
  const data = await fetchF1Data(
    "https://api.openf1.org/v1/sessions?year=2025&session_type=Race"
  );
  const races = data;
  const racesList = document.getElementById("races-list");
  console.log("ready");
  races.forEach((race) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item races";
    listItem.dataset.session_key = race.session_key;
    listItem.dataset.meeting_key = race.meeting_key;
    listItem.innerHTML = `
            <strong>${race.location} ${race.country_name}</strong><br>
            <small>${race.country_code} (${race.date_start})</small>
        `;
    racesList.appendChild(listItem);
  });
  addRaceClickListeners();
}

// 3. Mostrar pilotos (ejemplo: temporada 2024)
async function loadDrivers(session_key, meeting_key) {
  const data = await fetchF1Data(
    "https://api.openf1.org/v1/drivers?meeting_key=" +
      meeting_key +
      "&session_key=" +
      session_key
  );
  const drivers = data;
  const driversTable = document.querySelector("#drivers-table tbody");
  driversTable.innerHTML = "";
  drivers.forEach((driver, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td style="color: #${driver.team_colour}">${index + 1}</td>
            <td>${
              driver.full_name
            } <br> <span class="badge" style="background-color: #${
      driver.team_colour
    };">${driver.team_name}</span></td>
            <td>${driver.driver_number || "N/A"}</td>
        `;
    driversTable.appendChild(row);
  });
}

// Cargar datos al iniciar
document.addEventListener("DOMContentLoaded", () => {
  loadRaces();
});

function addRaceClickListeners() {
  const racesList = document.getElementById("races-list");

  racesList.addEventListener("click", (event) => {
    const clickedItem = event.target.closest(".races");
    if (clickedItem) {
      const sessionKey = clickedItem.dataset.session_key;
      const meetingKey = clickedItem.dataset.meeting_key;
      console.log(sessionKey);
      loadDrivers(sessionKey, meetingKey);
    }
  });
}
