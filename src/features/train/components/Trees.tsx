import { useApplication, useTick } from "@pixi/react";
import { Graphics } from "pixi.js";
import { useCallback, useRef, useMemo } from "react";

export default function Trees() {
  const { app } = useApplication();

  const treeWidth = 200;
  const spacing = 15;
  const groundY = app.screen.height - 20; // 땅 높이
  const count = Math.ceil(app.screen.width / (treeWidth + spacing)) + 1; // 화면 가로 폭에 나무 너비와 간격을 나눠서 "몇 그루가 필요한지" 계산

  //  나무들의 데이터
  const treesData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: i * (treeWidth + spacing),
      height: 225 + Math.random() * 50, // 랜덤 높이
    }));
  }, [count, treeWidth, spacing]);

  // 개별 나무들을 움직이기 위해 Ref 배열 만듦
  const treeRefs = useRef<any[]>([]);

  useTick((delta) => {
    const dx = delta.deltaTime * 3; // 이동 속도

    treeRefs.current.forEach((tree) => {
      if (!tree) return;

      tree.x -= dx; // 왼쪽으로 이동

      // 화면 왼쪽 끝으로 사라지면 다시 오른쪽 끝으로 보냄
      if (tree.x <= -(treeWidth / 2 + spacing)) {
        tree.x += count * (treeWidth + spacing) + spacing * 3;
      }
    });
  });

  //  나무 하나를 그리는 함수
  const drawTree = useCallback(
    (g: Graphics, height: number) => {
      const trunkWidth = 30;
      const trunkHeight = height / 4;
      const crownHeight = height - trunkHeight;
      const crownLevels = 4;
      const crownLevelHeight = crownHeight / crownLevels;
      const crownWidthIncrement = treeWidth / crownLevels;

      g.clear();
      // 기둥
      g.rect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight).fill({
        color: 0x563929,
      });

      // 나뭇잎 레이어
      for (let i = 0; i < crownLevels; i++) {
        const yPos = -trunkHeight - crownLevelHeight * i;
        const levelW = treeWidth - crownWidthIncrement * i;
        const offset = i < crownLevels - 1 ? crownLevelHeight / 2 : 0;

        g.moveTo(-levelW / 2, yPos)
          .lineTo(0, yPos - crownLevelHeight - offset)
          .lineTo(levelW / 2, yPos)
          .fill({ color: 0x264d3d });
      }
    },
    [treeWidth]
  );

  return (
    <pixiContainer>
      {treesData.map((data, index) => (
        <pixiContainer
          key={data.id}
          ref={(el) => {
            treeRefs.current[index] = el;
          }}
          x={data.x}
          y={groundY}
        >
          <pixiGraphics draw={(g) => drawTree(g, data.height)} />
        </pixiContainer>
      ))}
    </pixiContainer>
  );
}
