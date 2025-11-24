Title: C++20 concepts are not like Rust traits
Slug: cpp20-concepts-are-not-like-rust-traits
Date: 21 August 2019

At writing, [Rust's 
Wikipedia](https://en.wikipedia.org/w/index.php?title=Rust_(programming_language)&oldid=910954500) 
currently says the following:

> Functions can be given generic parameters, which usually require the generic 
type to implement a certain trait or traits. Within such a function, the 
generic value can only be used through those traits. This means that a generic 
function can be type-checked as soon as it is defined. This is in contrast to 
C++ templates, which are fundamentally duck typed and cannot be checked until 
instantiated with concrete types. C++ concepts address the same issue and are 
expected to be part of C++20 (2020).

But C++ concepts (as currently proposed) are very different from Rust traits, and do not allow for the parameterised function to be type-checked only once.

Rust traits are implemented explicitly, whereas C++ concept constraints are 
implicitly met. This means that concept-constrained templates can legally 
invoke behaviour not defined by the concept. So, the following code compiles in 
g++ v9.2 with flags `--std=c++2a -fconcepts`:[^1]

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="PreProc">#include </span><span class="String">&lt;string&gt;</span>
<span id="L2" class="LineNr"> 2 </span>
<span id="L3" class="LineNr"> 3 </span><span class="Type">template</span>&lt;<span class="Type">typename</span> T&gt;
<span id="L4" class="LineNr"> 4 </span>concept <span class="Type">bool</span> Stringable = <span class="Function">requires</span>(T a) {
<span id="L5" class="LineNr"> 5 </span>    {a.<span class="Function">stringify</span>()} -&gt; <span class="Constant">std</span>::<span class="Type">string</span>;
<span id="L6" class="LineNr"> 6 </span>};
<span id="L7" class="LineNr"> 7 </span>
<span id="L8" class="LineNr"> 8 </span><span class="Type">class</span> Cat {
<span id="L9" class="LineNr"> 9 </span> <span class="Statement">public</span>:
<span id="L10" class="LineNr">10 </span>    <span class="Constant">std</span>::<span class="Type">string</span> <span class="Function">stringify</span>() {
<span id="L11" class="LineNr">11 </span>        <span class="Statement">return</span> <span class="String">&quot;meow&quot;</span>;
<span id="L12" class="LineNr">12 </span>    }
<span id="L13" class="LineNr">13 </span>
<span id="L14" class="LineNr">14 </span>    <span class="Type">void</span> <span class="Function">pet</span>() {
<span id="L15" class="LineNr">15 </span>    }
<span id="L16" class="LineNr">16 </span>};
<span id="L17" class="LineNr">17 </span>
<span id="L18" class="LineNr">18 </span><span class="Type">template</span>&lt;Stringable T&gt;
<span id="L19" class="LineNr">19 </span><span class="Type">void</span> <span class="Function">f</span>(T a) {
<span id="L20" class="LineNr">20 </span>    a.<span class="Function">pet</span>();
<span id="L21" class="LineNr">21 </span>}
<span id="L22" class="LineNr">22 </span>
<span id="L23" class="LineNr">23 </span><span class="Type">int</span> <span class="Function">main</span>() {
<span id="L24" class="LineNr">24 </span>    <span class="Function">f</span>(<span class="Function">Cat</span>());
<span id="L25" class="LineNr">25 </span>    <span class="Statement">return</span> <span class="Number">0</span>;
<span id="L26" class="LineNr">26 </span>}
</div>
</html>

The Rust equivalent would not compile:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="Keyword">trait</span> <span 
class="Identifier">Stringable</span> {
<span id="L2" class="LineNr"> 2 </span>    <span class="Keyword">fn</span> <span class="Function">stringify</span>() <span class="Statement">-&gt;</span> <span class="Type">String</span>;
<span id="L3" class="LineNr"> 3 </span>}
<span id="L4" class="LineNr"> 4 </span>
<span id="L5" class="LineNr"> 5 </span><span class="Keyword">struct</span> <span class="Identifier">Cat</span> {
<span id="L6" class="LineNr"> 6 </span>}
<span id="L7" class="LineNr"> 7 </span>
<span id="L8" class="LineNr"> 8 </span><span class="Keyword">impl</span> Cat {
<span id="L9" class="LineNr"> 9 </span>    <span class="Keyword">fn</span> <span class="Function">pet</span>() {}
<span id="L10" class="LineNr">10 </span>}
<span id="L11" class="LineNr">11 </span>
<span id="L12" class="LineNr">12 </span><span class="Keyword">impl</span> Stringable <span class="Statement">for</span> Cat {
<span id="L13" class="LineNr">13 </span>    <span class="Keyword">fn</span> <span class="Function">stringify</span>() <span class="Statement">-&gt;</span> <span class="Type">String</span> {
<span id="L14" class="LineNr">14 </span>        <span class="String">&quot;meow&quot;</span>.<span class="Function">to_string</span>()
<span id="L15" class="LineNr">15 </span>    }
<span id="L16" class="LineNr">16 </span>}
<span id="L17" class="LineNr">17 </span>
<span id="L18" class="LineNr">18 </span><span class="Keyword">fn</span> <span class="Function">f</span><span class="Statement">&lt;</span>T: Stringable<span class="Statement">&gt;</span>(a: T) {
<span id="L19" class="LineNr">19 </span>    a.<span class="Function">pet</span>();  <span class="Comment">// error[E0599]: no method named `pet` found for type `T` in the current scope</span>
<span id="L20" class="LineNr">20 </span>}
<span id="L21" class="LineNr">21 </span>
<span id="L22" class="LineNr">22 </span><span class="Keyword">fn</span> <span class="Function">main</span>() {
<span id="L23" class="LineNr">23 </span>    <span class="Keyword">let</span> cat <span class="Statement">=</span> Cat{};
<span id="L24" class="LineNr">24 </span>    <span class="Function">f</span>(cat);
<span id="L25" class="LineNr">25 </span>}
</pre>
</div>
</html>

C++ concept-constrained templates are still only type checked when concrete 
instantiation is attempted &ndash; they just give better, sooner error messages 
for types that don't comply with the constraint, rather than the long stream of 
nonsense that failed template instantiations output in C++ without concepts.

I think it's quite common for people to think that concepts are the same as 
traits. They look similar syntactically, and also the realities of them aren't 
well known because they aren't yet in a standard. I hope this can clarify 
things for anyone curious, and help anyone adjust expectations before the C++20 
standard is released.

# Rust traits comparisons with other language constructs
Although Rust traits are very different from C++20 concepts, they have 
similarities to a lot of other language constructs for polymorphism:

* Haskell typeclasses: Rust traits are based on these, but Rust does not have 
  higher kinded types[^2], and Rust enforces global uniqueness on trait 
  implementations[^3][^4]. This means that there is at most one implementation 
  of a trait for any given type. This is not enforced in Haskell, but it is 
  discouraged to take advantage of this.[^5]

* Java interfaces: when Rust traits are used dynamically, they are analogous to 
  Java interfaces, except without the `extend` functionality available in 
  Java.[^6]


[^1]: [https://godbolt.org/z/qA3hlL](https://godbolt.org/z/qA3hlL)
[^2]: [https://github.com/rust-lang/rfcs/issues/324](https://github.com/rust-lang/rfcs/issues/324)
[^3]: [http://aturon.github.io/tech/2017/02/06/specialization-and-coherence/](http://aturon.github.io/tech/2017/02/06/specialization-and-coherence/)
[^4]: [https://github.com/ixrec/rust-orphan-rules/blob/master/README.md](https://github.com/ixrec/rust-orphan-rules/blob/master/README.md)
[^5]: [http://blog.ezyang.com/2014/07/type-classes-confluence-coherence-global-uniqueness/](http://blog.ezyang.com/2014/07/type-classes-confluence-coherence-global-uniqueness/)
[^6]: [https://stevedonovan.github.io/rust-gentle-intro/object-orientation.html](https://stevedonovan.github.io/rust-gentle-intro/object-orientation.html)
