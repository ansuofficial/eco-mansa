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
            document.getElementById('numStudents').textContent = await getNumStudents(data)
            document.getElementById('amountGenerated').textContent = `D${await getTotalAmount(data)}`
            if (!Array.isArray(data) || data.length === 0) {
                console.error("Error: Invalid or empty data received.");
                return;
            }

            // Clear existing content
            datatablesSimple.querySelector('tbody').innerHTML = '';

            // Populate the table with new data
            data.forEach((element) => {
                const row = document.createElement("tr");
                const columns = ["fullname", "matNo", "contact", "major", "amount", "date", "gender","intake", "status"];
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

async function getNumStudents (data){
    if (data.length > 0 && data.length < 1000) {
        return `${data.length}`;
    }else if (data.length > 1000 && data.length < 100000){
        return `${data.length/1000}k`;
    }else if (data.length > 100000 && data.length < 1000000){
        return `${data.length/1000000}m`;
    }else if (data.length > 1000000 && data.length < 1000000000){
        return `${data.length/1000000}b`;
    }
}
async function getTotalAmount (data){
    let total_amount=0;
    data.forEach(element=>{
        total_amount+=element.amount
        
    })
    if (total_amount > 0 && total_amount < 1000) {
        return `${total_amount}`;
    }else if (total_amount > 1000 && total_amount < 100000){
        return `${total_amount/1000}k`;
    }else if (total_amount > 100000 && total_amount < 1000000){
        return `${total_amount/1000000}m`;
    }else if (total_amount > 1000000 && total_amount < 1000000000){
        return `${total_amount/1000000}b`;
    }
}
async function getTotalOwings (){

}