import { Application, extend } from "@pixi/react";
import { Assets, Container, Sprite, TilingSprite } from "pixi.js";
import { useEffect, useState } from "react";
import Background from "./components/Background";
import Filter from "./components/Filter";
import Fishes from "./components/Fishes";
import Overlay from "./components/Overlay";

extend({
  Container,
  Sprite,
  TilingSprite,
});

const ASSETS = [
  {
    alias: "background",
    src: "https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg",
  },
  {
    alias: "fish1",
    src: "https://pixijs.com/assets/tutorials/fish-pond/fish1.png",
  },
  {
    alias: "fish2",
    src: "https://pixijs.com/assets/tutorials/fish-pond/fish2.png",
  },
  {
    alias: "fish3",
    src: "https://pixijs.com/assets/tutorials/fish-pond/fish3.png",
  },
  {
    alias: "fish4",
    src: "https://pixijs.com/assets/tutorials/fish-pond/fish4.png",
  },
  {
    alias: "fish5",
    src: "https://pixijs.com/assets/tutorials/fish-pond/fish5.png",
  },
  {
    alias: "overlay",
    src: "https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png",
  },
  {
    alias: "displacement",
    src: "https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png",
  },
];

export default function FishPond() {
  const [ready, setReady] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    (async () => {
      await Assets.load(ASSETS);
      if (!ready) setReady(true);
    })();
  }, []);

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

  if (!ready) return null; // or loading UI

  return (
    <Application
      width={dimensions.width}
      height={dimensions.height}
      backgroundColor={"#1099bb"}
    >
      <pixiContainer>
        <Background appWidth={dimensions.width} appHeight={dimensions.height} />
        <Fishes appWidth={dimensions.width} appHeight={dimensions.height} />
        <Overlay appWidth={dimensions.width} appHeight={dimensions.height} />
        <Filter />
      </pixiContainer>
    </Application>
  );
}
