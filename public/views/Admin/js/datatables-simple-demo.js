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

async function getGenderData (){
    const data = await getStudentData("/students");

    // Calculate data for doughnut chart (gender)
     const genderData = {
        male: data.filter(student => student.gender === 'Male').length,
        female: data.filter(student => student.gender === 'Female').length
    };
   
    return  genderData
}
async function getMajorData (){
    const data = await getStudentData("/students");
    majorsData = {};
    data.forEach(student => {
        majorsData[student.major] = (majorsData[student.major] || 0) + 1;
    });
   return majorsData;
}

async function createBarCharts(dataNeeded){
    const barCtx = document.getElementById('bar');
    
    new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['BPA', 'Finance', 'Management', 'Economics'],
      datasets: [{
          label: 'Schools',
          backgroundColor: "#ffffff",
          
          data: [21,15,19,18],
          borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
        beginAtZero: true,
        ticks: {
            color: 'white' // set y-axis label color to white
        }
    },
      x: {
          ticks: {
              color: 'white' // set x-axis label color to white
            }
        }
      },plugins: {
          legend: {
          labels: {
            color: 'white' // set legend label color to white
          }
        }
      }
    }
});
}
async function createDoughnutCharts(dataNeeded){
    const doughnutCtx = document.getElementById('pie');
       
    
    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: ["Male", "Female"],
          datasets: [{
            label: 'Gender',
            data: [3, 0],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
             y: {
            beginAtZero: true,
            ticks: {
              color: 'white' // set y-axis label color to white
            }
          },
          x: {
            ticks: {
              color: 'white' // set x-axis label color to white
            }
          }
          },plugins: {
            legend: {
              labels: {
                color: 'white' // set legend label color to white
              }
            }
          }
        }
      });
}

createBarCharts()
createDoughnutCharts()



