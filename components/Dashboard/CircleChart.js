import { jsx as _jsx } from "react/jsx-runtime";
export const CircleChart = (props) => {
    const { data, width = 250, height = 250, offsetX = 125, offsetY = 125, radio = 110, } = props;
    const circumference = Math.PI * 2 * radio;
    let cumulativeOffset = 0;
    return (_jsx("svg", Object.assign({ width: width, height: height, style: { display: 'flex' } }, { children: data.map((circleData, index) => {
            const circlePercentage = parseFloat(circleData.percentage.replace('%', ''));
            const segmentLength = (circumference * circlePercentage) / 100;
            const strokeDasharray = `${segmentLength} ${circumference - segmentLength}`;
            const strokeDashoffset = cumulativeOffset;
            cumulativeOffset -= segmentLength;
            return (_jsx("circle", { cx: offsetX, cy: offsetY, r: radio, fill: 'transparent', stroke: circleData.color, strokeWidth: '25', strokeDasharray: strokeDasharray, strokeDashoffset: strokeDashoffset }, `${circleData.color}-${index}`));
        }) })));
};
