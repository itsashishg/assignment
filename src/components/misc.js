export const getShapesData = (type) => {
    console.log(fetchOldData())
    if (fetchOldData().length > 0) {
        return fetchOldData();
    }
    return [...Array(2)].map((_, i) => ({
        id: i.toString(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, width: 100, height: 100, rotation: 0, fill: 'red', isDragging: false, name: type + i.toString()
    }));
}

export const fetchOldData = () => {
    let items = localStorage.getItem('data');
    if (items) {
        items = JSON.parse(items);
        return items;
    }
    return [];
}

export const saveData = (list) => {
    localStorage.setItem('data', JSON.stringify(list));
}