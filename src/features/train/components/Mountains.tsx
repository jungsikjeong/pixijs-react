import { useApplication, useTick } from "@pixi/react";
import type { Container, Graphics } from "pixi.js";
import { useCallback, useRef } from "react";

export default function Mountains() {
  const { app } = useApplication();

  const group1Ref = useRef<Container>(null);
  const group2Ref = useRef<Container>(null);

  // 초기 위치값 저장
  const pos = useRef({
    g1: 0,
    g2: app.screen.width,
  });

  useTick((delta) => {
    const dx = delta.deltaTime * 0.5;

    // 좌표 계산
    pos.current.g1 -= dx;
    pos.current.g2 -= dx;

    // 화면 밖으로 나갔을 때 루프 로직
    if (pos.current.g1 <= -app.screen.width) {
      pos.current.g1 += app.screen.width * 2;
    }
    if (pos.current.g2 <= -app.screen.width) {
      pos.current.g2 += app.screen.width * 2;
    }

    // 실제 화면상의 객체에 위치 반영
    if (group1Ref.current) group1Ref.current.x = pos.current.g1;
    if (group2Ref.current) group2Ref.current.x = pos.current.g2;
  });

  return (
    <>
      <pixiContainer ref={group1Ref} x={pos.current.g1}>
        <MountainGroup x={0} />
      </pixiContainer>

      <pixiContainer ref={group2Ref} x={pos.current.g2}>
        <MountainGroup x={0} />
      </pixiContainer>
    </>
  );
}

interface MountainGroupProps {
  x: number;
}

export const MountainGroup = ({ x }: MountainGroupProps) => {
  const { app } = useApplication();

  const draw = useCallback(
    (g: Graphics) => {
      const width = app.screen.width / 2;
      const startY = app.screen.height; // 화면 하단에서 시작하도록 (Y 좌표가 최대치일때가 화면 맨 아래임)

      const config = [
        {
          startX: app.screen.width / 4, // 화면을 4등분 했을 때 첫째 지점 (25% 지점)에서 산 시작
          height: (app.screen.height * 4) / 5, // 화면 높이의 4/5 지점에서(80%) 산 솟아오름
          color: 0x7e818f,
        }, // 가운데 산
        { startX: 0, height: app.screen.height / 2, color: 0xc1c0c2 }, // 왼쪽 산
        {
          startX: app.screen.width / 2,
          height: (app.screen.height * 2) / 3, // 화면 높이의 2/3 지점에서(66%) 산 솟아오름
          color: 0x8c919f,
        }, // 오른쪽 산
      ];

      g.clear();
      config.forEach(({ startX, height, color }) => {
        g.moveTo(startX, startY)
          .bezierCurveTo(
            startX + width / 2,
            startY - height,
            startX + width / 2,
            startY - height,
            startX + width,
            startY
          )
          .fill({ color });
      });
    },
    [app.screen.width, app.screen.height]
  );

  return <pixiGraphics draw={draw} x={x} />;
};
