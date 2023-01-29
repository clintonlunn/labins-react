import React, { useRef, useEffect } from "react";
// import Bookmarks from "@arcgis/core/widgets/Bookmarks";
// import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

import "../App.css";

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
      const view = new MapView({
        container: mapDiv.current,
        map: map,
        zoom: 4,
        center: [15, 65],
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
