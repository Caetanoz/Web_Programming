function LoadEventData(
    eventname,
    count,
    price,
    capacity,
    totalviews,
){
    chart1(eventname, count, price, totalviews);
    Eventsrecipe(count,price);
    chart5(eventname,capacity,count);

}


function chart1(name, price,count, totalviews){

const fullprice = (price * count);
   
const ctx = document.getElementById('eventchart').getContext('2d');

// Crie o objeto Chart com os dados e opções desejados
const eventchart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [name, "Total event views"],
    datasets: [
      {
        label: "Total",
        backgroundColor: ["#3e95cd", "#10e657"],
        data: [fullprice, totalviews]
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
    }
  }
});

}
function chart5(name,capacity, count) {
  const ctx = document.getElementById('eventcapacityChart').getContext('2d');
  const fullcapacity = Number(capacity) + Number(count);
  
  const eventcapacityChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: [name],
      datasets: [{
        label: 'Dados',
        data: [capacity],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: fullcapacity
        }
      }
    }
  });
}

function Eventsrecipe(count,price) {
  // Calcula a receita total
  const revenue = (count * price);

  // Exibe o resultado no elemento com o ID "localrecipe"
  const evntRecipeElement = document.getElementById('eventrecipe');
  evntRecipeElement.textContent = 'Receita Total: ' + revenue.toFixed(2) + '€'; 
}

function LoadLocalData(
  eventname,
  pricejuvenil,
  priceadult,
  pricesenior,
  countjuvenil,
  countadult,
  countsenior,
  totalviews,
  
){
  chart2( pricejuvenil, priceadult, pricesenior, countjuvenil, countadult, countsenior);
  chart3( countjuvenil, countadult, countsenior);
  chart4( eventname,totalviews);
  Localsrecipe(countjuvenil, countadult, countsenior, pricejuvenil, priceadult, pricesenior);

}

function chart2(pricejuvenil, priceadult, pricesenior, countjuvenil, countadult, countsenior) {
  const ctx = document.getElementById('LocalChart').getContext('2d');
  
  const totaljuvenil = (pricejuvenil * countjuvenil);
  const totaladult = (priceadult * countadult);
  const totalsenior = (pricesenior * countsenior);

  const LocalChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Juvenil', "Adult", "Senior"],
      datasets: [
        {
          label: "Tickets sold(€)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: [totaljuvenil, totaladult, totalsenior]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});
}

function chart3(countjuvenil, countadult, countsenior) {
  const ctx = document.getElementById('LocaldoughnutChart').getContext('2d');
  
  const LocaldoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Juvenil', 'Adult', 'Senior'],
      datasets: [{
        label: 'COUNT',
        data: [countjuvenil, countadult, countsenior],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
}

function chart4(eventname,totalviews) {
  const ctx = document.getElementById('LocalCountChart').getContext('2d');
  
  const LocalCountChart = new Chart(ctx,   
    {
      type: 'polarArea',
      data: {
        labels: [eventname],
        datasets: [{
          label: 'Total event views',
          data: [totalviews],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 0,
            suggestedMax: totalviews*2
          }
        }
      }
    });
}


function Localsrecipe(countjuvenil, countadult, countsenior, pricejuvenil, priceadult, pricesenior) {
  // Calcula a receita total
  const revenue = (countjuvenil * pricejuvenil) + (countadult * priceadult) + (countsenior * pricesenior);

  // Exibe o resultado no elemento com o ID "localrecipe"
  const localRecipeElement = document.getElementById('localrecipe');
  localRecipeElement.textContent = 'Receita Total: ' + revenue.toFixed(2) + '€'; 
}

