Title: Goidé mar a deirtear "frog" i nGaedhilg?
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

<script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />

<script src="https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup/releases/download/v1.0.2/leaflet.featuregroup.subgroup.js"></script>

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

    var clustering = L.markerClusterGroup();

    var LASID = L.featureGroup.subGroup(clustering).addTo(map);
    var DASG = L.featureGroup.subGroup(clustering).addTo(map);
    var NFC = L.featureGroup.subGroup(clustering).addTo(map);
    var tobar = L.featureGroup.subGroup(clustering).addTo(map);
    var other = L.featureGroup.subGroup(clustering).addTo(map);

    $.get(
        "../images/froganna/data.csv",
        function(data) {
            var words = $.csv.toObjects(data);
            for (line of words) {
                var marker = L.marker([line.latitude, line.longitude]);
                marker.bindPopup(
                    `<b>${line.word}</b><br>
                    <i>Source transcription</i>: <span class=ipa>${line.source_transcription}</span><br>
                    <i>IPA transcription</i>: <span class=ipa>${line.ipa_transcription}</span><br><br>
                    <i>Year</i>: ${line.year}<br>
                    <i>Informant</i>: ${line.informant}<br>
                    <i>Place</i>: ${line.logainm}/${line.placename}<br><br>
                    <i>Source</i>: ${line.source}<br><br>
                    <i>Notes</i>: ${line.note}<br>`,
                    {maxHeight: 500},
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

                clustering.addLayer(marker);
            }

            map.addLayer(clustering);

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

Above is a map showing attested words used by local people for "frog". Zooming
out will reveal a datapoint in Nova Scotia. The main
sources are:

* Wagner, H. (1958-1969), <i>Linguistic Atlas and Survey of Irish Dialects (LASID)</i>, Dublin Institute of Advanced Studies
* Digital Archive of Scottish Gaelic (DASG). University of Glasgow <a href='https://dasg.ac.uk'>&lt;https://dasg.ac.uk&gt;</a>
* National Folklore Collection, University College Dublin
* Tobar an Dualchais <a href='https://www.tobarandualchais.co.uk'>tobarandualchais.co.uk</a>, Sabhal Mòr Ostaig

The markers can be filtered by source by clicking the layers icon in the top
right-hand corner of the map. Resources like the LASID and DASG are based on
fieldwork designed to record the words local people used in
everyday speech.  Materials in Ireland's National Folklore Collection, and
those used from Tobar an Dualchais, are largely recordings of storytelling or
other lore. The way stories are told, and the stories themselves, can certainly
be rooted in a particular place &ndash; but I imagine the vocabulary used in
stories does not necessarily reflect everyday speech, as perhaps older words
are preserved in passed down tales, or words might be chosen for how they serve
the story. This is certainly not to say that words taken from these resources
lack authenticity, just that they their context differs from that of words taken
from linguistic fieldwork.

Other sources are from books and newspaper articles, where the author was
either a native speaker of the local language, or was reporting on the local
language.

I do not intend for the datapoints to indicate that frogs were exclusively
called a particular word in a place, or that a word was exclusively used for
frogs (e.g. <i>leumachan</i> is <a
        href=https://dasg.ac.uk/fieldwork/view/TGlvbmVsSnVuaW9yU2Vjb25kYXJ5bWFvcmFjaHxsZXVtYWNoYW58ZDBlNjA5fHxsZXVtYWNoYW58cjF8fHxhbGw=>here</a> recorded
                   as being used for some beach insect or crusteacean). Much of
the data is from the mid 20th century and as such may not reflect current local
vocabulary. Indeed, the local language has sadly died in many of the places
included. I hope that my work here can demonstrate the joy of dialectal
diversity, preserve the existence of lost words, and provide a fun way to
engage with linguistic heritage.

### Toads

Some of the words provided are cited as meaning "toad" by other sources. Not
everyone has a clear linguistic distinction between frog (for me, frogs have
shiny skin and jump) and toads (for me, toads have dry knobbly skin and
crawl)[^1]. If you see a word cited as meaning "frog" that for you means "toad",
please bear inter-speaker and geographic variation in mind. There is also the
possibility of fieldworkers or translators writing "frog" when "toad" could
have been a better choice.

Although words specifically for toads are also of interest, I have limited the
scope of this project to words used for frogs.

## A brief note about orthography
<details>
<summary>(Actually not as brief as I imagined, so click here if you would like to
read)</summary>
<br>
I have illustrated many of the words for frog below. I wanted there to be some
consistency in the orthography used in the illustrations. The choices I've made
are just my own personal preference that I feel free to apply within this
personal project. They're not advocations for changes in any standards. My
choices and their reasoning:
<br><br>

<ul>

<li> When standard Irish orthography would have "sc" or "sp", I have written "sg"
  and "sb", as I believe is standard in Scotland (where I understand most
  surviving dialects have lost voicing contrast on plosives entirely[^2]). This is
  because I think the voicing of the second consonant is phonemically
  irrelevant in this context even in Ireland, as it is in English (compare
  "speech" with "sbeech"), and the (lack of) aspiration is what is most
  salient phonetically. Also the letter "g" looks nice in the font I chose, so
  this way we get to see it in <i>losgann</i>.</li>
<br><br>
<li>In standard Irish orthography the suffix <i>-án</i> is used diminutively
  (among other usages). The cognate suffix in Scotland is generally written
  <i>-an</i>. I have written words found in Scotland with <i>-án</i> for
  consistency, and also because phonetically this suffix seems to generally be
  pronounced with a clear vowel, which to me the fada indicates. I think, for
  instance, it makes the plural <i>sonasánan</i> a bit easier to parse and its
  pronunciation <span class=ipa>[sɔ᷉nəsɑnən]</span> more explicit.</li>
<br><br>
<li>When there were a few variants of a word, the choice of which one to
    represent in the illustrations was a bit arbitrary. For example,
    <i>cròigean</i> is far less attested than <i>cràigean</i>, but as it seems
    standard to write <i>cròg</i> rather than <i>cràg</i>, I thought I'd choose
    the former. Similarly, although I had more attestations of
    <i>leumrachan</i> than <i>leumachan</i>, the former's etymology requires
    explaining dissimilation, and it seems more convenient for the headword to
    be formulated simply from <i>leum</i> + <i>achan</i>, with further
    explanation of variants later on.</li>
<br><br>
<li>This mostly applies to the datapoints on the map, but I have followed the old
  Scottish tradition of using "ó" for <span class=ipa>/oː/</span> (as in
  <i>mór</i> Eng. "big") and "ò" for <span class=ipa>/ɔː/</span> (as in
  <i>òran</i> Eng. "song"). This pronunciation is something that varies
  dialectically and I don't always know e.g. in a placename which one is
  appropriate. So mostly this just comes up with me writing <i>mór</i> in Scottish
  placenames instead of the standard <i>mòr</i>.</li>

</ul>

<br>
When adding datapoints to the map from written sources, I have always used the
written form from the source.
<br><br>
A scarcity of relevant data from the Isle of Man means its quite different
orthography is not something I've had to incorporate into the notes below.
<br><br>
If you have any thoughts on my orthographic choices here please feel free to
<a href="mailto:h@mcla.ug">e-mail me</a>.
</details>

## Notes and thoughts on the words

Click on the illustrations to expand the notes for each word!

### Frog

<i>I found this in places all over Ireland, but not at all in Scotland[^1].
Anecdotally it is the most common word used in Irish today.</i>
<br><br>

Could the usage of a foreign loan word, from English, be due to a taboo, where
it was feared saying the creature's true name would summon them? Christopher
Lewin, a Manx scholar, kindly corresponded with me about Manx words for frogs,
and he suggested the possibility of this taboo.

My teacher Dubhán Ó Longáin pondered the belief that frogs entering the home
was an omen of death, which could support the taboo idea. This belief doesn't
seem to be universal even within Donegal, see this
[lore](https://www.duchas.ie/en/cbes/4428354/4398830/4487670) from Leitir Mhic an
Bhaird claiming a frog in the house to be lucky, though Dubhán suggested this
may be a sort of counteractive lore: we imagined children upset at the omen of
a frog in the house, and their parents reassuring them it was in fact lucky.

It's quite possible that an English loan came to replace a native word in the
usual way, through language contact, but it seems unusual in Irish for names of
animals to change in this way.

Another thing I learned during this research was that it is a common belief
that frogs did not exist in Ireland until the Anglo-Norman invasion in the 12th
century, or perhaps when students of Trinity College brought some over in the
17th century[^4], or that William of Orange is responsible for their
introduction[^5], or that they first arrived in County Down in the 18th
century[^6]. An account from Gerard of Wales of a frog being found in Waterford
sometime in the 1170s or 1180s[^7] speaks of fascination and consternation when
the creature is presented at court[^8]:

<blockquote>
    [...] a frog was found, within my time, in the grassy meadows near
    Waterford, and brought to court alive before Robert Poer, who was at that
    time warden there, and many others, both English and Irish. And when
    numbers of both nations, and particularly the Irish, had beheld it with
    great astonishment, at last Duvenold<sup id="fnref:9"><a
    class="footnote-ref" href="#fn:9">9</a></sup>, 58th King of Ossory, a man of sense
    among his people, and faithful, who happened to be present, beating his
    head, and having deep grief at heart, spoke thus:—<br><br><b>“That reptile is the
    bearer of doleful news to Ireland.”</b><br><br> And uttering a sort of prognostic,
    he further said, that it portended, without doubt, the coming of the
    English, their threatened conquest, and the subjugation of his own nation.
</blockquote>

If frogs were indeed brought to Ireland along with colonisation, perhaps the
word "frog" came with them. Even if frogs had long been native to Ireland, but
in isolated populations or select parts such that many Irish people did not
come into contact with them and thus did not have a word for them, it is
conceivable that "frog" did not replace a native word, but was the first name
many people heard applied to the creature.

While it's likely the Anglo-Norman elite would have called the creatures <a
href=https://anglo-norman.net/entry/raina><i>raine</i></a>, it is conceivable
many of the footsoldiers would have spoken Middle English and called the
creatures <a href=https://en.wiktionary.org/wiki/frogge#Middle_English><i>frogge</i></a>.

<figure>
    <img src=../images/froganna/drumcliffe-cross.jpg alt="Drumcliffe Cross in
    Sligo, from c. 11th century, seemingly showing a frog carved in the stone">
    <figcaption>
        <i>Drumcliffe Cross in Sligo, from c. 11th century, seemingly
        showing a frog carved in the stone. Evidence of their existence in Sligo at
        that time? Image source: <a
        href=https://www.megalithicireland.com/High%20Cross%20Drumcliffe.htm>Megalithic
       Ireland</a></i>
   </figcaption>
</figure>

### loscann, losgann, loscán, losgán

<details>
<summary>
    <img src="../images/froganna/losgann.svg" alt="A line drawing of a
    frog sitting in front of a fire in an open hearth. The frog has its back to
    the viewer, and there is a pot hanging above the fire.">
</summary>

<i>I found this across much of Ireland and Scotland, especially in Argyll</i>
<br><br>
I've seen it suggested that this word is related to
<a href=https://en.wiktionary.org/wiki/loisc><i>loisc</i></a><sup id="fnref:10"><a class="footnote-ref" href="#fn:10">10</a></sup>,
meaning to burn<sup id="fnref:11"><a class="footnote-ref" href="#fn:11">11</a></sup>,
referring to the sting from touching the secretions of the frog's skin.

    <img src="../images/froganna/losgann.png" alt="Proposed etymology for
    loscann. Text reads 'losgann, a toad, Ir. loscain, E. Ir. loscann; from
    losg above, so named from the acrid secretions of its skin.'">

However...I don't believe touching a common frog causes any stinging sensation,
does it? Toads do secrete a <i>bufotoxin</i>, which can cause an allergic
reaction on contact, but is mostly dangerous when ingested.

<br><br>
I have a perhaps more compelling idea: The Electronic Dictionary of the Irish
Language entry for <a href=https://dil.ie/30711><i>loscann</i></a> directed me to
<a href=https://deriv.nls.uk/dcn23/8177/81776163.23.pdf>O'Clery's
Irish Glossary</a> from 1643:

    <img src="../images/froganna/salamander.png" alt="Text reads: \"LOISGIONN
    .i. snasán '[a salamander]'. oir loisgthear é, ⁊ cú cnámha ainm
    eile dó 'because it is burnt [loisgthear] and cú cnámha is another
    name for it'.\"">

The notes say the salamander is called <i>loisgionn</i> "because it is burnt"
(salmanders are known to nest in firewood). Dinneen's dictionary also
<a href=https://archive.org/details/foclirgaeilgeagu00dinn/page/443>lists</a>
"salamander" as a possible translation of <i>loisceann</i>.

<br><br>
The eDIL also cites <a href=https://celt.ucc.ie/published/G402561.html>Leabhar Méig
Shamhradháin</a>, from the 14th
century, as using <i>losguinn</i> when referring to a
dragon<sup id="fnref:12"><a class=“footnote-ref" href="#fn:12">12</a></sup>.

<br><br>
Is the humble frog the peat bog's answer to mythical fire beasts of
old? It would seem plausible that <i>losgann</i> evolved from referring to
dragons and salamanders to the closest creature Ireland has to offer: the frog
(though arguably the newt is a more obvious descendant).

<br><br>
An alternative hypothesis stems from the discovery that the word "salamander"
has historically been used for crickets and
grasshoppers<sup id="fnref:13"><a class=“footnote-ref" href="#fn:13">13</a></sup>.
Crickets are attracted to warmth, and historically have been associated with
the hearth<sup id="fnref:14"><a class=“footnote-ref" href="#fn:14">14</a></sup>.
Could the evolution instead be (association with fire) -> crickets ->
(association with jumping) -> frogs?<sup id="fnref:15"><a class="footnote-ref" href="#fn:15">15</a></sup>

<br><br>
An etymology related to the frog's jumping would certainly be less unusual than
one directly related to salamanders and dragons. In a 1908 article
<a href=https://archive.org/details/sprogligeoghist00olsegoog/page/n258><i>Über
irisches loscann und einige andere indogermanische namen der kröte</i></a>,
Carl Marstander explores possibilities for the etymology of <i>losgann</i> and
divides Indo-European languages' words for frogs and toads into categories,
named for their:
<br><br>
<ol>
    <li>croaking (Latin <i>rana</i>, Latvian <i>var̂de)</i></li>
    <li>skin (shiny for frogs, bumpy for toads) (the words explored seem largely to be for toads)</li>
    <li>distinctive hands (French <i>crapaud</i> for toad)</li>
    <li>way of moving (jumping for frogs, crawling for toads)</li>
</ol>

Marstander complains that a proposed etymology for <i>losgann</i> to do with
burning seems unlikely due to its uniqueness among other Indo-European
language's words for frogs. Perhaps the missing piece he needed was the
crickets.

<h4>losgann lathaighe, luascán lathaighe, loscán laithighe, ⁊c.</h4>

An enjoyable variant of this word, that I found primarily in Mayo and
Galway, is <i>losgann lathaighe</i>, which I will choose to translate as "mud
salamander".

<h4>On spelling variations</h4>
I have addressed <i>losgann</i> vs. <i>loscann</i> in my general orthography
notes. These spellings both reflect a pronounciation of something like
<span class=ipa>/ˈl̪ˠɔsˠkən̪ˠ/</span>, where the first vowel may vary. The
spelling <i>loscán</i> reflects a pronunciation found in Connacht where the
final consonant is lenis and the final vowel is clear: <span
class=ipa>/ˈl̪ˠosˠkɑːnˠ/</span>.

</details>

### lisbín, lispín

<details>
<summary><img src="../images/froganna/lisbín.svg" alt="A frog floating in water
with his head just above the surface, with a rippled reflection below him."></summary>

TODO: where was word found
<br><br>

This word, most commonly spelt <i>lispín</i> in the examples I found, isn't in
Ó Dónaill's dictionary. A schoolchild in Listowel, County Kerry
<a href=https://www.duchas.ie/en/cbes/4613715/4611694/4660320>defines</a> it as
meaning "frog or lizard".

<br><br>
It is <a href=https://archive.org/details/foclirgaeilgeagu00dinn/page/440/mode/2up>listed</a>
in Dineen's dictionary as being found in Sligo, and meaning "frog".

<br><br>
The etymology seemed opaque to me initially. It would appear to be a diminutive
of <i>lisp</i> or <i>liosp</i> (the suffix <i>-ín</i> slenderises the final
consonants), but this line of enquiry didn't lead anywhere.

<br><br>
<a href=https://www.daltai.com/discus/messages/12465/11517.html?1048156283>This
speaker from Donegal</i></a> uses it for a type of fish, and suggests it might be
related to <i>losgann</i>. If this is the case, I'd expect to be able to find
some intermediate forms. Gerry Oates' article <i>An phéist a chuir an cluiche
ar Phádraig</i> in <i>An tUltach</i> states that Fanad's Father Mac Giolla
Ceara uses <i>liospán</i> for "frog" in <i>Ceachta as Leabhar na Cruinne</i>.
Ó Dónaill's dictionary <i>does</i> list
<a href=https://www.teanglann.ie/en/fgb/liosp%C3%A1n>this spelling</a>
as a variant of <i>loscann</i>!

<br><br>
Similarly, in The Schools' Collection I found a
<a href=https://www.duchas.ie/en/cbes/4428280/4391740/4478383>usage</a><sup id="fnref:16"><a class=“footnote-ref" href="#fn:16">16</a></sup>
of <i>luspán</i>, referring to some kind of small creature found by a
turf bank. Whether it refers to a frog is unclear, but it seems very plausible.
Apart from the quality of the initial consonant, this would likely match the
pronunciation indicated by <i>liospán</i>.

<figure>
    <img
        src=../images/froganna/turf-bank.jpg
        alt="Picture of a turf bank (where
             turf is harvested from a peat bog) showing a puddle at the foot
             of the bank"
        width=70%>
    <figcaption><i>The foot of a turf bank can be quite wet and muddy, a likely
    place to find a frog</i></figcaption>
</figure>

This idea that <i>lisbín</i> should evolve from <i>losgann</i> would be better
supported by other examples of words varying in this way. However, if
this word is indeed some phonetic variation on <i>losgann</i>, then the fact it
is also used for lizards might give credence to the idea that the word comes
directly from salamanders, rather than indirectly via crickets (see above
section on <i>losgann</i>).

<h4>lisbín locha</h4>
A variant I found a single example of, in Mayo, was
<a href=www.duchas.ie/en/cbes/4427846/4350083/4443127<i>lisbín locha</i></a>,
which we might translate as "lizard of the loch". The schoolchild actually
wrote <i>lisbín lacha</i>, which I don't think makes grammatical sense
(<i>lacha</i> is the nominative case of the word meaning "duck", but the
 genitive would be needed here. An association with ducks (the animals) makes a
 lot less sense than with bodies of water).

<h4>Other usages</h4>

<ul>
    <li><a href=http://corpas.ria.ie/index.php?fsg_function=3&fsg_id=1580>An Irish telling of The Princess and the Frog</li>
    <li><https://irishplayography.com/play?playid=32411>A character in a play</a></li>
    <li><a href=https://maps.app.goo.gl/XHXXoNvcCagYGRGf7>Possibly in the name
      of this beach</a>, written i nGaedhilg <a
      href=https://www.rte.ie/news/nuacht/2022/0126/1275968-leanbh-fear-og-maraithe-i-dtimpisti/>in
                 this news article</a> as <i>Trá Lispín</i></li>
    <li>In <a
    href=https://archive.org/details/manwhoinventedsi0000ofao/page/n5/mode/2up><i>The Man Who Invented Sin</i></a> by Seán O'Faoláin</li>
</ul>

</details>

### sonasán

<details>
<summary><img src="../images/froganna/sonasan.svg" alt="A smiling frog next to
a daisy">
</summary>

<i>I found this word in two places in Wester Ross. It is also stated to be used in
nearby Skye in Forbes' <a
href=https://archive.org/details/gaelicnamesofbea00forb/page/52/mode/2up?q=frog>Gaelic names of beasts
[...]</i>

<br><br>
In <a href=https://archive.org/details/transactionsvol00invegoog/page/364/mode/2up?q=sonasan>Robertson,
C. M. (1901), <i>The Gaelic of the West of Ross-shire</i>, Gaelic Society of
Inverness</a>, <i>sonasan</i> is cited as specifically referring to "the young
frog when it has passed the tadpole stage".

<br><br>
At first glance this word appears to mean "joys" (<i>sonas</i> + <i>-an</i>;
the suffix <i>-an</i> forms the nominative plural for feminine nouns in
Scotland), and indeed is used this way in a few old sources:

<blockquote>
’N uair a rainig mi’n gleannan<br>
 B’oirdhearc sealladh nam bruach,<br>
 Bho na chaochail an doinionn<br>
’S a thainig sonasan nuadh<br>
</blockquote>

The above is from a song <i>Cuairt Mhaidne A'Bhuachaille</i>, by Calum MacEath,
which won a prize at a 1926 Mòd, and was reprinted in
<a href=https://deriv.nls.uk/dcn23/1252/1713/125217135.23.pdf>An Gaidheal</a>
by An Comunn Gàidhealach.

<br><br>
The suffix <i>-an</i> is also used diminutively (c.f. <i>-án</i> in Ireland).
The plural is recorded as <i>sonasánan</i> <span class=ipa>[sɔ᷉nəsɑnən]</span>,
<span class=ipa>[sɔ᷉nəsɑnː]</span> in Wentworth, R. (1993) <i>Faclan is
Abairtean à Ros an Iar</i>. So it seems more likely that frogs are being
referred to as "wee joys".

<br><br>
Referring to a frog as a "wee joy", while delightful, seemed unexpected to me.
Superficially <i>sonasán</i> reminds me of <i>snasán</i>, listed above as a
synonym for <i>loisgionn</i> (see section on <i>losgann</i>). This word refers
to polish, stemming from the word <i>snas</i> for cutting or chipping, perhaps
because of the process of making shellac involves scraping a resin secreted by
bugs from tree bark, melting it into a sheet, then breaking that into small
chips. I have no suggestion for how this might be related to frogs or crickets,
and no justification for why the vowel might have been inserted to create
<i>sonasán</i>. The knowledge that <a
href=https://www.duchas.ie/en/cbe/9000894/7260368/9085160>burnt frog
innards</a> were once used for polish seems like a red herring.

<br><br>
Perhaps we can take this word at face value: as describing the joyful motion of
the leaping frog.

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

</details>

### fliuchán

<details>
<summary><img src="../images/froganna/fliuchán.svg" alt="A frog seeks shelter
from rain under a toadstool. Drops of rain are seen splashing off the toadstool
and the frog's unsheltered back (his head is under the toadstool)."></summary>

<i>This word is reported as once having been found in County Derry</i>

<br><br>
This is a word I have included, despite finding no primary sources for it,
because it is from a place where the local language died, and I wish to
preserve and represent it in this work. I have not found it anywhere else, at
least not used to mean "frog".

<img src="../images/froganna/fliuchán.png" alt="A newspaper clipping in Gaelic
    type with title 'FROG' and body 'A chara, I gCondae Dhoire atá \"fliuchán\" ag
    na Gaedhealaidh ar \"frog\". Ní ceart an beithidheach
    beag bídeach sin a thabhairt as a ainm. Ní thig linn an Béarla a chur ar
    leath-toabh ar fad, acht ní mór dúinn an Ghaedhilg a choinneál glan. Mise,
    Cormac">

The word <i>fliuch</i> means wet, and correspondingly <i>fliuchán</i> means
"wet thing" or "wetness". In Kerry it is used to refer to rain, see
<a href=https://fr.wikisource.org/wiki/Phon%C3%A9tique_d%E2%80%99un_parler_irlandais_de_Kerry/2-6#p163> Sjoestedt, M. L. (1931), <i>Phonétique d’un parler irlandais de Kerry [Phonetics of an Irish Dialect of Kerry]</i></a>
and <a href=https://www.duchas.ie/en/cbes/4678384/4674363/4683533>this</a> example
in the Schools Collection.

<br><br>
Sources where it used to mean frog:

<br><br>
<ul>
<li>Dinneen, P. S. (1904), <i>Foclóir Gaedhilge agus Béarla</i>, Irish Texts Society</li>
<li>Cormac (pseudonym) (1909), <i>Frog</i>, An Claidheamh Soluis 11:9 (8/5/1909). (Pictured above) <i>i gCondae Dhoire atá 'fliuchán' ag na Gaedhealaibh ar 'frog'</i></li>
<li>Mac Meanman, S. (1940), <i>Crann an Eolais, An Toradh</i>, Brún agus Ó
Nualláin Teór., Dublin. <i>Ceann aca sin an frog nó an fliuchán mar deirtear i
gcorr-áit ins an chúigeadh seo.</i></li>
<li>Mac Gréagóir, A. (1908), <i>Sean-Ranna Ultacha</i>, An Claidheamh Soluis
10:15 (20/6/1908).  (under the pen-name <i>Gréagóirína Nic Gréagóir Gréagach</i>, not specifically
 attributed to Derry)</li>
</ul>

<br>
Ciarán Ó Duibhín believes the 'Cormac' in <i>An Claidheamh Soluis</i> is Séamus
Ó Ceallaigh (1879-1954), whose father was from Draperstown and was raised with
Irish until he was 7 years old. More information is available at
<a href=https://www.ainm.ie/Bio.aspx?ID=57>ainm.ie</a> and
<a href=https://www.academia.edu/19143240/My_Grandfather_Dr_S%C3%A9amus_%C3%93_Ceallaigh_1879_1954_in_Graham_Mawhinney_ed_Gleanings_from_Ulster_History_by_S%C3%A9amus_%C3%93_Ceallaigh_1879_1954_2nd_ed_Ballinascreen_Historical_Society_1994_iii_xxx><i>My Grandfather, Dr. Séamus Ó Ceallaigh (1879-1954)</i></a>.

<br><br>
Dinneen's dictionary lists this word under 'frog' and gives Derry as the place
it is used.

<h4>Fliuchán díge</h4>

In 1908
<a href=https://www3.smo.uhi.ac.uk/oduibhin/daoine/aoidhmin2.htm>Aoidhmín Mac Gréagóir</a>
published a series of articles in <i>An Claidheamh Soluis</i> titled
<i>Sean-Ranna Ultacha</i> (Eng. old verse of Ulster). A riddle is included:

<img src="../images/froganna/fliuchan-dige.png" alt="A riddle in Gaelic type
reading 'Léimeachan léimeachan os na gcloch, Léimeachan léimeachan go dtí an
loch.  Freagra — Fliuchán díge.'">

The riddle asks what jumps over rocks and jumps into the loch. The answer,
<i>fliuchán díge</i>, we can translate as "wet thing of the
ditch".

</details>

### leumachán, leumrachán, leumbhrochán, léimeachán

<details>
<summary>
<img src="../images/froganna/leumrachan.svg" alt="a frog mid-leap">
</summary>

TODO dissimilation

https://en.wiktionary.org/wiki/leum

https://dasg.ac.uk/fieldwork/view/TGlvbmVsSnVuaW9yU2Vjb25kYXJ5bWFvcmFjaHxicmVhbWFnfGQwZTYxfHxzaXViaGFsfHIxMHx8fGFsbA==
</details>

### crónán

<details>
<summary>
<img src="../images/froganna/crónan.svg" alt="A frog with an expanded vocal
    sac, with some musical notes to indicate he is croaking">
</summary>

purring/croaking

irish of tory island

</details>

### gille-cnàigein, craigean, cròigean

![craigean](../images/froganna/cráigean.svg)

TODO: add note about orthgraphy (had trouble deciding which one to put on
        illustration)
Either "well-pawed one" or "wee knob" depending on whether from <i>cràg</i> or
<i>cnag</i>. Perhaps vowel length would tell us which etymology is most likely.
I expect "well-pawed one" which is what is given in
https://en.wikisource.org/wiki/An_Etymological_Dictionary_of_the_Gaelic_Language/C.

https://www.tobarandualchais.co.uk/track/88600?l=en
also has muile-mhathag (I think from the speaker's father)

cróigeán given as "act of footing turf" in irish of tory island

https://x.com/guthan_g/status/637694618478489600

given as knobbly here
https://dalriada.scot/gd/a-cromadh-sios-an-rathad-the-last-of-the-gaelic-in-the-land-of-the-whisky
https://en.wiktionary.org/wiki/cnag sense 3 on scottish gaelic

https://dasg.ac.uk/fieldwork/view/Tm9ydGhBcmd5bGxBQ2FtZXJvbm1pc2N8Z2lsbGUgY3LDoGlnZWFufGlkcDE1NjkxMTU4NHx8ZnJvZ3xyN3x8fGFsbA==

### mag, magán, magag, miag, maigean

https://www.youtube.com/watch?v=JSP03Q0Mc1I

Quiggin 196 lámhacán "moving on all fours". doesn't seem to be cognate though

### ceanna-phiullan

Thought this might be ceanna-fiullan, but have found instances of
<i>ceanna-pholla(i)n</i> so perhaps not.

https://archives.collections.ed.ac.uk/repositories/2/archival_objects/141898

means tadpole there

a couple instances on corpas na gàidhlig:

> Is e Marc a bha ' n seo is e cho coltach ri ceanna-phollain ann an cumadh na bodhaige is gun robh Artar air snodha gàire a dhèanamh nan rachadh aige air leathad nan gualainnean fèitheach a dhìochuimheachadh is an nàdur dùr , neo - mhathach a bha ' n nabachd a ' cur as an leth .

and

> An e fàs suas ann a measg nan ceanna - phollan ann an Loch Odha a rinn e mar a dh ' fhas Topsy aig Uncle Tom ' s Cabin , ann am boglaichean Savannah ; theagamh gu ' r e bhi de ' n bheachd sin a thug air Diùc Iain a tha air mhaireann ann an Dun Ara fathast , creidsinn cho laidir ' s an Darwin theory.

https://dasg.ac.uk/fieldwork/view/SW52ZXJuZXNzS01hY1JhZXNsaXBzfGdyw6BiYXN8aWRwMTE1NzYyNTUyfHxjcmFifHI1MHx8fA==
https://dasg.ac.uk/fieldwork/view/RHVybmVzc0dNYWNLZW56aWVzbGlwc3xzZ29pbHRlYW58aWRwMTE4ODkzODA4fHxwb3RhdG98cjE4NXx8fA==

### muile-mòthag, muile-mhag, muile-mhagan, muileag

> miola - mhàg , mola - mhàg , mola - mhàgan , muile - mhàg , murra - mhàg , murra - mhàgag .
Frog [ or toad ] .
The last is the form in Loch Carron .

from Carmina Gadelica vol 6

muile-màig in lismore https://archive.org/details/collectionofgael00maci/page/150/mode/2up?q=lismore

https://archives.collections.ed.ac.uk/repositories/2/archival_objects/142709

https://archive.org/details/transactions23gaeluoft/page/82 about mula vs mial
on skye

### smag, smagach, smaigean

snot, see smugachán?

or actually just the same as mag

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

In Hamilton's irish of tory island it is burr or burdock

### cranag

### rannag

from https://en.wiktionary.org/wiki/rana#Latin

### uillichd
wilky?

### torpán

teanglann has this as small clump or clod, or a pot-bellied person. would make
sense

torbán is given as tadpole

### crúbán claidhe

beast of the dyke? https://en.wiktionary.org/wiki/cr%C3%B9b#Scottish_Gaelic
related to crawling? maybe more for toads. crawling makes sense as also used
for crabs.

## Given names for the frog in stories and riddles

Gille Criosda Mhic Dhughail

Séan Ó Lupáin

Mac I Shliopán

Mach Uí Stíopháin

why...

Seid (cos of the expanding when croaking) https://archive.org/details/witchcraftsecon01campgoog

## Other Celtic words of interest

### Cornish: gwelsken

The Royal Cornwall Polytechnic Society published R. Morton Nance's <i>Celtic
Words in Cornish Dialect</i> in 1921, and it includes a very transparent
proposed etymology for the local word <i>wilky</i>, used for frogs:

![quilkin](../images/froganna/quilkin.png)

The meaning of <i>gwelsken</i> is given as "grass-skin", with the Welsh words
<i>gwellt</i> and <i>cen</i> given as cognates of the Cornish words. The
Breton word <i>glesker</i> may be related.

What could an imaginary Gaelic cognate look like? Welsh <i>gwellt</i>
is cognate with Irish <i>geilt</i>, used to mean grazing. The Old Irish word
<i>cenn</i> does not survive in the language today. Perhaps
<i>cenn-geilte</i> would be an equivalent? This seemed fun to consider but is
perhaps not that interesting after all.

## Miscellaneous curiosities

["Anybody that lived in rural Ireland remember the frog man?"](https://www.reddit.com/r/CasualIreland/comments/184j053/anybody_that_lived_in_rural_ireland_remember_the/)

[A jumping frog and other creatures of etymological interest](https://blog.oup.com/2024/03/a-jumping-frog-and-other-creatures-of-etymological-interest/)

[An etymological plague of frogs](https://blog.oup.com/2024/04/an-etymological-plague-of-frogs/)

[The Etymology of English toad: Effects of the Celtic substrate?](http://centre-for-english-traditional-heritage.org/TraditionToday7/7Sayers_Toad.pdf)
(strongly disagreed with by the previous item)

## Go rabh maith agaibh

<!---
* <a href=https://www3.smo.uhi.ac.uk/oduibhin/>Ciarán Ó Duibhín</a>,
as bheith ábhar misnigh, agus as acmhainní ar líne a chur ar fáil

* Mo mhuinteoir Dubhán Ó Longáin, as an ceisteanna atá agam don froganna a
shásamh, agus na múinteoireachta

* Màiri MacMillan as 

* Simon Thoumire as thabhairt sonraí teagmhála Mhàiri domh

* Christopher Lewin, for answering my questions about the possible origins of
  the Manx word <i>rannag</i>, and providing a copy of <i>The Manx Have a Word
  for it Book 4 Insects, Reptiles etc.</i>

* Chris Gleed-Owen for answering questions about evidence for the frog being
  native to Ireland
--->

[^1]: Something I learnt during this project was that the distinction between
frogs and toads is considered part of a folk taxonomy, not precisely aligned
with scientific classification. Yet the common frog (<i>rana temporaria</i>)
and common toad (<i>bufo bufo</i>) are in different genera, and my reading
tells me members of <i>rana</i> are generally wartless, and are all good
jumpers. Perhaps in these islands, where we have very few species, it does at
least line up with scientific taxonomy. In other parts of the world with more
amphibious diversity it seems there is more variation on whether folk and
scientific taxonomies align.

[^2]: The Scottish dialects I have read about that have voiced realisations
of stops (outside nasal contact contexts) are parts of Argyll and East
Sutherland. The latter is thought extinct. Argyll covers quite a large area;
the LASID response from Arran shows voicing, but the Gaelic there is extinct.
Islay is also given as having voiced stops in initial position, and there is
still local Gaelic there. The stops being realised in this way doesn't
necessarily mean the voicing is phonemic. I don't know what the general opinion
is on that. The phonemic weight of voicing on stops in Donegal seems quite
marginal to me, see this <a href=https://www.teanglann.ie/en/fuaim/gaeilge>Ulster
recording</a> of the language's name (<i>Gaedhilg</i> or <i>Gaeilic</i>
depending on writing preferences), which I would transcribe as <span
class=ipa>[keːlɪʰk]</span>. (maybe there is palatalisation on the /l/, maybe
the final consonant is [c], I just don't hear it, perhaps due to
personal deficiency). I hadn't actually noticed the pre-aspiration until
now (a spectrogram revealed it, it's not something I have an ear for). I
haven't seen anyone talk about pre-aspiration in Irish, but perhaps it's been
disguised in descriptions of the length of stops, which is suggested in this
thesis (?) <a
href=https://www.abdn.ac.uk/media/site/llmvc/documents/Ch10-Iosad.pdf>chapter</a> I found from Pavel Iosad.
I think the final consonants in all recordings <a
href=https://www.teanglann.ie/en/fuaim/loc>here</a> are at least
somewhat pre-aspirated.

[^3]: Dwelly's dictionary of Scottish Gaelic (1902) gives "1. Hole, chink,
    niche, nook, cranny. 2. marsh, fen" for <i>fròg</i>. O'Reilly's
    Irish-English dictionary gives "a fen, a marsh ; a pitfall, a hole, a
    cleft;" for <i>frog</i> (before also giving the animal). The marsh and hole
    senses seem to have left Ireland. Dwelly gives "active, energetic" for
    <i>frog</i>, a meaning I haven't seen in any Irish texts.

[^4]: Scharff, R. F. (1893). <a
href=https://archive.org/details/irishnaturalist02roya/page/n17/mode/2up><i>Is
           The Frog a Native of Ireland?</i></a> The Irish Naturalist, 2(1),
           1–6. This article explores various historical accounts of frogs
           being found in Ireland, including Gerard of Wales'.  The idea that
           Trinity students introduced frogs is dismissed by the author for
           being ecologically unlikely, noting that there are far more frogs on
           the west coast and the city doesn't seem like an ideal place for
           frogs to thrive.

[^5]: [O'Reilly's Irish-English
dictionary](https://archive.org/details/anirishenglishd00odogoog/page/259/mode/1up)
states the frog is "an animal not found in Ireland before the reign of William
the Third of England, whose Dutch troops first introduced it amongst us".

[^6]: Dubourdieu, J. (1802), <a
href=https://archive.org/details/statisticalsurve00duboiala/page/315/mode/1up><i>Statistical
           survey of the County of Down</i> Dublin: Graisberry and
           Campbell</a>. This survey states "that [frogs] first made their
           appearance near Moira, in the western parts of this county, can be
           proved beyond contradiction" but declines to do so himself. He
           offers an anecdote from a local man about when he first seen a frog.
           The author's thoughts on the creature: "there are many stories still
           current of the terror and surprise excited by the view of this
           disgusting though innocent animal, which seems formed to be the prey
           of every voracious creature, either by land or water, within whose
           reach it comes."

[^7]: I have <a
href=https://www.dib.ie/biography/gerald-wales-giraldus-cambrensis-a3490>read</a>
           that Gerard first visited Ireland in 1183, and <i>Topographia
Hibernia</i>, containing the account, was circulated in 1188. However, he mentions Robert Poer in the
account, who I read <a href=https://www.dib.ie/biography/poer-robert-a7399>died</a> in
1178. The Ossory king in question is said to have died in 1185.

[^8]: <a href=https://www.yorku.ca/inpar/topography_ireland.pdf>From this
        translation of <i>Topographia Hibernia</i> by Thomas Foreseter</a>

[^9]: Domnall Mac Gilla Pátraic, see this <a
href=https://www.dib.ie/biography/poer-robert-a7399>biography</a> of Robert Poer

[^10]: [Macbain, Alexander (1911), <i>An Etymylogical Dictionary of the Gaelic Language</i>, Stirling: Eneas Mackay](https://archive.org/details/etymologicaldict00macbuoft/page/232/mode/2up)

[^11]: The spelling <i>loscann</i> is used
[here](https://www.duchas.ie/en/cbes/4427982/4363624/4467633?HighlightText=loscann&Route=stories&SearchLanguage=ga)
to mean "burning", as a variant of standard <i>loisceann</i>. I think the only
other proposed etymology I've seen is in Volume II of <a
href=https://www.electricscotland.com/books/pdf/carminagadelicah02carm.pdf><i>Carmina
Gadelica</i></a>, which says "Probably the
toad is called 'losgan' from 'losg' irruption, leprosy". This seems much less
likely to me, based on the various sources found via the EDIL, than the
<i>loiscend</i> derivation. I believe the word given for leprosy mostly
referred to <a href=https://dil.ie/30704>lameness</a> (which can be a secondary
effect of leprosy). I'm not sure what toads
would have to do with leprosy; perhaps their bumpy skin was thought to be
reminiscent of leprosy nodules. I have seen it suggested that <a
href=https://en.wikipedia.org/wiki/Taddiport>Taddiport</a>, a leper colony in
the Middle Ages, was named so because of this. I haven't found much on toads
being used to refer to people suffering from leprosy at the time, however, but
I only looked briefly.

[^12]: <i>Comhrag losguinn lasrach mear ná sir—is sé do dhaingean—suail a sheadh
i n-armaibh áigh, marbhaidh fear uaidh dá anáil.</i> The text refers to a
creature <losguinn> breathing fire.

[^13]: See this [entry](https://anglo-norman.net/entry/salemandre) in an
Anglo-Norman dictionary, and this blog post ["Not quite
cricket?"](https://grammarphobia.com/blog/2021/07/cricket-croquet.html) from
Grammarphobia.
[This](https://quod.lib.umich.edu/m/middle-english-dictionary/dictionary/MED10321)
Middle English dictionary shows the converse, <i>criket</i>
being used to refer to the fire lizard.

[^14]: Thank you again to the Grammarphobia blog linked in the previous
footnote for reproducing references from the OED that attest this.

[^15]: I wondered if perhaps the synonyms listed in O'Clery's glossary can
provide more clues. <i>Cú cnámha</i> appears to read as "hound of
bones", though the EDIL <a href=https://dil.ie/13291>tells us</a> that
<i>cú</i> has also been generically used for creatures, particularly insects.
In Forbes, A. R. (1905), <i>Gaelic names of beasts (Mammalia), birds, fishes,
insects, replies, etc.</i>, Oliver and Boyd, this word is cited as meaning
"louse", as is the other synonym listed by O'Clery, <i>snasán</i>.  I
suppose, like salamanders, you might expect to find woodlice in your
firewood, if you kept it outside. But these words could easily be referring to
crickets also. In the end these synonyms mostly increase my confidence that the
glossary is referring to crickets, not to salamanders the lizards. Whether the
usage for frogs evolved from the usage for crickets, or alongside it, will
remain a mystery.

[^16]: This was the school my granny went to :) and my granda's parents etc.
