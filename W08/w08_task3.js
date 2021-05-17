d3.csv("https://YuuyaKamada.github.io/InfoVis2021/W08/data1.csv")
    .then( data => {
        data.forEach( d => { d.label = d.label; d.value = +d.value; });

        console.log(data);


        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            radius: Math.min( 256, 256 ) / 2,
            margin: {top:10, right:10, bottom:20, left:10}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });




class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            radius: config.radius || Math.min( config.width, config.height ) / 2,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }




    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

    }




    update() {
        let self = this;

        self.render();
    }




    render() {
        let self = this;

        const pie = d3.pie()
            .value( d => d.value );

        const arc = d3.arc()
            .innerRadius(50)
            .outerRadius(self.config.radius);

        const arc_text = d3.arc()
            .innerRadius(self.config.radius - 40)
            .outerRadius(self.config.radius - 40);


        self.svg.selectAll('pie')
            .data( pie(self.data) )
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', 'blue')
            .attr('stroke', 'white')
            .style('stroke-width', '2px')

        self.svg.selectAll('pie')
            .data(pie(self.data))
            .enter()
            .append("text")
            .attr("fill", "white")
            .attr("transform", function(d) { return "translate(" + arc_text.centroid(d) + ")"; })
            .attr("font-size", "13")
            .attr("dy", "5px")
            .attr("text-anchor", "middle")
            .text(d => d.data.label);




    }
}
