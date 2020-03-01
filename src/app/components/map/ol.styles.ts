import { Fill, Stroke, Circle, Style } from 'ol/style';

// TODO: refactor the repetitions!
const greenStyle = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(72,201,176)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 6
  })
});

const greenStyleHi = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(72,201,176)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 10
  })
});

const yellowStyle = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(247,220,111)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 6
  })
});

const yellowStyleHi = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(247,220,111)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 10
  })
});

const redStyle = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(231,76,60)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 6
  })
});

const redStyleHi = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(231,76,60)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 10
  })
});

const purpleStyle = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(91,44,111)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 6
  })
});

const purpleStyleHi = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(91,44,111)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 10
  })
});

const nodataStyle = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(153,163,164)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 6
  })
});

const nodataStyleHi = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgb(153,163,164)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 255, 255)',
      width: 2
    }),
    radius: 10
  })
});

export const colourMap = new Map();
colourMap.set('green', greenStyle);
colourMap.set('greenHi', greenStyleHi);
colourMap.set('yellow', yellowStyle);
colourMap.set('yellowHi', yellowStyleHi);
colourMap.set('red', redStyle);
colourMap.set('redHi', redStyleHi);
colourMap.set('purple', purpleStyle);
colourMap.set('purpleHi', purpleStyleHi);
colourMap.set('nodata', nodataStyle);
colourMap.set('nodataHi', nodataStyleHi);
