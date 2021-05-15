d3.csv("https://YuuyaKamada.github.io/InfoVis2021/W08/data2.csv")
    .then( data => {
        data.forEach( d => { d.width = +d.width; d.lable = +d.label; });

        const bar_chart = newBarChart( data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });




classBarChart {

    constructor( data ) {
        this.data = data;
        this.init();
    }




    init() {
        let self = this;
    }




    update() {
        let self = this;
        self.render();
    }



    
    render() {
        let self = this;

        self.svg.selectAll("text")
        .data(data)
            .enter()
            .append("text")
            .attr("x","0")
            .attr("y", function(d,i){ return 30 + i * (height + 10); })
            .attr("font-family","sans-serif")
            .attr("font-size","20px")
            .attr("fill","black")
            .text(function(d){return d.label})

        self.svg.selectAll("rect")
        .data(data)
          .enter()
          .append("rect")
          .attr("x", padding)
          .attr("y", function(d,i){ return 10 + i * (height + 10); })
          .attr("width", function(d){ return d.width*3; })
          .attr("height", function(d){ return height; })

    }
}
