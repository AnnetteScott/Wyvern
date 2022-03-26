const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: "Wyvern",
                appId: 'Wyvern-App',
                win: {
                    "target": [
                        "nsis"
                    ],
                  icon: 'public/WyvernIcon.ico'
                },
                "nsis": {
                    "installerIcon": "public/WyvernIcon.ico",
                    "uninstallerIcon": "public/WyvernIcon.ico",
                    "uninstallDisplayName": "Uninstall Wyvern",
                    "oneClick": false,
                    "allowToChangeInstallationDirectory": true
                }
            },
        },
    },
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
        project: {
            entry: 'src/pages/Project/main.js',
            template: 'public/index.html',
            filename: 'Project.html',
            title: 'Project Page | Wyvern'
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
