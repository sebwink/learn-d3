let state = true;

function makeDemo(svg, padding=50) {
    const ds1 = [
        ['Mary', 1],
        ['Jane', 4],
        ['Anne', 2],
    ];
    const ds2 = [
        ['Anne', 5],
        ['Jane', 3],
    ]

    const pxX = svg.attr('width');
    const pxY = svg.attr('height');

    const scX = d3.scaleLinear().domain([0, 6]).range([padding, pxX-padding]);
    const scY = d3.scaleLinear().domain([0, 3]).range([padding, pxY-padding]);

    let j = -1, k = -1;

    svg.selectAll('text')
        .data(ds1)
        .enter()
        .append('text')
        .attrs({
            x: 20,
            y: d => scY(++j)
        })
        .text(d => d[0]);

    svg.selectAll('circle')
        .data(ds1)
        .enter()
        .append('circle')
        .attrs({
            r: 5,
            fill: 'red',
            cx: d => scX(d[1]),
            cy: d => scY(++k) - 5,
        });

    svg.on('click', function() {
        const cs = svg.selectAll('circle')
            .data(state ? ds2 : ds1, d => d[0])
            .attr('fill', state ? 'orange': 'red');
        cs.transition().duration(1000).attr('cx', d => scX(d[1]));
        cs.exit().attr('fill', state ? 'blue' : 'yellow');
        state = !state;
    });
}

function main() {
    const svg = d3.select('body')
        .append('svg')
        .attrs({
            height: 200,
            width: 350,
            id: 'demo'
        });
    makeDemo(svg);
}

main();