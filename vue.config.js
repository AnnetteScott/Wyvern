const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,

    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Home | Wyvern'
        },
        settings: {
            entry: 'src/pages/Settings/main.js',
            template: 'public/index.html',
            filename: 'Settings.html',
            title: 'Settings | Wyvern'
        },
        timeSheets: {
            entry: 'src/pages/TimeSheets/main.js',
            template: 'public/index.html',
            filename: 'TimeSheets.html',
            title: 'Time Sheets | Wyvern'
        },
        Invoice: {
            entry: 'src/pages/Invoice/main.js',
            template: 'public/index.html',
            filename: 'Invoice.html',
            title: 'Invoice | Wyvern'
        },
        Records: {
            entry: 'src/pages/Records/main.js',
            template: 'public/index.html',
            filename: 'Records.html',
            title: 'Records | Wyvern'
        }
    }
})
