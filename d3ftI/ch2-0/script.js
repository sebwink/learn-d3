const DEMO_DATA_URL_ROOT = 'https://code.sebwink.net/learn-d3/d3ftI/ch2-0';
const DEMO_DATA_URL = `${DEMO_DATA_URL_ROOT}/data.csv`;

const DEFAULT_STYLE = {
  radius: 5,
  color: 'red',
};

function draw(element, data, style)
{
  element.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', style.radius)
    .attr("fill", style.color)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
}

function fetchAndDraw(element, dataUrl, style=DEFAULT_STYLE)
{
  d3.csv(dataUrl).then(
    data => draw(element, data, style)
  );
}

function main()
{
  fetchAndDraw(d3.select(`#demo-1`), DEMO_DATA_URL);
  fetchAndDraw(d3.select(`#demo-2`), DEMO_DATA_URL, {
    radius: 10,
    color: 'steelblue',
  });
  draw(d3.select(`#demo-3`), 
  [
    {x: 100, y: 250},
    {x: 200, y: 200},
    {x: 300, y: 150},
    {x: 400, y: 100},
    {x: 500, y:  50},
  ], {
    radius: 20,
    color: 'yellow',
  });
}

main();
