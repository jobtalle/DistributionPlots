/**
 * A random distribution of points
 * @param {PointPlot} pointPlot The point plot
 * @param {HTMLInputElement} spacing The spacing
 * @constructor
 */
const PointDistributionPoisson = function(pointPlot, spacing) {
    this.pointPlot = pointPlot;
    this.spacing = spacing;
};

PointDistributionPoisson.prototype.MAX_ITERATIONS = 30;

/**
 * Update the plot
 */
PointDistributionPoisson.prototype.update = function() {
    const radius = Math.sqrt(this.spacing.valueAsNumber);
    const cellSize = radius / Math.sqrt(2);
    const xCells = Math.ceil(this.pointPlot.width / cellSize);
    const yCells = Math.ceil(this.pointPlot.height / cellSize);
    const cells = new Array(xCells * yCells).fill(null);
    const points = [];
    const active = [];

    const insert = point => {
        const x = Math.floor(point.x / cellSize);
        const y = Math.floor(point.y / cellSize);

        cells[x + y * xCells] = point;

        points.push(point);
        active.push(point);
    };

    const collides = point => {
        if (point.x < 0 || point.y < 0 || point.x > this.pointPlot.width || point.y > this.pointPlot.height)
            return true;

        const x = Math.floor(point.x / cellSize);
        const y = Math.floor(point.y / cellSize);
        const xStart = Math.max(0, x - 1);
        const yStart = Math.max(0, y - 1);
        const xEnd = Math.min(xCells - 1, x + 1);
        const yEnd = Math.min(yCells - 1, y + 1);

        for (let yCell = yStart; yCell <= yEnd; ++yCell) for (let xCell = xStart; xCell <= xEnd; ++xCell) {
            if (cells[xCell + yCell * xCells]) {
                const dx = point.x - cells[xCell + yCell * xCells].x;
                const dy = point.y - cells[xCell + yCell * xCells].y;

                if (dx * dx + dy * dy < radius * radius)
                    return true;
            }
        }

        return false;
    };

    insert(new Point(this.pointPlot.width * Math.random(), this.pointPlot.height * Math.random()));

    while (active.length !== 0) {
        const centerIndex = Math.floor(active.length * Math.random());
        const center = active[centerIndex];

        for (let i = 0; i < this.MAX_ITERATIONS; ++i) {
            const pointRadius = radius + radius * Math.random();
            const pointRadians = Math.PI * 2 * Math.random();
            const point = new Point(
                center.x + Math.cos(pointRadians) * pointRadius,
                center.y + Math.sin(pointRadians) * pointRadius);

            if (!collides(point))
                insert(point);
        }

        active.splice(centerIndex, 1);
    }

    this.pointPlot.draw(points);
};