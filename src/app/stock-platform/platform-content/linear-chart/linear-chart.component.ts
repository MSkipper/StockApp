import {
  Component, OnInit, OnChanges, ViewChild, ElementRef, Input,
  ViewEncapsulation, HostListener
} from '@angular/core';
import * as d3 from 'd3';
import {IQuote} from '../../query-data.interface';
import {Axis} from "d3-axis";
import {ScaleTime, ScaleLinear} from "d3-scale";
import {ContainerElement} from "d3-selection";
import {Bisector} from "d3-array";

interface IChartMargin {
  top: number
  right: number
  bottom: number
  left: number
}

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LinearChartComponent implements OnInit {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private queryData: Array<IQuote>;
  private margin: IChartMargin = { top: 20, right: 20, bottom: 50, left: 70 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: ScaleTime<number, number>;
  private yScale: ScaleLinear<number, number>;
  private lineValue: any;
  private xAxis: Axis<any>;
  private yAxis: Axis<any>;
  private svg: any;
  private readonly scaleModifier = 5;
  constructor() {

  }
  @HostListener('window:resize', ['$event'])
  onResize(_event) {
    this.createChart();
    this.updateChart();
  }

  ngOnInit() {
    this.initChart();
    this.createChart();
    if (this.queryData) {
      this.updateChart();
    }
  }

  initChart() {
    this.svg = d3.select(this.chartContainer.nativeElement).append('svg');
  }

  createChart() {
    const chartElement = this.chartContainer.nativeElement;
    this.width = chartElement.offsetWidth - this.margin.left - this.margin.right;
    this.height = chartElement.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg
      .attr('width', chartElement.offsetWidth)
      .attr('height', chartElement.offsetHeight);

    this.xScale = d3.scaleTime().range([0, this.width]);
    this.yScale = d3.scaleLinear().range([this.height, 0]);
    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxis = d3.axisLeft(this.yScale);

    this.lineValue = d3.line<Number | any>()
      .x((d) => this.xScale(d.Date))
      .y((d) => this.yScale(d.Close));
  }

  updateChart() {
    this.svg.selectAll('*').remove();
    d3.select('.graph-tooltip').remove();

    this.queryData.forEach((quote) => {
      quote.Date = new Date(quote.Date);
      quote.Close = Number(quote.Close);
    });

    this.queryData.sort((a, b) => (a.Date - b.Date));
    this.xScale.domain(d3.extent(this.queryData, quote => quote.Date));
    this.yScale.domain([d3.min(this.queryData, quote =>
      quote.Close - this.scaleModifier), d3.max(this.queryData, quote => quote.Close + this.scaleModifier)]);

    this.svg.append('path')
      .datum(this.queryData)
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .attr('class', 'line')
      .attr('d', this.lineValue);

    const focus = this.svg.append('g')
    .attr('class', 'focus')
    .style('display', 'none');

    const descriptionDiv = d3.select('app-linear-chart').append('div')
    .attr('class', 'graph-tooltip')
    .style('opacity', 0);

    focus.append('circle')
    .attr('r', 4.5);

    focus.append('text')
    .attr('x', 9)
    .attr('dy', '.35em');

    this.svg.append('rect')
    .attr('class', 'overlay')
    .attr('transform', `translate(${this.margin.left}, 0)`)
    .attr('width', this.width)
    .attr('height', this.height)
    .on('mouseover', function() { focus.style('display', null); })
    .on('mouseout', function() { focus.style('display', 'none'); })
    .on('mousemove', onMouseMove)
    .on('click', onMouseClick);

    const bisectDate = d3.bisector((Quote: IQuote) => Quote.Date).left;
    const formatValue = d3.format(',.2f');
    const formatCurrency = (priceValue) => formatValue(priceValue);

    const setFocus = (containerElement: ContainerElement) => {
      const positionOfX: Date = this.xScale.invert(d3.mouse(containerElement)[0])
      const indexOfCurrentData: number = bisectDate(this.queryData, positionOfX, 1);
      const previousData = this.queryData[indexOfCurrentData - 1];
      const nextData = this.queryData[indexOfCurrentData];
      const currentData =
        Number(positionOfX) - previousData.Date > nextData.Date - Number(positionOfX) ? nextData : previousData;
      focus.attr('transform', 'translate(' + (this.xScale(currentData.Date) + this.margin.left)
        + ',' + this.yScale(currentData.Close) + ')');
      focus.select('text').text(formatCurrency(currentData.Close));
    }

    const formatTime = d3.timeFormat('%d-%m-%Y');

    const showDetailsOfDay = (eventElement) => {
      const positionOfX: Date = this.xScale.invert(d3.mouse(eventElement)[0]);
      const indexOfCurrentData = bisectDate(this.queryData, positionOfX, 1);
      const currentData = this.queryData[indexOfCurrentData];
      descriptionDiv.transition()
      .duration(200)
      .style('opacity', .9);
      descriptionDiv.html(
        'Date: ' + formatTime(currentData.Date) + '<br/>' +
        'High: ' + currentData.High + '<br/>' +
        'Low: ' + currentData.Low + '<br/>' +
        'Volume: ' + currentData.Volume)
      .style('left', (d3.event.pageX) + 'px')
      .style('top', (d3.event.pageY - 30) + 'px');
    }

    function onMouseMove() {
      setFocus(this);
    }

    function onMouseClick() {
      showDetailsOfDay(this);
    }

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${ this.height})`)
      .call(d3.axisBottom(this.xScale).ticks(10).tickFormat(d3.timeFormat('%y-%m-%d')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(d3.axisLeft(this.yScale));

    this.svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 )
      .attr('x', 0 - (this.height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Price');
  }

}
