import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import LabelClass from "@arcgis/core/layers/support/LabelClass";
import Color from "@arcgis/core/Color";
import Font from "@arcgis/core/symbols/Font";

const minimumDrawScale = 95000;

function haloLabelInfo(labelExpr: string, labelColor: Color): LabelClass[] {
  return [
    //[{
    //   labelExpression: "[name]",
    //   labelPlacement: "always-horizontal",
    //   symbol: {
    //     type: "text",  // autocasts as new TextSymbol()
    //     color: [255, 255, 255, 0.7],
    //     haloColor: [0, 0, 0, 0.85],
    //     haloSize: 1,
    //     font: {
    //       size: 11
    //     }
    //   },
    //   minScale: 2400000,
    //   maxScale: 73000
    // }]

    {
      labelExpression: labelExpr,
      labelPlacement: "above-center",
      symbol: {
        type: "text",
        color: labelColor,
        haloColor: new Color([255, 255, 255]),
        haloSize: 2,
        font: new Font({
          size: 8,
          family: "Ubuntu Mono",
          weight: "bold",
        }),
      },
    },
  ];
}

const countiesRenderer = {
  type: "simple",
  symbol: {
    type: "simple-fill",
    style: "none",
    color: "none",
    outline: {
      style: "dash-dot",
      width: 1,
      color: "dimgray",
    },
  },
};

const countyBoundariesURL =
  "https://maps.freac.fsu.edu/arcgis/rest/services/FREAC/County_Boundaries/MapServer/";
export const countyBoundariesLayer = new MapImageLayer({
  url: countyBoundariesURL,
  title: "County Boundaries",
  minScale: 2000000,
  sublayers: [
    {
      id: 0,
      title: "County Boundaries",
      visible: true,
      popupEnabled: true,
      renderer: countiesRenderer,
    },
  ],
});

const labinsURL =
  "https://maps.freac.fsu.edu/arcgis/rest/services/LABINS/LABINS_Data_ccr_relate/MapServer/";
export const labinsLayer = new MapImageLayer({
  title: "LABINS Data",
  url: labinsURL,
  sublayers: [
    {
      id: 17,
      title: "Erosion Control Line1",
      visible: true,
      popupEnabled: true,
      minScale: minimumDrawScale,
    },
    {
      id: 16,
      title: "Soils June 2012 - Dept. of Agriculture",
      visible: false,
      popupEnabled: true,
      minScale: minimumDrawScale,
    },
    {
      id: 15,
      title: "Hi-Res Imagery Grid State Plane East",
      visible: true,
      popupEnabled: true,
      minScale: minimumDrawScale,
      labelingInfo: haloLabelInfo("[spe_id]", new Color([230, 76, 0, 255])),
      labelsVisible: true,
    },
    {
      id: 14,
      title: "Hi-Res Imagery Grid: State Plane North",
      visible: true,
      popupEnabled: true,
      minScale: minimumDrawScale,
      labelingInfo: haloLabelInfo("[spn_id]", new Color([230, 76, 0, 255])),
      labelsVisible: true,
    },
    {
      id: 13,
      title: "Hi-Res Imagery Grid: State Plane West",
      visible: true,
      popupEnabled: true,
      minScale: minimumDrawScale,
      labelingInfo: haloLabelInfo("[spw_id]", new Color([230, 76, 0, 255])),
      labelsVisible: true,
    },
    {
      id: 12,
      title: "Parcels",
      visible: false,
      popupEnabled: true,
      minScale: minimumDrawScale,
    },
    {
      id: 11,
      title: "City Limits",
      visible: false,
      popupEnabled: true,
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          style: "none",
          outline: {
            style: "dash",
            width: 1.25,
          },
        },
      },
      minScale: minimumDrawScale,
    },
    {
      id: 10,
      title: "Township-Range-Section",
      visible: true,
      popupEnabled: true,
      minScale: minimumDrawScale,
    },
    {
      id: 9,
      title: "Township-Range",
      visible: true,
      popupEnabled: true,
      labelsVisible: true,
      // Set label specs for township-range
      labelingInfo: [
        {
          labelExpression: "[tr_dissolve]",
          labelPlacement: "always-horizontal",
          symbol: {
            type: "text",
            color: [0, 0, 255, 1],
            haloColor: [255, 255, 255],
            haloSize: 2,
            font: {
              size: 11,
            },
          },
        },
      ],
      minScale: minimumDrawScale,
    },
    {
      id: 8,
      title: "USGS Quads",
      visible: false,
      popupEnabled: true,
      minScale: minimumDrawScale,
    },
    {
      id: 7,
      title: "Erosion Control Line",
      minScale: 4000000,
      visible: true,
      popupEnabled: true,
    },
    {
      id: 6,
      title: "R-Monuments",
      visible: true,
      popupEnabled: true,
      minScale: minimumDrawScale,
    },
    {
      id: 4,
      title: "Tide Interpolation Points",
      visible: true,
      popupEnabled: true,
      minScale: minimumDrawScale,
    },
    {
      id: 3,
      title: "Tide Stations",
      visible: true,
      popupEnabled: true,
      minScale: minimumDrawScale,
    },
    {
      id: 2,
      title: "Certified Corners",
      visible: true,
      popupEnabled: true,
      minScale: minimumDrawScale,
      labelingInfo: haloLabelInfo("[blmid]", new Color([0, 0, 255, 255])),
      labelsVisible: false,
    },
    {
      id: 1,
      title: "Preliminary NGS Points",
      visible: false,
      popupEnabled: true,
      minScale: minimumDrawScale,
    },
  ],
});

const swfwmdURL =
  "https://www25.swfwmd.state.fl.us/arcgis12/rest/services/BaseVector/SurveyBM/MapServer/";
export const swfwmdLayer = new MapImageLayer({
  url: swfwmdURL,
  title: "SWFWMD Survey Benchmarks",
  minScale: minimumDrawScale,
  sublayers: [
    {
      id: 0,
      title: "Survey Benchmarks",
      visible: true,
      popupEnabled: true,
    },
  ],
});

// Layers needed for dependent dropdowns
const townshipRangeSectionURL =
  "https://maps.freac.fsu.edu/arcgis/rest/services/LABINS/LABINS_Data_ccr_relate/MapServer/10";
export const townshipRangeSectionLayer = new FeatureLayer({
  url: townshipRangeSectionURL,
  outFields: ["twn_ch", "rng_ch", "sec_ch"],
  title: "Section Lines",
  visible: false,
  listMode: "hide",
  popupEnabled: true,
});

const newCCRURL =
  "https://maps.freac.fsu.edu/arcgis/rest/services/LABINS/LABINS_Data_ccr_relate/MapServer/2";
export const newCCRLayer = new FeatureLayer({
  url: newCCRURL,
  title: "New Certified Corner Records",
  minScale: minimumDrawScale,
  visible: true,
  popupEnabled: true,
});

const CCCLURL =
  "https://ca.dep.state.fl.us/arcgis/rest/services/OpenData/COASTAL_ENV_PERM/MapServer/2";
export const CCCLLayer = new MapImageLayer({
  url: CCCLURL,
  minScale: minimumDrawScale,
  title: "Coastal Construction Control Lines",
  sublayers: [
    {
      id: 2,
      title: "Coastal Construction Control Lines",
      visible: true,
      popupEnabled: true,
    },
  ],
});

// Graphics layer that will highlight features accessed through zoomTo Functions
export const selectionLayer = new GraphicsLayer({
  listMode: "hide",
});

export const bufferLayer = new GraphicsLayer({
  listMode: "hide",
});
