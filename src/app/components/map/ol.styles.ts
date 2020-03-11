import { Fill, Stroke, Circle, Style } from 'ol/style';

const normalRadius = 8;
const highRadius = 14;

const green = 'rgb(72, 201, 176)';
const yellow = 'rgb(247, 220, 111)';
const red = 'rgb(231, 76, 60)';
const purple = 'rgb(91, 44, 111)';
const nodata = 'rgb(153, 163, 164)';

const colors = [
  green,
  yellow,
  red,
  purple,
  nodata
];

const strokeDef = new Stroke({
  color: 'rgb(255, 255, 255)',
  width: 2
});

export const styles = [];

colors.forEach((col, i) => {
  // Create 2 styles and build array
  const normStyle = new Style({
    image: new Circle({
      fill: new Fill({
        color: col
      }),
      stroke: strokeDef,
      radius: normalRadius
    })
  });

  const highStyle = new Style({
    image: new Circle({
      fill: new Fill({
        color: col
      }),
      stroke: strokeDef,
      radius: highRadius
    })
  });

  styles.push(
    {
      normal: normStyle,
      highlight: highStyle,
      desc: '',
      gt: -1,
      lt: -1
    }
  );

  // Add boundaries to styles
  switch (i) {
    case 0:
      styles[i].desc = '< 100,000';
      styles[i].gt = null;
      styles[i].lt = 100000;
      break;
    case 1:
      styles[i].desc = '100,000 - 500,000';
      styles[i].gt = 100000;
      styles[i].lt = 500000;
      break;
    case 2:
      styles[i].desc = '500,000 - 1M';
      styles[i].gt = 500000;
      styles[i].lt = 1000000;
      break;
    case 3:
      styles[i].desc = '> 1M';
      styles[i].gt = 1000000;
      styles[i].lt = null;
      break;
    case 4:
      styles[i].desc = 'No data';
      styles[i].gt = -1;
      styles[i].lt = -1;
      break;
  }
});


/**
 * Returns the OpenLayers Style based on the feature and whether normal or highlighted styling needed.
 * @param feature The OpenLayers vector feature
 * @param styleType 'normal' or 'highlight'
 */
export const getStyle = (feature, styleType = 'normal') => {
  const val = feature.get('SD2017');
  let styleClass = 4;   // No data

  // Determine style class based on preset bandings
  if (val <= styles[0].lt) {
    styleClass = 0;
  } else if (val > styles[1].gt && val <= styles[1].lt) {
    styleClass = 1;
  } else if (val > styles[2].gt && val <= styles[2].lt) {
    styleClass = 2;
  } else if (val > styles[3].gt) {
    styleClass = 3;
  }

  return styles[styleClass][styleType];
};
