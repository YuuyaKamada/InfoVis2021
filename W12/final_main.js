let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://YuuyaKamada.github.io/InfoVis2021/W12/data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.date = d.date;
            d.weather = d.weather;
            d.number = +d.number;
            d.humidity = +d.humidity;
        });

        console.log(input_data)

        //const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        //color_scale.domain(['setosa','versicolor','virginica']);

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Date',
            ylabel: 'Number of infected people',
            //cscale: color_scale
        }, input_data );
        bar_chart.update();

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Humidity',
            ylabel: 'Number of infected people',
            //cscale: color_scale
        }, input_data );
        scatter_plot.update();

    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.weather ) );
    }
    scatter_plot.update();
}
