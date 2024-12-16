
import React, { useEffect, useState } from 'react'
import { Bar,PolarArea ,Scatter ,Radar ,Doughnut ,Pie ,Line  } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import dayjs from 'dayjs';
import axios from 'axios';


function Dashboard() {
  const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Récupérer les données
         axios.get('http://localhost:4000/api/Poule/chartPouleCa')
            .then((response) => {
                const categories = response.data.map((item) => item.categorie);
                const values = response.data.map((item) => item.total);

                // Préparer les données pour le graphique
                const data = {
                    labels: categories,
                    datasets: [
                        {
                            label: 'Nombre de poules par catégorie',
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                };
                setChartData(data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }, []);

    const options = {
      responsive: true,
      plugins: {
          legend: {
              display: true,
              position: 'top',
          },
      },
      scales: {
          x: {
              beginAtZero: true,
          },
          y: {
              beginAtZero: true,
          },
      },
  };

  


  const datap = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      label: 'Votes',
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 2,
      
    }]
  };
  const datad = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      label: 'Votes',
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };
  const datar = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Working', 'Coding'],
    datasets: [
      {
        label: 'Person A',
        data: [65, 59, 90, 81, 56],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)'
      },
      {
        label: 'Person B',
        data: [28, 48, 40, 19, 96],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)'
      }
    ]
  };
  const datas = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: [
          { x: -10, y: 0 },
          { x: 0, y: 10 },
          { x: 10, y: 5 },
          { x: 0.5, y: 5.5 }
        ],
        backgroundColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };
  const dataP = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [{
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ]
    }]
  };

  useEffect(()=>{
    return () =>{
    if (Chart.instances.length > 0){
      Chart.instances.forEach((chartInstance) => chartInstance.destroy())
    }
  }
  },[])


  //test taux mortalite
  const datal = [
    { date: "2024-10-01", mortalité: 2 },
    { date: "2024-10-02", mortalité: 1 },
    { date: "2024-10-03", mortalité: 3 },
    { date: "2024-10-04", mortalité: 0 },
    { date: "2024-10-05", mortalité: 5 },
    { date: "2024-10-06", mortalité: 4 },
    { date: "2024-10-07", mortalité: 1 },
  ];

  const processData = (data) => {
    const mortalityData = {};
    
    datal.forEach(item => {
      const date = dayjs(item.date).format('YYYY-MM-DD');
      if (!mortalityData[date]) {
        mortalityData[date] = 0;
      }
      mortalityData[date] += item.mortalité;
    });

    return {
      labels: Object.keys(mortalityData),
      datasets: [
        {
          label: 'Nombre de mortalités par jour',
          data: Object.values(mortalityData),
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        }
      ]
    };
  };



  
  return (
  
<div className="content-wrapper">
  <div className="row">
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body" style={{ marginTop:100}}>
          <h4 className="card-title">Line chart</h4>
          {/* <canvas id="lineChart"></canvas> */}
          {chartData && <Bar data={chartData} options={options} />}
        </div>
      </div>
    </div>
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Line chart</h4>
          {/* <canvas id="lineChart"></canvas> */}
          <PolarArea data={dataP}  />
        </div>
      </div>
    </div>
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Line chart</h4>
          {/* <canvas id="lineChart"></canvas> */}
          <Scatter data={datas} />
        </div>
      </div>
    </div>
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Line chart</h4>
          {/* <canvas id="lineChart"></canvas> */}
          <Doughnut data={datad}  />
        </div>
      </div>
    </div>
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Line chart</h4>
          {/* <canvas id="lineChart"></canvas> */}
          <Pie data={datap} options={options} />
        </div>
      </div>
    </div>
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Line chart</h4>
          {/* <canvas id="lineChart"></canvas> */}
          <Line data={processData(datal)} options={options} />
        </div>
      </div>
    </div>

    

    
  <div className="row"></div>
            <div className="theme-setting-wrapper">
    <div id="settings-trigger"><i className="typcn typcn-cog-outline"></i></div>
    <div id="theme-settings" className="settings-panel">
      <i className="settings-close typcn typcn-delete-outline"></i>
      <p className="settings-heading">SIDEBAR SKINS</p>
      <div className="sidebar-bg-options" id="sidebar-light-theme">
        <div className="img-ss rounded-circle bg-light border mr-3"></div>
        Light
      </div>
      <div className="sidebar-bg-options selected" id="sidebar-dark-theme">
        <div className="img-ss rounded-circle bg-dark border mr-3"></div>
        Dark
      </div>
      <p className="settings-heading mt-2">HEADER SKINS</p>
      <div className="color-tiles mx-0 px-4">
        <div className="tiles success"></div>
        <div className="tiles warning"></div>
        <div className="tiles danger"></div>
        <div className="tiles primary"></div>
        <div className="tiles info"></div>
        <div className="tiles dark"></div>
        <div className="tiles default border"></div>
      </div>
    </div>
  </div>
</div>
</div>

 
  )
}

export default Dashboard