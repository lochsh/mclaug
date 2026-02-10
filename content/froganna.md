Title: Goidé mar a deirtear "frog" i nGaedhilg?
Slug: froganna
Date: 11th Dec 2025
Status: draft

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.40/jquery.csv.js"></script>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

<script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />

<script
    src="https://unpkg.com/leaflet.markercluster.freezable@1.0.0/dist/leaflet.markercluster.freezable.js"
    integrity="sha384-QXTyM8sAAM5XAUeRoyzNadlfH7KuYt0C6i9O/T2vFb4wGIKwL9Ak++3y3JBqfGyg"
    crossorigin="anonymous"
></script>

<script src="../static/froganna/map.js"></script>

## Cuairteoir gan iarraidh: an uninvited guest

Two months ago I was sitting on the sofa cuddling my cat when, out of the
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

<div id="map-container">
<div id="map" style="height: 700px; width: 95%; margin: auto"></div>
<button id="disable-clustering">Disable clustering</button>
<button id="enable-clustering">Enable clustering</button>
</div>

<br>
Above is a map showing attested words used by local people for "frog". Zooming
out will reveal datapoints in Nova Scotia. The main
sources are:

* Wagner, H. (1958-1969), <i>Linguistic Atlas and Survey of Irish Dialects (LASID)</i>, Dublin Institute of Advanced Studies

* Digital Archive of Scottish Gaelic (DASG). University of Glasgow <a href='https://dasg.ac.uk'>&lt;dasg.ac.uk&gt;</a>

* The Schools' Collection, National Folklore Collection, University College Dublin <a
  href=https://www.duchas.ie>&lt;duchas.ie&gt;</a>

* Tobar an Dualchais <a href='https://www.tobarandualchais.co.uk'>&lt;tobarandualchais.co.uk&gt;</a>, Sabhal Mòr Ostaig

* Dòrlach's fieldwork, kindly shared by Àdhamh Ó Broin <a
  href="https://www.dorlach.scot">&lt;dorlach.scot&gt;</a>

The markers can be filtered by source and by word category using the checkboxes
below the map. Clustering can also be enabled or disabled. When disabled, the
remaining clusters are co-ordinates for which there is more than one data
point.

The GeoJSON file containing the data can be downloaded
[here](../static/froganna/data/frogs.json), licensed under <a
href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>.

<figure>
<img src="../images/froganna/word-map.png" alt="map with words on
locations to show distribution of usage. Leinster and East Ulster do not have
many data points. There are two 'frog' usages in Leinster, and East Ulster has
one each of 'fliuchán', 'lapadán', 'crónán', and 'frog'. Clear patterns include
the use of 'cràigean' and 'gille-cràigean' in a band running northeast across
Scotland from Ardnamurchan to Strathspey. A cluster of 'mial-mhàgain' is clear
around Skye and Raasay. 'Leumachan' is clustered around Assynt and MacKay's
Country in Sutherland, though East Sutherland has 'losgaid' and 'mial-mhàgain'.
Connacht has a very dense variety of words but a spread of usage of 'luascan
lathaí' is visible across Galway and Mayo. In Munster there are two usages of
'cnádán' close to each other in Cork and Waterford, one usage of
'laprachán' in Ring, and one usage of 'lisbín' in Kerry. The rest of
the points in Munster are 'frog'. Donegal has a roughly even spread of 'frog',
    'losgann' and  'lisbín', with a couple usages of 'crónán' and one of
    'luascan lathaí'."
style="max-height: 900px;">
<figcaption><i>A map showing recorded usages of words for frog, with categories
of words grouped together (e.g.  </i>mula-mhàgag<i> displayed as
</i>mial-mhàgain<i>, </i>liospán<i> displayed as </i>lisbín<i>). Nova
Scotia exclusively had </i>màgan<i> for frog.</i></figcaption>
</figure>

The goal with the words included in the map is to have traceable examples
of local native speakers using each word. I am keen to not allow
this goal to unnecessarily exclude areas where the local language died. Where
a dictionary is the only source of a word, I have not included it, but will
often mention it in the text below. For some words, there are enough secondary
sources that it feels right to include it on the map. These secondary sources
are often from non-native speakers who were experts in a particular area's
language, but which don't name a specific speaker and only refer to a broad
area. There is some judgement involved in what to include and what to exclude,
and I hope my reasoning is made clear both in the details of each
datapoint, and in the writing below.

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
For sources like The Schools' Collection in Ireland's National Folklore
Collection, the linguistic background of the informants is not made explicit as
in sources like the LASID. If I ever have reason to believe the informant might
not be a native speaker or be a native speaker from somewhere else, I have
included a note. I have not included all examples of <i>frog</i> from The
Schools' Collection as there are so many!

<br><br>
I do not intend for the datapoints to indicate that frogs were exclusively
called a particular word in a place, or that a word was exclusively used for
frogs (e.g. <i>leumachan</i> is <a
        href=https://dasg.ac.uk/fieldwork/view/TGlvbmVsSnVuaW9yU2Vjb25kYXJ5bWFvcmFjaHxsZXVtYWNoYW58ZDBlNjA5fHxsZXVtYWNoYW58cjF8fHxhbGw=>here</a> recorded
as being used for some beach insect or crusteacean). Many of the words
recorded might have been supplementary to others. Additionally, much of
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

<h3>On frog words</h3>

I have illustrated many of the words for frog below, and wondered whether I
should try to use a consistent orthography across the illustrations. The
writing systems used in Scotland and Ireland differ somewhat, having once been
consistent and now diverged. (The Isle of Man's writing system was developed
independently and is very different, but the only word I've illustrated from
there is "frog", so the difference in orthography was not a concern.)
<br><br>

In the end, I have largely written the words in the illustrations as I would
expect to see them in the places they were recorded. I did, however, make some choices:
<br><br>

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

<li>When there were a few variants of a word, the choice of which one to
    represent in the illustrations was a bit arbitrary.
    For example, although I had more attestations of <i>leumrachan</i> than
    <i>leumachan</i>,it seemed more convenient for the headword to be formulated simply from
    <i>leum</i> + <i>achan</i>, with further explanation of variants later
    on.</li>
<br>

<li>This mostly applies to the datapoints on the map, but I have followed the old
  Scottish tradition of using "ó" for <span class=ipa>/oː/</span> (as in
  <i>mór</i> Eng. "big") and "ò" for <span class=ipa>/ɔː/</span> (as in
  <i>òran</i> Eng. "song").
</li>

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

<h3 id=suffixes>Cognate suffixes</h3>

Descriptions largely taken from Wiktionary.

<ul>
    <li><span style="color: #fc04a2;"> Irish <i>-án</i>, Scottish <i>-an</i>,
    Manx <i>-an</i> or <i>-ane</i></span>
        <ul><li>
            <i>lochán</i>,
            <i>lochan</i>,
            <i>loghan</i>.
            "pond, pool, small lake" (diminutive of <i>loch</i>)
        </li>
        <li>
            <i>grianán</i>, <i>grianan</i>, <i>grianane</i>. "sunny spot" (from
                    the word meaning "sun" + suffix)
        </li>
        <li>A suffix used to derive instruments, diminutives, and other nouns
        from primary nouns.</li>
        </ul>
    </li>
    <li><span style="color: #fc04a2;">Irish <i>-adóir</i>, Scottish
    <i>-adair</i>, Manx <i>-der</i></span>
        <ul><li>
            <i>bréagadóir</i>,
            <i>breugadair</i>,
            <i>breageyder</i>.
            "liar"
        </li>
        <li>Suffix appended to words to create an agent noun, indicating a
        person who does (or a thing that does) something</li>
        </ul>
    </li>
    <li><span style="color: #fc04a2;">Irish <i>-ach</i>, Scottish <i>-ach</i>,
    Manx <i>-agh</i></span>
        <ul><li>
            <i>Éireannach</i>,
            <i>Èireannach</i>,
            <i>Erinagh</i>.
            "Irish person" (noun)
        </li>
        <li>Forms nouns from other nouns and adjectives with the sense of
        ‘person or thing connected or involved with, belonging to, having’.</i>
        </ul>
    </li>
    <li> <span style="color: #fc04a2;"> Irish <i>-aire</i>, Scottish
    <i>-aire</i>, Manx <i>-eyr</i></span>
        <ul><li>
            <i>iascaire</i>, <i>iasgair</i>, <i>eeasteyr</i>. "Fisherman" (from
                    the word meaning "fish" plus suffix)
        </li>
        <li>Forming nouns from nouns and adjectives with the sense of ‘person
        or thing connected or involved with, belonging to, having’</li>
        </ul>
    <li><span style="color: #fc04a2;"> Irish <i>-anna</i>, Scottish <i>-an</i>,
    Manx <i>-yn</i></span>
        <ul><li>
            <i>bláthanna</i>,
            <i>blàthan</i>,
            <i>blaaghyn</i>.
            "flowers"
        </li>
        <li>Pluralises some nouns</li>
        </ul>
    </li>
</ul>

<h3>On endonyms</h3>

There are many ways to write Gaelic endonymically. When speaking it I say
something like <span class=ipa>[geːlɪc]</span> or <span
class=ipa>[keːlɪc]</span>, like the Ulster speaker recorded <a
href=https://www.teanglann.ie/en/fuaim/gaeilge>here</a>. This would also
reflect the pronunciation of some traditional speakers from Argyll.

<br><br>
Historically in Ireland I have seen this written <i>Gaedhilg</i> or
<i>Gaedhilc</i> (epenthesis is triggered between the l and g/c). <i>An
Caighdeán Oifigiúil</i> would have me write this as <i>Gaeilge</i>, even though
this would represent the genitive case for me. Following the <i>An
Caighdeán</i> rule of removing phonetically redundant "dh" occurrences, you
could write my pronunciation as <i>Gaeilg</i>. Some Ulster speakers choose to
write <i>Gaeilic</i> though I don't think it has a historical basis. I am still
deciding what I would like to write day-to-day. For the purposes of this blog
post I have used a more traditional spelling <i>Gaedhilg</i>, as it seemed appropriate to choose a spelling that was closer to the standard <i>Gàidhlig</i> in Scotland. Sadly this is further from the Manx <i>Gaelg</i>.

</details>

## Thoughts on each word

### <i>Frog</i>: taboo-avoidance? {#frog}

<img src="../images/froganna/frog.svg" alt="a drawing of a frog's silhouette in
a doorway, casting a long shadow. A St. Bridget's Cross hangs over the
doorway" style="max-height: 500px;">

