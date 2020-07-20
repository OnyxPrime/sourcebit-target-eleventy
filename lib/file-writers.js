const fs = require('fs');
const yaml = require('yaml');

module.exports.writeFrontmatterMarkdown = (filePath, { body = '', frontmatter }) => {
    const lines = ['---', yaml.stringify(frontmatter).trim(), '---', body.length > 0 ? body.trim() : '', ''];
    const content = lines.join('\n');

    return fs.writeFileSync(filePath, content);
};

module.exports.writeJSON = (filePath, data) => {
    const content = JSON.stringify(data, null, 2);

    return fs.writeFileSync(filePath, content);
};

module.exports.writeYAML = function(filePath, data) {
    const content = yaml.stringify(data);

    return fs.writeFileSync(filePath, content);
};

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
