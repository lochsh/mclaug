var map = L.map('map').setView([55.2, -5.3], 6);
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var container = document.getElementById("map-container");
var clustering = L.markerClusterGroup();
map.addLayer(clustering);

$.get(
    "../static/froganna/data/sources.txt",
    function(data) {
        var div = document.createElement("fieldset");
        div.id = "sources";
        div.className = "inputs";

        var legend = document.createElement("legend");
        legend.innerHTML = "Sources";
        div.appendChild(legend);

        var sources = data.split("\n");
        sources.pop();
        for (source of sources) {
            var input = document.createElement("input");
            input.className = "source";
            input.type = "checkbox";
            input.value = source;
            input.setAttribute("checked", "true");

            var label = document.createElement("label");
            label.setAttribute("for", source);
            label.innerHTML = source;

            div.appendChild(label);
            div.appendChild(input);
        }

        container.appendChild(div);
    }
);

$.get(
    "../static/froganna/data/words.txt",
    function(data) {
        var div = document.createElement("fieldset");
        div.id = "words";
        div.className = "inputs";

        var legend = document.createElement("legend");
        legend.innerHTML = "Words";
        div.appendChild(legend);

        var words = data.split("\n");
        words.pop();
        for (word of words) {
            var input = document.createElement("input");
            input.className = "word";
            input.type = "checkbox";
            input.value = word;
            input.setAttribute("checked", "true");

            var label = document.createElement("label");
            label.setAttribute("for", word);
            label.innerHTML = word;

            div.appendChild(label);
            div.appendChild(input);
        }

        container.appendChild(div);
    }
);

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

$.getJSON(
    "../static/froganna/data/frogs.json",
    function(frogData) {
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

        for (let input of document.querySelectorAll("input")) {
            input.onchange = (e) => {
                clustering.clearLayers();
                geojsonLayer.clearLayers();
                updateCheckboxStates();
                geojsonLayer.addData(frogData).addTo(clustering);
            }
        }

        updateCheckboxStates();
        geojsonLayer.addData(frogData).addTo(clustering);
    }
);
