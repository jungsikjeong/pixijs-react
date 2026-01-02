import { useApplication, useTick } from "@pixi/react";
import { Container, Graphics } from "pixi.js";
import { useCallback, useRef } from "react";

const groundHeight = 20;

export default function Ground() {
  return (
    <>
      <TracksRails />
      <SnowLayer />
    </>
  );
}

function SnowLayer() {
  const { app } = useApplication();

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.rect(
        0,
        app.screen.height - groundHeight, // 위쪽 y 좌표
        app.screen.width, // 가로 전체
        groundHeight // 높이 20
      ).fill({ color: 0xdddddd });
    },
    [app.screen.width, app.screen.height]
  );

  return <pixiGraphics draw={draw} />;
}

function TracksRails() {
  const { app } = useApplication();
  const trackHeight = 15;
  const plankWidth = 50;
  const plankHeight = trackHeight / 2;
  const plankGap = 20;
  const plankY = app.screen.height - groundHeight;

  const fullStep = plankWidth + plankGap;
  const plankCount = Math.ceil(app.screen.width / fullStep) + 1;

  //  판자들을 담은 통(Container)을 가리킬 Ref
  const containerRef = useRef<Container>(null);

  const drawPlanks = useCallback(
    (g: Graphics) => {
      g.clear();
      for (let i = 0; i < plankCount; i++) {
        g.rect(
          i * fullStep,
          plankY - plankHeight,
          plankWidth,
          plankHeight
        ).fill({ color: 0x241811 });
      }
    },
    [plankCount, fullStep, plankY]
  );

  useTick((time) => {
    if (!containerRef.current) return;

    // 통째로 왼쪽 이동
    containerRef.current.x -= time.deltaTime * 6;

    // 한 칸(fullStep)만큼 이동했을 때마다 좌표를 리셋해서 무한 루프 구현
    if (containerRef.current.x <= -fullStep) {
      containerRef.current.x += fullStep;
    }
  });

  return (
    <>
      {/*  pixiContainer 안에 그래픽을 넣고 container를 움직임 */}
      <pixiContainer ref={containerRef}>
        <pixiGraphics draw={drawPlanks} />
      </pixiContainer>

      {/* 레일은 안 움직여도 되니 밖에 배치 */}
      <pixiGraphics
        draw={(g) => {
          g.clear()
            .rect(0, plankY - trackHeight, app.screen.width, plankHeight)
            .fill(0x5c5c5c);
        }}
      />
    </>
  );
}
