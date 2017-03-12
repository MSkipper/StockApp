import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input,
         ViewEncapsulation, HostListener } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.css'],
  host: {'(window:resize)': 'onResize($event)'},
  encapsulation: ViewEncapsulation.None
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
  private resizeChart: (event: any) => void;

  private readonly scaleModifier = 5
  constructor() {

  }

  onResize(event) {
    this.createChart();
    this.updateChart();
  }

  ngOnInit() {
    this.initChart();
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

  initChart() {
    this.svg = d3.select(this.chartContainer.nativeElement).append('svg')
    this.chart = this.svg.append('g')
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    this.chart
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
    d3.select(".graph-tooltip").remove();

    this.data.forEach((d) => {
      d.Date = new Date(d.Date);
      d.Close = Number(d.Close);
    });

    this.data.sort(function(a, b) {
      return a.Date - b.Date;
    });

    this.x.domain(d3.extent(this.data, d => d.Date));
    this.y.domain([d3.min(this.data, d => d.Close), d3.max(this.data, d => d.Close) + this.scaleModifier]);

    this.svg.append('path')
      .datum(this.data)
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .attr('class', 'line')
      .attr('d', this.lineValue)

    const focus = this.svg.append("g")
    .attr("class", "focus")
    .style("display", "none");

    const div = d3.select("body").append("div")
    .attr("class", "graph-tooltip")
    .style("opacity", 0);

    focus.append("circle")
    .attr("r", 4.5);

    focus.append("text")
    .attr("x", 9)
    .attr("dy", ".35em");

    this.svg.append("rect")
    .attr("class", "overlay")
    .attr('transform', `translate(${this.margin.left}, 0)`)
    .attr("width", this.width)
    .attr("height", this.height)
    .on("mouseover", function() { focus.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); })
    .on("mousemove", onMouseMove)
    .on('click', onMouseClick)
    const bisectDate = d3.bisector(function(d: any) { return d.Date; }).left;
    const formatValue = d3.format(",.2f");
    const formatCurrency = function(d) { return formatValue(d); };

    const setFocus = (eventElement) => {
      let x0 = this.x.invert(d3.mouse(eventElement)[0]),
        i = bisectDate(this.data, x0, 1),
        d0 = this.data[i - 1],
        d1 = this.data[i],
        d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + (this.x(d.Date) + this.margin.left) + "," + this.y(d.Close) + ")");
      focus.select("text").text(formatCurrency(d.Close));
    }

    const formatTime = d3.timeFormat("%d-%m-%Y");

    const showDetailsOfDay = (eventElement) => {
      let x0 = this.x.invert(d3.mouse(eventElement)[0]),
        i = bisectDate(this.data, x0, 1);
      const currentData = this.data[i]
      div.transition()
      .duration(200)
      .style("opacity", .9);
      div.html(
        'Date: ' + formatTime(currentData.Date) + "<br/>" +
        'High: ' + currentData.High + "<br/>" +
        'Low: ' + currentData.Low + "<br/>" +
        'Volume: ' + currentData.Volume)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 30) + "px");
    }

    function onMouseMove() {
      setFocus(this);
    }

    function onMouseClick() {
      showDetailsOfDay(this);
    }

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.x).ticks(10).tickFormat(d3.timeFormat('%y-%m-%d')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.y));

    this.svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.lef)
      .attr('x', 0 - (this.height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Price');
  }

}
