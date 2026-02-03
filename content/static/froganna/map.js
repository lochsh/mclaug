var map = L.map('map').setView([55.2, -5.3], 6);
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

<!--var clustering = L.markerClusterGroup();-->
var container = document.getElementById("map-container");

$.get(
    "../static/froganna/data/sources.txt",
    function(data) {
        var div = document.createElement("div");
        div.id = "sources";
        div.className = "inputs";

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
        var div = document.createElement("div");
        div.id = "words";
        div.className = "inputs";

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
                }
            }
        ).addTo(map)

        function updateCheckboxStates() {
            checkboxStates = {
                sources: [],
                words: []
            };
            for (let input of document.querySelectorAll("input")) {
                if(input.checked) {
                    switch (input.className) {
                        case "source": checkboxStates.sources.push(input.value); break
                        case "word": checkboxStates.words.push(input.value); break
                    }
                }
            }
        }

        for (let input of document.querySelectorAll("input")) {
            input.onchange = (e) => {
                geojsonLayer.clearLayers()
                updateCheckboxStates()
                geojsonLayer.addData(frogData)
            }
        }

        updateCheckboxStates()
        geojsonLayer.addData(frogData)
    }
);

<!--$.get(-->
    <!--"../images/froganna/data/frogs.csv",-->
    <!--function(data) {-->
        <!--var words = $.csv.toObjects(data);-->
        <!--for (line of words) {-->
            <!--var marker = L.marker([line.latitude, line.longitude]);-->
            <!--marker.bindPopup(-->
                <!--`<b>${line.word}</b><br>-->
                <!--<i>Source transcription</i>: <span class=ipa>${line.source_transcription}</span><br>-->
                <!--<i>IPA transcription</i>: <span class=ipa>${line.ipa_transcription}</span><br><br>-->
                <!--<i>Year</i>: ${line.year}<br>-->
                <!--<i>Informant</i>: ${line.informant}<br><br>-->
                <!--<i>Place</i>: ${line.logainm} / ${line.placename}<br>-->
                <!--<i>Area</i>: ${line.ceantar} / ${line.area}<br><br>-->
                <!--<i>Source</i>: ${line.source}<br><br>-->
                <!--<i>Notes</i>: ${line.note}<br>`,-->
                <!--{maxHeight: 500},-->
            <!--).openPopup();-->

            <!--clustering.addLayer(marker);-->
        <!--}-->

        <!--map.addLayer(clustering);-->

    <!--}-->
<!--);-->
