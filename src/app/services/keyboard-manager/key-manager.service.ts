export class KeyManager {

    private listOfKeys: string[] = [];

    static KEYS = {
        W: 'w',
        A: 'a',
        S: 's',
        D: 'd',
        SPACE: ' ',
        ARROW_UP: 'ArrowUp',
        ARROW_DOWN: 'ArrowDown',
        ARROW_LEFT: 'ArrowLeft',
        ARROW_RIGHT: 'ArrowRight'
    }

    constructor() {
        this.init();
    }

    private init() {
        document.addEventListener('keydown', this.keyPressed.bind(this));
        document.addEventListener('keyup', this.keyReleased.bind(this));
    }

    keyPressed(keyEvent: KeyboardEvent) {
        //onsole.log('Pressed: ' + keyEvent.key);
        let key = keyEvent.key;

        if (!this.listOfKeys.includes(key)) {
            this.listOfKeys.push(key);
        }
    }

    keyReleased(keyEvent: KeyboardEvent) {
        //console.log('Released: ' + keyEvent.key);
        let key = keyEvent.key;
        if (this.listOfKeys.includes(key)) {
            for (let i = 0; i < this.listOfKeys.length; ++i) {
                if (this.listOfKeys[i] === key) {
                    this.listOfKeys.splice(i, 1);
                    return;
                }
            }
        }
    }

    getKeyList() { return this.listOfKeys; }
}