<span class=frog-intro><i>I found this in places all over Ireland, but not at
all in Scotland[^fròg]
 Of the 49 LASID locations in Ireland that gave a response for "frog", 34 gave
 a variation on this word. Anecdotally it is the most common word used in Irish
 today. It is the only word I found native attestations of on The Isle of
 Man.</i></span>

Could the usage of a foreign loan word, from English, be due to a taboo, where
it was feared saying the creatures' true name would summon them? Christopher
Lewin, a Manx scholar, kindly corresponded with me about Manx words for frogs,
and he suggested the possibility of this taboo.

My teacher Dubhán Ó Longáin pointed out the belief that frogs entering the home
is an omen of death, which would support this taboo idea. Ireland's National
Folklore Collection would seem to support this as a widely held belief, if not
universal: a sample of 52 "frog omens" (exclusively frogs entering the house or
crossing your path on the road) showed only 8 that signalled good luck, and 2
that signalled marriage or childbirth; the remaining 80% signalled death
or bad luck[^omens].

It's of course quite possible that an English loan came to replace a native
word through language contact, without any word-specific pressure, but I don't
know of any other name for an animal that has changed in this way. Some force
must have caused a shift &mdash; that is, unless "frog" was actually the first
word many Gaels heard used for the creatures.

I learnt during this research was that it is a common belief
that frogs did not exist in Ireland until the Anglo-Norman invasion in the 12th
century, or perhaps when students of Trinity College brought some over in the
17th century[^scharff], or that William of Orange is responsible for their
introduction[^orange], or that they first arrived in County Down in the 18th
century[^down]. An account from Gerard of Wales of a frog being found in Waterford
sometime in the 1170s or 1180s[^gerard-date] speaks of fascination and consternation when
the creature is presented at court[^topographia]:

> [...] a frog was found, within my time, in the grassy meadows near
Waterford, and brought to court alive before Robert Poer, who was at that
time warden there, and many others, both English and Irish. And when
numbers of both nations, and particularly the Irish, had beheld it with
great astonishment, at last Duvenold[^king], 58th King of Ossory, a man of sense
among his people, and faithful, who happened to be present, beating his
head, and having deep grief at heart, spoke thus:—<br><br><b>“That reptile is the
bearer of doleful news to Ireland.”</b><br><br> And uttering a sort of prognostic,
he further said, that it portended, without doubt, the coming of the
English, their threatened conquest, and the subjugation of his own nation.

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

The idea of much of Ireland having no word for frog that predates Middle
English is not especially attractive to me. Returning our first
idea, of taboo: Gerard of Wales' account above certainly
gives an early example of frogs being treated as a bad omen. Dubourdieu (1802)
conveys similarly fearful local attitudes in county Down:

<blockquote>
    [...] there are many stories still
    current of the terror and surprise excited by the view of this
    disgusting though innocent animal, which seems formed to be the prey
    of every voracious creature, either by land or water, within whose
    reach it comes.
</blockquote>

It is tempting to make the conjecture that the complete lack of usage of
<i>frog</i> in Scotland is because they are not a bad omen there, thereby
supporting the idea that the word is used as a taboo substitute in Ireland,
where there is evidence of negative superstition.  This is not something I am
able to substantiate. The <a
href=https://www.calum-maclean-project.celtscot.ed.ac.uk/home/>Calum Maclean
Project</a> provides digital access to over 13 000 manuscript pages of Gaelic
folklore collected across Scotland's Highlands and Islands &mdash; no
particular lore about frogs is available, only an amusing story about a Uist
man seeing one for the first time and thinking it was a fairy. Could the lack
of discussion of frogs implicitly suggest that there was not much lore to
record about them, and hence no negative associations? Perhaps; but Scotland
has plenty of descriptive words for frogs that could easily be taboo
substitutes themselves. Similarly the only lore I've been able to find about
frogs on The Isle of Man, where <i>frog</i> was used, is the seemingly
pan-Gaelic belief that licking a frog might cure you of many ailments (Clague,
1911)[^licking].

The truth will remain ambiguous, but personally, I find the idea of "frog" being used euphemistically quite
compelling. One of the words explored below, <i>lisbín</i>, could be explained by
taboo deformation from <i>losgann</i>. Various phonetically
intermediate forms are attested, supporting the idea of it being akin to a
"minced oath". Perhaps <i>losgann</i> was the taboo word everyone was trying to
avoid.

### <i>Losgann</i>: the peat bog's answer to mythical fire beasts? {#losgann}

<img
src="../images/froganna/losgann.svg"
alt="A line drawing of a
    frog sitting in front of a fire in an open hearth. The frog has its
    back to the viewer, and there is a pot hanging above the fire."
style="max-height: 600px;">

<span class=frog-intro><i>I found this across some of Ireland and Scotland, especially in Argyll. Only
three LASID returns gave this word, two of which were in Argyll, and one in
Mayo. Three of the four instances in the Schools' Collection are in
Donegal.</i></span>

Macbain (1911) suggests that this word is related to
<a href=https://en.wiktionary.org/wiki/loisc><i>loisc</i></a>
meaning to burn[^leprosy],
referring to the sting from touching the secretions of the frog's skin.

<img src="../images/froganna/losgann.png" alt="Proposed etymology for
loscann. Text reads 'losgann, a toad, Ir. loscain, E. Ir. loscann; from
losg above, so named from the acrid secretions of its skin.'">

However...I don't believe touching a common frog causes any stinging sensation,
does it? Toads do secrete a <i>bufotoxin</i>, which can cause an allergic
reaction on contact, but is mostly dangerous when ingested.

I have a perhaps more compelling idea: The Electronic Dictionary of the Irish
Language entry for <a href=https://dil.ie/30711><i>loscann</i></a> directed me to
<a href=https://deriv.nls.uk/dcn23/8177/81776163.23.pdf>O'Clery's
Irish Glossary</a> from 1643:

<img src="../images/froganna/salamander.png" alt="Text reads: \"LOISGIONN
.i. snasán '[a salamander]'. oir loisgthear é, ⁊ cú cnámha ainm
eile dó 'because it is burnt [loisgthear] and cú cnámha is another
name for it'.\"">

The notes say the salamander is called <i>loisgionn</i> "because it is burnt"
&mdash; salamanders are known to nest in firewood, and in mythology are
associated with fire. Dinneen's dictionary also
<a href=https://archive.org/details/foclirgaeilgeagu00dinn/page/443>lists</a>
"salamander" as a possible translation of <i>loisceann</i>.

The eDIL also cites the use of <i>losguinn</i> to refer to a dragon in 14th
century manuscript <i>Leabhar Méig Shamhradháin</i> (McKenna, 1947)[^dragon].

Is the humble frog the peat bog's answer to mythical fire beasts of
old? It would seem plausible that <i>losgann</i> evolved from referring to
dragons and salamanders to the closest creature Ireland has to offer: the frog
(though arguably the newt is a more obvious descendant).

An alternative hypothesis stems from the discovery that the word "salamander"
has historically been used for crickets and
grasshoppers[^cricket].
Crickets are attracted to warmth, and historically have been associated with
the hearth.
Could the evolution instead be (association with fire) -> crickets ->
(association with jumping) -> frogs?[^synonyms]

An etymology related to the frog's jumping would certainly be less unusual than
one directly related to salamanders and dragons. Marstrander (1908)
explores possibilities for the etymology of <i>losgann</i> and
divides Indo-European languages' words for frogs and toads into categories,
named for their:
<ol>
    <li>croaking (Latin <i>rana</i>, Latvian <i>var̂de</i>)</li>
    <li>skin (shiny for frogs, bumpy for toads) (Sanskrit <i>maṇḍū́ka</i> is
            given as being from root <i>maṇḍá</i> meaning scum or cream. Not
            the most convincing...)</li>
    <li>distinctive hands (French <i>crapaud</i> for toad)</li>
    <li>way of moving (jumping for frogs, crawling for toads)</li>
</ol>

Marstrander complains that a proposed etymology for <i>losgann</i> to do with
burning seems unlikely due to its uniqueness among other Indo-European
language's words for frogs. Perhaps the missing piece he needed was the
crickets.

#### losgann lathaighe, luascán lathaighe, loscán laithighe, ⁊c.

An enjoyable variant of this word, that I found primarily in Mayo and
Galway, is <i>losgann lathaighe</i> (modern spelling <i>lathaí</i>), which I
will choose to translate as "mud salamander".

#### East Sutherland's <i>losgaid</i>
An interesting variant found in Embo in East Sutherland is <i>losgaid</i> <span
class=ipa>[ɫosɡidʹ]</span>. Noticeably similar is the usage of <i>iosgaid</i>
in place of <i>easgann</i> for eel, recorded in Dorian (1978).

#### On spelling variations
I have addressed <i>losgann</i> vs. <i>loscann</i> in my general orthography
notes. These spellings both reflect a pronounciation of something like
<span class=ipa>/ˈl̪ˠɔsˠkən̪ˠ/</span>, where the first vowel may vary. The
spelling <i>loscán</i> reflects a pronunciation found in Connacht where the
final consonant is lenis and the final vowel is clear: <span
class=ipa>/ˈl̪ˠosˠkɑːnˠ/</span>.

### <i>Lisbín</i>: taboo deformation of <i>losgann</i>? {#lisbín}

<img src="../images/froganna/lisbín.svg" alt="A frog floating in water
with his head just above the surface, with a rippled reflection below him.">

<span class=frog-intro><i>This word and its variants had only a handful of attestations, all in
Ireland, with no
obvious geographical centre. Usages were found in Kerry (1), Galway (1), Mayo
(1) and Donegal (3).</i></span>

This word, most commonly spelt <i>lispín</i> in the examples I found, isn't in
Ó Dónaill's dictionary. A schoolchild in Listowel, County Kerry
<a href=https://www.duchas.ie/en/cbes/4613715/4611694/4660320>defines</a> it as
meaning "frog or lizard". Dinneen (1904) lists this word as being found in
Sligo, and meaning "frog".

The etymology seemed opaque to me initially. It would appear to be a diminutive
of <i>lisp</i> or <i>liosp</i> (the suffix <i>-ín</i> slenderises the final
consonants), but this line of enquiry didn't lead anywhere.

