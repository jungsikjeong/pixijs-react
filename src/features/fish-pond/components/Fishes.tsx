import { useTick } from "@pixi/react";
import { Assets, Sprite, Texture } from "pixi.js";
import { useMemo, useRef } from "react";

const FISH_COUNT = 20;
const FISH_ASSETS = ["fish1", "fish2", "fish3", "fish4", "fish5"];

export default function FishesContainer({
  appWidth,
  appHeight,
}: {
  appWidth: number;
  appHeight: number;
}) {
  const fishes = useMemo(() => {
    return Array.from({ length: FISH_COUNT }).map((_, i) => ({
      id: i,
      asset: Assets.get(FISH_ASSETS[i % FISH_ASSETS.length]),
      anchor: { x: 0.5, y: 0.5 },
      x: Math.random() * appWidth,
      y: Math.random() * appHeight,
      direction: Math.random() * Math.PI * 2,
      speed: 2 + Math.random() * 2,
      turnSpeed: Math.random() - 0.8,
      scale: 0.5 + Math.random() * 0.2,
    }));
  }, [appWidth, appHeight]);

  return (
    <>
      {fishes.map((fish) => (
        <Fishes
          key={fish.id}
          fish={fish}
          appWidth={appWidth}
          appHeight={appHeight}
        />
      ))}
    </>
  );
}

interface FishType {
  id: number;
  asset: Texture;
  anchor: { x: number; y: number };
  x: number;
  y: number;
  direction: number;
  speed: number;
  turnSpeed: number;
  scale: number;
}

function Fishes({
  fish,
  appWidth,
  appHeight,
}: {
  fish: FishType;
  appWidth: number;
  appHeight: number;
}) {
  const fishRef = useRef<Sprite>(null);

  const motion = useRef({
    direction: fish.direction,
    speed: fish.speed,
    turnSpeed: fish.turnSpeed,
  });

  useTick((delta) => {
    if (!fishRef.current) return;

    const sprite = fishRef.current;
    const stagePadding = 100;
    const boundWidth = appWidth + stagePadding * 2;
    const boundHeight = appHeight + stagePadding * 2;

    motion.current.direction += motion.current.turnSpeed * 0.01;

    // Sprite의 속성을 직접 수정 (React 리렌더링 없이 Pixi가 바로 그림)
    sprite.x += Math.sin(motion.current.direction) * motion.current.speed;
    sprite.y += Math.cos(motion.current.direction) * motion.current.speed;
    sprite.rotation = -motion.current.direction - Math.PI / 2;

    // 화면 밖으로 나갔을 때 처리
    if (sprite.x < -stagePadding) sprite.x += boundWidth;
    if (sprite.x > appWidth + stagePadding) sprite.x -= boundWidth;
    if (sprite.y < -stagePadding) sprite.y += boundHeight;
    if (sprite.y > appHeight + stagePadding) sprite.y -= boundHeight;
  });

  return (
    <pixiSprite // 또는 import한 Sprite
      ref={fishRef}
      texture={fish.asset}
      x={fish.x} // 초기 위치
      y={fish.y} // 초기 위치
      anchor={fish.anchor}
      scale={fish.scale}
    />
  );
}
