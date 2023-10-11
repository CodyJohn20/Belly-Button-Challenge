let url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function dropdownmenu(){
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
let names=data.names
let dropdownMenu = d3.select("#selDataset");
names.forEach((sample) => {
    dropdownMenu
        .append("option")
        .text(sample)
        .property("value", sample);
});
datatable(names[0])
chart(names[0])
  });
}
dropdownmenu()
function datatable(id_){
    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        console.log(data);
    let metadata=data.metadata
    let MetaArray = metadata.filter(number => number.id == id_)[0];

    let datatag = d3.select("#sample-metadata");
datatag.html("")

    Object.entries(MetaArray).forEach(entry => {
        const [key, value] = entry;
        console.log(key, value);
        datatag
        .append("h5")
        .text(`${key}: ${value}`)

      });
    
      });
    }

    function optionChanged(id_){
        datatable(id_)  
        chart(id_)
    }
    function chart(id_){
        // Fetch the JSON data and console log it
        d3.json(url).then(function(data) {
            console.log(data);
        let samples=data.samples
        let SamplesArray = samples.filter(number => number.id == id_)[0];

        let otu_ids =SamplesArray.otu_ids

let sample_values =SamplesArray.sample_values



 let otu_labels =SamplesArray.otu_labels


    
        var bubbledata = [{
            x:otu_ids ,
            y: sample_values,
            text:otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              colorscale:"Earth" ,
              size: sample_values
            }
          }];
          
          
          
          var bubblelayout = {
            title: 'Bubble Chart',
            showlegend: false,
            
          };
          
          Plotly.newPlot('bubble', bubbledata, bubblelayout);
          
        
          });
        }