import { Assets } from "pixi.js";
import { useEffect, useState } from "react";

export default function Background({
  appWidth,
  appHeight,
}: {
  appWidth: number;
  appHeight: number;
}) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    x: appWidth / 2,
    y: appHeight / 2,
  });

  useEffect(() => {
    const texture = Assets.get("background");
    if (!texture) return;

    let newDimensions;

    if (appWidth > appHeight) {
      // 가로 방향: 너비를 채우고 그 스케일을 세로에도 적용
      const width = appWidth * 1.2;
      const scaleX = width / texture.width;
      const height = texture.height * scaleX;

      newDimensions = {
        width,
        height,
        x: appWidth / 2,
        y: appHeight / 2,
      };
    } else {
      // 세로 방향: 높이를 채우고 그 스케일을 가로에도 적용
      const height = appHeight * 1.2;
      const scaleY = height / texture.height;
      const width = texture.width * scaleY;

      newDimensions = {
        width,
        height,
        x: appWidth / 2,
        y: appHeight / 2,
      };
    }

    setDimensions(newDimensions);
  }, [appWidth, appHeight]);

  return (
    <pixiSprite
      texture={Assets.get("background")}
      anchor={{ x: 0.5, y: 0.5 }}
      x={dimensions.x}
      y={dimensions.y}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}
