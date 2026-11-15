AUTHOR = "Hannah McLaughlin"
SITENAME = "lochsh"
SITEURL = ""

PATH = "content"

TIMEZONE = "Europe/London"

DEFAULT_LANG = "en"

# Feed generation is usually not desired when developing
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ("Pelican", "https://getpelican.com/"),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

INDEX_SAVE_AS="blog.html"

THEME = "themes/hyde"
PROFILE_IMAGE = "me.jpg"
BIO = (
    "After a decade labouring in the software engineering mines, I am enjoying a "
    "luxurious period of indulgence in my linguistic interests. "
    "On this blog you can read my investigations into Gaelic "
    "words for <a href=https://mcla.ug/froganna.html>frogs</a> and "
    "for <a href=https://mcla.ug/hoganna.html>hedgehogs</a>, about my ongoing "
    "<a href=https://mcla.ug/fosta.html>digitisation</a> of the Linguistic "
    "Atlas and Survey of Irish Dialects, and other delights."
)
LONG_BIO = (
       "I'm Hannah McLaughlin, or Nóra Nic Lochlainn.<br><br>"
       "I'm an engineer with an interest in linguistics. I live in Oxford, UK, "
       "and I love learning about phonetics and phonology. I'm particularly interested "
       "in Gaelic, though I have also been interested in Japanese. I love exploring "
       "connection and variation of language across the Gaelic world, particularly "
       "between Ulster and Scotland.<br><br>"

       "So much of the richness of spoken language is in the specific sounds and "
       "phrases that tie it to a particular place, and to the people who have lived "
       "there. I love learning local words and pronunciations, and seeing how these "
       "demonstrate both the unique history of a place, and its connection to other "
       "places, whether near or far. <br><br>"

       "I am currently working on "
       "<a href=https://codeberg.org/lochsh/lasid>digitising</a> the "
       "Linguistic Atlas and Survey of Irish Dialects.<br><br>"

       "I have previously worked as a software engineer, writing Rust and Python for "
       "quantum computers, C++ for medical imaging diagnostics, and bare metal "
       "embedded C for surgical robots. The older articles on this website tend to be "
       "about software and related technology. Newer articles reflect my interest "
       "in languages.<br><br>"

       "I studied Information and Computer Engineering at the University of "
       "Cambridge."
)
NAME_EN = "I'm Hannah"
NAME_JA = "ハナといいます"
NAME_GA = "Nóra atá orm"

STATIC_PATHS = [
    "images",
    "static",
]
EXTRA_PATH_METADATA = {
    "static/favicon.ico": {"path": "favicon.ico"},
}
