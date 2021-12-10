const DEMO_DATA_URL = 'data.csv';

function plot(data)
{
    const pxX = 600, pxY = 300, padding = 10;
    const svg = d3.select('body')
        .append('svg')
        .attrs({
            height: pxY,
            width: pxX,
            id: 'demo',
        });
    const scX = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([padding, pxX - padding]);
    const scY1 = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y1))
        .range([pxY - padding, padding]);
    const scY2 = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y2))
        .range([pxY - padding, padding]);
    const ds1 = svg.append('g').attr('id', 'ds1');
    const ds2 = svg.append('g').attr('id', 'ds2');
    const lineMaker = d3.line()
        .x(d => scX(d.x))
        .y(d => scY1(d.y1));
    ds1.append('path')
        .attrs({
            fill: 'none',
            stroke: 'red',
            d: lineMaker(data)
        });
    lineMaker.y( d => scY2(d.y2) );
    ds2.append('path')
        .attrs({
            fill: 'none',
            stroke: 'cyan',
            d: lineMaker(data)
        });
    ds1.selectAll('circle')
        .data(data).enter().append('circle')
        .attrs({
            r: 5,
            fill: 'green',
            cx: d => scX(d.x),
            cy: d => scY1(d.y1),
        });
    ds2.selectAll('circle')
        .data(data).enter().append('circle')
        .attrs({
            r: 5,
            fill: 'blue',
            cx: d => scX(d.x),
            cy: d => scY2(d.y2),
        });
}

function main()
{
    d3.csv(DEMO_DATA_URL).then(
        data => plot(data)
    );
}

main();