/**
 * A random distribution of points
 * @param {PointPlot} pointPlot The point plot
 * @param {HTMLInputElement} spacing The spacing
 * @constructor
 */
const PointDistributionRandom = function(pointPlot, spacing) {
    this.pointPlot = pointPlot;
    this.spacing = spacing;
};

/**
 * Update the plot
 */
PointDistributionRandom.prototype.update = function() {
    const area = this.pointPlot.width * this.pointPlot.height;
    const count = Math.round(area / this.spacing.valueAsNumber);
    const points = [];

    for (let i = 0; i < count; ++i)
        points.push(new Point(this.pointPlot.width * Math.random(), this.pointPlot.height * Math.random()));

    this.pointPlot.draw(points);
};