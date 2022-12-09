
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
       let sampleData = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
       let sampleArray = sampleData.filter(obj => obj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
       let firstInSamples = sampleArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
       let otu_ids = firstInSamples.otu_ids;
       let otu_labels = firstInSamples.otu_labels;
       let sample_values = firstInSamples.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    
    var yticks = otu_ids.reverse((a,b) => a-b).slice(0,10);
    // 8. Create the trace for the bar chart. 
    var barData = [{                             //In truth I didnt understand the instructions here at all. 
      type: "bar",

      x: sample_values,
      
      y: yticks,

      text: [otu_labels],

      orientation: 'h'
      
  }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {

      title: "Top 10 bacteria cultures found",
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar",barData,barLayout)

    // Deliverable 2: 1. Create the trace for the bubble chart.
    var bblTrace = [{
      x: otu_ids,
      y: yticks,
      mode: 'markers',
      marker: {
        
        color: ['rgb(165,0,38)','rgb(215,48,39)','rgb(244,109,67)','rgb(253,174,97)','rgb(254,224,144)',
                'rgb(224,243,248)','rgb(171,217,233)','rgb(116,173,209)','rgb(69,117,180)','rgb(49,54,149)'],
        
        size: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      }
    }
    ];
    // Deliverable 2: 2. Create the layout for the bubble chart.
    var bblLayout = [{

      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 600

    }]
    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
       Plotly.newPlot("bubble",bblTrace,bblLayout)
    // Deliverable 3: 
      d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        // Filter the data for the object with the desired sample number
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var wash = result.wfreq
        let washfreq = Math.round(wash);
        console.log(washfreq)

 
    
    //4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: {
        x: [0,1], y:[0,1]},
      value: washfreq,
      title: { text: "Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0,10] },
        bar: { color: "black" },
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow"},
          { range: [6, 8], color: "lightgreen"},
          { range: [8,10], color: "green"}
        ],
      }
  }];
        
  
    
    // Deliverable 3: 5. Create the layout for the gauge chart.
     var gaugeLayout = {

      title: "Belly Button Washing Frequency"

     }
    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge",gaugeData,gaugeLayout) 
  
  });

 
  });
}

