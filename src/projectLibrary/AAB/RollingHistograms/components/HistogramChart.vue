<template>
  <v-card outlined class="px-2 d-flex flex-column" min-height="650" :min-width="histogramData.bins.length * 60">
    <v-card-title class="pa-2 justify-center">{{ caption }}</v-card-title>
    <div ref="chart" class="rolling_histogram flex-grow-1" />
  </v-card>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export default
{
  name: 'HistogramChart',
  props:
    {
      histogramData:
        {
          type: Object,
          required: true
        },
    },
  data()
  {
    return {
      chart: null,
    };
  },
  computed:
    {
      caption()
      {
        return `${this.histogramData.startDate} to ${this.histogramData.endDate}`;
      }
    },
  watch:
    {
      histogramData()
      {
        this.updateChart();
      },
    },
  beforeDestroy()
  {
    if (this.chart)
    {
      this.chart.dispose();
    }
  },
  mounted()
  {
    const chart = am4core.create(this.$refs.chart, am4charts.XYChart);
    chart.data = this.histogramData.bins.map(item =>
    {
      item.category = item.bound.replace('[', '[['); // we must escape the square brackets - amCharts uses them for formatting
      item.tooltip = item.category.replace(',', ',\n'); // we want short/narrow tooltips
      return item;
    });

    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = 'category';
    xAxis.renderer.minGridDistance = 10;
    xAxis.renderer.labels.template.fontSize = 12;
    xAxis.adapter.add('getTooltipText', (text) => text.replace(',', ',\n')); // we want shorter tooltip

    xAxis.renderer.ticks.template.disabled = false;
    xAxis.renderer.ticks.template.strokeOpacity = 1;
    xAxis.renderer.ticks.template.stroke = am4core.color('#495C43');
    xAxis.renderer.ticks.template.strokeWidth = 1;
    xAxis.renderer.ticks.template.length = 5;

    xAxis.renderer.labels.template.rotation = -90;
    xAxis.renderer.labels.template.horizontalCenter = 'right';
    xAxis.renderer.labels.template.verticalCenter = 'middle';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 1;
    valueAxis.renderer.minGridDistance = 10;

    // add cursors and allow zooming in/out on X axis by mouse selection over the chart area
    const cursor = new am4charts.XYCursor();
    cursor.behavior = 'none';
    cursor.fontSize = 12;
    chart.cursor = cursor;

    // create series
    const lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = 'category';
    lineSeries.dataFields.valueY = 'frequency';
    lineSeries.tooltipText = 'Bound: {tooltip}\nFrequency: {frequency.formatNumber("#.000")}\nCount: {count}';
    lineSeries.tooltip.fontSize = 14;
    lineSeries.tooltip.background.strokeWidth = 0;

    this.chart = chart;
  },
  methods:
    {
      updateChart()
      {

      }
    }
};
</script>

<style lang="scss">
  .rolling_histogram
  {
    g[opacity][filter][style]
    {
      /* hide AmCharts logo */
      display: none;
    }
  }
</style>
