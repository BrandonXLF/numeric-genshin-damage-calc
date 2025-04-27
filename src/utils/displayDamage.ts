import roundDecimals from "./roundDecimals";

export default function displayDamage(damage: number): string {
    return roundDecimals(damage, 2).toString();
}