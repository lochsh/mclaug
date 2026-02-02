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

<img src="../images/froganna/frog.jpeg" alt="A slightly disgruntled Common Frog
    under a pint glass" style="max-height: 300px;">

We transferred him safely outside. Before he leapt away into the darkness, our
eyes met, and I understood the task he had bequeathed me: I knew I must find
all the Gaelic words for frog.

## A map of words for frogs across the Gaelic world

<div id="map" style="height: 700px; width: 95%; margin: auto"></div>

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
    var dorlach = L.featureGroup.subGroup(clustering).addTo(map);
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
                    <i>Informant</i>: ${line.informant}<br><br>
                    <i>Place</i>: ${line.logainm} / ${line.placename}<br>
                    <i>Area</i>: ${line.ceantar} / ${line.area}<br><br>
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
                    case "dòrlach":
                        dorlach.addLayer(marker);
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
                "Dòrlach fieldwork": dorlach,
                "other": other,
            }
            var layerControl = L.control.layers({"OSM": osm}, overlayMaps).addTo(map);
        }
    );

</script>
<br>
Above is a map showing attested words used by local people for "frog". Zooming
out will reveal datapoints in Nova Scotia. The main
sources are:

* Wagner, H. (1958-1969), <i>Linguistic Atlas and Survey of Irish Dialects (LASID)</i>, Dublin Institute of Advanced Studies

* Digital Archive of Scottish Gaelic (DASG). University of Glasgow <a href='https://dasg.ac.uk'>&lt;dasg.ac.uk&gt;</a>

* National Folklore Collection, University College Dublin <a
  href=https://www.duchas.ie>&lt;duchas.ie&gt;</a>

* Tobar an Dualchais <a href='https://www.tobarandualchais.co.uk'>&lt;tobarandualchais.co.uk&gt;</a>, Sabhal Mòr Ostaig

* Dòrlach's fieldwork, kindly shared by Àdhamh Ó Broin <a
  href="https://www.dorlach.scot">&lt;dorlach.scot&gt;</a>

The markers can be filtered by source by clicking the layers icon in the top
right-hand corner of the map.

<details>
<summary>Click for more information about the sources and data</summary>
<br>
Resources like the LASID and DASG are based on
fieldwork designed to record the words local people used in
everyday speech.  Materials in Ireland's National Folklore Collection, and
those used from Tobar an Dualchais, are largely recordings of storytelling or
other lore. Storytelling, particularly for a recording audience, can be in a
higher register than every day speech<sup id=fnref:1><a class="footnote-ref"
href="#fn:1">1</a></sup>. This is not to say
that words taken from these resources lack authenticity, just that
their context differs from that of words taken from conversation- and
questionnaire-based linguistic fieldwork.

<br><br>
Other sources are from books and newspaper articles, where the author was
either a native speaker of the local language, or was reporting on the local
language.

<br><br>
I do not intend for the datapoints to indicate that frogs were exclusively
called a particular word in a place, or that a word was exclusively used for
frogs (e.g. <i>leumachan</i> is <a
        href=https://dasg.ac.uk/fieldwork/view/TGlvbmVsSnVuaW9yU2Vjb25kYXJ5bWFvcmFjaHxsZXVtYWNoYW58ZDBlNjA5fHxsZXVtYWNoYW58cjF8fHxhbGw=>here</a> recorded
as being used for some beach insect or crusteacean, and I've
seen an old Irish dictionary translate it as "dolphin"). Much of
the data is from the mid 20th century and as such may not reflect current local
vocabulary. Indeed, the local language has sadly died in many of the places
included. I hope that my work here can celebrate dialectal
diversity, preserve the existence of lost words, and provide a fun way to
engage with linguistic heritage.

<h3>Toads</h3>

Some of the words provided are cited as meaning "toad" by other sources. Not
everyone has a clear linguistic distinction between "frog" (for me, frogs have
shiny skin and jump) and "toad" (for me, toads have dry knobbly skin and
crawl)<sup id=fnref:2><a class="footnote-ref" href="#fn:2">2</a></sup>. Not everyone's distinction will be the same, especially across
languages. Some of the words found here describe a creature as a crawler, which
certainly evokes toads for me. If you see a word cited as meaning "frog" that for you means "toad",
please bear inter-speaker and geographic variation in mind, as well as the way
words can evolve over time.

<br><br>
Although words specifically used for toads are also of interest, I have limited
the scope of this project to words used for frogs.

<h3>Phonetic transcription</h3>
The LASID transcriptions are shown with narrow phonetic transcription brackets
e.g. <span class=ipa>[Lɪːsḳɑːn´]</span>. The narrowness of the transcriptions
varies a little; all fieldworkers seem to aim to be very narrow in terms of
vowel notation, with a detailed vowel chart with many labelled points
provided. A spectrum of consonant palatalisation is allowed for in the notation,
and various non-phonemic fortis/lenis consonant contrasts, alongside the
phonemic ones.  However, some details seem to be inconsistently recorded, like
lack of aspiration on plosives (always shown on Scottish transcriptions, but
only sometimes shown on e.g. <span class=ipa>/sk/</span> sequences,
where I'd consistently expect an unaspirated <span
class=ipa>/k/</span>), and velar and palatal off-glides (seemingly only
sometimes shown, but often missing from places I would expect to hear
them, e.g. in Conamara speaker's pronunciation of the language's endonym). Devoicing of consonants seems rarely recorded. It's not clear that
there's any provision for recording of <span class=ipa>[ɹ]</span>, making it
hard to know if it was encountered (e.g. word-finally) but recorded
phonemically, or not encountered.

<br><br>
I have added my own IPA transcriptions to "translate" the LASID symbols. I am
not providing these because I think they're an improvement; on the contrary,
they're much more annoying to read. I hope that they can be useful to people
with knowledge of the IPA but without knowledge of common Gaelic transcription
conventions.

</details>

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

TODO: i have changed my mine about my half-arsed attempt to use a unified orthography, i will update this soon

<ul>

<li> When standard Irish orthography would have "sc" or "sp", I have written "sg"
  and "sb", as I believe is standard in Scotland (where I understand most
  surviving dialects have lost voicing contrast on plosives entirely<sup
  id="fnref:3"><a class="footnote-ref" href="#fn:3">3</a></sup>). This is
  because I think the voicing of the second consonant is phonemically
  irrelevant in this context even in Ireland, as it is in English (compare
  "speech" with "sbeech"), and the (lack of) aspiration is what is most
  salient phonetically. Also the letter "g" looks nice in the font I chose, so
  this way we get to see it in <i>losgann</i>.</li>
<br>
<li>In standard Irish orthography the suffix <i>-án</i> is used diminutively
  (among other usages). The cognate suffix in Scotland is generally written
  <i>-an</i>. I have written words found in Scotland with <i>-án</i> for
  consistency, and also because phonetically this suffix seems to generally be
  pronounced with a clear vowel, which the fada can indicate. I think, for
  instance, it makes the plural <i>sonasánan</i> a bit easier to parse and its
  pronunciation <span class=ipa>[sɔ᷉nəsɑnən]</span> more explicit. Largely I
  have just done this for consistency, however.</li>
<br>
<li>When there were a few variants of a word, the choice of which one to
    represent in the illustrations was a bit arbitrary. For example,
    <i>cròigean</i> is far less attested than <i>cràigean</i>, but as it seems
    standard to write <i>cròg</i> rather than <i>cràg</i>, I thought I'd choose
    the former. Similarly, although I had more attestations of
    <i>leumrachan</i> than <i>leumachan</i>, the former's etymology requires
    explaining dissimilation, and it seems more convenient for the headword to
    be formulated simply from <i>leum</i> + <i>achan</i>, with further
    explanation of variants later on.</li>
<br>
<li>This mostly applies to the datapoints on the map, but I have followed the old
  Scottish tradition of using "ó" for <span class=ipa>/oː/</span> (as in
  <i>mór</i> Eng. "big") and "ò" for <span class=ipa>/ɔː/</span> (as in
  <i>òran</i> Eng. "song"). This pronunciation is something that varies
  dialectically and I don't always know e.g. in a placename which one is
  appropriate. So mostly this just comes up with me writing <i>mór</i> in Scottish
  placenames instead of the standard <i>mòr</i>.</li>

</ul>

When adding datapoints to the map from written sources, I have always used the
written form from the source.

