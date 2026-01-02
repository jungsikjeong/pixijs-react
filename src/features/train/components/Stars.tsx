import { useApplication } from "@pixi/react";
import { useMemo } from "react";

export default function Stars() {
  const { app } = useApplication();
  const starCount = 20;

  const stars = useMemo(() => {
    return Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: (i * 0.78695 * app.screen.width) % app.screen.width,
      y: (i * 0.9382 * app.screen.height) % app.screen.height,
      radius: 2 + Math.random() * 3,
      rotation: Math.random() * Math.PI * 2,
    }));
  }, [app.screen.width, app.screen.height]);

  return (
    <>
      {stars.map((star) => (
        <pixiGraphics
          key={star.id}
          draw={(g) => {
            g.clear();
            g.star(star.x, star.y, 5, star.radius, 0, star.rotation);
            g.fill({ color: 0xffdf00, alpha: star.radius / 5 });
          }}
        />
      ))}
    </>
  );
}
