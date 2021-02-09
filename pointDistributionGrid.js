/**
 * A grid based distribution of points
 * @param {PointPlot} pointPlot The point plot
 * @param {HTMLInputElement} spacing The spacing
 * @constructor
 */
const PointDistributionGrid = function(pointPlot, spacing) {
    this.pointPlot = pointPlot;
    this.spacing = spacing;
};

/**
 * Update the plot
 */
PointDistributionGrid.prototype.update = function() {
    const spacing = Math.sqrt(this.spacing.valueAsNumber);
    const points = [];

    for (let y = 0; y < this.pointPlot.height; y += spacing)
        for (let x = 0; x < this.pointPlot.width; x += spacing)
            points.push(
                new Point(
                    x + Math.random() * spacing,
                    y + Math.random() * spacing));

    this.pointPlot.draw(points);
};