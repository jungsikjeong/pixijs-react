import { useApplication } from "@pixi/react";
import moonSvg from "../../../assets/moon.svg?raw";

export default function Moon() {
  const { app } = useApplication();

  return (
    <pixiGraphics
      draw={(g) => {
        g.clear();
        g.svg(moonSvg);
      }}
      x={app.screen.width / 2 + 100}
      y={app.screen.height / 8}
    />
  );
}
