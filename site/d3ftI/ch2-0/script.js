const DEMO_DATA_URL = 'data.csv';

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
    .attrs({
      r: style.radius,
      fill: style.color,
      cx: d => d.x,
      cy: d => d.y,
    });
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