<br><br>
When working from sources like the LASID that
provide phonetic transcriptions only, I have used a very loose phonetic
rendering in the orthography that is most familiar to me, which preserves
fortis-lenis contrast on L and N. Hence for LASID responses for the many areas
where this contrast is lost and only the lenis consonant remains, I have
written a single consonant character even if the standard spelling has a double
consonant, e.g. standard "froganna" has been rendered "froganaí" to represent
<span class=ipa>[frɑgəniː]</span>. These spellings are really just here to make
the map easier to read, so please don't read too deeply into any of the choices
made in rendering the phonetic transcriptions as words.
<br><br>
A scarcity of relevant data from the Isle of Man means its quite different
orthography is not something I've had to incorporate into the notes below.
<br><br>
If you have any thoughts on my orthographic choices here please feel free to
<a href="mailto:h@mcla.ug">e-mail me</a>, bearing in mind I haven't taken any
of the choices here too seriously. I am, however, interested in the trade-offs to
be made between the wider legibility of etymylogical preservation (e.g. between
        Ireland and Scotland) and the benefits of simplification, between
simplification and specificity (how phonetically conditioned is the distinction
        between ò and ó?), and between specificity and again broad
applicability across pronunciations. As a learner of Donegal Gaelic I am
also interested in the effects of spelling standardisation that
fails to represent some dialects.
</details>

## Click on the illustrations to expand the notes for each word!

### <i>Frog</i>: taboo-avoidance?

<details>
<summary>
<img src="../images/froganna/frog.svg" alt="a drawing of a frog's silhouette in
a doorway, casting a long shadow. A St. Bridget's Cross hangs over the
doorway" style="max-height: 500px;">
</summary>

<i>I found this in places all over Ireland, but not at all in Scotland<sup
id="fnref:4"><a class="footnote-ref" href="#fn:4">4</a></sup>.
 Of the 49 LASID locations in Ireland that gave a response for "frog", 34 gave
 a variation on this word. Anecdotally it is the most common word used in Irish
 today. It is the word used in the Manx bibles published in 1775 and 1819, and
 in the 1602 Irish translation of the New Testament. Old Testament translations
 also use this word, but also use others.</i>
<br><br>

Could the usage of a foreign loan word, from English, be due to a taboo, where
it was feared saying the creatures' true name would summon them? Christopher
Lewin, a Manx scholar, kindly corresponded with me about Manx words for frogs,
and he suggested the possibility of this taboo.

<br><br>
My teacher Dubhán Ó Longáin pointed out the belief that frogs entering the home
is an omen of death, which would support this taboo idea. Ireland's National
Folklore Collection would seem to support this as a widely held belief, if not
universal: a sample of 52 "frog omens" (exclusively frogs entering the house or
crossing your path on the road) showed only 8 that signalled good luck, and 2
that signalled marriage or childbirth; the remaining 80% signalled death
or bad luck<sup id="fnref:5"><a class="footnote-ref" href="#fn:5">5</a></sup>.
<br><br>
It's of course quite possible that an English loan came to replace a native
word through language contact, without any word-specific pressure, but I don't
know of any other name for an animal that has changed in this way. Some force
must have caused a shift &mdash; that is, unless "frog" was actually the first
word many Gaels heard used for the creatures.

<br><br>
I learnt during this research was that it is a common belief
that frogs did not exist in Ireland until the Anglo-Norman invasion in the 12th
century, or perhaps when students of Trinity College brought some over in the
17th century<sup id="fnref:6"><a class="footnote-ref" href="#fn:6">6</a></sup>, or that William of Orange is responsible for their
introduction<sup id="fnref:7"><a class="footnote-ref"
href="#fn:7">7</a></sup>, or that they first arrived in County Down in the 18th
century<sup id="fnref:8"><a class="footnote-ref" href="#fn:8">8</a></sup>. An account from Gerard of Wales of a frog being found in Waterford
sometime in the 1170s or 1180s<sup id="fnref:9"><a class="footnote-ref"
href="#fn:9">9</a></sup> speaks of fascination and consternation when
the creature is presented at court<sup id="fnref:10"><a class="footnote-ref"
href="#fn:10">10</a></sup>:

<blockquote>
    [...] a frog was found, within my time, in the grassy meadows near
    Waterford, and brought to court alive before Robert Poer, who was at that
    time warden there, and many others, both English and Irish. And when
    numbers of both nations, and particularly the Irish, had beheld it with
    great astonishment, at last Duvenold<sup id="fnref:11"><a
    class="footnote-ref" href="#fn:11">11</a></sup>, 58th King of Ossory, a man of sense
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

<br><br>
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

The idea of much of Ireland having no word for frog that predates Middle
English is not especially attractive to me. Returning our first
idea, of taboo: Gerard of Wales' account above certainly
gives an early example of frogs being treated as a bad omen. The 1802
<i>Statistical Survey of the County of Down</i> conveys similarly fearful local
attitudes:

       <blockquote>
           [...] there are many stories still
           current of the terror and surprise excited by the view of this
           disgusting though innocent animal, which seems formed to be the prey
           of every voracious creature, either by land or water, within whose
           reach it comes.
       </blockquote>

It is tempting to make the conjecture that frogs are a good omen in Scotland,
which I have heard anecdotally, and that the complete lack of usage of
<i>frog</i> in Scotland supports the idea of it being a taboo substitute in
Ireland. This is not something I am able to substantiate; the Scottish matieral
collected for the Irish Folklore Commission is not accessible to me, and I have
been unable to find suitably accessible Scottish folklore resources.
Additionally, Scotland has plenty of descriptive words for frogs that could
easily be taboo substitutes themselves.

<br><br>
The truth will remain ambiguous, but personally, I find the idea of "frog" being used euphemistically quite
compelling. One of the words explored below, <i>lisbín</i>, could be explained by
taboo deformation from <i>losgann</i> &mdash; various phonetically
intermediate forms are attested, supporting the idea of it being akin to a
"minced oath". Perhaps <i>losgann</i> was the taboo word everyone was trying to
avoid.

</details>

### <i>Losgann</i>: the peat bog's answer to mythical fire beasts?

<details>
<summary>
    <img
        src="../images/froganna/losgann.svg"
        alt="A line drawing of a
            frog sitting in front of a fire in an open hearth. The frog has its
            back to the viewer, and there is a pot hanging above the fire."
        style="max-height: 600px;"
    >
</summary>

<i>I found this across some of Ireland and Scotland, especially in Argyll. Only
three LASID returns gave this word, two of which were in Argyll, and one in
Mayo. Three of the four instances in the Schools' Collection are in Donegal.
<br><br>
I've seen it suggested that this word is related to
<a href=https://en.wiktionary.org/wiki/loisc><i>loisc</i></a><sup id="fnref:12"><a class="footnote-ref" href="#fn:12">12</a></sup>,
meaning to burn<sup id="fnref:13"><a class="footnote-ref" href="#fn:13">13</a></sup>,
referring to the sting from touching the secretions of the frog's skin.
<br><br>

    <img src="../images/froganna/losgann.png" alt="Proposed etymology for
    loscann. Text reads 'losgann, a toad, Ir. loscain, E. Ir. loscann; from
    losg above, so named from the acrid secretions of its skin.'">

<br>
However...I don't believe touching a common frog causes any stinging sensation,
does it? Toads do secrete a <i>bufotoxin</i>, which can cause an allergic
reaction on contact, but is mostly dangerous when ingested.

<br><br>
I have a perhaps more compelling idea: The Electronic Dictionary of the Irish
Language entry for <a href=https://dil.ie/30711><i>loscann</i></a> directed me to
<a href=https://deriv.nls.uk/dcn23/8177/81776163.23.pdf>O'Clery's
Irish Glossary</a> from 1643:
<br><br>

    <img src="../images/froganna/salamander.png" alt="Text reads: \"LOISGIONN
    .i. snasán '[a salamander]'. oir loisgthear é, ⁊ cú cnámha ainm
    eile dó 'because it is burnt [loisgthear] and cú cnámha is another
    name for it'.\"">

<br>
The notes say the salamander is called <i>loisgionn</i> "because it is burnt"
(salmanders are known to nest in firewood). Dinneen's dictionary also
<a href=https://archive.org/details/foclirgaeilgeagu00dinn/page/443>lists</a>
"salamander" as a possible translation of <i>loisceann</i>.

