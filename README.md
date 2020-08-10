# sourcebit-target-eleventy

[![npm version](https://github.com/Kentico/sourcebit-target-eleventy/workflows/npm-publish/badge.svg?branch=master)

> A [Sourcebit](https://github.com/stackbithq/sourcebit) plugin for the [11ty](https://11ty.dev/) static site generator

## 👩‍🏫 Introduction

This plugin creates a JavaScript file (_data/data.js) to expose any Sourcebit data source through JavaScript properties consumable by the 11ty static site generator.

## 🏗 Installation

To install the plugin and add it to your project, run:

```
npm install sourcebit-target-eleventy --save
```

> 💡 You don't need to run this command if you start Sourcebit using the [interactive setup process](#%EF%B8%8F-interactive-setup-process), as the CLI will install the plugin for you and add it as a dependency to your project.

## ⚙️ Configuration

The plugin accepts the following configuration parameters. They can be supplied in any of the following ways:

-   In the `options` object of the plugin configuration block inside `sourcebit.js`, with the value of the _Property_ column as a key;

| Property           | Type     | Visibility | Default value | Env variable | Parameter | Description                                                                                                                                                                                                                                                   |
| ------------------ | -------- | ---------- | ------------- | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contentModels` | String Array  | Public     | `false`       |              |           | A list of strings representing the content model names to be included as part of the data object used to create the pages |

### 👀 Example configuration

_sourcebit.js_

```js
module.exports = {
    plugins: [
        {
            module: require('sourcebit-target-eleventy'),
            contentModels: ['blog', 'about']
        }
    ]
};
```

### 🧞‍♂️ Interactive setup process

This plugin offers an interactive setup process via the `npx create-sourcebit` command. It asks users to select each of the content models present in the `models` data bucket to be accessbile within 11ty. 

## 📥 Input

This plugin expects the following data buckets to exist:

-   `models`: An array of content models
-   `objects`: An array of objects with data corresponding to the models

## 📤 Output

This plugin creates creates a JavaScript (data.js) file in the `_data` folder.

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/sourcebit-target-eleventy?pixel)