<a href=https://www.daltai.com/discus/messages/12465/11517.html?1048156283>This
speaker from Donegal</i></a> uses it for a type of fish, and suggests it might be
related to <i>losgann</i>. If this is the case, I'd expect to be able to find
some intermediate forms. Fanad's Father Mac Giolla Ceara uses <i>liospán</i>
for "frog" in <i>Ceachta as Leabhar na Cruinne</i>[^liospán].  Ó Dónaill's dictionary
<i>does</i> list <a href=https://www.teanglann.ie/en/fgb/liosp%C3%A1n>this
spelling</a> as a variant of <i>loscann</i>!

Similarly, in The Schools' Collection I found a
<a
href=https://www.duchas.ie/en/cbes/4428280/4391740/4478383>usage</a>[^granny]
of <i>luspán</i>, referring to some kind of small creature found by a
turf bank. Whether it refers to a frog is ambiguous, but to me it seems the
most likely candidate.  Apart from the quality of the initial consonant and
possibly the first vowel, <i>luspán</i> would likely match the pronunciation
indicated by <i>liospán</i>.

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
though of course they could. In the above section on the word <a
href=#frog>"frog"</a>, I
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
    are evolutions of </i>loscann<i> to </i>lispín<i>. A </i>síneadh fada<i> on an
    unstressed syllable taken to mean a clear short vowel, as in my experience
    in Donegal. Some further phonetically intermediate stages would be
    grammatically restricted, e.g. </i>liospáin<i> would be a declension of
    </i>liospán<i>.</i></figcaption>
</figure>