<br><br>
The eDIL also cites <a href=https://celt.ucc.ie/published/G402561.html>Leabhar Méig
Shamhradháin</a>, from the 14th
century, as using <i>losguinn</i> when referring to a
dragon<sup id="fnref:14"><a class=“footnote-ref" href="#fn:14">14</a></sup>.

<br><br>
Is the humble frog the peat bog's answer to mythical fire beasts of
old? It would seem plausible that <i>losgann</i> evolved from referring to
dragons and salamanders to the closest creature Ireland has to offer: the frog
(though arguably the newt is a more obvious descendant).

<br><br>
An alternative hypothesis stems from the discovery that the word "salamander"
has historically been used for crickets and
grasshoppers<sup id="fnref:15"><a class=“footnote-ref" href="#fn:15">15</a></sup>.
Crickets are attracted to warmth, and historically have been associated with
the hearth<sup id="fnref:16"><a class=“footnote-ref" href="#fn:16">16</a></sup>.
Could the evolution instead be (association with fire) -> crickets ->
(association with jumping) -> frogs?<sup id="fnref:17"><a class="footnote-ref" href="#fn:17">17</a></sup>

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
    <li>croaking (Latin <i>rana</i>, Latvian <i>var̂de</i>)</li>
    <li>skin (shiny for frogs, bumpy for toads) (Sanskrit <i>maṇḍū́ka</i> is
            given as being from root <i>maṇḍá</i> meaning scum or cream. Not
            the most convincing...)</li>
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

<h4>East Sutherland's <i>losgaid</i></h4>
An interesting variant found in Embo in East Sutherland is <i>losgaid</i> <span
class=ipa>[ɫosɡidʹ]</span>. Noticeably similar is the usage of <i>iosgaid</i>
in place of <i>easgann</i> for eel, recorded in Nancy Dorian's <i>East Sutherland
Gaelic</i>.

<h4>On spelling variations</h4>
I have addressed <i>losgann</i> vs. <i>loscann</i> in my general orthography
notes. These spellings both reflect a pronounciation of something like
<span class=ipa>/ˈl̪ˠɔsˠkən̪ˠ/</span>, where the first vowel may vary. The
spelling <i>loscán</i> reflects a pronunciation found in Connacht where the
final consonant is lenis and the final vowel is clear: <span
class=ipa>/ˈl̪ˠosˠkɑːnˠ/</span>.

</details>

### <i>Lisbín</i>: taboo deformation of <i>losgann</i>?

<details>
<summary><img src="../images/froganna/lisbín.svg" alt="A frog floating in water
with his head just above the surface, with a rippled reflection below him."></summary>

<i>This word and its variants had only a handful of attestations, all in
Ireland, with no
obvious geographical centre. Usages were found in Kerry (1), Galway (1), Mayo
(1) and Donegal (3).</i>
<br><br>

This word, most commonly spelt <i>lispín</i> in the examples I found, isn't in
Ó Dónaill's dictionary. A schoolchild in Listowel, County Kerry
<a href=https://www.duchas.ie/en/cbes/4613715/4611694/4660320>defines</a> it as
meaning "frog or lizard". It is <a
href=https://archive.org/details/foclirgaeilgeagu00dinn/page/440/mode/2up>listed</a>
in Dineen's dictionary as being found in Sligo, and meaning "frog".

<br><br>
The etymology seemed opaque to me initially. It would appear to be a diminutive
of <i>lisp</i> or <i>liosp</i> (the suffix <i>-ín</i> slenderises the final
consonants), but this line of enquiry didn't lead anywhere.

<br><br>
<a href=https://www.daltai.com/discus/messages/12465/11517.html?1048156283>This
speaker from Donegal</i></a> uses it for a type of fish, and suggests it might be
related to <i>losgann</i>. If this is the case, I'd expect to be able to find
some intermediate forms. Fanad's Father Mac Giolla Ceara uses <i>liospán</i>
for "frog" in <i>Ceachta as Leabhar na Cruinne</i><sup id=fnref:18><a
class="footnote-ref" href="#fn:18">18</a></sup>.  Ó Dónaill's dictionary
<i>does</i> list <a href=https://www.teanglann.ie/en/fgb/liosp%C3%A1n>this
spelling</a> as a variant of <i>loscann</i>!

<br><br>
Similarly, in The Schools' Collection I found a
<a href=https://www.duchas.ie/en/cbes/4428280/4391740/4478383>usage</a><sup id="fnref:19"><a class=“footnote-ref" href="#fn:19">19</a></sup>
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
    place to find a frog. Image source: <a
    href=https://www.geograph.org.uk/photo/1001844>geograph.org.uk</a></i></figcaption>
</figure>

I don't know of any other words where comparable phonetic variants exist,
though of course they could. In the above section on the word "frog", I
explored the idea of "frog" being used to substitute for a taboo "true" name for
the creature. If <i>losgann</i> was such a taboo name, then the evolutions to
<i>luspán</i>, <i>liospán</i>, <i>lispín</i> could be explained by taboo
deformation &mdash; that is, deliberately phonetically altering a word to avoid
actually saying it (as with "jeepers" for "Jesus").

<figure>
    <img
        src="../images/froganna/lisbín-evolution.svg"
        alt="diagram showing phonetic evolution of /LɞsgəN/ ⟨loscann⟩ to
        /Lɞsban/ ⟨luspán⟩, to /L'ɪsban/ ⟨liospán⟩ to /L'ɪʃb'in'/ ⟨lispín⟩"
        style="max-height: 250px;"
    >
    <figcaption><i>Example phonemic transcriptons of the attested words I propose
    are evolutions of "loscann" to "lispín". A </i>síneadh fada<i> on an
    unstressed syllable taken to mean a clear short vowel, as in my experience
    in Donegal. Some further phonetically intermediate stages would be
    grammatically restricted, e.g. "liospáin" would be a declension of
    "liospán".  </i></figcaption>
</figure>

If this word is indeed a phonetic variation on <i>losgann</i>, then the fact
it is also used for lizards might give credence to the idea that the word comes
directly from salamanders, rather than indirectly via crickets (see above
section on <i>losgann</i>).

<h4>lisbín locha</h4>
A variant I found a single example of, in Mayo, was
<a href=www.duchas.ie/en/cbes/4427846/4350083/4443127<i>lisbín locha</i></a>,
which we might translate as "loch salamander". The schoolchild actually
wrote <i>lisbín lacha</i>, which I don't think makes grammatical sense
(<i>lacha</i> is the nominative case of the word meaning "duck", but the
 genitive would be needed here. An association with ducks (the animals) makes a
 lot less sense than with bodies of water). So I assume this was a spelling
error on the child's part.

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

### <i>Sonasán</i>: an etymylogical outlier?

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

### <i>Fliuchán</i>: a lost word from Derry

<details>
<summary><img src="../images/froganna/fliuchán.svg" alt="A frog seeks shelter
from rain under a toadstool. Drops of rain are seen splashing off the toadstool
and the frog's unsheltered back (his head is under the toadstool)."></summary>

<i>This word is reported as once having been found in County Derry</i>

<br><br>
This is a word I have included, despite finding no primary sources for it,
because it is from a place where the local language died, and I wish to
preserve and represent it in this work. I have not found it in any other place,
at least not used to mean "frog".
<br><br>

<img src="../images/froganna/fliuchán.png" alt="A newspaper clipping in Gaelic
    type with title 'FROG' and body 'A chara, I gCondae Dhoire atá \"fliuchán\" ag
    na Gaedhealaidh ar \"frog\". Ní ceart an beithidheach
    beag bídeach sin a thabhairt as a ainm. Ní thig linn an Béarla a chur ar
    leath-toabh ar fad, acht ní mór dúinn an Ghaedhilg a choinneál glan. Mise,
    Cormac">

<br>
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
<br><br>

<img src="../images/froganna/fliuchan-dige.png" alt="A riddle in Gaelic type
reading 'Léimeachan léimeachan os na gcloch, Léimeachan léimeachan go dtí an
loch.  Freagra — Fliuchán díge.'">

<br>
The riddle asks what jumps over rocks and jumps into the loch. The answer,
<i>fliuchán díge</i>, we can translate as "wet thing of the
ditch".

</details>

### <i>Leumachán</i> and <i>leumadair</i>: leaper

<details>
<summary>
<img src="../images/froganna/leumrachan.svg" alt="drawing of a frog mid-leap">
</summary>

<i>I found variants of </i>leumachán<i> in various parts of Scotland, including
Lewis, West Sutherland, near Ullapool, and one instance on the Kintyre
Peninsula in Argyll. Only one informant, from Dòrlach's fieldwork in the North
of Lewis, gave </i>leumadair<i>.</i>

