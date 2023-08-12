import colors from "colors";

export default class AnimationLoading {
  private interval: NodeJS.Timer | null;

  constructor() {
    this.interval = null;
  }
  startAnimation(text: string) {
    const spinnerFrames = [
      "⠋".magenta,
      "⠙".cyan,
      "⠹".yellow,
      "⠸".blue,
      "⠼".red,
      "⠴".magenta,
      "⠦".cyan,
      "⠧".yellow,
      "⠇".blue,
      "⠏".red,
    ];
    let frameIndex = 0;
    let color = "blue";

    // Intervalo para trocar o frame do spinner
    this.interval = setInterval(() => {
      process.stdout.clearLine(0); // Limpa a linha anterior
      process.stdout.cursorTo(0); // Move o cursor para o início da linha

      // Exibe o frame atual do spinner
      process.stdout.write(`${spinnerFrames[frameIndex]}` + ` ${text}`);

      // Move para o próximo frame
      frameIndex = (frameIndex + 1) % spinnerFrames.length;
    }, 100);
  }

  stopAnimation() {
    if (this.interval) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      clearInterval(this.interval);
    }
  }
}
