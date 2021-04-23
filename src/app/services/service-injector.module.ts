import { TextureManager } from './texture-manager/texture-manager.service'
import { SoundManager } from './sound-manager/sound-manager.service';
import { PixiManager } from './pixi-manager/pixi-manager.service';

// To add a new class as a service, simply add the class name to this list.
const imports = [TextureManager, SoundManager, PixiManager];
// To access the service from another file, call 'getServiceByClass(CLASS_NAME)'


////////////////////////////////////////////////////////////////////////////////
// Do not touch any code below this line, unless you know what you are doing. //
////////////////////////////////////////////////////////////////////////////////

/**
 * Returns the instantiated service object specified by class name.
 * @param classType The Class of the injected service
 * @returns Returns the service if it exists. Returns undefined if the service does not exist.
 */
export function getServiceByClass(classType: any): any {
    // Loops through list of instantiated services. If it exists, then it returns.
    for (let i = 0; i < listOfServices.length; ++i) {
        let service: any = listOfServices[i];
        if (service instanceof classType) {
            return service;
        }
    }

    // Service does not exist.
    return undefined;
}

// This creates & stores the list of instantiated services.
let listOfServices: any = [];
imports.forEach(element => {
    listOfServices.push(new element());
});