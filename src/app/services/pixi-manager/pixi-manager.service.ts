import * as PIXI from "pixi.js"

export class PixiManager {

    private INITIAL_WIDTH = 960;
    private INITIAL_HEIGHT = 540;
    private app: PIXI.Application;

    constructor() {
        this.init();
    }

    private init() {

        //Sets the onResizeCallback
        window.onresize = this.onResizeCallback.bind(this);

        //Initialize Pixi.js
        this.initializePixiJs();
    }

    getApp(): PIXI.Application { return this.app }

    /**
    * Creates the Pixi.js canvas, and adds it to the HTML document.
    */
    initializePixiJs() {
        let type = "WebGL"
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas"
        }
        PIXI.utils.skipHello();

        //Create a Pixi Application
        this.app = new PIXI.Application();

        //Add the pixi.js canvas to the HTML document
        document.body.appendChild(this.app.view);

        // Force the onResizeEvent to occur.
        window.dispatchEvent(new Event('resize'));
    }

    /**
     * Callback function that runs when the window is resized.
     * Resizes the pixi.js canvas to maintain aspect ratio.
     * @param ev the window.resize event
     */
    onResizeCallback(ev: UIEvent) {
        if (this.app) {
            const w = ev.target as Window;
            const width = w.innerWidth;
            const height = w.innerHeight;

            this.app.renderer.view.style.position = "absolute";
            this.app.renderer.view.style.display = "block";

            //Calculates what the Width & Height should be to fit the same aspect ratio on the screen.
            const resolutionRatio = this.INITIAL_WIDTH / this.INITIAL_HEIGHT;
            let calculatedWidth = width;
            let calculatedHeight = width / resolutionRatio;
            if (calculatedHeight > height) {
                calculatedHeight = height;
                calculatedWidth = calculatedHeight * resolutionRatio;
            }

            //This sets the game's dimensions to what we calculated.
            this.app.renderer.view.style.width = calculatedWidth + 'px';
            this.app.renderer.view.style.height = calculatedHeight + 'px';

            //This sets the game's dimensions to what we calculated.
            const ratio = Math.min(width / this.app.renderer.width, height / this.app.renderer.height);
            this.app.stage.scale.x = this.app.stage.scale.y = ratio;
            this.app.renderer.resize(Math.ceil(this.INITIAL_WIDTH * ratio), Math.ceil(this.INITIAL_HEIGHT * ratio));
        }
    }
}