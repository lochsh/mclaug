Title: Caidé mar a deirtear "frog" as Gaeilic?
Slug: froganna
Date: 11th Dec 2025

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.40/jquery.csv.js"></script>

## Cuireadh gan iarraidh: an uninvited guest

The other night I was sitting on the sofa cuddling my cat when, out of the
corner of my eye, I seen something small and dark hop into the room through the
open doorway. I knew I'd seen a frog, but my brain was yet to accept this
unlikelihood. I turned my head to see the dark shape on the floor, still now.
Then it hopped again: there was a frog in the house! The wee lad was massive as
well, or such was my perception, faced with the intrusion as I was.

TODO: photo of frog

We have a camera take a photo every time our catflap opens, just to let us know
how often our cat is out and about. This intel confirmed she did not bring the
frog inside, so he must have hopped in when I briefly had the back door open.

We dispatched him safely outside.

Afterwards I wondered: what is the Irish for "frog"?

## A disappointing dictionary entry

## The origin of frogs in Ireland

## The english word "toad": celtic?

## A collection of Gaelic words for frogs and toads across Ireland, Scotland, and the Isle of Man

<div id="map" style="height: 600px;"></div>

<script>
    var map = L.map('map').setView([55.2, -5.3], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    $.get(
        "images/froganna/data.csv",
        function(data) {
            var words = $.csv.toObjects(data);
            for (line of words) {
                var marker = L.marker([line.latitude, line.longitude]).addTo(map);
                marker.bindPopup(
                    `<b>${line.word}</b><br>
                    <i>Source transcription</i>: ${line.source_transcription}<br>
                    <i>IPA transcription</i>: ${line.ipa_transcription}<br><br>
                    ${line.logainm}/${line.placename}<br>`
                ).openPopup();
            }
        }
    );

</script>


### loscann, losgann, loscán

Possibly from PIE for burning, cos of burning secretions?

### leumach, leumachan, leumrachan

https://en.wiktionary.org/wiki/leum

### mag, magán, magag, miag, maigean

https://www.youtube.com/watch?v=JSP03Q0Mc1I


### muile-mòthag, muile-mhag, muile-mhagan, muileag

### smag, smagach, smaigean

snot, see smugachán

### sonasan

https://x.com/Gaeilgebheo/status/1762187597361594503

https://dasg.ac.uk/fieldwork/view/QWxsaWdpbkpNYWNEb25hbGRzbGlwc3xzb25hc2FufGlkcDExNzkzOTYxNnx8ZnJvZ3xyMzZ8fHxhbGw=

https://dasg.ac.uk/fieldwork/view/SW52ZXJuZXNzS01hY1JhZXNsaXBzfHNvbmFzYW58aWRwMTE1NzUyNjE2fHxmcm9nfHIzN3x8fGFsbA==

happy one?

### gille-cnàigein

https://x.com/guthan_g/status/637694618478489600

https://dalriada.scot/gd/a-cromadh-sios-an-rathad-the-last-of-the-gaelic-in-the-land-of-the-whisky

https://dasg.ac.uk/fieldwork/view/Tm9ydGhBcmd5bGxBQ2FtZXJvbm1pc2N8Z2lsbGUgY3LDoGlnZWFufGlkcDE1NjkxMTU4NHx8ZnJvZ3xyN3x8fGFsbA==

### cnádan

https://www.duchas.ie/en/cbes/5008809/4958019/5055398?HighlightText=cnadan
(different meaning)
https://www.duchas.ie/en/cbes/5009102/4986861/5121908?HighlightText=cnadan
same as above
https://www.duchas.ie/en/cbes/5009102/4986864/5121908?HighlightText=cnadan
"a croaker"!

https://www.duchas.ie/en/cbes/4427936/4358938/4454815?HighlightText=cnadan used
for burdock

lots of examples of it being used for burdock

https://www.duchas.ie/en/cbes/4428116/4379731/4468703?HighlightText=cnadan
mention of frogs...is cnadan onomatopoeia? title is "signs of rain". I guess it
means croak! Fun idea: is this only used in places where <cn> is <cr>?

### craigean, cròigean

### cranag

### rannag

from https://en.wiktionary.org/wiki/rana#Latin ?

### uillichd

### fliuchán

### lispín

https://www.duchas.ie/en/cbes/4613715/4611694/4660320?HighlightText=lispin

https://www.duchas.ie/en/cbes/4493647/4407674/4515923?HighlightText=lispin

https://www.duchas.ie/en/cbes/4493647/4407457/4516670?HighlightText=lispin



### torpán

teanglann has this as small clump or clod, or a pot-bellied person. would make
sense

torbán is given as tadpole



