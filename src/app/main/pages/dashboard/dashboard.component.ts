import { Component, OnInit } from '@angular/core';
import { App, Support } from '../../interfaces/app.interface';
import { AppsService } from '../../services/apps.service';

import Chart from 'chart.js/auto';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  public apps: App[] =[];
  public support: Support[] =[];
  public message: boolean = false;
  public chart: any;
  public chartDonut: any;
  public stageRequestCounts: { [key: string]: number } = {};

  constructor(
    private appsService: AppsService,
    private supportService: SupportService
  ){

  }
  ngOnInit(): void {
    this.appsService.getApps().subscribe( apps => {
      this.apps = apps;
      this.createChartStateApps();
      this.createChartsTechnologyApps();
    });

    this.supportService.getSupport().subscribe( res => {
      this.support = res;
      this.createChartSupport();
    })
  
  }

  createChartsTechnologyApps(){
    console.log(this.apps)
    const countApplicationsByTechnology = (apps: any[]): { [state: string]: number } => {
      const technologyCounts: { [state: string]: number } = {};
  
      this.apps.forEach((app) => {
          app.tecnology.forEach((stage: any) => {
              const state = stage.description;
              technologyCounts[state] = (technologyCounts[state] || 0) + 1;
          });
      });
  
      return technologyCounts;
  };  

  //Obtener el conteo de aplicaciones por tecnologia
  const technologyCounts = countApplicationsByTechnology(this.apps);
  
  // Preparar los datos para el gráfico
  const labels = Object.keys(technologyCounts);
  const data = Object.values(technologyCounts);
  
  // Crear el gráfico de donut
  this.chartDonut = new Chart("chartDonutTechnology", {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Proyectos por tecnologia',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
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
        }],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Proyectos por tecnologia',
            },
        },
    },
});
  }

  createChartStateApps(){
    const countApplicationsByState = (apps: any[]): { [state: string]: number } => {
      const stateCounts: { [state: string]: number } = {};
  
      this.apps.forEach((app) => {
          app.stage.forEach((stage: any) => {
              const state = stage.description;
              stateCounts[state] = (stateCounts[state] || 0) + 1;
          });
      });
  
      return stateCounts;
  };  

  //Obtener el conteo de aplicaciones por estado
  const stateCounts = countApplicationsByState(this.apps);
  
  // Preparar los datos para el gráfico
  const labels = Object.keys(stateCounts);
  const data = Object.values(stateCounts);
  
  // Crear el gráfico de donut
  this.chartDonut = new Chart("chartDonut", {
    type: 'doughnut',
    data: {
        labels: labels,
        datasets: [{
            label: 'Proyectos por estado',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
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
        }],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Proyectos por estado',
            },
        },
    },
});
  }

  createChartSupport(){
    this.support.forEach(app => {
      const stageRequest = app.stageRequest[0].description;
      if (this.stageRequestCounts[stageRequest]) {
          this.stageRequestCounts[stageRequest]++;
      } else {
          this.stageRequestCounts[stageRequest] = 1;
      }
    });
    // Crear etiquetas y datos para la gráfica de barras
    const labels = Object.keys(this.stageRequestCounts);
    const dataValues = Object.values(this.stageRequestCounts);
  
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Aplicaciones por estado de solicitud de soporte',
              data: dataValues,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }
}
