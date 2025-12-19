Title: Caidé mar a deirtear "frog" as Gaeilic?
Slug: froganna
Date: 11th Dec 2025
Status: draft

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

![frog](../images/froganna/frog.jpeg)

We transferred him safely outside. Before he leapt away into the darkness, our
eyes met, and I understood the task he had bequeathed me: I knew I must find
all the Gaelic words for frog.

## A map of words for frogs across the Gaelic world

<div id="map" style="height: 700px;"></div>

<script>
    var map = L.map('map').setView([55.2, -5.3], 6);
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var LASID = L.layerGroup().addTo(map);
    var DASG = L.layerGroup().addTo(map);
    var NFC = L.layerGroup().addTo(map);
    var tobar = L.layerGroup().addTo(map);
    var other = L.layerGroup().addTo(map);

    $.get(
        "../images/froganna/data.csv",
        function(data) {
            var words = $.csv.toObjects(data);
            for (line of words) {
                var marker = L.marker([line.latitude, line.longitude]).addTo(map);
                marker.bindPopup(
                    `<b>${line.word}</b><br>
                    <i>Source transcription</i>: ${line.source_transcription}<br>
                    <i>IPA transcription</i>: ${line.ipa_transcription}<br><br>
                    <i>Year</i>: ${line.year}<br>
                    <i>Informant</i>: ${line.informant}<br>
                    <i>Place</i>: ${line.logainm}/${line.placename}<br><br>
                    <i>Source</i>: ${line.source}<br><br>
                    <i>Notes</i>: ${line.note}<br>`
                ).openPopup();

                switch(line.source_category) {
                    case "LASID":
                        LASID.addLayer(marker);
                        break;
                    case "DASG":
                        DASG.addLayer(marker);
                        break;
                    case "NFC":
                        NFC.addLayer(marker);
                        break;
                    case "tobar":
                        tobar.addLayer(marker);
                        break;
                    default:
                        other.addLayer(marker);
                        break;
                }
            }

            var overlayMaps = {
                "Linguistic Atlas and Survey of Irish Dialects": LASID,
                "Digital Archive of Scottish Gaelic": DASG,
                "National Folklore Collection": NFC,
                "Tobar an Dualchais": tobar,
                "other": other,
            }
            var layerControl = L.control.layers({"OSM": osm}, overlayMaps).addTo(map);
        }
    );

</script>

Above is a map showing attested words used by local people for "frog". The main
sources are:

* Wagner, H. (1958-1969), <i>Linguistic Atlas and Survey of Irish Dialects</i>, Dublin Institute of Advanced Studies
* Digital Archive of Scottish Gaelic (DASG). University of Glasgow <a href='https://dasg.ac.uk'>&lt;https://dasg.ac.uk&gt;</a>
* National Folklore Collection, University College Dublin
* Tobar an Dualchais <a href='https://www.tobarandualchais.co.uk'>tobarandualchais.co.uk</a>, Sabhal Mòr Ostaig

The markers can be filtered by source by clicking the layers icon in the top
right-hand corner of the map.

Some of the words provided are cited as meaning "toad" by other sources. I
learned while doing this research that the distinction between frogs and toads
is part of a folk taxonomy, rather than a scientific distinction. Speaking for
myself, I'd mostly use "toad" for particularly knobbly and large or wide frogs.

## Notes and thoughts on the words

### Frog

Could the usage of a foreign loan word, from English, be due to a taboo, where
it was feared saying the creature's true name would summon them? Christopher
Lewin, a Manx scholar, kindly corresponded with me about Manx words for frogs,
and he suggested the possibility of this taboo.

