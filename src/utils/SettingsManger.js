const vscode = require('vscode');
const {generateSpaceString} = require('./stringUtils');


const spaceCommandName = "arm.insertSpaceSize";
const extensionSettings = {
    [spaceCommandName]: {
        value: 4,
        handlers: []
    },
};

class SettingsManager{
    constructor(){
        this.settings = {...extensionSettings};
        this.settingKeys = Object.keys(this.settings);
        this.spaceCommandName = spaceCommandName;
        this.spaceString = generateSpaceString(SettingsManager.getConfigValue("arm.insertSpaceSize") || 0);
        vscode.workspace.onDidChangeConfiguration(e => this.onSettingsChange(e));
    }

    /**
     * @param {string} id 
     */
    static getConfigValue(id){
        return vscode.workspace.getConfiguration().get(id);
    }

    /**
     * @param {string} name 
     */
    getSetting(name){
        return this.settings[name].value;
    }

    /**
     * @param {vscode.ConfigurationChangeEvent} event 
     */
    onSettingsChange(event){
        this.settingKeys.forEach(name => {
            if(event.affectsConfiguration(name)){
                this.settings[name].value = SettingsManager.getConfigValue(name);
                if(name === spaceCommandName){
                    this.spaceString = generateSpaceString(this.settings[name].value);
                }
                

                if(this.settings[name].handlers.length > 0){
                    this.settings[name].handlers.forEach(cb => {
                        cb(this.settings[name].value);
                    })
                }
            }
        });        
    }

    registerSettingChangeHandler(setting, callback){
        this.settings[setting].handlers.push(callback);
    }
}

const item = new SettingsManager();
module.exports = item;