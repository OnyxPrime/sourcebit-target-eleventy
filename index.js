const inquirerTablePrompt = require('inquirer-table-prompt');
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const slugify = require('@sindresorhus/slugify'); 
const fileWriters = require('./lib/file-writers');

module.exports.name = pkg.name;

module.exports.options = {
    contentModels: {
      private: false
    }
  };

module.exports.transform = ({ data, debug, log, options }) => {   
    let newData = {
        files: [],
        models: [],
        objects: []
    };
    
    options.contentModels.forEach(contentModel => {
        // get the content models configured in our options
        let model = data.models.find(s=>{ return s.modelName === contentModel });                
        newData.models.push(model);
        // get the objects corresponding to the selected models
        let objects = data.objects.filter(object => { return object.__metadata.modelName === contentModel; });
        newData.objects = (newData.objects).concat(objects);
    });    
    return newData;
};

module.exports.getOptionsFromSetup = ({ answers, debug }) => {    
   let models = [];
   answers.forEach(answer => {
    models.push(answer.modelName);
   });
    // returns options to be written to configuration file during CLI setup
    return {
        contentModels: models
    };
};

module.exports.getSetup = ({ chalk, data, inquirer }) => {
    inquirer.registerPrompt('table', inquirerTablePrompt);

    return async () => {
        const { models: modelTypes } = await inquirer.prompt([
            {
                type: 'table',
                name: 'models',
                message: 'Please select models to include',
                pageSize: 7,
                rows: data.models.map((model, index) => ({
                    name: `${model.modelLabel || model.modelName}\n${chalk.dim(`└${model.source}`)}`,
                    value: index
                })),
                columns: [
                    {
                        name: 'Include',
                        value: true
                    },
                    {
                        name: 'Skip',
                        value: undefined
                    }
                ]
            }
        ]);        
        let models = [];
        
        modelTypes.forEach((model, index) => {            
            if (model){
                models.push(data.models[index]);                
            }
                
        });
        const filePath = path.join(process.cwd(), '_data', 'data.js');
        fileWriters.writeJS(filePath);
        return models;
    };
};