My teacher Dubhán Ó Longáin pondered the belief that frogs entering the home
was an omen of death, which could support the taboo idea. This belief doesn't
seem to be universal even within Donegal, see this
[lore](https://www.duchas.ie/en/cbes/4428354/4398830/4487670) from Leitir Mhic an
Bhaird claiming a frog in the house to be lucky.

It's quite possible that an English loan came to be used in the usual way,
through language contact, but it seems unusual in Irish for names of animals to
change in this way.

Another thing I learned during this research was that it is a common belief
that frogs did not exist in Ireland until the Normans invaded in the 12th
century, or perhaps when students of Trinity College brought some over in the
17th century, or that they first arrived in County Down in the 18th century[^1].

If frogs were indeed brought to Ireland along with colonisation, or came
post-colonisation, perhaps the word came with them. However, I don't think it's
clear that the Normans of the 12th Century would have called frogs such.

### loscann, losgann, loscán, losgán

<i>I found this across much of Ireland and Scotland, especially in Argyll</i>

I've seen it suggested that this word is related to
[<i>loisc</i>](https://en.wiktionary.org/wiki/loisc)[^2], meaning to burn[^3],
 referring to the sting from touching the secretions of the frog's skin.

![loscann proposed etymology](../images/froganna/losgann.png)

However...I don't believe touching a common frog causes any stinging sensation,
does it? I have heard it hurts the frog. Could there have been a belief that
touching the frog would sting you?

I have a perhaps more compelling idea: The Electronic Dictionary of the Irish
Language entry for [<i>loscann</i>](https://dil.ie/30711) directed me to [O'Clery's
Irish Glossary](https://deriv.nls.uk/dcn23/8177/81776163.23.pdf) from 1643:

![salamander](../images/froganna/salamander.png)

The notes say the salamander is called <i>loisgionn</i> "because it is burnt"
(due to hiding in firewood). Dinneen's dictionary also
[lists](https://archive.org/details/foclirgaeilgeagu00dinn/page/443)
"salamander" as a possible translation of <i>loisceann</i>.

The eDIL also cites [Leabhar Méig
Shamhradháin](https://celt.ucc.ie/published/G402561.html), from the 14th
century,  as using <i>losguinn</i> when referring to a dragon.

Both salamanders and dragons are associated with fire. Could <i>loscann</i>
have referred to mythical fire lizards originally, only to eventually be
applied to the humble frog?

An alternative hypothesis stems from the discovery that the word "salamander"
has historically been used for crickets and grasshoppers[^4]. Crickets are
attracted to warmth, and historically have been associated with the hearth[^5].
I suppose frogs and crickets leap in similar ways &ndash; could there be a
connection there?

Looking again at the entry from O'Clery's glossary, <i>cú cnámha</i> is
also listed as a synonym. This would appear to read as "hound of bones". In
Forbes, A. R. (1905), <i>Gaelic names of beasts (Mammalia), birds, fishes,
insects, replies, etc.</i>, Oliver and Boyd, this word is cited as meaning
"louse", as is the other synonym listed by O'Clery, <i>snasán</i>. I suppose,
like salamanders, you might expect to find woodlice in your firewood, if you
kept it outside.

I can see the exoskeleton of a woodlouse could fit the bone description. So is
the O'Clery entry for <i>loisgionn</i> in fact referring to woodlice, not to
salamanders? Could both frogs and woodlice share an etymylogical relation to
fire lizards?

### sonasan

I found this word in two places in Wester Ross. It is also stated to be used in
nearby Skye in Forbes' [Gaelic names of beasts [...]](https://archive.org/details/gaelicnamesofbea00forb/page/52/mode/2up?q=frog).
In [Robertson, C. M. (1901), <i>The Gaelic of the West of Ross-shire</i>, Gaelic
Society of Inverness](https://archive.org/details/transactionsvol00invegoog/page/364/mode/2up?q=sonasan), <i>sonasan</i> is cited as specifically referring to "the
young frog when it has passed the tadpole stage".

This word appears to mean "joys" (<i>sonas</i> + <i>-an</i>), and indeed is used
this way in a few old sources:

> ’N uair a rainig mi’n gleannan<br>
B’oirdhearc sealladh nam bruach,<br>
Bho na chaochail an doinionn<br>
’S a thainig sonasan nuadh<br>

The above is from a song <i>Cuairt Mhaidne A'Bhuachaille</i>, by Calum MacEath,
which won a prize at a 1926 Mòd, and was reprinted in [An Gaidheal](https://deriv.nls.uk/dcn23/1252/1713/125217135.23.pdf) by An Comunn Gàidhealach.

Referring to a frog as "joys" or "wee joy" (<i>-an</i> can also be diminutive
in Scotland) seemed unexpected to me. Could <i>sonasan</i> instead be related
to the <i>snasán</i> discussed above, listed as a synonym for <i>loisgionn</i>?

This word <snasán> also (or perhaps now) seems to be used for
["polish"](https://www.teanglann.ie/en/fgb/snas%c3%a1n). Instinctively this
makes me think of shellac, made from a resin secreted by bugs, but whether this
is related I do not know. Shellac is scraped from tree bark, melted and formed
into a thin sheet, which is then broken into small chips. The Irish word
<i>snas</i> means to the act of cutting or chipping &ndash; could this also
support a connection between <i>snasán</i> for "polish" and "woodlouse"? Not
that woodlice are made into shellac!

<!---
https://x.com/Gaeilgebheo/status/1762187597361594503
https://dasg.ac.uk/fieldwork/view/QWxsaWdpbkpNYWNEb25hbGRzbGlwc3xzb25hc2FufGlkcDExNzkzOTYxNnx8ZnJvZ3xyMzZ8fHxhbGw=
https://dasg.ac.uk/fieldwork/view/SW52ZXJuZXNzS01hY1JhZXNsaXBzfHNvbmFzYW58aWRwMTE1NzUyNjE2fHxmcm9nfHIzN3x8fGFsbA==
happy one? wee joy?

https://deriv.nls.uk/dcn23/1252/1713/125217135.23.pdf
used here to mean "joys"

https://archive.org/details/transactionsvol00invegoog/page/364/mode/2up?q=sonasan
"the young frog when it has passed the tadpole stage"
(has notes about dissimilation leumachan vs leumrachan)
(has notes about toad "paw")
--->

### fliuchán

![fliuchán](../images/froganna/fliuchán.png)

### leumach, leumachan, leumrachan

https://en.wiktionary.org/wiki/leum

### mag, magán, magag, miag, maigean

https://www.youtube.com/watch?v=JSP03Q0Mc1I

### muile-mòthag, muile-mhag, muile-mhagan, muileag

### smag, smagach, smaigean

snot, see smugachán?

or actually just the same as mag

### sonasan


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

In Stockman (1974), The Irish of Achill, Co Mayo, cnádán is "burr"

### craigean, cròigean
https://www.tobarandualchais.co.uk/track/88600?l=en
also has muile-mhathag

### cranag

### rannag

from https://en.wiktionary.org/wiki/rana#Latin

### uillichd
wilky?

### lispín

https://www.duchas.ie/en/cbes/4613715/4611694/4660320?HighlightText=lispin

https://www.duchas.ie/en/cbes/4493647/4407674/4515923?HighlightText=lispin

https://www.duchas.ie/en/cbes/4493647/4407457/4516670?HighlightText=lispin

http://corpas.ria.ie/index.php?fsg_function=3&fsg_id=1580

https://irishplayography.com/play?playid=32411

### torpán

teanglann has this as small clump or clod, or a pot-bellied person. would make
sense

torbán is given as tadpole

## Miscellaneous curiosities

["Anybody that lived in rural Ireland remember the frog man?"](https://www.reddit.com/r/CasualIreland/comments/184j053/anybody_that_lived_in_rural_ireland_remember_the/)

[The Etymology of English toad: Effects of the Celtic substrate?](http://centre-for-english-traditional-heritage.org/TraditionToday7/7Sayers_Toad.pdf)

## Go rabh maith agaibh

[^1]: [Colton, S. (2017), <i>Take on Nature: So just how did frogs come to be in Ireland?</i>, The Irish News](https://web.archive.org/web/20170311175557/https://www.irishnews.com/lifestyle/2017/03/11/news/take-on-nature-so-just-how-did-frogs-come-to-be-in-ireland--955180/)

[^2]: [Macbain, Alexander (1911), <i>An Etymylogical Dictionary of the Gaelic Language</i>, Stirling: Eneas Mackay](https://archive.org/details/etymologicaldict00macbuoft/page/232/mode/2up)

[^3]: The spelling <i>loscann</i> is used
[here](https://www.duchas.ie/en/cbes/4427982/4363624/4467633?HighlightText=loscann&Route=stories&SearchLanguage=ga)
to mean "burning", as a variant of standard <i>loisceann</i>.

[^4]: See this [entry](https://anglo-norman.net/entry/salemandre) in an
Anglo-Norman dictionary, and this blog post ["Not quite
cricket?"](https://grammarphobia.com/blog/2021/07/cricket-croquet.html) from
Grammarphobia.
[This](https://quod.lib.umich.edu/m/middle-english-dictionary/dictionary/MED10321)
Middle English dictionary shows the converse, <i>criket</i>
being used to refer to the fire lizard.

[^5]: Thank you again to the Grammarphobia blog linked in [^4] for reproducing
references from the OED that attest this.
