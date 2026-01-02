import { Application, extend, useTick } from "@pixi/react";
import { Assets, Container, Sprite, Texture, Text } from "pixi.js";
import { useState, useEffect } from "react";
extend({
  Container,
  Sprite,
  Text,
});

export default function Start() {
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
      backgroundColor={0x1099bb}
    >
      <pixiContainer>
        <Bunny dimensions={dimensions} />
      </pixiContainer>
    </Application>
  );
}

function Bunny({
  dimensions,
}: {
  dimensions: { width: number; height: number };
}) {
  const [bunny, setBunny] = useState(Texture.EMPTY);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (bunny === Texture.EMPTY) {
      Assets.load("https://pixijs.com/assets/bunny.png").then(
        (loadedTexture) => {
          setBunny(loadedTexture);
        }
      );
    }
  }, [bunny]);

  useTick((time) => {
    setRotation(rotation + 0.1 * time.deltaTime);
  });

  return (
    <>
      <pixiText
        text="으아아"
        x={dimensions.width / 2}
        y={dimensions.height / 2}
        anchor={{ x: 0.5, y: 2 }}
        rotation={rotation}
      />
      <pixiSprite
        texture={bunny}
        x={dimensions.width / 2}
        y={dimensions.height / 2}
        anchor={{ x: 0.5, y: 0.5 }}
        rotation={rotation}
      />
    </>
  );
}
