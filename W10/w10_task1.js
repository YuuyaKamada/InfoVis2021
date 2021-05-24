d3.csv("https://YuuyaKamada.github.io/InfoVis2021/W08/data1.csv")
    .then( data => {
        data.forEach( d => { d.label = d.label; d.value = +d.value; });

        console.log(data);

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:20, left:60}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });
    /*d3.csv("https://YuuyaKamada.github.io/InfoVis2021/W08/data1.csv", function(error, data) {
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:20, left:60}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    });*/



class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }




    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;


            //.attr('transform', `translate(0, ${self.inner_width})`);

    }




    update() {
        let self = this;

        self.xscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d => d.value)])
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.label))
            .range( [0, self.inner_height] )
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)


        self.yaxis_group = self.chart.append('g')

        update( self.data );


        function update(data){

            //self.init();


            self.chart.selectAll('rect')
                    .data(data)
                    .join('rect')
                    .transition().duration(1000)
                    .attr("x", 0)
                    .attr("y", d => self.yscale(d.label))
                    .attr("width", d => self.xscale(d.value))
                    .attr("height", self.yscale.bandwidth());
                    console.log(data);

            self.chart.selectAll('g')
                    .join('g')
                    .transition().duration(1000)
                    .call( self.xaxis)
                    .call( self.yaxis)
        }

        //const xmax = d3.max( self.data, d => d.value );
        //self.xscale.domain( [0, xmax] );

        //self.yscale.domain(self.data.map(d => d.label));


        self.render();
    }




    render() {
        let self = this;

        //var svg = d3.select('#drawing_region');



        d3.select('#reverse')
            .on('click', d => {
                self.data.reverse();
                self.update();
        });

        d3.select('#descend')
            .on('click', d => {
                let sort_target = 'value'
                self.data.sort((a,b) => a[sort_target] - b[sort_target]);
                self.update();
        });

        d3.select('#ascend')
            .on('click', d => {
                let sort_target = 'value'
                self.data.sort((a,b) => b[sort_target] - a[sort_target]);
                self.update();
        });


    }
}
