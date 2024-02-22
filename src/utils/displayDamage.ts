export default function displayDamage(damage: number) {
    return (Math.round(damage * 100) / 100).toString();
}