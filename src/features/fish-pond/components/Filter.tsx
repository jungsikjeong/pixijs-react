import { useApplication } from "@pixi/react";
import { Assets, DisplacementFilter, Sprite } from "pixi.js";
import { useEffect, useMemo, useRef } from "react";

export default function Filter() {
  const { app } = useApplication();
  const displacementSpriteRef = useRef<Sprite | null>(null);

  const filter = useMemo(() => {
    const texture = Assets.get("displacement");
    texture.source.addressMode = "repeat";

    const sprite = Sprite.from(texture);
    displacementSpriteRef.current = sprite;

    return new DisplacementFilter({ sprite, scale: 50 });
  }, []);

  useEffect(() => {
    app.stage.filters = [filter];

    return () => {
      app.stage.filters = [];
    };
  }, [app, filter]);

  return null;
}