<br><br>
The etymology of this word is transparent: <i>leum</i> + <i>ach</i> + <i>án</i>
= wee jumping thing. Other Celtic languages have a similar word for jump: in
Welsh, <i>llam</i> gives us <i>llamhidydd</i>, used with the same descriptive
meaning of "jumper" but for porpoises, presumably seen
leaping out of the sea. Similarly, <i>leumadair</i> is used by some in Scotland
for dolphins or grasshoppers, but was used by one informant for frogs.
<i>Leumadair-feòir</i> (grass jumper) or <i>leumadair-mara</i> (sea jumper) are
sometimes used to distinguish.

<h4>Variations</h4>
A few phonetic variations of <i>leumachán</i> came up, for example:

<ul>
<li><i>leumrachan</i>, Carloway on Lewis</li>
<li><i>leumbrochan</i>, Clashnessie, also on Lewis</li>
<li><i>leumbhrochan</i>, Achiltibuie near Ullapool</li>
<li><i>leumnachan</i>, Drumbuie, Lochalsh</li>
</ul>

In <a href=https://archive.org/details/transactionsvol00invegoog/page/346/mode/2up>Robertson,
C. M. (1901), <i>The Gaelic of the West of Ross-shire</i>, Gaelic Society of
Inverness</a>, <i>leumrachan</i> is explained as coming about through
<i>dissimilation</i>, a phonetic process where sounds change to make them more
distinct from surrounding sounds (perhaps to make a word easier to say), or to make a word more distinct from another.
It's not clear to me what the motivation for dissimilation here would be. The
Carloway example inserts a trilled [r] sound, and although there might be some
amount of subjectivity to such claims, I don't see how it would make the word
easier to say.

<br><br>
Perhaps there was some
influence from the phrase
<i>leum-a-chrann</i>, used for honeysuckle? It does seem like <i>leumrachan</i> would
be easier to distinguish from <i>leumachrann</i> than <i>leumachan</i>, though
this is perhaps subjective. The use of the fortis /R/ sound in Carloway could
indicate some emphasis on the sound. This word for honeysuckle is one I haven't found
any fieldwork recording of, but is listed in Cameron's 1883
<a href=https://archive.org/details/gaelicnamesofpla00cameuoft/page/34/mode/2up?q=leum><i>Gaelic Names of Plants</i></a>
as being used in Strathardle in Perthshire, admittedly not close to any of our
locations above.

<br><br>
The other examples given for dissimilation in Wester Ross mostly
show consonant substitution, but the examples of <i>foidhi<b>l</b>dean</i> for
<i>foidhidinn</i>, <i>cóin<b>t</b>each</i> for <i>cóinneach</i> stand out as
somewhat similar in nature, but are not otherwise illuminating...

</details>

### <i>Crónán</i> and <i>cnádán</i>: for the frog's sweet song

<details>
<summary>
<img src="../images/froganna/crónan.svg" alt="A drawing of frog with an expanded vocal
    sac, with some musical notes to indicate he is croaking">
</summary>

<br>
<i>Both of these words seem rare, at least for referring to frogs.
</i>Crónán<i> came up twice in West Donegal, and once in the Fews in Armagh.
</i>Cnádán<i> was found once each in Waterford and Cork, and is also listed in
some old dictionaries and referred to in articles from the late 1800s. Modern
sources often cite </i>cnádán<i> as referring to the Natterjack Toad. Cnádán is
one of the words used in an <a
href=https://archive.org/details/bioblanaomhthaan00bede/page/58/mode/2up>1817</a>
translation of the bible<sup id="fnref:20"><a class="footnote-ref"
href="#fn:20">20</a></sup>.</i>
<br>

<h4>Crónán: hummer</h4>
Both of these words refer to the frog's croaking. The first, <i>crónán</i> is
translated in <a
href=https://www3.smo.uhi.ac.uk/oduibhin/leabharthai/The%20Irish%20of%20Tory%20Island%20-%20Hamilton.pdf>Hamilton's
<i>The Irish of Tory Island</i></a> as
"purring", "humming", and beyond the frog's croak is also used for other low pitched relatively white sounds:

<br><br>
<ul>
<li>for a cat's purring, see the <i>sean-cainnt</i>
<a href=https://www.duchas.ie/en/cbes/4427991/4365534/4468264>collected</a>
several times in the Schools' Collection: <i>Is ar mhaithe leis fhéin a
dheineann an cat crónán</i> "the cat purrs for himself", the significance of
which I have seen explained in several diverging ways</li>
<br>

<li>for the sound of a babbling brook, <i>Aig an allt' tha crònan fann/Air a'
ghaoith tha fàile cùbhraidh</i>, from a song
<a href=https://archive.org/details/gaelicsongstertr00sinc/page/320/mode/1up>
collected</a> from Argyll-born bard Eanraig MacIlleBhàin
</li>
<br>

<li>for the sound of waves crashing onto the shore, <i>An tonn ri crònan air
cladach còmhnard</i>, from a song collected from Iain Caimbeul, Bàrd na
Leidige.</li>
</ul>

Slightly less congruous is its use for <a
href=https://archive.org/details/gaelicsongstertr00sinc/page/291/mode/1up>birdsong</a>, though I suppose this too can be a pleasant background noise.

<br><br>
A variant <a href=https://www.duchas.ie/en/cbes/4428321/4394634>recorded</a> in
Donegal and in <a href=https://www3.smo.uhi.ac.uk/oduibhin/leabharthai/CNUASACH%20FOCAL%20AS%20ORIALLA%20leagan%201.1%201025.pdf>The Fews</a>
is <i>crónán díge</i>, which we might translate as "ditch hummer" (ditches
often collecting water, creating a lovely froggy habitat).

<br><br>
What of the etymology of this word? The English word "croon" is <a
href=https://en.wiktionary.org/wiki/croon>thought</a> to
derive from Middle Dutch <a
href=https://en.wiktionary.org/wiki/cronen#Middle_Dutch>crônen</a>, which
certainly matches phonetically and loosely in terms of meaning. Perhaps the
word was borrowed directly from there, or from Middle English, or from the
modern form "croon". Regardless, perhaps we can revise our earlier translation of <i>crónán díge</i> to "ditch crooner" for a more romantic vision.

<h4>Cnádán: croaker</h4>
This word seems to most commonly have been used for the plant burdock, see various
<a href=https://www.duchas.ie/en/cbes/4427936/4358938/4454815>sources</a> in
The Schools' Collection, and again <i>The Irish of Tory Island</i></a>.
<br><br>
Its usage for frogs seems to be onomatopoeic. The Scottish <i>cnàg</i> <span
class=ipa>/kʰɾ̃ãːk/</span> and <i>gnàg</i> <span class=ipa>/kɾ̃ãːk/</span> for
the frog's cry are notably similar. It is recorded
<a href=https://www.duchas.ie/en/cbes/5008809/4958019/5055398?HighlightText=cnadan>several</a>
<a href=https://www.duchas.ie/en/cbes/5009102/4986861/5121908>times</a> in the The
Schools' Collection as a pejorative for someone who moans or is cranky, and <a
href=https://www.duchas.ie/en/cbes/5009102/4986864/5121908>translated</a> in this sense as "a croaker".
<br><br>
When I did first understand this word to be likely onomatopoeic, I wondered if
this would only be the case in places where it is pronounced to begin with
<span class=ipa>/kɾˠ/</span> (further north in Ireland) rather than <span
class=ipa>/knˠ/</span> (further south in Ireland).
To me, this was all that would make sense in terms of onomatopoeia.  However,
the only places I found it recorded were firmly in the south of the island: the
LASID records <span class=ipa>[knɑũˈdɑːn]</span> in Waterford. I think this
just serves to illustrate how arbitrary onomatopoeia can be, easily
demonstrated by comparing animal sounds across languages.

<h4>Our two singers in unison</h4>
<a href=https://www.duchas.ie/en/cbes/4428116/4379731/4468703>Signs of
rain</a>:

<blockquote><i>Nuair aireóchtha na froganna ag crónán agus ag cnádán.</i><br>"When
 you hear the frogs crooning and croaking."</blockquote>

</details>

### gille-cnàigein, craigean, cròigean

<details>
<summary>
<img src="../images/froganna/cráigean.svg">
</summary>

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
</details>

