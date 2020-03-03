import { Fill, Stroke, Circle, Style } from 'ol/style';

const normalRadius = 8;
const highRadius = 14;

const greenFill = new Fill({
  color: 'rgb(72, 201, 176)'
});

const yellowFill = new Fill({
  color: 'rgb(247, 220, 111)'
});

const redFill = new Fill({
  color: 'rgb(231, 76, 60)'
});

const purpleFill = new Fill({
  color: 'rgb(91, 44, 111)'
});

const nodataFill = new Fill({
  color: 'rgb(153, 163, 164)'
});

const strokeDef = new Stroke({
  color: 'rgb(255, 255, 255)',
  width: 2
});

const fillArr = [
  greenFill,
  yellowFill,
  redFill,
  purpleFill,
  nodataFill
];

export const colourMapNormal = new Map();
export const colourMapHi = new Map();

fillArr.map((element, index) => {
  const normal = new Style({
    image: new Circle({
      fill: element,
      stroke: strokeDef,
      radius: normalRadius
    })
  });

  const highlight = new Style({
    image: new Circle({
      fill: element,
      stroke: strokeDef,
      radius: highRadius
    })
  });

  colourMapNormal.set(index, normal);
  colourMapHi.set(index, highlight);
});