If this word is indeed a phonetic variation on <i>losgann</i>, then the fact
it is also used for lizards might give credence to the idea that the word comes
directly from salamanders, rather than indirectly via crickets (see above
section on <a href=#losgann><i>losgann</i></a>).

#### lisbín locha
A variant I found a single example of, in Mayo, was
<a href=www.duchas.ie/en/cbes/4427846/4350083/4443127><i>lisbín locha</i></a>,
which we might translate as "loch salamander". The schoolchild actually
wrote <i>lisbín lacha</i>, which I don't think makes grammatical sense
(<i>lacha</i> is the nominative case of the word meaning "duck", but the
genitive would be needed here. An association with ducks (the animals) makes a
lot less sense than with bodies of water). So I assume this was a spelling
error on the child's part.

#### Other usages

<ul>
<li><a href=http://corpas.ria.ie/index.php?fsg_function=3&fsg_id=1580>An Irish
     telling of The Princess and the Frog</a></li>
<li><a href=https://irishplayography.com/play?playid=32411>A character in a play</a></li>
<li><a href=https://maps.app.goo.gl/XHXXoNvcCagYGRGf7>Possibly in the name
  of this beach</a>, written <i>i nGaedhilg</i> <a
  href=https://www.rte.ie/news/nuacht/2022/0126/1275968-leanbh-fear-og-maraithe-i-dtimpisti/>in
             this news article</a> as <i>Trá Lispín</i></li>
<li>In <a
href=https://archive.org/details/manwhoinventedsi0000ofao/page/n5/mode/2up><i>The Man Who Invented Sin</i></a> by Seán O'Faoláin</li>
</ul>

### <i>Sonasan</i>: an etymylogical outlier? {#sonasan}

<img src="../images/froganna/sonasan.svg" alt="A smiling frog next to
a daisy">

<span class=frog-intro><i>I found this word in two places in Wester Ross. It is also stated to be used
in nearby Skye in Forbes (1905).</i></span>

In Robertson (1900) p. 364 <i>sonasan</i> is described as specifically
referring to "the young frog when it has passed the tadpole stage".

At first glance this word appears to mean "joys" (<i>sonas</i> + <i>-an</i>;
the suffix <i>-an</i> forms the nominative plural for some nouns in
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

The suffix <i>-an</i> is also used diminutively (c.f. <i>-án</i> in Ireland).
The plural is recorded as <i>sonasánan</i> <span class=ipa>[sɔ᷉nəsɑnən]</span>,
<span class=ipa>[sɔ᷉nəsɑnː]</span> in Wentworth (1993). So it would seem
that frogs are being referred to as "wee joys", or "joyful things".

Referring to a frog as a "wee joy", while delightful, seemed unexpected to me.
Superficially <i>sonasan</i> reminds me of <i>snasán</i>, listed above as a
synonym for <i>loisgionn</i> (see section on <a
        href=#losgann><i>losgann</i></a>). This word refers
to polish, stemming from the word <i>snas</i> for cutting or chipping, perhaps
because of the process of making shellac involves scraping a resin secreted by
bugs from tree bark, melting it into a sheet, then breaking that into small
chips. I have no suggestion for how this might be related to frogs or crickets,
and no justification for why the vowel might have been inserted to create
<i>sonasan</i>. The knowledge that <a
href=https://www.duchas.ie/en/cbe/9000894/7260368/9085160>burnt frog
innards</a> were once used for polish seems like a red herring.

Perhaps we can take this word at face value: as describing the joyful motion of
the leaping frog.

<!---
https://x.com/Gaeilgebheo/status/1762187597361594503
https://dasg.ac.uk/fieldwork/view/QWxsaWdpbkpNYWNEb25hbGRzbGlwc3xzb25hc2FufGlkcDExNzkzOTYxNnx8ZnJvZ3xyMzZ8fHxhbGw=
https://dasg.ac.uk/fieldwork/view/SW52ZXJuZXNzS01hY1JhZXNsaXBzfHNvbmFzYW58aWRwMTE1NzUyNjE2fHxmcm9nfHIzN3x8fGFsbA==
--->

### <i>Fliuchán</i>: a lost word from Derry {#fliuchán}

<img src="../images/froganna/fliuchán.svg" alt="A frog seeks shelter
from rain under a toadstool. Drops of rain are seen splashing off the toadstool
and the frog's unsheltered back (his head is under the toadstool).">

<span class=frog-intro><i>This word is reported as once having been found in
County Derry</i></span>

By the time of the LASID in the 1950s, the fieldworkers could find no
native speakers in Derry. However, a variety of secondary sources record the
word <i>fliuchán</i> as being used for "frog". I have not found the word used
with this meaning anywhere else.

<img src="../images/froganna/fliuchán.png"
alt="A newspaper clipping in Gaelic
type with title 'FROG' and body
'A chara, I gCondae Dhoire atá \"fliuchán\" ag
na Gaedhealaidh ar \"frog\". Ní ceart an beithidheach
beag bídeach sin a thabhairt as a ainm. Ní thig linn an Béarla a chur ar
leath-toabh ar fad, acht ní mór dúinn an Ghaedhilg a choinneál glan. Mise,
Cormac'"
title="A chara, I gCondae Dhoire atá 'fliuchán' ag
na Gaedhealaidh ar 'frog'. Ní ceart an beithidheach
beag bídeach sin a thabhairt as a ainm. Ní thig linn an Béarla a chur ar
leath-toabh ar fad, acht ní mór dúinn an Ghaedhilg a choinneál glan. Mise,
Cormac">

The word <i>fliuch</i> means wet, and correspondingly <i>fliuchán</i> means
"wet thing" or "wetness". In Kerry it is used to refer to rain, see Sjoestedt (1930), and <a
href=https://www.duchas.ie/en/cbes/4678384/4674363/4683533>this</a> example
in the Schools Collection. It is also used in <a
href=https://www.duchas.ie/en/cbes/4622961/4617138/4627097>this entry</a>
from Conamara to describe some kind of seafood that people long ago would
have eaten, listed alongside crabs, clams, and seaweed.

Sources where it used to mean frog:

<ul>
<li>Dinneen (1904) p. 320 "a frog (Der.)"
<li>Cormac (1909) (pictured above)
<li>Mac Meanman (1940): <i>Ceann aca sin an frog nó an fliuchán mar deirtear i
gcorr-áit ins an chúigeadh seo.</i></li>
<li>Mac Gréagóir (1908) (pictured below, not specifically attributed to Derry,
just Ulster)</li>
</ul>

Ciarán Ó Duibhín believes the 'Cormac' in <i>An Claidheamh Soluis</i> is Séamus
Ó Ceallaigh (1879-1954), whose father was from Draperstown and was raised with
Irish until he was 7 years old. More information is available at
<a href=https://www.ainm.ie/Bio.aspx?ID=57>ainm.ie</a> and in Whitfield (1994).

#### Fliuchán díge

In 1908
<a href=https://www3.smo.uhi.ac.uk/oduibhin/daoine/aoidhmin2.htm>Aoidhmín Mac Gréagóir</a>
published a series of articles in <i>An Claidheamh Soluis</i> titled
<i>Sean-Ranna Ultacha</i> (Eng. old verse of Ulster). A riddle is included:
<br><br>

<img src="../images/froganna/fliuchan-dige.png"
alt="A riddle in Gaelic type reading 'Léimeachan léimeachan os na gcloch, Léimeachan léimeachan go dtí an loch.  Freagra — Fliuchán díge.'"
title="Léimeachan léimeachan os na gcloch,
Léimeachan léimeachan go dtí an loch.
Freagra — Fliuchán díge.">

The riddle asks what jumps over rocks and jumps into the loch. The answer,
<i>fliuchán díge</i>, we can translate as "wet thing of the
ditch".

### <i>Leumachan</i> and <i>leumadair</i>: leaper {#leumachan}

<img src="../images/froganna/leumrachan.svg" alt="drawing of a frog mid-leap">

<span class=frog-intro><i>I found variants of </i>leumachan<i> in various parts of Scotland,
especially in West and North Sutherland. Dòrlach's fieldwork found
</i>leumadair<i> once in the North of Lewis, and The Schools' Collection
records it once in Mayo (as </i>léimeadóir<i>)</i>.</span>

The etymology of <i>leumachan</i> seems transparent: <i>leum</i> + <i>ach</i> + <i>an</i>
= (wee) jumping thing. Similarly for <i>leumadair</i>, though without any
possible diminutive reading. <i>Leumadair</i> is also used for other leaping
animals, sometimes with qualifiers: Dòrlach's fieldwork in Scotland found
<i>leumadair-fèoir</i> ("grass jumper") for grasshopper, which is also found
in the 1819 Manx bible as <i>lheimydyr-faiyr</i>.  <i>Leumadair-mara</i> (sea
jumper) is often cited as a word for dolphins (TODO citation)[^welsh-leum].

It is possible that <i>leumachan</i> was also used
by native Manx speakers, as it is given in Fargher (1969),
rendered <i>lheimaghan</i>. It is likely this was a neologism introduced by
Fargher, however. I couldn't find any native corroboration. Fargher's work is
discussed further in the <a href=#other-words>section</a> on words not included in the map.

#### Variations
Several variations of <i>leumachan</i> came up, in fact far more commonly than
plain <i>leumachan</i>:

<ul>
<li><i>leumrachan</i>, Carloway on Lewis</li>
<li><i>leumbrochan</i>, Clashnessie, also on Lewis</li>
<li><i>leumbhrochan</i>, Achiltibuie near Ullapool</li>
<li><i>leumnachan</i>, Drumbuie, Lochalsh</li>
</ul>

Indeed, the word <i>léimneach</i> seems more common in Ireland than
<i>léimeach</i>. How come?

In Robertson (1900), <i>leumrachan</i> is explained as coming about through
<i>dissimilation</i> from <i>leumachan</i>. This explanation does not make
sense to me. Dissimilation is a phonetic process where sounds change to make
them more distinct from surrounding sounds, or where sounds that are too
similar to others within a word are removed. There are various proposed reasons
for this, but generally it seems to be done to make a word easier to say, or
more pleasing to the ear. Gaelic examples of this given by others:
<i>dealagán</i> for <i>gealagán</i> ("egg white", Quiggin, 1906),
<i>caoláire</i> for <i>caol sháile</i>
(<a href=https://www.logainm.ie/en/1165628>logainm.ie</a>). In English
a common example is rhotic speakers pronouncing "berserk" as "beserk".

Perhaps it is lack of knowledge on my part, but I don't see how
the insertion of /n/ or /r/ here can be explained by dissimilation.
Certainly the substitution of /r/ for /n/, as in pronunciations of
<i>mná</i> (e.g. <span class=ipa>/mˠɾˠãː/</span>) found in most places except
Munster, seems well-described by dissimilation. But the insertion of nasal /n/
after nasal /m/ does not seem well-described by this.

What if <i>leumnachan</i> (and thereby <i>leumrachan</i> &c. by dissimilation)
could be explained by <i>leumnach</i> being formed from the plural? The Old Gaelic
nominative plural <i>léimmen</i> gave rise to <i>léimanna</i> in Ireland and
<i>leuman</i> in Scotland. The eDIL
records the old spellings of <i>lémennach</i> and <i>leminnach</i>. Could these
reflect the suffixation of <i>léimmen</i>? Beyond the example old spellings, I don't have much to support this &mdash;
except that there are other examples of <i>-ach</i> suffixation that are made
from the plural: <i>aidhmeannach</i> ("designing; ambitious", from "aims,
purposes"), <i>greamannach</i> ("biting, inclined to bite; sticky" from
"grips (n.); bites (n.)"). Perhaps the plural here conveyed repeated jumping.
I find this a more satisfying explanation than the dissimilation
above.

### <i>Crónán</i> and <i>cnádán</i>: for the frog's sweet song {#crónán}

<img src="../images/froganna/crónan.svg" alt="A drawing of frog with an expanded vocal
sac, with some musical notes to indicate he is croaking">

<span class=frog-intro><i>Both of these words seem rare, at least for referring to frogs.
</i>Crónán<i> came up twice in West Donegal, and once in the Fews in Armagh.
</i>Cnádán<i> was found once each in Waterford and Cork, and is also listed in
some old dictionaries and referred to in articles from the late 1800s. Modern
sources often cite </i>cnádán<i> as referring to the Natterjack Toad. Cnádán is
one of the words used in an <a
href=https://archive.org/details/bioblanaomhthaan00bede/page/58/mode/2up>1817
edition</a> of the bible[^cnádán-bible]. See <a href=#bibles>bible appendix</a> for more information.</i></span>

#### Crónán: hummer
Both of these words refer to the frog's croaking. The first, <i>crónán</i> is
translated in Hamilton (1974) as "purring", "humming", and beyond the frog's
croak is also used for other low pitched relatively white sounds:

<ul>
<li>for a cat's purring, see the <i>sean-cainnt</i>
<a href=https://www.duchas.ie/en/cbes/4427991/4365534/4468264>collected</a>
several times in the Schools' Collection: <i>Is ar mhaithe leis fhéin a
dheineann an cat crónán</i> "the cat purrs for himself", the significance of
which I have seen explained in several diverging ways</li>
<br>

<li>for the sound of a babbling brook (Sinclair, 1879, p. 320): <i>Aig an allt' tha crònan fann/Air a'
ghaoith tha fàile cùbhraidh</i>, from a song collected from Argyll-born bard
Eanraig MacIlleBhàin
</li>
<br>

<li>for the sound of waves crashing onto the shore (Sinclair, 1879, p. 223):
<i>An tonn ri crònan air cladach còmhnard</i>, from a song collected from Iain
Caimbeul, Bàrd na Leidige.</li>
</ul>

Slightly less congruous is its use for birdsong (Sinclair, 1879, p. 291),
though I suppose this too can be a pleasant background noise.

A variant <a href=https://www.duchas.ie/en/cbes/4428321/4394634>recorded</a> in
Donegal and in The Fews (Dunbar, 2025) is <i>crónán díge</i>, which we might
translate as "ditch hummer" (ditches often collect water, creating a lovely
froggy habitat).

What of the etymology of this word? The English word "croon" is <a
href=https://en.wiktionary.org/wiki/croon>thought</a> to
derive from Middle Dutch <a
href=https://en.wiktionary.org/wiki/cronen#Middle_Dutch>crônen</a>, which
certainly matches phonetically and loosely in terms of meaning. Perhaps the
word was borrowed directly from there, or from Middle English, or from the
modern form "croon". Regardless, perhaps we can revise our earlier translation of <i>crónán díge</i> to "ditch crooner" for a more romantic vision.

#### Cnádán: croaker
This word seems to most commonly have been used for the plant burdock, see various
<a href=https://www.duchas.ie/en/cbes/4427936/4358938/4454815>sources</a> in
The Schools' Collection, and again Hamilton (1974).
<br><br>
Its usage for frogs seems to be onomatopoeic. The Scottish <i>cnàg</i> <span
class=ipa>/kʰɾ̃ãːk/</span> and <i>gnàg</i> <span class=ipa>/kɾ̃ãːk/</span> for
the frog's cry are notably similar. It is recorded
<a href=https://www.duchas.ie/en/cbes/5008809/4958019/5055398?HighlightText=cnadan>several</a>
<a href=https://www.duchas.ie/en/cbes/5009102/4986861/5121908>times</a> in the The
Schools' Collection as a pejorative for someone who moans or is cranky, and <a
href=https://www.duchas.ie/en/cbes/5009102/4986864/5121908>translated</a> in this sense as "a croaker".

When I did first understand this word to be likely onomatopoeic, I wondered if
this would only be the case in places where it is pronounced to begin with
<span class=ipa>/kɾˠ/</span> (further north in Ireland) rather than <span
class=ipa>/knˠ/</span> (further south in Ireland).
To me, this was all that would make sense in terms of onomatopoeia.  However,
the only places I found it recorded were firmly in the south of the island: the
LASID records <span class=ipa>[knɑũˈdɑːn]</span> in Waterford. I think this
just serves to illustrate how arbitrary onomatopoeia can be, easily
demonstrated by comparing animal sounds across languages.

#### Our two singers in unison
<a href=https://www.duchas.ie/en/cbes/4428116/4379731/4468703>Signs of
rain</a>:

<blockquote><i>Nuair aireóchtha na froganna ag crónán agus ag cnádán.</i><br>"When
you hear the frogs crooning and croaking."</blockquote>


### <i>Gille-cràigean</i>, <i>cràigean</i>, and <i>cròigean</i>: well-pawed lads {#cràigean}

<img src="../images/froganna/cráigean.svg">

<span class=frog-intro>Gille-cràigean<i> was recorded a few times around Ardnamurchan and on Lismore,
and usage of </i>cràigean<i> then stretches in an unbroken (in the data I
have gathered) band running northeast across Scotland to
Strathspey, where </i>cròigean<i> is found.</i></span>

These words appear to refer to the frog's "hands". Dwelly's dictionary defines
<i>cràg</i> and <i>cròg</i> primarily as "large or clumsy hand", with various
other hand or paw definitions given also. Macbain (1911) derives <i>cràigean</i>
from these words, translating it as "well-pawed one". The addition of
<i>gille</i> makes it "well-pawed lad".

I've seen it <a
href=https://x.com/guthan_g/status/637694618478489600>suggested</a> that this
word is instead derived from <i>cnag</i> <span class=ipa>/kʰɾãk/</span>, which
Dwelly defines as "pin; peg; knob". Presumably this would describe the frog as
a wee lump. This seems less likely to me, both from the meaning, and due to the
fact that <i>cràigean</i> has a long vowel (e.g. <span
class=ipa>[kɾɑ:ɡʹɑ̃ṉ]</span> is recorded in Badenoch) as in <i>crág</i>,
and is also found as <i>cròigean</i>, reflecting the variants <i>cràg</i>
and <i>cròg</i>.

### <i>Màgan</i>, <i>mial-mhàgain</i> and <i>laprachán</i>; <i>lapadán</i> and <i>lapadóir</i>: crawlers and paddlers {#màgan}
<img src="../images/froganna/magan.svg", alt="drawing of frog crawling"
style="max-height: 600px;">

<span class=frog-intro><i>All three Nova Scotia datapoints record </i>màgan<i> for frog. In Scotland
it is more common for this to mean toad. However, its
variant </i>mial-mhàgain<i> is popular in Scotland for frog, particularly on
Skye and Raasay.

In Ireland, </i>laprachán<i> or </i>laprachán lathái<i> was found once in
Waterford, and a few times in Galway. </i>Lapadán<i> had one example each in
Galway and Monaghan, </i>lapadóir<i> one in Mayo, and </i>lapadóir lathaí<i>
one in Galway.</i></span>

I have grouped these words together partly to reduce my illustration burden,
but also because they all (like <i>cràigean</i> above) seem to reference the
frog's "hands" in some way, and perhaps (unlike <i>cràigean</i>) specifically movement via these "hands".

#### <i>Màgan</i> and <i>mial-mhàgain</i>

Dwelly's dictionary <i>màg</i> as "paw; claw; ludicrous term for
the hand", and "seal's paw (Argyll)".
<i>Màigean</i> is given as "Fat little man; child
beginning to walk; toad; frog; ludicrous term for a man with a creeping or
sprawling gait, or moving on all fours." MacBain (1911) suggests this term for
toads should properly be <i>mial-mhàgain</i>, meaning "squat beast".
<br><br>
Certainly there seems to be a strong association with crawling here, hence to
me this word would evoke toads more than frogs. Nevertheless, variants of
<i>mial-mhàgain</i> appear popular for frogs. On Skye and Raasay this is
often rendered <i>mula-mhàgag</i>. In Robertson (1898), this is analysed as
epenthesis, noting other examples of vowel insertion like
<i>seana-mhathair</i> instead of <i>sean-mhathair</i> for grandmother.
Epenthesis between liquid consonants (l, n, r) followed by certain other
consonants is widespread, but the rules that govern it do vary.  Compare the
various Irish pronounciations of <i>seanmháthair</i> <a
href=https://www.teanglann.ie/en/fuaim/seanmh%c3%a1thair>here</a>.

Is the usage of a term associated with crawling because frogs and toads were
undistinguished in some places, or the words got confused? MacBain's
translation of "squat beast" certainly suits frogs well, see also the section
on <a href=#crúbán><i>crúbán claidhe</i></a>. It's possible these terms take their meaning from the
squatting, rather than movement in that position.

#### <i>Laprachán</i>, <i>lapadán</i> and <i>lapadóir</i>

While <i>màgan</i> and its variants stem from the word <i>màg</i>, these
words stem from the word <i>lapa</i>. Relevant extracts from Dinneen's
dictionary, pp. 419-210:

<ul>
<li><i>lapa</i>: a paw, the fist</li>
<li><i>lapach</i>: a swamp, a marsh</li>
<li><i>lapadán</i>: a kind of sea-fish; also a bird called "diver"; a small
inactive person (Donegal); a clumsy person</li>
<li><i>lapáil</i>: act of using the paws, pawing; of a frog swimming
(Connacht)</li>
<li>lapaire</i>: one that paws or pads with the hand</li>
<li>laparnach</i>: a wading through water etc.; pawing or handling soft mud
etc.</li>
</ul>

Ó Dónaill's dictionary lists <i>laparnach</i> as a variant of
<i>slaparnach</i>, meaning the act or sound of splashing water. This would seem
to be imitative. The varying use of initial "s" reminds me of variant
"plash" for "splash" in English. This would explain the seemingly incongruous
use of <i>lapach</i> to mean "marsh": as a description of the sound made while
walking through it. Ó Dónaill lists <i>slaprach</i> as "wet, soggy land".

In The Schools' Collection, <i>lapa</i> is used to refer to a goose's <a
href=https://www.duchas.ie/en/cbes/4921952/4912854/4947435>webbed</a> <a
href=https://www.duchas.ie/en/cbes/4706359/4706073/4725828>feet</a>, and also
seemingly a <a
href=https://www.duchas.ie/en/cbes/4921874/4897822/5184841>severed human
hand</a>.  I haven't been able to find any suggested etymologies for it. I
wonder if there are two etymologies at play here, one associated with splashing
and another with hands. I expect they are one and the same, with the hand being
the splashing implement.

### <i>Crúbán claidhe</i>: what do frogs have to do with crabs? {#crúbán}

<img src="../images/froganna/crubán-claidhe.svg">

<span class=frog-intro><i>This word was found twice, both times on the Curraun
Peninsula, east of Achill Island in Mayo.</i></span>

This seemingly very local term might be translated as "dyke beastie", with
dyke meaning dry-stone wall ("dry stone wall beastie" doesn't have the
same ring to it, and it is common to call them dykes in Scotland, where
I am from).

<figure>
<img src="../images/froganna/claidhe.png" alt="Excerpt from The Irish of
Achill showing meaning of claidhe as stone fence">
<img src="../images/froganna/crúbán-claidhe.png" alt="Excerpt from The Irish
of Achill showing meaning of crúbán claidhe as frog">
<figcaption><i>Excerpts from Stockman (1974).
In some other places </i>claidhe<i> is used to mean "ditch"</i>.</figcaption>
</figure>

The word <i>crúbán</i> would appear to refer to an animal with some kind of
notable hands; <i>crúb</i> is listed in Dinneen's dictionary as meaning "a
claw, a hoof, or paw". The descriptive bounds of these words will of course
vary between individuals, but I would personally not use any of these words to
refer to a frog's..."hands". Perhaps <i>crúb</i> can be used for any non-human limb
appendage. The diminutive <i>crúibín</i> has been borrowed into English to
refer to pig trotters as food (to me, a distinctively large food, but
nevertheless...).

<i>Crúbán</i> is hard to find written Irish attestations of.
<a href=https://www.duchas.ie/en/cbes/4428052/4372722>Here</a> it is used in
the name for a plant shaped like a hare's paw. It is also listed in Ó
Dónaill's dictionary as referring to a "short potato-ridge at angle to main
ridge", probably describing its shape as similar to some kind of foot. In Dinneen's dictionary it is
defined as <a href=https://en.wiktionary.org/wiki/crabfish>"crabfish"</a>, an
archaic term for crab[^crabfish].
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
Collection</a>. Jura and Colonsay taken from Scouller (2018).</i>
</figcaption>
</figure>

Given the geographical distribution of <i>crúb-</i> words for crabs, I do wonder if the strikingly similar Scottish word <i>crùb</i> might be
related, which Macbain (1911) gives
as being derived from Norse <i>krjúpa</i> and cognate with English "creep",
meaning "to squat, crouch". That certainly fits a frog's resting pose extremely
well, and arguably a crab's. If <i>crúbán</i> does refer to the crab's claws,
would we expect to hear the crab's claw referred to as <i>crúb</i> in the
places that use this term for crabs? On Islay a crab's claw is recorded as
<a
href=https://dasg.ac.uk/fieldwork/view/UG9ydFdlbXlzc0pNYWNBcnRodXJzbGlwc3xsYWRoYXJ8aWRwMTE1NzYyNTEyfHxjcmFifHI1Mnx8fGFsbA==><i>ladhar</i></a>,
on Lewis as <a
href=https://dasg.ac.uk/fieldwork/view/Q3Jvd2xpc3RhQ2FuZFBNYWNEb25hbGRtaXNjMXxpb25nbmF8aWRtMzU0NjMzMDR8fGNyYWJ8cjUxfHx8YWxs><i>iongna</i></a>.

Perhaps there's been some sort of merging in Ireland of Celtic-origin
<i>crobh</i>
(Scottish <i>crubh</i>, meaning: hoof, clawed foot, etc.) with Norse-origin
<i>crúb</i>, perhaps explaining how on Rathlin <i>crúbán</i> is recorded as
meaning "crab", but is also used in a local telling of Cinderella (Mac
Gréagóir, 1910) to mean
something entirely different that is translated as "pig foot" by Sam Henry
(Henry, 1939)[^rathlin]. Unfortunately the Rathlin informants gave no word for
pig's feet in the LASID to compare against.

I will elect to officially update my translation to "dyke squatter".

### <i>Breallach lathaí</i>: a crude comparison? Rated PG {#breallach}
<img src="../images/froganna/breallach.svg" alt="a frog drawn to
recall Boticelli's The Birth of Venus. The frog is standing on a clam shell
with one hand on his breast and the other reaching down" style="max-height: 600px;">

<span class=frog-intro><i>This term was recorded three times in the LASID, all
in Galway.</i></span>

When I first looked up <i>breall</i> in the dictionary, I was met with a
surprise:

<img src="../images/froganna/breall-dict.png" alt="A screenshot of teanglann.ie
showing that <i>breall</i> means glans penis or clitoris">

<i>Breallach</i> is commonly used for clams. What do frogs, glandes, and clams
have in common? Well, they are all "fleshy" and share a certain shiny sliminess
to their opaque surface. I will note that open clams and mussels look like a vulva.

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

So, does <i>breallach</i> really refer to the frog's mucusy skin? Or is it an
insult to the frog, calling him a blemish on the bog? 
Perhaps the "protuberance" meaning could refer to the frog's
vocal sac, a suggestion from my teacher Dubhán Ó Longáin. Or perhaps it is just
calling the frog a wee knob. For now, the origin of this term will remain
mysterious.
</ul>

### <i>Lúbóg lathaí</i> and <i>lúbar lathaí</i>: for the frog's bendy legs? {#lúb}

<span class=frog-intro><i>Collectively I found three usages of these terms, all
in Galway.</i></span>

My best guess is that these <i>lúb-</i> words refer to the frog's bendy legs.
De Bhaldraithe (1945) shows usage of the verb <i>lúb</i> meaning "to bend", and
De Bhaldraithe (1985) shows usage for a purl stitch when knitting, the feeling
of a twist in one's intestines when scared, and the ability to bend joints. I
would translate <i>lúbóg lathaí</i> as "wee bent one of the mud". The variant
<i>lúbar</i> is a bit more mysterious to me, particularly as one of the
transcriptions from the LASID was <span class=ipa>[ˈlɑbər ˈlɑhiː]</span> which doesn't look like "ú"
at all. Another transcription of <span class=ipa>[Lu̢.bər ˈLɑhiː]</span> convinced me they are the same
word, and a derivation from <i>lúb</i> seems most likely. I'm not sure what
suffix has been applied; <i>-ar</i> doesn't represent any standard suffix I
know of. I considered <i>-óir</i> (wouldn't be <span class=ipa>ə</span>, would expect slender r),
<i>-aire</i> (what about the next syllable, and again would expect slender
r), <i>-ra</i> (collective suffix, have no
evidence of this metathesising), <i>-úr</i> (collective
 suffix, wouldn't expect <span class=ipa>ə</span>).

Not included on in the map data is <i>lúbán díge</i>, listed in O'Neill-Lane
(1917) as being found in Oriel (South Armagh, North Louth, South Monaghan,
North-West Meath, East Cavan). I couldn't find any other examples of this
usage. I would translate it as "bent one of the ditch".

### <i>Frús</i>: found only in the LASID. Another foreign loan? {#frús}

<span class=frog-intro><i>This word was only found once, in LASID point 37 in Carnmore,
Galway. It is corroborated as being used in Carnmore at LASID point 35. I could
find no written attestations.</i></span>

In imagining ways to write the LASID transcription <span
class=ipa>[frus]</span> (standard IPA <span class=ipa>[fɾˠusˠ]</span>), I tried
<i>fr[i][u, ú, o, ó, a, á]s</i> with various declensions, and the most likely
match I found was <i>fras</i> or <i>fros</i> used to mean a shower of rain.
This feels tenuous, although we do have the example of <i>fliuchán</i> above
for a frog word used for rain elsewhere.

More compelling to me is the idea that this might be another foreign loan,
 perhaps from
an earlier form of "frog". Wiktionary lists various forms in Middle English,
including <a
href=https://en.wiktionary.org/wiki/frosk#English><i>frosk</i></a>, <a
href=https://en.wiktionary.org/wiki/frossh#Middle_English><i>frossh</i></a> and
(most attractively) <a
href=https://en.wiktionary.org/wiki/fross#Middle_English><i>fross</i></a>.

### <i>Preabaire na lathaighe</i>: mud hopper {#preabaire}

<span class=frog-intro><i>I found only one <a
href=https://www.duchas.ie/en/cbes/4498088/4351276/4502478>attestation</a> of
this, in Mayo.</i></span>

Another jumping term is <i>preabaire na lathaighe</i>: "mud hopper", or "mud
bouncer". Other uses I found of <i>preabaire</i> in The Schools' Collection
appeared to refer to magpies: <a
href=https://www.duchas.ie/en/cbes/4922245/4863816/5020836>see this familiar
superstition</a> from Tipperary, and this <a
href=https://www.duchas.ie/en/cbes/4922329/4870637/5055991>riddle</a> from
Clare. Ó Dónaill's dictionary gives as <i>prebaire na mbánta</i>
as a possibility for magpie.

### <i>Athadán</i>: a lost word from Conamara? {#athadán}

<span class=frog-intro><i>I found only one written attestation of this word, and one phonetic in the
LASID, both in Conamara.</i></span>

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
Collection and the LASID[^riddle]. The version above is from a collection of
Conamara folklore (O'Fothartha, 1892). It is a longer version than the later
ones I have seen in the previously mentioned sources. I might inexpertly
translate it as:

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

The only other usage of this word I've been able to find is in the LASID. Point
35, South of Tuam, for some reason lists alternative words for "frog" from
different areas than the one at hand. A word from Conamara is given as <span
class=ipa>[ɑːdɑːn]</span>. I have read that intervocalic <span
class=ipa>/h/</span> is deleted in parts of Conamara, so this would appear to
be our word.

But what does it mean? Is it from <i>áth</i>,
meaning a shallow fordable part of a river? But frogs prefer
still water, so they and their spawn are not washed away. Is it from <i>athadh</i> for elopement (getting tenuous, but frogs
are always escaping off if you try to catch them)? "Oast" is given as a meaning
of <i>áth</i> in De Bhaldraithe (1945), which makes no sense to me at all
for frogs.

A mysterious word. I would love to hear from any Conamara speakers whether they
have heard this or use it.

### <i>Tortán</i>: clod? {#tortán}

<span class=frog-intro><i>I only found this in Ballyglooneen, LASID point 35, in Galway. The
similar </i>torpán<i> is listed in Dinneen's dictionary with "frog" as a
possible meaning.</i></span>

<i>Tortán</i> is listed in Ó Dónaill's dictionary as meaning "clump, tussock",
or "dumpy person". Similarly, <i>torpán</i> is listed as "(small) clump or
clod" or "roundish thing; lumpish person, pot-bellied person". Perhaps it is
used for frogs to compare them to clods of turf, or refer generically to small
lumps of creatures.

Interestingly, in the context of the <i>crúbán claidhe</i> term,
Dinneen's dictionary lists both "crab" and "frog" as possible translations of
<i>torpán</i>.

### <i>Ceanna-phiullan</i>: usually used for tadpoles {#ceann}

<span class=frog-intro><i>There was only one example of this being used for frogs, in Romasdal on
Skye. All other usages found were for tadpoles.</i></span>

I wonder if this might be better written <i>ceann a' phiullan</i>, or perhaps
more familiarly (to me) as <i>ceann a' phollain</i>. To me this would seem to clearly
mean "head of the small pool". Dwelly (1918) equates <i>pollan</i> to
<i>pollag</i>, defined primarily as <i>little pool, hole, pit,
or pond</i> (see also Macbain, 1911 who writes <i>ceann-phollag</i> or
<i>ceann-phollan</i> as words for tadpole).

A fun comparison is a dialectal American English word for tadpole:
<a href=https://en.wiktionary.org/wiki/polliwog#English>"polliwog"</a>.
Amusingly, the "poll" here means "head"! All together the word means "head
wiggle". In our Gaelic example we have "poll" to mean pool/pond, and another
word for head. Both would seem to refer to the tadpole as a little swimming
limbless head.

It's harder to make sense of this term applying to frogs. I can't help but
wonder if the fieldworker who recorded this made an error!

## Words not included in the map, and not discussed above {#other-words}

### <i>Rannag</i> on Man {#rannag}
The word <i>rannag</i> seems to be the most popular word for
"frog" among Manx revivalists, but I was unable to find any attestations from
native speakers. The earliest extant occurrence seems to be in Fargher (1969):

<blockquote>
The common frog [...] is
<u>rannag</u>, but this word became lost during the course of time
yet it was preserved in the place-name 'Poyll Ny Rannagyn' (pool
of the frogs). It is strange that this word is obviously connected with the
Latin name [<i>rana</i>].
</blockquote>

No other mention of the placename "Poyll Ny Rannagyn" seems to be found in
other texts. The admission that <i>rannag</i> had "become lost" suggests he had
never heard a native speaker use it. Doug Fargher, who was not a native
speaker, felt that the revitalisation of Manx required a revision of its
vocabulary (and grammar). This took the form of suggesting neologisms
"to meet modern needs" (Broderick, 2013)[^neologisms], and replacing "perceived
impurities or corruptions" used by native speakers with his own preferred words
(Lewin, 2017). The preface to Fargher's English-Manx dictonary states his
approach clearly (Fargher, 1979):

<blockquote>
The aim of this dictionary is purely practical. It is largely a prescriptive
work and not a descriptive one, that is to say, it does not aim to be a record
pure and simple of the language as it was spoken at any time during its
history, but tries to provide some sort of basic standard upon which to build
the modern Manx language of today and tomorrow, in order that those who feel
the need to express themselves in Manx may here find the necessary means to do
so.
</blockquote>

Although I take a more preservationist approach to my own Gaelic
learning, it is clear Fargher's work has played a significant part in the
revival of the language, which he dedicated much of his life to. See Lewin
(2016, 2017) for more exploration of Fargher's work's impact, context
and ideology.

Back to <i>rannag</i>. I admit my first instict was that Fargher might have
fabricated this word, but in the preface to his dictionary he openly admits he
"borrowed unashamedly from our Gaelic cousins" and "make[s] no apology
whatsoever for attempting to restore to the Manx language mutations, genders
and certain other characteristics of Gaelic which without doubt existed in
pre-literary and classical Manx but which had already disappeared before the
final demise of the native speakers"[^vandal]. Coyly commenting on the
strangeness of <i>rannag</i>'s Latin root for a word he fabricated would seem
to be at odds with this open approach.

In Lewin's work he uses "the term ‘Traditional Manx’ to refer to the now
extinct native variety deriving directly by intergenerational transmission from
earlier forms of Gaelic, and ‘Revived Manx’ for the variety spoken today,
predominantly as an L2 [second language]" (Lewin, 2017). The existence of the
latter is a joyous thing to me, but my work here on frogs is concerned with the
former, and in the absence of any evidence that the word "rannag" was ever used
in Traditional Manx, I have not included it in the map.

### <i>Uillichd</i> in Scotland {#uillichd}
A curious word I found only in Forbes (1905) is <i>uillichd</i> (it is also in
Dwelly, 1918, but sourced from Forbes). I believe this could have been
pronounced <span class=ipa>[ɯʎəçgʲ]</span> though of course this is unattested
as I have found no other use of this word! I believe <i>uillic</i> could have
the same pronounciation, but that would only suggest that frogs were called
some diminutive of "William", and the genitive at that (which does not make
sense to me grammatically). Perhaps this word is related to <i>ùill</i> for oil
or grease, referring to the frog's mucusy skin. That is the best suggestion I
have. I wish I could find other usages!

### <i>Cruitín díge</i> in Oriel {#cruitín}

Alongside <i>lúbán díge</i>, discussed <a href=#lúb>above</a>, O'Neill-Lane's dictionary lists
<i>cruitín díge</i> as a word found in Oriel in Ireland. As well as the meaning
of "harp, lyre", Dinneen gives the meanings of "a hump on the back, a little
eminence; summit". Various sources from Monaghan and Cavan in The School's
Collection list "hump" as the meaning. I suppose once again our froggy friend
is being description as a little lump. The use of <i>díge</i>, the genitive of
a word for "ditch", seems to have been common when referring to frogs in East Ulster.

<!---

## Given names for the frog in stories and riddles

Gille Criosda Mhic Dhughail

Séan Ó Lupáin

Mac I Shliopán

Mach Uí Stíopháin

Seid (cos of the expanding when croaking) https://archive.org/details/witchcraftsecon01campgoog

http://corpas.ria.ie/index.php?fsg_function=3&fsg_id=2344

> Adeir an sgrioptúir naomhtha gur chuir Dia pláighe iomdha
ar Pharaon ar son a pheacadh, agus idir gach pláigh do líon a
thalamh do fhroguibh (beathadhuigh allta róghránda nach fuil
'nar ttírne tré ghrásuibh Phádruig ar bpátrúin), iondus go
mbíodh a seomradh, a mbúird, agus a leabtha, lomlán dhíobh agus
nach bíodh an biadh nó an deoch do ibhdís saor uatha. Do
gheall Pharaon do Mhaoisi go léigfeadh pobal Dé uadha, .i.
clann Israel, do bhí fá dhaoirsi aige, dá saoradh é ó na froguibh
sin. Do ghlac Maoisi sin uadha agus do fhiafruigh dhé gá huair
búdh mian leis a ndíbeirt uadha.

> The Holy Scripture says that God sent many plagues upon Pharaoh for his sins,
> and between each plague his land was filled with frogs (a very rare animal
> that does not exist in our country through the graces of our
> patron Saint Patrick)

1618

--->

## Frogs in Gaelic bibles {#bibles}

<details>
<summary>Table of translations for "frog" in various Gaelic bibles 1602-1827</summary>

<br>
The words vary in grammatical case. I believe the <i>-ibh</i>
instances are dative plurals, and the rest nominative plurals.
The original Hebrew of Exodus
and Psalms uses the same word <a href=https://biblehub.com/hebrew/6854.htm>throughout</a> for "frog".
<br><br>

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

## Miscellaneous curiosities {#misc}

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


## Go rabh maith agaibh {#grma}

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

## Bibliography {#bibliography}

Sources only cited in the datapoints are either directly cited there, or are
listed in the introduction (e.g. the LASID). They are not listed here.

* Broderick, G. (2013). [<i>Neologisms in Revived Manx
  Gaelic</i>](https://journal.fi/scf/article/download/7663/14658/40703). Studia Celtica Fennica: 7–29.

* Cambrensis, G. (1863). [<i>The Topography of Ireland</i> (T. Forester, Trans.)
](https://www.yorku.ca/inpar/topography_ireland.pdf). London : H.G. Bohn
(Original work published c. 1188)

* Carmichael, A. (1928). [<i>Carmina
  Gadelica, Volume II</i>](https://www.electricscotland.com/books/pdf/carminagadelicah02carm.pdf).  Edinburgh : Tweeddale Court

* Clague, J. (1911). [<i>Cooinaghtyn
  Manninagh</i>](https://corpus.gaelg.im/docs/Cooinaghtyn-Manninagh?q=frog).
  Castletown : M. J. Blackwell.

* Cormac (pseudonym) (1909). <i>Frog</i>. An Claidheamh Soluis 11:9 (8/5/1909).

* De Bhaldraithe, T. (1945). <i>Gaeilge Chois Fhairrge: An Deilbhíocht</i>.
  Dublin : Institute of Advanced Studies.

* De Bhaldraithe, T. (1985). <i>Foirsiún Focal as Gaillimh</i>. Dublin :
  Acadamh Ríoga na hÉireann.

* Dinneen, P. S. (1904). [<i>Foclóir Gaedhilge agus
  Béarla</i>](https://archive.org/details/foclirgaeilgeagu00dinn). Irish  Texts
  Society. (also referred to as "Dinneen's dictionary")

* Dorian, N. C. (1978). <i>East Sutherland Gaelic: the dialect of the Brora,
  Golspie, and Embo fishing communities</i>. Dublin : Dublin Institute of
  Advanced Studies.

* Dorian, N. C. (1981). <i>Language Death: Life Cycle of a Scottish Gaelic
  Dialect</i>. University of Pennsylvania Press Anniversary Collection.

* Dubourdieu, J. (1802).
  [<i>Statistical survey of the County of
  Down</i>](https://archive.org/details/statisticalsurve00duboiala/page/315/mode/1up).
  Dublin : Graisberry and Campbell.

* Dunbar, C. (2025). [<i>Cnuasach Focal as
  Oirialla</i>](https://www3.smo.uhi.ac.uk/oduibhin/leabharthai/CNUASACH%20FOCAL%20AS%20ORIALLA%20leagan%201.1%201025.pdf).
  [Online edition]

* Dwelly, E. (1918). [<i>The illustrated Gaelic
  dictionary</i>](https://archive.org/details/illustratedgaeli01dweluoft/page/n7/mode/2up).
  Fleet, Hampshire : The author.

* Fargher, D. C. (1969). <i>The Manx have a word for it, Book 4: Insects,
  Reptiles, etc.</i>. Reayrt Ny Marrey : The author.

* Fargher, D. C. (1979). <i>Fargher's English-Manx Dictionary</i>. Douglas : Shearwater Press

* Forbes, A. R. (1905). [<i>Gaelic names of beasts (Mammalia), birds, fishes,
  insects, reptiles, etc.</i>](https://archive.org/details/gaelicnamesofbea00forb/page/406/mode/2up).
  Edinburgh : Oliver and Boyd : Norman Macleod.

* Hamilton, J. N. (1974). [<i>A phonetic study of the Irish of Tory Island, Co.
  Donegal</i>](https://www3.smo.uhi.ac.uk/oduibhin/leabharthai/The%20Irish%20of%20Tory%20Island%20-%20Hamilton.pdf).
  Belfast : Institute of Irish Studies, Queen's University Belfast

* Henry, S. (1939). <i>The Cinderella of Rathlin Island</i>. The Belfast
  Telegraph (18/04/1939)

* Kelly, J. (1866). [<i>The Manx
  Dictionary</i>](https://archive.org/details/cu31924027086945). Douglas : The
  Manx Society

* Lewin, C. (2016). [<i>The revivability of Manx Gaelic: a linguistic
  description and discussion of Revived
  Manx</i>](https://www.academia.edu/39715888/The_revivability_of_Manx_Gaelic_a_linguistic_description_and_discussion_of_Revived_Manx). Aberystwyth University.

* Lewin, C. (2017). [<i>Scholarship and language revival:
  language ideologies in corpus development for Revived
  Manx</i>](https://reference-global.com/article/10.1515/scp-2017-0006). Studia Celtica Posnaniensia, 2(1), 97–118.

* Macbain, Alexander (1911). [<i>An Etymylogical Dictionary of the Gaelic
  Language</i>](https://archive.org/details/etymologicaldict00macbuoft/page/232/mode/2up). Stirling : Eneas Mackay.

* Marstrander, C. (1908). [<i>Über irisches loscann und einige andere
  indogermanische Namen der
  kröte</i>](https://archive.org/details/sprogligeoghist00olsegoog/page/n258/mode/2up).
  In Magnus Bernhard Olsen (ed.), <i>Sproglige og historiske afhandlinger viede
  Sophus Bugges minde</i>, 240-246. Oslo : H. Aschehoug & Co.

* Mac Giolla Chearna, P. (1940). <i>Ceachta as Leabhar na Cruinne</i>. Baile
  Átha Cliath : Oifig an tSoláthair.

* Mac Gréagóir, A. (1908). <i>Sean-Ranna Ultacha</i>. An Claidheamh Soluis
10:15 (20/6/1908). [under the pen-name <i>Gréagóirína Nic Gréagóir Gréagach</i>]

* Mac Gréagóir, A. (1910). [<i>Sgéaltan X
  Rachreann</i>](https://www3.smo.uhi.ac.uk/oduibhin/leabharthai/Sg%C3%A9altan%20Rachreann.pdf). Gill, M. H. & a Mhac Teor.

* Mac Meanman, S. (1940). <i>Crann an Eolais, An Toradh</i>. Dublin : Brún agus Ó
Nualláin Teór.

* McKenna, L. (1947). <i>Book of Magauran: Leabhar Méig Shamhradháin</i>.
  Dublin : Dublin Institute for Advanced Studies. [HTML version]. Retrieved
  from
  [https://celt.ucc.ie/published/G402561/header.html](https://celt.ucc.ie/published/G402561/header.html).
  (Original manuscript 1330s)

* O'Clery, M., & Miller, A. W. K. (1883). [<i>O'Clery's Irish glossary: Printed
  at Louvrain in 1643.
  s.n.</i>](https://deriv.nls.uk/dcn23/8177/81776163.23.pdf). Revue Celtique,
  5 (1881-1883). 16. (Original work published 1643 as <i>Foclóir nó Sanasán
          Nua</i>) (also referred to as "O'Clery's glossary")

* Ó Dónaill, N. (1977). <i>Foclóir Gaeilge–Béarla</i>. Dublin: An Gúm

* O'Fothartha, D. (1892). [<i>Siamsa an gheimhridh: no Cois an teallaigh in Iar
  gConnachta</i>](https://babel.hathitrust.org/cgi/pt?id=uc1.c070984047&seq=139).
  Baile Átha Cliath : O'Brien Patrick


* O'Neill-Lane, T. (1917). [<i>Larger English-Irish
  Dictionary</i>](https://archive.org/details/largerenglishiri00onei/page/n3/mode/2up).
  New York : Funk & Wagnalls Co.

* O'Reilly, E. (1864). [<i>An Irish-English dictionary</i>](https://archive.org/details/anirishenglishd00odogoog). Dublin : James Duffy.

* Quiggin, E. C. (1906). [<i>A Dialect of Donegal</i>](https://en.wikisource.org/wiki/A_Dialect_of_Donegal). Cambridge : University Press.

* Robertson, C. M. (1898). [<i>Skye
  Gaelic</i>](https://archive.org/details/transactionsgae06unkngoog/page/n76/mode/2up).
  In: Transactions of The Gaelic Society of Inverness, 23 (1898-1899). 54-89

* Robertson, C. M. (1900). [<i>The Gaelic of the West of
  Ross-shire</i>](https://archive.org/details/transactionsvol00invegoog/page/320/mode/2up>).
  In: Transactions of The Gaelic Society of Inverness, 24 (1899-1901). 321-69

* Scharff, R. F. (1893).
  [<i>Is The Frog a Native of Ireland?</i>](https://archive.org/details/irishnaturalist02roya/page/n17/mode/2up).
  The Irish Naturalist, 2(1), 1–6.

* Scouller, A. M. (2018). [<i>The Gaelic Dialect of
  Colonsay</i>](https://era.ed.ac.uk/server/api/core/bitstreams/c5b70130-aec4-4f11-b6f6-60f3fd8263cf/content).
  The University of Edinburgh

* Sinclair, A. (1879). [<i>The Gaelic
  songster</i>](https://archive.org/details/gaelicsongstertr00sinc/page/n4/mode/1up).
  Glasgow : The author.

* Sjoestedt, M. L. (1930). [<i>Phonétique d’un parler irlandais de
  Kerry</i>](https://fr.wikisource.org/wiki/Phon%C3%A9tique_d%E2%80%99un_parler_irlandais_de_Kerry/2-6#p163).
  In: Annales de Bretagne. Book 40, number 3, 1932. 570-571

* Stockman, G. (1974). [<i>The Irish of Achill, Co.
  Mayo</i>](https://www3.smo.uhi.ac.uk/oduibhin/leabharthai/Stockman%20(1974),%20The%20Irish%20of%20Achill,%20Co%20Mayo.pdf). Belfast : Institute of Irish Studies, Queen's University of Belfast.

* Wentworth, R. (1993). [<i>Faclan is Abairtean à Ros an
  Iar</i>](https://www3.smo.uhi.ac.uk/gaidhlig/wentworth/faclair/dualchainnt/). Clar.

* Whitfield, N. (1994). [<i>My Grandfather , Dr. Séamus Ó Ceallaigh
  (1879-1954)</i>](https://www.academia.edu/19143240/My_Grandfather_Dr_S%C3%A9amus_%C3%93_Ceallaigh_1879_1954_in_Graham_Mawhinney_ed_Gleanings_from_Ulster_History_by_S%C3%A9amus_%C3%93_Ceallaigh_1879_1954_2nd_ed_Ballinascreen_Historical_Society_1994_iii_xxx).
  In <i>Gleanings from Ulster History</i>, iii-xxiii. Draperstown :
  Ballinascreen Historical Society. (Reprint of 1951 publication with new
  introductory material)


[^1]: Dorian (1981) p. 101: <blockquote>Precisely because everyone
uses such loanwords, and because there is considerable self-consciousness about
it, the number of loanwords in a verbal performance seems to have become a
marker of degree of formality in ESG [East Sutherland Gaelic]. In a relaxed and
casual performance, the number of lexical borrowings will rise [...] the more
formal the performance &mdash; for example, established narrative routines
reproduced for tape recording &mdash; the lower the number of lexical
borrowings [...] </blockquote> She gives an example of a tape-recorded
narrative, where a speaker replaced the borrowing of
<i>poileas</i> ("police") with <i>luchd an lagh</i> ("law people"). Dorian
notes this as "elegant Gaelic but otherwise foreign to the lips of any East
Sutherlander of my acquaintance". This correlation of formality and
loan-word occurrence may be less prevelant in areas with healthier Gaelic. The
subjects in the above were of the last couple generations of speakers of a
dialect particularly far removed from what was considered standard (which
negatively affected some, though not all, of the speakers' perception of the legitimacy of their
Gaelic), and were subject to mockery from English monolinguals for
their loanword usage. In a healthier community of speakers I imagine loanwords
might be used more confidently and less self-consciously.

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
recording</a> of the language's name, which I would transcribe as <span
class=ipa>[keːlɪʰc]</span>. (maybe there is palatalisation on the /l/, I just don't hear it, perhaps due to
personal deficiency). I hadn't actually noticed the pre-aspiration until
now (a spectrogram revealed it, it's not something I have an ear for). I
haven't seen anyone talk about pre-aspiration in Irish, but perhaps it's been
disguised in descriptions of the length of stops, which is suggested in this
thesis (?) <a
href=https://www.abdn.ac.uk/media/site/llmvc/documents/Ch10-Iosad.pdf>chapter</a> I found from Pavel Iosad.
I think the final consonants in all recordings <a
href=https://www.teanglann.ie/en/fuaim/loc>here</a> are at least
somewhat pre-aspirated.

[^fròg]: Dwelly (1918) p. 457: "1. Hole, chink, niche, nook, cranny. 2. marsh,
fen" for <i>fròg</i>. O'Reilly (1864) p. 259: "a fen,
a marsh ; a pitfall, a hole, a cleft;" for <i>frog</i> (before also giving
the animal). The marsh and hole senses seem to have
left Ireland. Dwelly gives "active, energetic" for <i>frog</i>, a meaning I
haven't seen in any Irish texts.

[^omens]: You can download a CSV of my collected list
[here](../static/froganna/data/omens.csv). The list is not exhaustive and was
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

[^scharff]: Scharff (1893).  This article explores various historical accounts of
frogs being found in Ireland, including Gerard of Wales's. The idea that
Trinity students introduced frogs is dismissed by the author for being
ecologically unlikely, noting that there are far more frogs on the west coast
and the city doesn't seem like an ideal place for frogs to thrive.

[^orange]: O'Reilly (1864) p. 259 states the frog is "an animal not found in Ireland
before the reign of William the Third of England, whose Dutch troops first
introduced it amongst us".

[^down]: Dubourdieu (1802) pp. 315-316: "that [frogs] first made their
appearance near Moira, in the western parts of this county, can be
proved beyond contradiction" but declines to do so himself. He
offers an anecdote from a local man about when he first seen a frog.

[^gerard-date]: I have <a
href=https://www.dib.ie/biography/gerald-wales-giraldus-cambrensis-a3490>read</a>
           that Gerard first visited Ireland in 1183, and <i>Topographia
Hibernia</i>, containing the account, was circulated in 1188. However, he mentions Robert Poer in the
account, who I read <a href=https://www.dib.ie/biography/poer-robert-a7399>died</a> in
1178. The Ossory king in question is said to have died in 1185.

[^topographia]: Cambrensis (1863)

[^king]: Domnall Mac Gilla Pátraic, see this <a
href=https://www.dib.ie/biography/poer-robert-a7399>biography</a> of Robert Poer

[^licking]: I think people thought frogs to be very absorbent, hence their ability
to remove aches and pains through touch. I don't personally interpret this
belief as necessarily attributing mystical powers to the frog. The other Manx sources consulted were 
[The Manx Corpus](https://corpus.gaelg.im) (containing Clauge, 1911);
Sophia Morrison's 1911 <a href=https://archive.org/details/manxfairytales00morr/page/n15/mode/2up><i>Manx
Fairy Tales</i></a> where I found no mention of frogs; <i>Skeealyn
Cheeil-Chiollee</i>, edited by Stephen Miller and published in 1993, containing
folklore collected by Charles Roeder in the last quarter of the 19th century,
and where I found no mention of frogs.

[^leprosy]: The spelling <i>loscann</i> is used
[here](https://www.duchas.ie/en/cbes/4427982/4363624/4467633?HighlightText=loscann&Route=stories&SearchLanguage=ga)
to mean "burning", as a variant of standard <i>loisceann</i>. I think the only
other proposed etymology I've seen is in Carmichael, 1928, p. 332:
"Probably the toad is called 'losgan' from 'losg' irruption, leprosy". This
seems much less likely to me, based on the various sources found via the eDIL,
than the <i>loiscend</i> derivation. I believe the word given for leprosy
mostly referred to <a href=https://dil.ie/30704>lameness</a> (which can
be a secondary effect of leprosy). I'm not sure what toads would have to
do with leprosy; perhaps their bumpy skin was thought to be reminiscent
of leprosy nodules. I have seen it suggested that <a
href=https://en.wikipedia.org/wiki/Taddiport>Taddiport</a>, a leper
colony in the Middle Ages, was named so because of this. I haven't found
much on toads being used to refer to people suffering from leprosy at the
time, however, but I only looked briefly.

[^dragon]: <i>Comhrag losguinn lasrach mear ná sir—is sé do dhaingean—suail a sheadh
i n-armaibh áigh, marbhaidh fear uaidh dá anáil.</i> The text refers to a
creature <losguinn> breathing fire.

[^cricket]: See this [entry](https://anglo-norman.net/entry/salemandre) in an
Anglo-Norman dictionary, and this blog post ["Not quite
cricket?"](https://grammarphobia.com/blog/2021/07/cricket-croquet.html) from
Grammarphobia.
[This](https://quod.lib.umich.edu/m/middle-english-dictionary/dictionary/MED10321)
Middle English dictionary shows the converse, <i>criket</i>
being used to refer to the fire lizard. Thank you to Grammarphobia for sharing
the OED extracts.

[^synonyms]: I wondered if perhaps the synonyms listed in O'Clery's glossary can
provide more clues. <i>Cú cnámha</i> appears to read as "hound of
bones", though the eDIL <a href=https://dil.ie/13291>tells us</a> that
<i>cú</i> has also been generically used for creatures, particularly insects.
In Forbes (1905) this word is cited as meaning
"louse", as is the other synonym listed by O'Clery, <i>snasán</i>.  I
suppose, like salamanders, you might expect to find woodlice in your
firewood, if you kept it outside. But these words could easily be referring to
crickets also. In the end these synonyms mostly increase my confidence that the
glossary is referring to crickets, not to salamanders the lizards. Whether the
usage for frogs evolved from the usage for crickets, or alongside it, will
remain a mystery.

[^liospán]: Thank you to Gerry Oates' article <i>An phéist a chuir an cluiche
ar Phádraig</i> in <i>An tUltach</i> which directed me to this, via the
National Corpus of Irish. Mac Giolla Ceara, 1940, p. 42: "An préachán dubh ar
an chrann, an traona san choirce, agus an liospán san pholl [...]"

[^granny]: This was the school my granny went to :) and my granda's parents etc.

[^welsh-leum]: In Welsh, the cognate <i>llam</i> gives us
<i>llamhidydd</i>, similarly meaning "jumper" and used for porpoises.

[^cnádán-bible]: The introduction of this bible says that the Old Testament
is translated by William Bedell and "some changes made from the edition of
1690". I assume one of the changes was changing to use <i>cnadáin</i>, though
only in some places. See the <a href=#bibles>appendix on Gaelic bibles</a> for a full table of frog
words used in bible editions.

[^crabfish]: "Crabfish" also meant lobster, but the LASID universally gives
<i>gliomach</i> (<i>giomach</i> in Scotland) for that.

[^rathlin]: The word <i>crúbán</i> is used in <a
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

[^riddle]: It is interesting comparing this 1892 recording of the riddle with
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

[^neologisms]: Dorian (1981) pp. 111-112: <blockquote>There are at least five aspects of
linguistic behaviour [...] in which the dominance of English over Gaelic is
less complete than might be anticipated. First, despite the association of
English with modernity and technology and the public spheres of life, no topic
connected with these aspects of life forces a choice of English. If the setting
and the interlocutor permit, any topic, no matter how sophisticated or remote
from local life, can be discussed in Gaelic. Closely related to this aspect of
resistance to English dominance is the thorough-going integration of English
lexical borrowings into Gaelic; <b>this integration makes possible the use of
Gaelic for all topics</b>."</blockquote> Emphasis my own. The idea that an expanded
"native" lexicon is required for a language to expand its spheres of usage is
also rejected in Lewin (2016): <blockquote>"[on a quote declaring Fargher's dictionary as
making it possible for Manx speakers to discuss topics like atomic physics]
This passage implies that it was impossible to discuss subjects like atomic
physics etc. before the appearance of the dictionary, ignoring the fact that
many neologisms had been developed and were in use within the small community
of speakers in earlier decades, not to mention the fact that Manx speakers are
at liberty to borrow from English specific lexis where no pre-existing Manx
word exists or is remembered."</blockquote>

[^vandal]: This replacement of native speakers' grammar, erasing a unique history
of language contact and adaptation, is something I can see only as cultural
vandalism. However, for more nuanced and detailed thoughts
on Fargher's work I will again refer to Lewin's work. As he puts it in Lewin
(2017): <blockquote> [it is perhaps] problematic if the native Manx of the
   past is implicitly (or explicitly) rejected as being not Manx enough.
   Efforts to purge Manx of grammatical and lexical influence from English
   arguably constitute a purism of a simplistic and unnecessarily xenophobic
   kind, which disregards the lived experience of centuries of Manx speakers,
   for whom some contact with English and borrowing of English forms was an
   inherent part of their linguistic world, and reflects a discourse which
   comes close to blaming the traditional speakers for letting their language
   become ‘impure’. It also makes the native Manx texts of the past less
   accessible to new speakers.</blockquote>
