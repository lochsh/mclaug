$(document).ready(function () {
    var map = L.map('map').setView([55.2, -5.3], 6);
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var container = document.getElementById("map-container");
    var clustering = L.markerClusterGroup();
    map.addLayer(clustering);

    function makeCheckboxes(basename, classname, listClass, legendTitle, addToggle) {
        $.get(
            `../static/froganna/data/${basename}.csv`,
            function(data) {
                var div = document.createElement("fieldset");
                div.id = classname;
                div.className = "inputs";

                var legend = document.createElement("legend");
                legend.innerHTML = legendTitle;
                div.appendChild(legend);

                var list = document.createElement("ul");
                list.className = listClass;
                div.appendChild(list);

                var lines = $.csv.toObjects(data);
                for (line of lines) {
                    var input = document.createElement("input");
                    input.className = classname;
                    input.type = "checkbox";
                    input.value = line.key;
                    input.setAttribute("checked", "true");

                    var label = document.createElement("label");
                    label.setAttribute("for", line.key);
                    label.innerHTML = line.display;

                    var item = document.createElement("li");
                    item.appendChild(input);
                    item.appendChild(label);

                    list.appendChild(item);
                }

                if (addToggle) {
                    var toggleAll = document.createElement("button");
                    toggleAll.id = "toggle-all-words";
                    toggleAll.innerHTML = "Toggle all";
                    div.appendChild(toggleAll);
                }

                container.appendChild(div);
            }
        );
    }

    makeCheckboxes("words", "word", "checkboxes columns", "Words", true);
    makeCheckboxes("sources", "source", "checkboxes", "Sources", false);

    function onEachFeature(feature, marker) {
        marker.bindPopup(
            `<b>${feature.properties.word}</b><br>
            <i>Source transcription</i>: <span class=ipa>${feature.properties.source_transcription}</span><br>
            <i>IPA transcription</i>: <span class=ipa>${feature.properties.ipa_transcription}</span><br><br>
            <i>Year</i>: ${feature.properties.year}<br>
            <i>Informant</i>: ${feature.properties.informant}<br><br>
            <i>Place</i>: ${feature.properties.logainm} / ${feature.properties.placename}<br>
            <i>Area</i>: ${feature.properties.ceantar} / ${feature.properties.area}<br><br>
            <i>Source</i>: ${feature.properties.source}<br><br>
            <i>Notes</i>: ${feature.properties.note}<br>`,
            {maxHeight: 500},
        ).openPopup();
    }

    // thanks to https://jsfiddle.net/newluck77/rk9v0uyo/
    var checkboxStates = {
        sources: [],
        words: []
    };

    const geojsonLayer = L.geoJSON(
        null,
        {
            filter: (feature) => {
                const isSourceChecked = checkboxStates.sources.includes(
                    feature.properties.source_category
                );
                const isWordChecked = checkboxStates.words.includes(
                    feature.properties.category
                );
                return isSourceChecked && isWordChecked;
            },
            onEachFeature: onEachFeature,
        }
    ).addTo(clustering)

    function updateCheckboxStates() {
        checkboxStates = {
            sources: [],
            words: []
        };
        for (let input of document.querySelectorAll("input")) {
            if(input.checked) {
                switch (input.className) {
                    case "source":
                        checkboxStates.sources.push(input.value);
                        break;
                    case "word":
                        checkboxStates.words.push(input.value);
                        break;
                }
            }
        }
    }

    function updateMap(data) {
        clustering.clearLayers();
        geojsonLayer.clearLayers();
        updateCheckboxStates();
        geojsonLayer.addData(data).addTo(clustering);
    }

    $.getJSON(
        "../static/froganna/data/frogs.json",
        function(frogData) {

            for (let input of document.querySelectorAll("input")) {
                input.onchange = (e) => {
                    updateMap(frogData);
                }
            }

            // Initialise map
            updateMap(frogData);

            $(document).ready(
                function() {
                    $("#map-container").on(
                        "click",
                        "#toggle-all-words",
                        function() {
                            if ($(".word:checked").length == $(".word").length) {
                                $(".word").prop("checked", false);
                            } else {
                                $(".word").prop("checked", true);
                            }
                            updateMap(frogData);
                         }
                    );
                }
            );
        }
    );
});
