const fs = require('fs');

module.exports.writeJS = function(filePath) {
    const source = `
const Sourcebit = require('sourcebit');
const SourcebitConfig = require('../sourcebit');

async function getAllData (){
    const data = await Sourcebit.fetch(SourcebitConfig);
    const dataByModelType = {};

    data.objects.forEach(object => {
        dataByModelType[object.__metadata.modelName] = dataByModelType[object.__metadata.modelName] || [];
        dataByModelType[object.__metadata.modelName].push(object);
    });

    return dataByModelType;
}

module.exports = getAllData;
        `;        

        console.log('Writing data file:', filePath);

        fs.writeFileSync(filePath, source);
}
