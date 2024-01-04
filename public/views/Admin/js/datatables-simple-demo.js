window.addEventListener('DOMContentLoaded', async (event) => {
    const datatablesSimple = document.getElementById('datatablesSimple');

    if (!datatablesSimple) {
        console.error("Error: Unable to find the DataTable element.");
        return;
    }

    let dataTableInstance;

    const populateTable = async () => {
        try {
            const data = await getStudentData("/students");

            if (!Array.isArray(data) || data.length === 0) {
                console.error("Error: Invalid or empty data received.");
                return;
            }

            // Clear existing content
            datatablesSimple.querySelector('tbody').innerHTML = '';

            // Populate the table with new data
            data.forEach((element) => {
                const row = document.createElement("tr");
                const columns = ["fullname", "email", "matNo", "amount", "lastPayment", "status"];
                columns.forEach((column) => {
                    const cell = document.createElement("td");
                    cell.textContent = element[column];
                    row.appendChild(cell);
                });

                datatablesSimple.querySelector('tbody').appendChild(row);
            });

            // Destroy existing DataTable instance
            if (dataTableInstance) {
                dataTableInstance.destroy();
            }

            // Initialize DataTable
            dataTableInstance = new simpleDatatables.DataTable(datatablesSimple);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Initial population
    populateTable();

    // Add event listener to refresh the table when needed
    document.getElementById('refreshButton').addEventListener('click', populateTable);
});

// Function to fetch student data from an API
async function getStudentData(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            // Add any headers or other options as needed
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}
