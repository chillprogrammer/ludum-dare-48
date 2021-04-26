import { Howl, Howler } from 'howler';

const ASSET_FOLDER_PATH = 'assets/sound';

interface SoundObject {
    path: string,
    sound: Howl
}

export class SoundManager {

    private soundList: SoundObject[] = [];

    constructor() {
        this.init();
    }

    private init() {

    }

    /**
     * Loads a sound into memory to speed up getSound() calls later.
     * @param path the path of the image file to load.
     */
    loadSoundIntoMemory(path: string): void {
        let sound = new Howl({
            src: [`${ASSET_FOLDER_PATH}/${path}`],
            volume: 0.4
        });
        this.soundList.push({ path: path, sound: sound })
    }

    /**
     * Removes a sound from memory (if it exists in memory).
     * @param path the path of the image file to load.
     */
    removeSoundFromMemory(path: string): void {
        for (let i = 0; i < this.soundList.length; ++i) {
            let element = this.soundList[i];
            if (element.path === path) {
                this.soundList.splice(i, 1)
                return;
            }
        }
    }

    /**
     * Returns a sound based on the path provided. (from memory if already loaded, otherwise it loads from the disk, and adds to memory).
     * @param path the path to the sound
     * @returns a Howl Sound object, or null if unavailable.
     */
    getSound(path: string): Howl {

        // Checks loaded sound list first. Returns if sound is found in memory.
        for (let i = 0; i < this.soundList.length; ++i) {
            let element = this.soundList[i];
            if (path === element.path) {
                return element.sound;
            }
        }

        // Since the sound has not been loaded. We load it from the disk, and then return that sound.
        this.loadSoundIntoMemory(path);
        return new Howl({
            src: [`${ASSET_FOLDER_PATH}/${path}`],
            volume: 0.5
        });
    }
}