import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';



@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.css'],
  encapsulation: ViewEncapsulation.None // <--- check this out
})
export class LinearChartComponent implements OnInit, OnChanges {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private margin: any = { top: 20, right: 20, bottom: 50, left: 70 };
  private chart: any;
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private lineValue: any;
  private xAxis: any;
  private yAxis: any;
  private svg: any;
  constructor() {
  }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = this.svg.append('g')
      .attr('class', 'linear')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.x = d3.scaleTime().range([0, this.width]);

    this.y = d3.scaleLinear().range([this.height, 0]);

    this.xAxis = d3.axisBottom(this.x);


    this.yAxis = d3.axisLeft(this.y);

    this.lineValue = d3.line<any>()
      .x((d) => this.x(d.Date))
      .y((d) => this.y(d.Close));

  }

  updateChart() {
    this.svg.selectAll('*').remove();

    // Get the data
    this.data.forEach((d) => {
      d.Date = new Date(d.Date);
      d.Close = Number(d.Close);
    });


    // Scale the range of the data
    this.x.domain(d3.extent(this.data, d => d.Date));

    this.y.domain([d3.min(this.data, d => d.Close), d3.max(this.data, d => d.Close)]);

    // Add the valueline path.
    this.svg.append('path')
      .data([this.data])
      .attr('transform', `translate(${this.margin.left + 1}, 0)`)
      .attr('class', 'line')
      .attr('d', this.lineValue);


    // Add the x Axis
    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.x).ticks(this.data.length / 3).tickFormat(d3.timeFormat('%y-%m-%d')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');


    // Add the y Axis
    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.y));
    // text label for the y axis
    this.svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.lef)
      .attr('x', 0 - (this.height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Price');
  }

}