### <i>Màgan</i>, <i>mial-mhàgain</i> and <i>laprachán</i>; <i>lapadán</i> and <i>lapadóir</i>: crawlers and paddlers
<details>
<summary>
<img src="../images/froganna/magan.svg", alt="drawing of frog crawling"
style="max-height: 600px;">
</summary>

<i>All three Nova Scotia datapoints record </i>màgan<i> for frog. In Scotland
it is more common for this to mean toad. However, its
variant</i>mial-mhàgain<i> is popular in Scotland for frog, particularly on
Skye and Raasay.<br><br>

In Ireland, </i>laprachán<i> or </i>laprachán na lathái<i> was found once in
Waterford, and a few times in Galway. </i>Lapadán<i> had one example in
Galway, </i>lapadóir<i> one in Mayo, and <i>lapadóir lathaí</i> one in Galway.</i>
<br><br>

</details>

### <i>Crúbán claidhe</i>: what do frogs have to do with crabs?

<details>
<summary><img src="../images/froganna/crubán-claidhe.svg"></summary>

<i>This word was found twice, both times on the Curraun Peninsula, east of
Achill Island in Mayo.</i>
<br><br>

This seemingly very local term might be translated as "dyke beastie", with
dyke meaning dry-stone wall ("dry stone wall beastie" doesn't have the
same ring to it, and it is common to call them dykes in Scotland, where
I am from).
<br><br>

<figure>
    <img src="../images/froganna/claidhe.png" alt="Excerpt from The Irish of
    Achill showing meaning of claidhe as stone fence">
    <img src="../images/froganna/crúbán-claidhe.png" alt"Excerpt from The Irish
    of Achill showing meaning of crúbán claidhe as frog">
    <figcaption><i>Excerpts from Stockman, G. (1974). </i>The Irish of Achill, Co.
    Mayo. In other places <i>claidhe</i> is used to mean "ditch".</figcaption>
</figure>

The word <i>crúbán</i> would appear to refer to an animal with some kind of
notable hands; <i>crúb</i> is listed in Dinneen's dictionary as meaning "a
claw, a hoof, or paw". The descriptive bounds of these words will of course
vary between individuals, but I would personally not use any of these words to
refer to a frog's..."hands". Perhaps <i>crúb</i> can be used for any non-human limb
appendage. The diminutive <i>crúibín</i> has been borrowed into English to
refer to pig trotters as food (to me, a distinctively large food, but
nevertheless...).

<br><br>
<i>Crúbán</i> is hard to find written Irish attestations of.
<a href=https://www.duchas.ie/en/cbes/4428052/4372722>Here</a> it is used in
the name for a plant shaped like a hare's paw. It is also listed in Ó
Dónaill's dictionary as referring to a "short potato-ridge at angle to main
ridge", probably describing its shape as similar to some kind of foot. In Dinneen's dictionary it is
defined as <a href=https://en.wiktionary.org/wiki/crabfish>"crabfish"</a>, an
archaic term for crab<sup id="fnref:21"><a class="footnote-ref" href="#fn:21">21</a></sup>.
In the
LASID, the only places giving <i>crúbán</i> for crab are Rathlin Island,
Inishowen, Arran and Kintyre. The DASG also records this
usage in other parts of Argyll. Some places (mostly in Ulster, also in
Scotland, one place in Clare, two in Mayo) are however recorded as
using the similar <i>crúbòg</i>, sometimes only to refer to big crabs.

<figure>
<img src="../images/froganna/crúbán-distribution.svg">
<figcaption><i>Distribution of </i>crúb-<i> words for "crab". Additional
datapoint in Inishowen from <a
href=https://www.duchas.ie/en/cbes/4493801/4422210/4539693>The Schools'
Collection</a>. Mayo outlier also from <a
href=https://www.duchas.ie/en/cbes/5235172/5225583/5261072>The Schools'
Collection</a>. Jura and Colonsay taken from <a
href=https://era.ed.ac.uk/server/api/core/bitstreams/c5b70130-aec4-4f11-b6f6-60f3fd8263cf/content></i>The
Gaelic Dialect of Colonsay<i></a>, PhD thesis by Alastair MacNeill Scouller</i></figcaption>
</figure>

Given the geographical distribution of <i>crúb-</i> words for crabs, I do wonder if the strikingly similar Scottish word <i>crùb</i> might be
related, which Macbain <a
href=https://en.wikisource.org/wiki/Page:Alexander_Macbain_-_An_Etymological_Dictionary_of_the_Gaelic_Language.djvu/178>gives</a>
as being derived from Norse <i>krjúpa</i> and cognate with English "creep",
meaning "to squat, crouch". That certainly fits a frog's resting pose extremely
well, and arguably a crab's. If <i>crúbán</i> does refer to the crab's claws,
would we expect to hear the crab's claw referred to as <i>crúb</i> in the
places that use this term for crabs? On Islay a crab's claw is recorded as
<a
href=https://dasg.ac.uk/fieldwork/view/UG9ydFdlbXlzc0pNYWNBcnRodXJzbGlwc3xsYWRoYXJ8aWRwMTE1NzYyNTEyfHxjcmFifHI1Mnx8fGFsbA==><i>ladhar</i></a>,
   on Lewis as <a
   href=https://dasg.ac.uk/fieldwork/view/Q3Jvd2xpc3RhQ2FuZFBNYWNEb25hbGRtaXNjMXxpb25nbmF8aWRtMzU0NjMzMDR8fGNyYWJ8cjUxfHx8YWxs><i>iongna</i></a>.

<br><br>
Perhaps there's been some sort of merging in Ireland of Celtic-origin
<i>crobh</i>
(Scottish <i>crubh</i>, meaning: hoof, clawed foot, etc.) with Norse-origin
<i>crúb</i>, perhaps explaining how on Rathlin <i>crúbán</i> is recorded as
meaning "crab", but is also used in a local telling of Cinderella to mean
something entirely different that is translated as "pig foot" by Sam Henry
<sup id="fnref:22"><a
class="footnote-ref" href="#fn:22">22</a></sup>. Unfortunately the Rathlin
informants gave no word for pig's feet in the LASID to compare against.

<br><br>
I will elect to officially update my translation to "dyke squatter".

</details>

### <i>Breallach lathaí</i>: a crude comparison? Rated PG
<details>
<summary><img src="../images/froganna/breallach.svg" alt="a frog drawn to
recall Boticelli's The Birth of Venus. The frog is standing on a clam shell
with one hand on his breast and the other reaching down" style="max-height: 600px;">
</summary>

<i>This term was recorded three times in the LASID, all in Galway.</i>
<br><br>

When I first looked up <i>breall</i> in the dictionary, I was met with a
surprise:
<br><br>

<img src="../images/froganna/breall-dict.png" alt="A screenshot of teanglann.ie
showing that <i>breall</i> means glans penis or clitoris">
<br>

<i>Breallach</i> is commonly used for clams. What do frogs, glandes, and clams
have in common? Well, they are all "fleshy" and share a certain shiny sliminess
to their opaque surface. I will note that open clams and mussels look like a vulva.

<br><br>
 The other meanings
listed for <i>breall</i> in Ó Dónaill's dictionary are:

