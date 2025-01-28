import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import Animated from "@amcharts/amcharts5/themes/Animated";

const Map = () => {
  useEffect(() => {
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([Animated.new(root)]);

    // Create the map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    console.log(am5geodata_worldLow.features);

    // Filter geoJSON data to include only the Philippines
    const philippinesGeoJSON = {
      type: "FeatureCollection",
      features: am5geodata_worldLow.features.filter(
        (feature) => feature.properties.id === "PH"
      ),
    };

    console.log(philippinesGeoJSON);

    // Create main polygon series for the Philippines
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: philippinesGeoJSON,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });

    let previousPolygon;

    polygonSeries.mapPolygons.template.on("active", function (active, target) {
      if (previousPolygon && previousPolygon !== target) {
        previousPolygon.set("active", false);
      }
      if (target.get("active")) {
        polygonSeries.zoomToDataItem(target.dataItem);
      } else {
        chart.goHome();
      }
      previousPolygon = target;
    });

    // Add zoom control
    let zoomControl = chart.set(
      "zoomControl",
      am5map.ZoomControl.new(root, {})
    );
    zoomControl.homeButton.set("visible", true);

    // Set clicking on "water" to zoom out
    chart.chartContainer.get("background").events.on("click", function () {
      chart.goHome();
    });

    // Cleanup function
    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default Map;
