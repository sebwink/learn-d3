d3.csv('examples.csv').then(data => {
    const default_link_color = 'white';
    const default_link_font_weight = 'bold';
    d3.select('body')
        .append('ul')
        .selectAll('li')
        .data(data)
        .enter()
        .append('li')
        .append('a')
        .attr('href', d => d.link)
        .text(d => `${d.name} (${d.link})`)
        .style('color', default_link_color)
        .style('font-weight', default_link_font_weight)
        .on('mouseenter', function() {
            d3.select(this)
                .style('color', 'darkred')
                .style('font-weight', 'normal');
        })
        .on('mouseleave', function() {
            d3.select(this)
                .style('color', default_link_color)
                .style('font-weight', default_link_font_weight);
        });
});