<blockquote>
<ol>
<li>(Ugly) protuberance [<i>but is this just referencing the above meaning?</i>]</li>
<br>
<li>Blubber lip [<i>again, this could be comparing someone's lips in an
insulting way</i>]</li>
<br>
<li>Blemish, defect</li>
<br>
<li>Rag, clout [<i>presumably meaning patch</i>]</li>
<br>
<li>Blunderer, fool [<i>genitals as epithets is common in English at least</i>]</li>
<br>
<li>(In phrases) <b>Tá ~ ort</b>, you are making a silly mistake, making a fool
of yourself [<i>in English you might say you are making an arse of something,
perhaps here they are saying you're making a glans of something</i>]. <b>Fágadh
~ air</b>, he was made to look very foolish. <b>Tá ~ orm le mo chuid oibre</b>,
    my work is sadly neglected, very much in arrears.</li>
<br>
<li><b>~ a gorma</b>, knapweed.
</ol>
</blockquote>

As per my annotations, I do feel that many of these could be explained via the
anatomical meaning. The <a href=https://dil.ie/6713>eDIL</a> lists these
meanings: <b>blur, spot, stain, etc.; slur, blemish, etc.; tumour, a hump,
knob or botch; the glans penis, etc. a may game, a mocking stock</b> and <b>
the round knob at the end of the buailteán or striking part of a flail</b>. The
last meaning perhaps explains <i>breall a gorma</i> for knapweed.

<figure>
<img src="../images/froganna/flail-knapweed.png" alt="photo of knapweed with spiky
ball below flower, and medieval flail weapon with spiky ball on a chain">
<figcaption>
<i>The spiky ball on the end of a flail resembles the involucre of the
knapweed. Flail image from <a
href=https://medievalbritain.com/type/medieval-life/weapons/medieval-flail/>medievalbritain.com</a>,
   knapweed image from <a
   href=https://www.ulsterwildlife.org/wildlife-explorer/wildflowers/common-knapweed>ulster-wildlife.org</a></i> 
</figcaption>
</figure>

The meanings of "knob" &c. do suggest the frog here could be named for his
shape: I suppose a frog sort of looks like a little lump of mud when resting,
see also the use of <i>tortán</i> (small clod) for frog at LASID point 35, also
in Galway.
<br><br>

So, does <i>breallach</i> really refer to the frog's mucusy skin? Or is it an
insult to the frog, calling him a blemish on the bog? 
Perhaps the "protuberance" meaning could refer to the frog's
vocal sac, a suggestion from my teacher Dubhán Ó Longáin. Or perhaps it is just
calling the frog a wee knob. For now, the origin of this term will remain
mysterious.
</ul>

</details>

### <i>Lúbóg lathaí</i> and <i>lúbar lathaí</i>: for the frog's bendy legs?

<details>
<summary>
<i>Collectively I found three usages of these terms, all in Galway.</i>
</summary>
</details>

### <i>Frús</i>: found only in the LASID. Another foreign loan?

### <i>Preabaire na lathaighe</i>: mud hopper

<details>
<summary>
<i>I found only one <a
href=https://www.duchas.ie/en/cbes/4498088/4351276/4502478>attestation</a> of this, in Mayo.</i>
</summary>

<br>
Another jumping term is <i>preabaire na lathaighe</i>: "mud hopper", or "mud
bouncer". Other uses I found of <i>preabaire</i> in The Schools' Collection
appeared to refer to magpies: <a
href=https://www.duchas.ie/en/cbes/4922245/4863816/5020836>see this familiar
superstition</a> from Tipperary, and this <a
href=https://www.duchas.ie/en/cbes/4922329/4870637/5055991>riddle</a> from
Clare. Ó Dónaill's dictionary gives as <i>prebaire na mbánta</i>
as a possibility for magpie.
</details>

### <i>Athadán</i>: a lost word from Conamara?

<details>
<summary>
<i>I found only one written attestation of this word, and one phonetic in the
LASID, both in Conamara.</i>
</summary>

<img src="../images/froganna/athadán.png" alt="Screenshot of book in Gaelic
type, the text of which is given below">

<blockquote>
Chonnaic mé chugam thríd an locán,<br>
Tadhg O Lupán agus a chos tinn,<br>
Bárr a bhróige air poll a thóna,<br>
Agus a dhá shúil mhóra a' dul as a cheann?<br>
<br>
Athadán no frog air snamh.
</blockquote>

I have seen this riddle repeated across Galway and Mayo in The Schools'
Collection and the LASID<sup id="fnref:23"><a class="footnote.ref"
href="#fn:23">23</a></sup>. The version above is from an 1892 collection of
Conamara folklore, <i>Siamsa an Gheimhridh - Nó Cois an Teallaigh in
Iar-Chonnachta</i>. It is a longer version than the later ones I have seen in
the previously mentioned sources.

<blockquote>
I seen through to the puddle/pond [assuming <i>locán</i> is <i>lochán</i>]<br>
Timmy McHands and his sore leg [because his legs are bent funny]<br>
The top of his shoe in his arsehole [because of how frogs sit]<br>
And his two big eyes going out his head<br>
</blockquote>

I can see how it describes a frog, but if there is any of the wordplay that I
usually associate with riddles, it is not apparent to me. Regardless of
my suspicions about the quality of this riddle, the answer in all six other
examples of this riddle is always a word meaning "frog". In the fuller example
here, the answer is "<i>athadán</i> or <i>frog</i> swimming". I do not see how the former
could be an alternative answer &mdash; I think it is an alternative name for
the same meaning.
<br><br>
The only other usage of this word I've been able to find is in the LASID. Point
35, South of Tuam, for some reason lists alternative words for "frog" from
different areas than the one at hand. A word from Conamara is given as <span
class=ipa>[ɑːdɑːn]</span>. I have read that intervocalic <span
class=ipa>/h/</span> is deleted in parts of Conamara, so this would appear to
be our word.
<br><br>
But what does it mean? Is it from <i>áth</i>,
meaning a shallow fordable part of a river? But frogs prefer
still water, so they and their spawn are not washed away. Is it from <i>athadh</i> for elopement (getting tenuous, but frogs
are always escaping off if you try to catch them)? "Oast" is given as a meaning
of <i>áth</i> in <i>The Irish of Cois Fhairrge</i>, which makes no sense to me at all
for frogs.
<br><br>
A mysterious word. I would love to hear from any Conamara speakers whether they
have heard this or use it.
</details>

### <i>Tortán</i>: clod?


### <i>Ceanna-phiullan</i>: usually used for tadpoles


<!---


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

### cranag

### rannag

from https://en.wiktionary.org/wiki/rana#Latin

### uillichd
wilky?

### torpán

teanglann has this as small clump or clod, or a pot-bellied person. would make
sense

torbán is given as tadpole

## Given names for the frog in stories and riddles

Gille Criosda Mhic Dhughail

Séan Ó Lupáin

Mac I Shliopán

Mach Uí Stíopháin

Seid (cos of the expanding when croaking) https://archive.org/details/witchcraftsecon01campgoog

--->

## Frogs in Gaelic bibles

<details>
<summary>Table of translations for "frog" in various Gaelic bibles 1602-1827</summary>

<table>
<thead>
<tr>
<th>Year of edition</th>
<th>Bible</th>
<th>Exodus 8:2</th>
<th>Exodus 8:3</th>
<th>Exodus 8:4</th>
<th>Exodus 8:5</th>
<th>Exodus 8:6</th>
<th>Exodus 8:7</th>
<th>Exodus 8:8</th>
<th>Psalms 78:45</th>
<th>Psalms 105:30</th>
<th>Revelation 16:13</th>
</tr>
</thead>
<tbody>
<tr>
<td>1602</td>
<td><a href="https://archive.org/details/bim_early-english-books-1475-1640_tiomna-nuadh-ar-d-tighea_bible-nt-irish_1602/mode/2up">New Testament translation by various Irish-born Church of Ireland priests</a></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><i>froguibh</i></td>
</tr>
<tr>
<td>1685</td>
<td><a href="http://corpas.ria.ie/index.php?fsg_function=3&amp;fsg_id=2405">Old Testament translation by English bishop William Bedell</a></td>
<td><i>froguibh</i></td>
<td><i>froguidhe</i></td>
<td><i>froguidhe</i></td>
<td><i>froguidhe</i></td>
<td><i>froguidhe</i></td>
<td><i>froguidhe</i></td>
<td><i>froguidhe</i></td>
<td><i>luisgionn</i></td>
<td><i>luisghionna</i></td>
<td></td>
</tr>
<tr>
<td>1690</td>
<td><a href="https://archive.org/details/bim_early-english-books-1641-1700_an-biobla-naomhtha-iona_bible-gaelic_1690/page/n59/mode/2up">(as above)</a></td>
<td><i>froguibh</i></td>
<td><i>froguidhe</i></td>
<td><i>froguidhe</i></td>
<td><i>froguidhe</i></td>
<td><i>froguidhe</i></td>
<td><i>froguide</i></td>
<td><i>froguidhe</i></td>
<td><i>luisgionn</i></td>
<td><i>luisghionna</i></td>
<td></td>
</tr>
<tr>
<td>1817</td>
<td><a href="https://archive.org/details/GLEBED_DBS_HS/page/59/mode/2up">(as above)</a></td>
<td><i>lúisgionn</i></td>
<td><i>cnadáin</i></td>
<td><i>luisgionn</i></td>
<td><i>luisgionn</i></td>
<td><i>cnadáin</i></td>
<td><i>cnadáin</i></td>
<td><i>luisgionn</i></td>
<td><i>luisgionn</i></td>
<td><i>luisgionna</i></td>
<td></td>
</tr>
<tr>
<td>1827</td>
<td><a href="https://archive.org/details/leabhuirtseantio00bede/page/68/mode/2up">(as above)</a></td>
<td><i>lúisgionn</i></td>
<td><i>lúisgionna</i></td>
<td><i>luisgionna</i></td>
<td><i>lúisgionna</i></td>
<td><i>lúisgionna</i></td>
<td><i>lúisgionna</i></td>
<td><i>lúisgionna</i></td>
<td><i>luisgion</i></td>
<td><i>lúisgionna</i></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>1767</td>
<td><a href="https://digital.nls.uk/rare-items-in-gaelic/archive/97180274">New Testament translation by James Stewart and Dugald Buchanan, both Scottish</a></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><i>losguinn</i></td>
</tr>
<tr>
<td>1801</td>
<td><a href="https://digital.nls.uk/rare-items-in-gaelic/archive/102328331">Old Testament translation by John Stewart of Luss, son of James Stewart above</a></td>
<td><i>losgannaibh</i></td>
<td><i>losgainn</i></td>
<td><i>losgainn</i></td>
<td><i>losgannaibh</i></td>
<td><i>losgainn</i></td>
<td><i>losgainn</i></td>
<td><i>losgain</i></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>1610</td>
<td><a href="https://www.academia.edu/41457167/Phillips_Manx_translation_of_the_Psalms_MNH_MS_00003_Corrected">Manx translation of Psalms by John Phillips, born in Wales and educated at Oxford</a></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><i>ffroggyn</i></td>
<td><i>ffroggyn</i></td>
<td></td>
</tr>
<tr>
<td>1775</td>
<td><a href="https://manx.global.bible/bible/3a7d2caa4b5b4bec-01/PSA.105">Manx bible, led by English bishop Mark  Hildesley, with assistance from Manx scholar John Kelly</a></td>
<td><i>froggyn</i></td>
<td><i>froggyn</i></td>
<td><i>froggyn</i></td>
<td><i>froggyn</i></td>
<td><i>froggyn</i></td>
<td><i>froggyn</i></td>
<td><i>froggyn</i></td>
<td><i>froggyn</i></td>
<td><i>froggyn</i></td>
<td><i>froggyn</i></td>
</tr>
</tbody>
</table>
</details>

## Miscellaneous curiosities

["Anybody that lived in rural Ireland remember the frog man?"](https://www.reddit.com/r/CasualIreland/comments/184j053/anybody_that_lived_in_rural_ireland_remember_the/)

[A jumping frog and other creatures of etymological interest](https://blog.oup.com/2024/03/a-jumping-frog-and-other-creatures-of-etymological-interest/)

[An etymological plague of frogs](https://blog.oup.com/2024/04/an-etymological-plague-of-frogs/)

[The Etymology of English toad: Effects of the Celtic substrate?](http://centre-for-english-traditional-heritage.org/TraditionToday7/7Sayers_Toad.pdf)
(strongly disagreed with by the previous item)

[A frog burned by a German bomb on the Isle of Man during World War
II](https://imuseum.im/search/collections/objects/mnh-museum-35823.html)

[Celtic etymology for the word "wilky" or "quilkin", used for frogs, from Cornish
<i>gwelsken</i> meaning
"grass-skin"](https://archive.org/details/annualreport04royauoft/page/29/mode/1up)


## Go rabh maith agaibh

* Ciarán Ó Duibhín, ar ábhar misnigh é, agus as acmhainní ar líne a chur ar fáil

* Dubhán Ó Longáin, as mo cheisteanna fá fhroganna a fhreagairt, agus as an
mhúinteoireacht

* Àdhamh Ó Broin, as d'obair ghoirt a roinnt, agus as labhairt fá fhroganna liom

* Christopher Lewin, for answering my questions about the possible origins of
the Manx word <i>rannag</i>, and providing a copy of <i>The Manx Have a Word
for it, Book 4: Insects, Reptiles etc.</i>

* Ciarán Dunbar, as labhairt fá fhocla as Oirialla liom

* Màiri MacMillan, as labhairt fá fhroganna Uibhist liom

* Simon Thoumire, as sonraí teagmhála Mhàiri a thabairt domh

* Thank you to all the fieldworkers, the 1930s Irish schoolchildren, the
informants who took the time to be interviewed, and everyone who has ever gone
to the effort to make knowledge available online for others to access freely.

[^1]: In Nancy Dorian's <i>Language Death: The Life Cycle of a Scottish Gaelic
Dialect</i> (p. 101), she notes this: <blockquote>Precisely because everyone
uses such loanwords, and because there is considerable self-consciousness about
it, the number of loanwords in a verbal performance seems to have become a
marker of degree of formality in ESG [East Sutherland Gaelic]. In a relaxed and
casual performance, the number of lexical borrowings will rise [...] the more
formal the performance &mdash; for example, established narrative routines
reproduced for tape recording &mdash; the lower the number of lexical
borrowings [...] </blockquote> She gives an example of a tape-recorded
narrative, where a speaker replaced the borrowing of
<i>poileas</i> ("police") with <i>luchd an lagh</i> ("law people"). Dorian
notes this as <i>elegant Gaelic but otherwise foreign to the lips of any East
Sutherlander of my acquaintance</i>. This correlation of formality and
loan-word occurrence may be less prevelant in areas with healthier Gaelic. The
subjects in the above were of the last couple generations of speakers of a
dialect particularly far removed from what was considered standard (which
negatively affected some, though not all, of the speakers' perception of the legitimacy of their
Gaelic), and were subject to mockery from English monolinguals for
their loanword usage. In a healthier community of speakers I imagine loanword
usage would be done with more confidence and less self-consciousness.

[^2]: Something I learnt during this project was that the distinction between
frogs and toads is considered part of a folk taxonomy, not precisely aligned
with scientific classification. Yet the common frog (<i>rana temporaria</i>)
and common toad (<i>bufo bufo</i>) are in different genera, and my reading
tells me members of <i>rana</i> are generally wartless, and are all good
jumpers. Perhaps in these islands, where we have very few species, it does at
least line up with scientific taxonomy. In other parts of the world with more
amphibious diversity it seems there is more variation on whether folk and
scientific taxonomies align.

[^3]: The Scottish dialects I have read about that have voiced realisations
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

[^4]: Dwelly's dictionary of Scottish Gaelic (1902) gives "1. Hole, chink,
    niche, nook, cranny. 2. marsh, fen" for <i>fròg</i>. O'Reilly's
    Irish-English dictionary gives "a fen, a marsh ; a pitfall, a hole, a
    cleft;" for <i>frog</i> (before also giving the animal). The marsh and hole
    senses seem to have left Ireland. Dwelly gives "active, energetic" for
    <i>frog</i>, a meaning I haven't seen in any Irish texts.

[^5]: You can download a CSV of my collected list
[here](../images/froganna/omens.csv). The list is not exhaustive and was
collected by searching the NFC for "frog luck", "frog omen", "frog house",
"frog death", "frog bás", "frog good". A common belief stated was that killing
a frog would bring you bad luck, but this doesn't really signal anything of the
nature of a chance encounter with a frog. Similarly lore that described the
frog as blessed in some way was not included; indeed, one of the pieces of lore
that stated frogs in the house is an omen of death said this is because frogs
are considered "blessed". Being blessed does not equal being looked upon
without fear.<br><br>My favourite piece of lore found during this search
was <a
href=https://www.duchas.ie/en/cbes/4921682/4889594/4951820>this</a>
one:<blockquote>The frog was looked upon as something sacred as it was the frog
taught Our Lord how to swim.</blockquote>Did he now...

[^6]: Scharff, R. F. (1893). <a
href=https://archive.org/details/irishnaturalist02roya/page/n17/mode/2up><i>Is
           The Frog a Native of Ireland?</i></a> The Irish Naturalist, 2(1),
           1–6. This article explores various historical accounts of frogs
           being found in Ireland, including Gerard of Wales's.  The idea that
           Trinity students introduced frogs is dismissed by the author for
           being ecologically unlikely, noting that there are far more frogs on
           the west coast and the city doesn't seem like an ideal place for
           frogs to thrive.

[^7]: [O'Reilly's Irish-English
dictionary](https://archive.org/details/anirishenglishd00odogoog/page/259/mode/1up)
states the frog is "an animal not found in Ireland before the reign of William
the Third of England, whose Dutch troops first introduced it amongst us".

[^8]: Dubourdieu, J. (1802), <a
href=https://archive.org/details/statisticalsurve00duboiala/page/315/mode/1up><i>Statistical
           survey of the County of Down</i> Dublin: Graisberry and
           Campbell</a>. This survey states "that [frogs] first made their
           appearance near Moira, in the western parts of this county, can be
           proved beyond contradiction" but declines to do so himself. He
           offers an anecdote from a local man about when he first seen a frog.

[^9]: I have <a
href=https://www.dib.ie/biography/gerald-wales-giraldus-cambrensis-a3490>read</a>
           that Gerard first visited Ireland in 1183, and <i>Topographia
Hibernia</i>, containing the account, was circulated in 1188. However, he mentions Robert Poer in the
account, who I read <a href=https://www.dib.ie/biography/poer-robert-a7399>died</a> in
1178. The Ossory king in question is said to have died in 1185.

[^10]: <a href=https://www.yorku.ca/inpar/topography_ireland.pdf>From this
        translation of <i>Topographia Hibernia</i> by Thomas Foreseter</a>

[^11]: Domnall Mac Gilla Pátraic, see this <a
href=https://www.dib.ie/biography/poer-robert-a7399>biography</a> of Robert Poer

[^12]: [Macbain, Alexander (1911), <i>An Etymylogical Dictionary of the Gaelic Language</i>, Stirling: Eneas Mackay](https://archive.org/details/etymologicaldict00macbuoft/page/232/mode/2up)

[^13]: The spelling <i>loscann</i> is used
[here](https://www.duchas.ie/en/cbes/4427982/4363624/4467633?HighlightText=loscann&Route=stories&SearchLanguage=ga)
to mean "burning", as a variant of standard <i>loisceann</i>. I think the only
other proposed etymology I've seen is in Volume II of <a
href=https://www.electricscotland.com/books/pdf/carminagadelicah02carm.pdf><i>Carmina
Gadelica</i></a>, which says "Probably the
toad is called 'losgan' from 'losg' irruption, leprosy". This seems much less
likely to me, based on the various sources found via the eDIL, than the
<i>loiscend</i> derivation. I believe the word given for leprosy mostly
referred to <a href=https://dil.ie/30704>lameness</a> (which can be a secondary
effect of leprosy). I'm not sure what toads
would have to do with leprosy; perhaps their bumpy skin was thought to be
reminiscent of leprosy nodules. I have seen it suggested that <a
href=https://en.wikipedia.org/wiki/Taddiport>Taddiport</a>, a leper colony in
the Middle Ages, was named so because of this. I haven't found much on toads
being used to refer to people suffering from leprosy at the time, however, but
I only looked briefly.

[^14]: <i>Comhrag losguinn lasrach mear ná sir—is sé do dhaingean—suail a sheadh
i n-armaibh áigh, marbhaidh fear uaidh dá anáil.</i> The text refers to a
creature <losguinn> breathing fire.

[^15]: See this [entry](https://anglo-norman.net/entry/salemandre) in an
Anglo-Norman dictionary, and this blog post ["Not quite
cricket?"](https://grammarphobia.com/blog/2021/07/cricket-croquet.html) from
Grammarphobia.
[This](https://quod.lib.umich.edu/m/middle-english-dictionary/dictionary/MED10321)
Middle English dictionary shows the converse, <i>criket</i>
being used to refer to the fire lizard.

[^16]: Thank you again to the Grammarphobia blog linked in the previous
footnote for reproducing references from the OED that attest this.

[^17]: I wondered if perhaps the synonyms listed in O'Clery's glossary can
provide more clues. <i>Cú cnámha</i> appears to read as "hound of
bones", though the eDIL <a href=https://dil.ie/13291>tells us</a> that
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

[^18]: Thank you to Gerry Oates' article <i>An phéist a chuir an cluiche
ar Phádraig</i> in <i>An tUltach</i> which directed me to this, via the
National Corpus of Irish.

[^19]: This was the school my granny went to :) and my granda's parents etc.

[^20]: The introduction of this bible says that the Old Testament
is translated by William Bedell and "some changes made from the edition of
1690". I assume one of the changes was changing <i>lúisgionna</i> to
<i>cnadáin</i> in Exodus 8:3, though curiously in Exodus 8:4 it is left
unchanged.

[^21]: "Crabfish" also meant lobster, but the LASID universally gives
<i>gliomach</i> (<i>giomach</i> in Scotland) for that.

[^22]: The word <i>crúbán</i> is used in <a
href=https://www3.smo.uhi.ac.uk/oduibhin/leabharthai/Sg%C3%A9altan%20Rachreann.pdf>this</a>
telling of Cinderella, recorded by Aoidhmín Mac Gréagóir and published in 1910.
This is translated in the Belfast Telegraph 18/04/1939
by Sam Henry and titled "The Cinderella of Rathlin Island", where <i>crúbán</i>
seems to be translated as "pig's feet". There's not a huge amount of context;
the Cinderella character cries: <blockquote><i>Saltann móra lobhtha<br>
Is ladhra gearrtha crúbán<br>
Is an té beag buidheach </i>[Cinderella]<i><br>
Síos faoi an tubhán</i></blockquote> while being forced to
hide under a tub while the prince visits, before which her sisters all were cutting at
their feet to make them fit the glass slipper. <a
href=https://en.wiktionary.org/wiki/ladhar><i>Ladhar</i></a> (genitive
<a href=https://en.wiktionary.org/wiki/ladhra#Scottish_Gaelic><i>ladhra</i></a>
presumably used on Rathlin as in Scotland) is "space between toes or
fingers", "toe", "claw". So <i>is ladhra gearrtha crúbán</i> is perhaps
shouting that the <i>crúbán</i> under the tub with her are in fact her sister's
toes. However, I don't quite grasp the grammar so I will update this after
talking to someone with more Gaelic. The Rathlin LASID returns give
<i>salann</i> for salt, not <i>saltann</i>.

[^23]: It is interesting comparing this 1892 recording of the riddle with
versions from the The Schools' Collection (1930s) and the LASID (1950s). Most of
the later versions are significantly truncated, with all except one missing the first line
and some missing enough that it evokes a child making a barely passable
attempt at repeating something they've learnt. All of the examples in The
Schools' Collection subsitute <i>i gcúl</i> for <i>a' dul</i>, changing the
meaning from "eyes coming out of his head" to "eyes on the back of his head",
which makes a lot less sense to me. The version from point 40 of the LASID: <blockquote>
Brian O Slupáin agus a chois tinn,<br>barr a bhróige i bpoll a thóna,<br>agus a dhá shúil mhóra amuigh ós a chionn
</blockquote>
The versions I found in The Schools' Collection: <ul> <li><a href=https://www.duchas.ie/en/cbes/4622967/4618072/4628513>An Trá Bháin,
Contae na Gaillimhe</a>. This is the fullest version in The Schools'
Collection. The frog is named <i>Seán Ó Lupáin</i>, "Johnny McHands" perhaps.</li> <li>
<a href=https://www.duchas.ie/en/cbes/4613689/4608972/4659073>An Spidéal, Contae
na Gaillimhe</a>. This is very truncated. The frog is named <i>Mach Uí
Stíopháin</i>. It is a little hard to make out of the "t" in <i>Stíopháin</i>
is indeed a "t".</li><li>
<a href=https://www.duchas.ie/en/cbes/4572372/4565414/4572388>Gaillimh</a>.
  This one varies the most from the others.</li><li>
  <a href=https://www.duchas.ie/en/cbes/4427990/4364623/4468321>An tInbhear,
Contae Mhaigh Eo</a>. Also very truncated. The frog is called <i>Mach Uí
Stiopháin</i>.</li><li>
<a href=https://www.duchas.ie/en/cbes/5235172/5224715/5243655>Béal Feirste,
Contae Mhaigh Eo</a>. Also very truncated. The frog is called <i>Mac Ui
Shliop</i>.</li><li>
<a href=https://www.duchas.ie/en/cbes/5235172/5225191/5260368>Béal Feirste,
Contae Mhaigh Eo</a>. The riddle is (presumably accidentally) repeated twice.
The frog
is called <i>Mac I Shliopán</i>.</li>
</ul> Vaguely similar riddles elsewhere: <ul> <li><a href=https://www.duchas.ie/en/cbes/4687698/4684993/4689936>Baile Uí
  Dhuinn, Contae Chiarraí</a></li></ul>
