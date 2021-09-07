import React, { useRef, useEffect, useState } from 'react';
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from 'd3';
import useObserverHook from '../useObserverHook.js';

function BarChart({ data }) {
  const svgRef = useRef();
  const divRef = useRef();
  const dimensions = useObserverHook(divRef);

  useEffect(() => {
    if (!dimensions) return;

    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, dimensions.width])
      .padding(0.5);
    const yScale = scaleLinear().domain([0, 150]).range([dimensions.height, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    //create x scale

    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);

    // create y scale
    const yAxis = axisRight(yScale);
    svg
      .select('.y-axis')
      .style('transform', `translateX(${dimensions.width}px)`)
      .call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('transform', 'scale(1, -1)')
      .attr('x', (d, i, n) => xScale(i))
      .attr('y', -dimensions.height)
      .attr('width', xScale.bandwidth())
      .on('mouseenter', (event, d) => {
        const index = svg.selectAll('.bar').nodes().indexOf(event.target);

        svg
          .selectAll('.tooltip')
          .data([d])
          .join((enter) => enter.append('text').attr('y', yScale(d) - 4))
          .attr('class', 'tooltip')
          .text(d)
          .attr('x', xScale(index) + xScale.bandwidth() / 2)
          .attr('text-anchor', 'middle')
          .transition()
          .attr('y', yScale(d) - 5)
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.select('.tooltip').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', (value) => dimensions.height - yScale(value));
  }, [data, dimensions]);

  return (
    <>
      <div ref={divRef}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
}

export default BarChart;
