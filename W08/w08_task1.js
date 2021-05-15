d3.csv("https://vizlab-kobe-lecture.github.io/InfoVis2021/W08/data.csv")
    .then( data => {
        data.forEach( d => { d.label = +d.label; d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:20, left:60}
        };

        const scatter_plot = new BarChart( config, data );
        scatter_plot.update();
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
                margin: config.margin || {top:10, right:10, bottom:20, left:60}
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
                .domain([0, d3.max(data, d => d.value)])
                .range([0, self.inner_width]);

            //self.xscale = d3.scaleLinear()
            //    .range( [0, self.inner_width] );
    
            self.yscale = d3.scaleBand()
                .domain(data.map(d => d.label))
                .range([0, self.inner_height])
                .paddingInner(0.1);
      

            //self.yscale = d3.scaleLinear()
            //    .range( [0, self.inner_height] );
    
            self.xaxis = d3.axisBottom( self.xscale )
                .ticks(5)
                .tickSizeOuter(0);

            self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

            self.xaxis_group = self.chart.append('g')
                .attr('transform', `translate(0, ${sefl.inner_height})`)
                .call( self.xaxis );

            self.yaxis_group = slef.chart.append('g')
                .call( self.yaxis );

            //self.xaxis = d3.axisBottom( self.xscale )
            //    .ticks(6);
            //self.xaxis_group = self.chart.append('g')
            //    .attr('transform', `translate(0, ${self.inner_height})`);
        }
    
    
    
    
        update() {
            let self = this;
    
            const xmin = d3.min( self.data, d => d.x );
            const xmax = d3.max( self.data, d => d.x );
            self.xscale.domain( [xmin, xmax] );
    
            const ymin = d3.min( self.data, d => d.y );
            const ymax = d3.max( self.data, d => d.y );
            self.yscale.domain( [ymin, ymax] );
    
            self.render();
        }
    
    
    
        
        render() {
            let self = this;
    
            self.chart.selectAll("rect").data(self.data).enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => self.yscale(d.label))
            .attr("width", d => self.xscale(d.value))
            .attr("height", self.yscale.bandwidth());

            //self.chart.selectAll("circle")
            //.data(self.data)
            //.enter()
            //.append("circle")
            //.attr("cx", d => self.xscale( d.x ) )
            //.attr("cy", d => self.yscale( d.y ) )
            //.attr("r", d => d.r );
    
            //self.xaxis_group
            //    .call( self.xaxis );
        }
    }
    