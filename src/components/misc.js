export const getCircleData = () => {
    let storedCircles = fetchOldData('circles');
    if (storedCircles.length > 0) {
        return storedCircles;
    }
    return [...Array(2)].map((_, i) => ({
        id: i.toString(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, width: 100, height: 100, rotation: 0, fill: 'red', isDragging: false, name: 'circle' + i.toString()
    }));
}

export const getRectangleData = () => {
    let storedRectangles = fetchOldData('rectangles');
    if (storedRectangles.length > 0) {
        return storedRectangles;
    }
    return [...Array(2)].map((_, i) => ({
        id: i.toString(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, width: 100, height: 100, rotation: 0, fill: 'red', isDragging: false, name: 'rectangle' + i.toString()
    }));
}


export const fetchOldData = (type) => {
    let items = localStorage.getItem(type ?? '');
    if (items) {
        items = JSON.parse(items);
        return items;
    }
    return [];
}

export const saveData = (circles, rectangles) => {
    localStorage.setItem('circles', JSON.stringify(circles));
    localStorage.setItem('rectangles', JSON.stringify(rectangles));
}