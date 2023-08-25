const elements = ['Physical', 'Pyro', 'Electro', 'Hydro', 'Dendro', 'Anemo', 'Cryo', 'Geo'] as const;

export default elements;

export const elementColors: Record<typeof elements[number], string> = {
    Physical: '#ffffff',
    Pyro: '#ff9b00',
    Electro: '#e19bff',
    Hydro: '#33ccff',
    Dendro: '#00ea53',
    Anemo: '#66ffcc',
    Geo: '#ffcc66',
    Cryo: '#99ffff'
}