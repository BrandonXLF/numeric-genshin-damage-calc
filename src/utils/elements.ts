const elements = ['Physical', 'Pyro', 'Electro', 'Hydro', 'Dendro', 'Anemo', 'Cyro', 'Geo'] as const;

export default elements;

export const elementColors: Record<typeof elements[number], string> = {
    Physical: '#ffffff',
    Pyro: '#ff9b00',
    Electro: '#e19bff',
    Hydro: '#33ccff',
    Dendro: '#00ea53',
    Anemo: '#66ffcc',
    Geo: '#ffcc66',
    Cyro: '#99ffff'
}

export const energyTypeElementMap: Record<number, typeof elements[number]>= {
    1: 'Pyro',
    2: 'Hydro',
    3: 'Dendro',
    4: 'Electro',
    5: 'Cyro',
    7: 'Anemo',
    8: 'Geo'
};