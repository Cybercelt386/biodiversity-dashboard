d3.json('samples.json').then(({names}) => {  
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    
    optionSelected();
});

 const optionSelected = () => {
    d3.json('samples.json').then(({metadata,samples}) => {
        let choice = d3.select('select').node().value;
        let meta = metadata.filter(obj => obj.id == choice)[0];
        let sample = samples.filter(obj => obj.id == choice)[0];
        
        console.log(sample)
    });
}; 