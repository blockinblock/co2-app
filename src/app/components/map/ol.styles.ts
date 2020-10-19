import { Fill, Stroke, Circle, Style } from 'ol/style';

const normalRadius = 8;
const highRadius = 14;

const green = '#48C9B0';
const yellow = '#F7DC6F';
const red = '#E74C3C';
const purple = '#5B2C6F';
const nodata = '#797D7F';

export const colors = [
  green,
  yellow,
  red,
  purple,
  nodata
];

const strokeDef = new Stroke({
  color: '#FFFFFF',
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
 * Returns the OpenLayers Style or Hex color based on :
 * - the feature and whether normal or highlighted styling needed.
 * - or the hex color
 * @param feature The OpenLayers vector feature or CO2 value
 * @param styleType 'normal' or 'highlight'
 * @param returnType 'style' for an OL style or 'color' for the hex color
 */
export const getStyle = (feature, styleType = 'normal', returnType = 'style') => {
  let val;
  let styleClass = 4;   // No data
  let color = nodata;

  // Get value for the last year if it's a style, otherwise the feature IS the value
  if (returnType === 'style') {
    const lastYear = new Date().getFullYear() - 1;
    val = feature.get(`sd${lastYear}`);
  } else if (returnType === 'color') {
    val = feature;
  }

  // Determine style class based on preset bandings
  if (val.length === 0) {
    styleClass = 4;
    color = nodata;
  } else if (val <= styles[0].lt) {
    styleClass = 0;
    color = green;
  } else if (val > styles[1].gt && val <= styles[1].lt) {
    styleClass = 1;
    color = yellow;
  } else if (val > styles[2].gt && val <= styles[2].lt) {
    styleClass = 2;
    color = red;
  } else if (val > styles[3].gt) {
    styleClass = 3;
    color = purple;
  }

  // Return style or color
  if (returnType === 'style') {
    return styles[styleClass][styleType];
  } else if (returnType === 'color') {
    return color;
  }
};
