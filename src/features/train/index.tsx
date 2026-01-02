import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite, TilingSprite } from "pixi.js";
import { useEffect, useState } from "react";
import Moon from "./components/Moon";
import Mountains from "./components/Mountains";
import Stars from "./components/Stars";
import Trees from "./components/Trees";
import Ground from "./components/Ground";

extend({
  Container,
  Sprite,
  TilingSprite,
  Graphics,
});
export default function Train() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Application
      width={dimensions.width}
      height={dimensions.height}
      backgroundColor={"#021f4b"}
    >
      <pixiContainer>
        <Moon />
        <Stars />
        <Mountains />
        <Trees />
        <Ground />
      </pixiContainer>
    </Application>
  );
}
