import { Chart } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement
);


let ctx = document.getElementById('stock_canvas');
const chartParent = document.getElementById('stock_map_ui');
let chart1 = undefined;
let displayNumbers = false;
let numbersSize = 20;

      export function changeShart(){
        ctx = document.getElementById('stock_canvas');
      }
      function clearChart(){
        chartParent.removeChild(ctx);
        ctx = document.createElement('canvas');
        ctx.id = "stock_canvas";
        chartParent.appendChild(ctx);
        changeShart();
        console.log("chart cleared");
      }
      
      document.addEventListener("DOMContentLoaded", () => {
        clearChart();
        createChart({x1: 1, x2: 2, x3: 3, x4: 4, x5: 5, y1: 1, y2: 2, y3: 3, y4: 4, y5: 5}, true, 16);
        console.log("chart created");
      })

      function createChart(data, numbers, size){
        console.log("Creating chart");
        displayNumbers = numbers;
        if (size + "" != "NaN"){
          numbersSize = size;
        }
        console.log(numbersSize)
        chart1 = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [data.x1, data.x2, data.x3, data.x4, data.x5],
            datasets: [{
              label: 'Share price',
              data: [data.y1, data.y2, data.y3, data.y4, data.y5],
              borderWidth: 1,
              borderColor: 'rgb(0, 255, 38)',
              backgroundColor: 'rgb(0, 255, 38)',
            }]
          },
          options: {
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                ticks: {
                  display: displayNumbers,
                  color: 'white',
                  font: {
                    size: numbersSize
                  },
                },
              },
              y: {
                beginAtZero: false,
                ticks: {
                  display: displayNumbers,
                  color: 'white',
                  font: {
                    size: numbersSize
                  },
                },
              }
            }
          }
        });
      }