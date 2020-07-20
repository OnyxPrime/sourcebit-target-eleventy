const slugify = require('@sindresorhus/slugify');

// Find a value for each of the model's fields, to show as examples in the
// various questions.
function getExampleFieldValues(model, objects, maxLength = 60) {
    return objects.reduce((result, object) => {
        const { __metadata: meta, ...fields } = object;
        const isRightModel =
            meta &&
            meta.modelName === model.modelName &&
            meta.projectId === model.projectId &&
            meta.projectEnvironment === model.projectEnvironment &&
            meta.source === model.source;

        if (!isRightModel || !Array.isArray(model.fieldNames)) return result;

        model.fieldNames
            .filter(fieldName => result[fieldName] === undefined)
            .forEach(fieldName => {
                if (!['boolean', 'number', 'string'].includes(typeof fields[fieldName])) {
                    return;
                }

                const stringValue = fields[fieldName]
                    .toString()
                    .trim()
                    .substring(0, maxLength);

                if (stringValue.length > 0) {
                    result[fieldName] = stringValue;
                }
            });

        return result;
    }, {});
}
