type RatesLineData = [string, number | string | string[], number];

type EquipmentPosition = "weapon" | "secondary" | "emblem" | "hat" | "overall" | "top" | "bottom" | "shoulder" | "gloves" | "shoes" | "cape" | "ring" | "belt" | "heart";
type CubeType = "red" | "occult" | "black" | "master" | "meister";
type TierType = "legendary" | "unique" | "epic" | "rare";
type LineType = "first_line" | "second_line" | "third_line";

interface RatesData {
  lvl120to200: Record<EquipmentPosition, Record<CubeType, Record<TierType, Record<LineType, RatesLineData[]>>>>
}

export const cubeRates: RatesData;

export type { RatesLineData, EquipmentPosition, CubeType, TierType, LineType };