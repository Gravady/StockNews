//chart.js

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
	ctx = document.getElementById('testChart');
}
function clearChart(){
	chartParent.removeChild(ctx);
	ctx = document.createElement('canvas');
	ctx.id = "testChart";
	ctx.ondrop = dropHandler;
	ctx.ondragover = dragoverHandler;
	chartParent.appendChild(ctx);
	changeShart();
	console.log("chart cleared");
}

document.addEventListener("DOMContentLoaded", () => {
	clearChart();
	createChart({x1: 105, x2: 150, x3: 165, x4: 143, x5: 200, y1: 1, y2: 2, y3: 3, y4: 4, y5: 5}, true, 16);
})
 
function createChart(data, numbers, size){
	displayNumbers = numbers;
	if (size + "" != "NaN"){
		numbersSize = size;
	}
  
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
		},
	});
}
