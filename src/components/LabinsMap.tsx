import React, { useRef, useEffect } from "react";
// import Bookmarks from "@arcgis/core/widgets/Bookmarks";
// import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

import "../App.css";
import {
  countyBoundariesLayer,
  labinsLayer,
  swfwmdLayer,
  CCCLLayer,
  townshipRangeSectionLayer,
} from "../layers/layers";

const LabinsMap: React.FC = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const map = new Map({
        basemap: "topo-vector",
      });
      const mapView = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-82.28, 27.8],
        padding: {
          top: 50,
          bottom: 0,
        },
        zoom: 13,
        constraints: {
          rotationEnabled: false,
        },
      });

      let layerList = undefined;

      // when mapView is ready, check that the services are online
      // if service is online, add to map
      // if service is offline, ignore
      mapView.when(async function () {
        // Add label toggles in Layerlist widget
        function defineActions(event) {
          if (
            [
              "Certified Corners",
              "Hi-Res Imagery Grid State Plane East",
              "Hi-Res Imagery Grid: State Plane North",
              "Hi-Res Imagery Grid: State Plane West",
            ].includes(event.item.title)
          ) {
            event.item.actionsSections = [
              [
                {
                  title: "Toggle labels",
                  className: "esri-icon-labels",
                  id: "toggle-labels",
                },
              ],
            ];
          }
        }

        // wait for all services to be checked in the layersArr
        async function checkServices() {
          const layers = [
            countyBoundariesLayer,
            labinsLayer,
            //ngsLayer,
            swfwmdLayer,
            CCCLLayer,
            townshipRangeSectionLayer,
          ];
          for (const layer of layers) {
            try {
              // make request to server for layer in question
              const request = await fetch(layer.url);
              // if layer returns good, add to map
              map.add(layer);
            } catch (err) {
              // layer returns bad, not added to map, log error
              console.error(
                layer.title + " layer failed to be returned: " + err
              );
            }
          }
        }

        await checkServices();

        // declare layerlist
        // layerList = await new LayerList({
        //   view: mapView,
        //   container: "layersDiv",
        //   listItemCreatedFunction: defineActions,
        // });

        // status to watch if layerlist is on
        // let layerlistStatus;
        // document
        //   .getElementById("desktopLayerlist")
        //   .addEventListener("click", () => {
        //     // if layerlist status != 1, add it to the map
        //     if (layerlistStatus != 1) {
        //       mapView.ui.remove(scaleBar);

        //       // custom header to display a header and close button
        //       const header = `
        // <div id="layerlistHeader" style="background-color:#315866; position: sticky; top: 0; z-index: 999; padding-top: 1px;">
        //   <span class="glyphicon esri-icon-layers" aria-hidden="true" style="color: white; margin-right: 5px; margin-top: 5px; margin-left: 2px;"></span>
        //   <span id="layerListSpan" class="panel-label"  style="color: white; margin-top: 5px;">Layerlist</span>
        //   <button id="closeLyrBtn" type="button" class="btn text-right" style="display: inline-block; background-color: transparent; float: right;">
        //     <span class="esri-icon esri-icon-close" style="color:white; display:inline-block; float:left;" aria-hidden="true"></span>
        //   </button>
        // </div>
        // `;
        //       mapView.ui.add([layerList, scaleBar], "bottom-left");
        //       // add layerlist header to beginning of div
        //       $("#layersDiv").prepend(header);

        //       const closebtn = document.getElementById("closeLyrBtn");
        //       closebtn.addEventListener("click", () => {
        //         $("#layerlistHeader").remove();
        //         mapView.ui.remove(layerList);
        //         layerlistStatus = 0;
        //       });
        //       layerlistStatus = 1;
        //     } else {
        //       $("#layerlistHeader").remove();
        //       mapView.ui.remove(layerList);
        //       layerlistStatus = 0;
        //     }
        //   });
        // Toggle labels from LayerList widget
        // layerList.on("trigger-action", function (event) {
        //   if (mapView.scale < minimumDrawScale) {
        //     event.item.layer.labelsVisible = !event.item.layer.labelsVisible;
        //   }
        // });

        // when mapview is clicked:
        // clear graphics, check vis layers, identify layers
        // mapView.on("click", async (event) => {
        //   selectionLayer.opacity = 1; // reset this because it may be 0 from a fadeBuffer call
        //   if (screen.availWidth > 992) {
        //     // if not on mobile device
        //     if (
        //       measurement.viewModel.state == "disabled" ||
        //       measurement.viewModel.state == "measured"
        //     ) {
        //       identifyTaskFlow(
        //         event,
        //         coordExpand.expanded == false,
        //         false,
        //         false,
        //         "click"
        //       );
        //     }
        //   } else {
        //     identifyTaskFlow(event, false, true, false, "click");
        //   }
        // });
      });

      // const bookmarks = new Bookmarks({
      //   view,
      //   // allows bookmarks to be added, edited, or deleted
      //   editingEnabled: true,
      // });

      // const bkExpand = new Expand({
      //   view,
      //   content: bookmarks,
      //   expanded: true,
      // });

      // // Add the widget to the top-right corner of the view
      // view.ui.add(bkExpand, "top-right");

      // // bonus - how many bookmarks in the webmap?
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
};

export default LabinsMap;
