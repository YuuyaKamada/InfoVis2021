d3.csv("https://YuuyaKamada.github.io/InfoVis2021/W12/data.csv")
    .then( data => {
        data.forEach( d => { d.date = d.date; d.weather = d.weather; d.number = +d.number; d.humidity = +d.humidity});

        console.log(data);

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:20, left:60}
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });



class BarChart {

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

        self.xscale = d3.scaleLinear()
        .domain([0, d3.max(self.data, d => d.number)])
        .range( [0, self.inner_width] );

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.date))
            .range( [0, self.inner_height] )
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)
            .call(self.xaxis)


        self.yaxis_group = self.chart.append('g')
            .call(self.yaxis)
    }




    update() {
        let self = this;

            self.chart.selectAll('rect')
                    .data(self.data)
                    .enter()
                    .append('rect')
                    .attr("x", 0)
                    .attr("y", d => self.yscale(d.date))
                    .attr("width", d => self.xscale(d.numbr))
                    .attr("height", self.yscale.bandwidth());
                    /*.attr("x", d => self.yscale(d.date))
                    .attr("y", 0)
                    .attr("width", self.yscale.bandwidth())
                    .attr("height", d => self.xscale(d.numbr));*/

        self.render();
    }




    render() {
        let self = this;

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
