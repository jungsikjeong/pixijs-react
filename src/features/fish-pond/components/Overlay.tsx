import { useTick } from "@pixi/react";
import { Assets, TilingSprite } from "pixi.js";
import { useRef } from "react";

export default function Overlay({
  appWidth,
  appHeight,
}: {
  appWidth: number;
  appHeight: number;
}) {
  const overlayRef = useRef<TilingSprite>(null);

  useTick((time) => {
    if (!overlayRef.current) return;
    const overlay = overlayRef.current;
    overlay.tilePosition.x -= time.deltaTime;
    overlay.tilePosition.y -= time.deltaTime;
  });
  return (
    <pixiTilingSprite
      texture={Assets.get("overlay")}
      width={appWidth}
      height={appHeight}
      ref={overlayRef}
    />
  );
}
