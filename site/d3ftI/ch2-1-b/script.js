
const DEMO_DATA_URL = '../ch2-1-a/data.csv';


function plot(data, parent, padding=10)
{
    const pxX = parent.attr('width');
    const pxY = parent.attr('height');

    function makeScale(colname, range)
    {
        return d3.scaleLinear()
            .domain(d3.extent(data, d => d[colname]))
            .range(range)
            .nice();
    }
    const scX = makeScale('x', [padding, pxX - padding]);
    const scY1 = makeScale('y1', [pxY - padding, padding]);
    const scY2 = makeScale('y2', [pxY - padding, padding]);

    function plotData(parent, accessor, curve)
    {
        const lineMaker = d3.line()
            .curve(curve)
            .x(d => scX(d.x))
            .y(accessor);
        parent.append('path')
            .attrs({
                fill: 'none',
                d: lineMaker(data)
            });
        parent.selectAll('circle')
            .data(data).enter().append('circle')
            .attrs({
                r: 5,
                cx: d => scX(d.x),
                cy: accessor,
            });
    }

    const ds1 = parent
        .append('g')
        .attr('id', 'ds1')
        .call(plotData, d => scY1(d.y1), d3.curveStep);
    ds1.selectAll('circle').attr('fill', 'green');
    ds1.selectAll('path').attr('stroke', 'cyan');

    const ds2 = parent
        .append('g')
        .attr('id', 'ds2')
        .call(plotData, d => scY2(d.y2), d3.curveNatural);
    ds2.selectAll('circle').attr('fill', 'blue');
    ds2.selectAll('path').attr('stroke', 'red');

    parent.append('g')
        .attr('transform', `translate(${padding/4}, 0)`)
        .call(d3.axisRight(scY1));
    parent.append('g')
        .attr('transform', `translate(${pxX - padding/4}, 0)`)
        .call(d3.axisLeft(scY2));
    parent.append('g')
        .attr('transform', `translate(0, ${pxY - padding/4})`)
        .call(d3.axisTop(scX));
}

function main()
{
    const svg = d3.select('body')
        .append('svg')
        .attrs({
            height: 400,
            width: 800,
            id: 'demo',
        });
    d3.csv(DEMO_DATA_URL).then(
        data => plot(data, svg, 35)
    );
}

main();