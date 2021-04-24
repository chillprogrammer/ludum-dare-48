import { Game } from "./game"
import { SplashScreen } from "./splashscreen";

export class App {

    /**
     * Initializes everything in the app.
     */
    init() {
        // Displays the splash screen for time specified in ms.
        // After the time passes, the game initializes. Splashscreen hides automatically.
        let splashScreen = new SplashScreen();
        splashScreen.display(2000).then(() => {
            splashScreen = null;
            new Game();
        });
    }
}