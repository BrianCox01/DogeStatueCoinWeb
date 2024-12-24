document.addEventListener("DOMContentLoaded", () => {
    const whoSection = document.querySelector("#who-section");
    const strike2 = document.querySelector(".strike2");
    const strike3 = document.querySelector(".strike3");


    if (whoSection && strike2) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        strike2.classList.add("animate"); // Add the animate class
                        strike3.classList.add("animate2"); // Add the animate class

                        observer.unobserve(whoSection); // Stop observing after adding the class
                    }
                });
            }, {
                threshold: 0.1, // Trigger when 10% of #who-section is visible
            }
        );

        observer.observe(whoSection);
    } else {
        console.error(
            "#who-section or .strike2 not found. Check your HTML structure."
        );
    }
});

var gradients = [
    { id: 'pink', start: '#CC5DE8', end: '#CC5DE8' },
    { id: 'blue', start: '#1E3A8A', end: '#1E3A8A' },
    { id: 'red', start: '#308cd0', end: '#308cd0' },
    { id: 'green', start: '#FFA500', end: '#FFA500' },
    { id: 'aqua', start: '#ff53a7', end: '#ff53a7' },
    { id: 'other', start: '#ffc44d', end: '#ffc44d' }
];

var data = [];

data['piedata'] = [
    { label: "Team", value: 5, color: 'green' },
    { label: "Project Funds", value: 20, color: 'red' },
    { label: "Marketing", value: 5, color: 'aqua' },
    { label: "Presale", value: 5, color: 'pink' },
    { label: "Liquidity", value: 65, color: 'other' }
];



$(document).ready(function() {
    $('[data-pie]').each(function() {
        var chartId = '#' + $(this).attr('id');
        var chartLabel = $(this).attr('data-pie-label');
        var piedata = data[$(this).attr('data-pie')];

        var width = 400,
            height = 400,
            radius = 185;

        var pie = d3.pie()
            .value(function(d) {
                return d.value;
            })
            .sort(null);

        var arc = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius / 1.5);

        var max = d3.max(piedata, function(d) { return +d.value; });

        var myChart = d3.select(chartId).append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) + ', ' + (height / 2) + ')')
            .selectAll('path').data(pie(piedata))
            .enter().append('g')
            .attr('class', function(d, i) {
                var cssClass = 'slice';
                if (d.data.value === max) {
                    cssClass += ' max';
                }
                return cssClass;
            });

        var gradient = d3.select(chartId + ' svg')
            .selectAll('linearGradient').data(gradients)
            .enter().append('linearGradient')
            .attr('id', function(d, i) {
                return gradients[i].id;
            });

        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', function(d, i) {
                return gradients[i].start;
            });

        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', function(d, i) {
                return gradients[i].end;
            });

        var slices = d3.selectAll(chartId + ' g.slice')
            .append('path')
            .attr('fill', function(d, i) {
                return 'url(#' + d.data.color + ')';
            })
            .attr('d', arc)
            .on('mouseover', function(d, i) {
                var gradient = gradients.filter(function(obj) {
                    return obj.id == d.data.color;
                });
                $(chartId + ' [data-slice]').css('opacity', 0.5);
                $(chartId + ' [data-slice=' + i + ']').css({
                    'background': gradient[0].end,
                    'opacity': 1
                });
            })
            .on('mouseout', function(d, i) {
                $(chartId + ' [data-slice]').css('opacity', 1);
                $(chartId + ' [data-slice=' + i + ']').css('background', 'rgba(0,0,0,0.5)');
            });

        var legend = d3.select(chartId)
            .attr('class', 'pie-chart')
            .append('ul')
            .attr('class', 'legend')
            .selectAll('li').data(pie(piedata))
            .enter().append('li')
            .attr('data-slice', function(d, i) {
                return i;
            })
            .attr('style', function(d, i) {
                var gradient = gradients.filter(function(obj) {
                    return obj.id == d.data.color;
                });
                return 'border-bottom: solid 3px ' + gradient[0].end;
            })
            .text(function(d, i) {
                return d.data.label + ': ';
            });

        legend.append('span')
            .text(function(d, i) {
                return d.data.value + '%';
            });

        var maxCirc = d3.select(chartId)
            .append('div')
            .attr('class', 'max-circ');

        maxCirc.append('span')
            .attr('class', 'label')
            .text(chartLabel);

        maxCirc.append('span')
            .attr('class', 'value')
            .attr('style', function() {
                var top = piedata.filter(function(obj) {
                    return obj.value == max;
                });
                var gradient = gradients.filter(function(obj) {
                    return obj.id == top[0].color;
                });
                return 'color: ' + gradient[0].end;
            })
            .text(function() {
                var top = piedata.filter(function(obj) {
                    return obj.value == max;
                });
                return top[0].label + ': ' + top[0].value + '%';
            });
    });
});