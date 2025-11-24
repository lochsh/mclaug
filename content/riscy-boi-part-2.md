Title: Designing a RISC-V CPU, Part 2: Successfully executing (some) instructions
Slug: risc-v-cpu-part-2
Date: 1st March 2021
Cover: /images/riscyboi.png

The [previous instalment](https://mcla.ug/blog/risc-v-cpu-part-1.html) of this
series was "basically an explanation of what FPGAs are and a 'hello world'
nMigen example."[^1] In this post, I will be detailing the design of my CPU as
it currently stands, and going over the various mistakes I made along the way.
As with the previous post, I am primarily aiming this at software engineers who
are new to hardware design &ndash; but I hope it will be interesting to anyone
interested in nMigen, RISC-V, or CPU design generally.

I hope the mistakes I made along the way will be a useful frame for considering
these questions:

* What about digital logic design is fundamentally different from software
  design?

* What about digital logic design is similar to software design?

You can see the code for my CPU at the time of writing
[here](https://github.com/lochsh/riscy-boi/tree/33229b5fdcee90cfdf776ccf925f560f0fa5ce82)
or an up to date version [here](https://github.com/lochsh/riscy-boi).

## An introduction to RISC-V
RISC-V ("risk five") is an open standard instruction set architecture (ISA).
"RISC" means "reduced instruction set computer", broadly meaning that the
ISA prioritises simple instructions. In contrast, CISC (complex instruction set
computer) ISAs are optimised to perform actions in as few instructions as
possible, hence their instructions are often more complex. ARM architectures
are RISC; x86-related architectures are CISC.

Usually in industry, ISAs are patented, so in order to implement the ISA you
need an (expensive) license from the vendor. Often, commercial ISAs are poorly
documented, with the motivation behind design details not always being
available even after such a license agreement.

From the RISC-V spec [^2]:

> Our goals in defining RISC-V include:
>
> * A completely _open_ ISA that is freely available to academia and industry
> * a _real_ ISA suitable for direct native hardware implementation, not just
> simulation or binary translation.
> * An ISA that avoids "over-architecting" for a particular microarchitecture
> style, but which allows efficient implementation in any of these.

Additionally, a lot of commercial architectures are complex and burdened with
backwards-compatibility constraints. RISC-V offers a fresh start!

The ISA doesn't explain the details of how to design a CPU &ndash; it just
defines an abstract model of the CPU, mostly by defining what instructions the
CPU must support, including:

* The encoding of the instructions (i.e. how to construct the machine code that
  the CPU will run)
* The registers (the very fast, very small storage locations accessed directly
  by the CPU)[^3]

How to actually create a CPU that realises these requirements is up to us \o/

### A quick note (feel free to skip if you don't have opinions about CPUs)
I'm trying to design a single-stage CPU; that is, I'm trying to design a CPU
that retires one instruction per clock cycle with no pipelining.  Usually CPUs
have pipelining in place to maximise efficiency. I am hoping that avoiding this
will result in a simpler design more suitable to my learning. Perhaps it will
complicate other aspects of the design (like my program counter having 3
outputs), but I'm certainly finding it easier to hold the design in my
head when I only have to think about this clock cycle and the next. I will
likely discuss this in more detail in the next blog post where I implement the
load instructions. I have a plan for how to make these work in a single cycle,
but they do pose a particular challenge and I may change my design as a
consequence.

## Designing a CPU
RISC-V defines various ISA modules; I will be implementing RV32I, the base
32-bit integer instruction set.

To design my CPU, I first looked at the JAL (jump and link) and the ADDI (add
immediate) instructions, and drew a block diagram of what hardware
would be needed to decode those instructions. I think the ADDI instruction is
easier to grasp if you're not used to thinking about how machine code is
encoded, so we'll start with that. If this all totally foreign to you, you
might enjoy my
[introduction to ARM assembly](https://mcla.ug/blog/how-to-flash-an-led.html).

### Decoding ADDI

![iri](/images/integer-register-immediate.png "Diagram of instruction encoding for ADDI from RISC-V spec"){.callout}

> ADDI adds the sign-extended 12-bit immediate to register _rs1_

Let's break some of this down, imagining we're decoding such an instruction:

* An immediate is analogous to a literal value in source code; the value itself
  is encoded in the instruction, rather than e.g. retrieved from a register.
* The _opcode_ field is the same value for all the instructions listed here. 
* Once we've read the _opcode_, we know that bits 12-14 contain the _funct3_
  field (3 for 3 bits), which encodes whether this is an ADDI instruction (or
  SLTI, ANDI &c.)

So, somehow we will have to:

* Retrieve the value stored in register _rs1_
    * Therefore, our register file needs an input for selecting this register
      to read, and an output for the data read from that register.
* Add that to the immediate value
    * An arithmetic logic unit (ALU) will be helpful
* Store the result in register _rd_
    * Our register file also needs write select and write data inputs.

Sign-extension will be necessary too &ndash; this is just the process of
taking a number narrower than (in our case) 32 bits, and filling in the
remaining bits such that two's complement arithmetic will be performed
correctly. I won't include this in the diagram below.

Implicit in all this is that we'll need some way to retrieve the instruction
itself and pass it to the instruction decoder. The _program counter_ is
what tells the instruction memory which address to retrieve an instruction
from.

![addi](/images/addi.png "Block diagram showing the necessary connections
        between components to implement the ADDI instruction. The instruction
        decoder tells the register file to read from rs1 and write to rd. The
        data read from rs1 and the immediate are inputs to the ALU. The output
        of the ALU is written to rd. The program counter tells the instruction
        memory which address to retrieve and instruction from, and the
        instruction memory provides that instruction to the instruction
        decoder.")

I'm using thick cyan lines for data flow and thin magenta lines for control
flow.

### JAL
Now let's try doing the same for JAL.

> The jump and link (JAL) instruction [...] immediate encodes a signed offset
> in multiples of 2 bytes. The offset is sign-extended and added to the `pc` to
> form the jump target address. [...] JAL stores the address of the instruction
> following the jump (`pc` + 4) into register _rd_.

There's a lot more going on here, particularly if you aren't familiar with
machine code. We noted above that the program counter sets which instruction
will be executed next. Usually the program counter simply increments to the
next address each cycle &ndash; that's how we continue to execute our program!
However, say our program calls a subroutine stored elsewhere in memory; we'd
need a way to _jump_ to the subroutine address. Or, say we wanted an infinite
loop (ubiquitous in embedded software!); we'd need a way to _jump_[^4] back to
the address at the start of the loop. JAL allows for these situations.

The "link" part of JAL is the part where the next instruction is stored in the
destination register. This is convenient when the jump is used to execute a
subroutine: once the subroutine completes, we can jump back to that stored
instruction address.

Here's the encoding for JAL:

![jal-enc](/images/jal-enc.png "Diagram of instruction encoding for JAL from RISC-V spec"){.callout}

Note:

* The opcode uniquely defines the JAL instruction (no other instructions share
  this opcode)
* We need to unshuffle the immediate to get the offset
* The LSB[^5] of the immediate is not encoded because it must be 0: only
  offsets in multiples of 2 bytes are supported.

The unshuffling caused me some pain in my code, so it's amusing to me that it
won't be part of the block diagram below. But it's part of the internals of the
instruction decoder, not its interface, which is what we are determining with
these diagrams. The shuffled bits might seem nonsensical, but they're chosen to
maximise overlap with other instruction formats in RISC-V.

![jal](/images/jal.png "Block diagram showing the necessary connections
        between components to implement the JAL instruction.")

### Putting ADDI and JAL together
The next challenge is to draw a block diagram that implements both ADDI and
JAL. The first obvious problem: the inputs to the ALU are different in both
cases, as is the wiring of the output. We need some kind of logic block that
can pick between them depending on some control signal: a multiplexer (mux).

We also need a way to tell the program counter whether the next instruction
address should come from a set address or from incrementing the current
address.

Here's what my design looks like at the moment (excluding a few things I have
because I know I'll need them later, like two read select/data signals on the
register file):

![mux](/images/mux.png "Block diagram showing the necessary connections
        between components to implement the JAL and ADDI instructions.")

## Implementing the design
As covered in my previous blog post, I'm using
[nMigen](https://github.com/nmigen/nmigen) to implement my design. As I'm
currently designing a single-stage CPU, more of my design is
combinatorial, rather than synchronous, because I don't require the additional
state that pipelining necessitates. This most likely means my design is
unable to run quickly, but that's not a concern of mine.

I don't think it's helpful to post all the source code of my implementation in
this blog, but I will include some code here to illustrate mistakes that I made
and what I learned from them.

### Mistake #1: thinking about my logic circuit sequentially
I initially implemented my program counter incorrectly after I got really
confused about when synchronous updates would take effect. I initially only had
the `pc` and `pc_inc` outputs because I didn't really understand the difference
between `pc` and `pc_next`.  It's taken some getting used to thinking about the
whole logic circuit "happening at once"[^7], rather thinking sequentially like
I would when writing software.  This is what led to my confusion. Properly
conceptualising your circuit in this way is key, and a challenge if you're used
to writing software.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="String">&quot;&quot;&quot;</span><span class="String">Program Counter</span><span class="String">&quot;&quot;&quot;</span>
<span id="L2" class="LineNr"> 2 </span><span class="PreProc">import</span> nmigen <span class="Statement">as</span> nm
<span id="L3" class="LineNr"> 3 </span>
<span id="L4" class="LineNr"> 4 </span>INSTR_BYTES <span class="op_lv0">=</span> <span class="Number">4</span>
<span id="L5" class="LineNr"> 5 </span>
<span id="L6" class="LineNr"> 6 </span>
<span id="L7" class="LineNr"> 7 </span><span class="Statement">class</span> <span class="Function">ProgramCounter</span><span class="lv12c">(</span>nm<span class="op_lv12">.</span>Elaboratable<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L8" class="LineNr"> 8 </span>    <span class="String">&quot;&quot;&quot;</span>
<span id="L9" class="LineNr"> 9 </span><span class="String">    Program Counter</span>
<span id="L10" class="LineNr">10 </span>
<span id="L11" class="LineNr">11 </span><span class="String">    * load (in): low to increment, high to load an address</span>
<span id="L12" class="LineNr">12 </span><span class="String">    * input_address (in): the input used when loading an address</span>
<span id="L13" class="LineNr">13 </span>
<span id="L14" class="LineNr">14 </span><span class="String">    * pc (out): the address of the instruction being executed this clock cycle</span>
<span id="L15" class="LineNr">15 </span><span class="String">    * pc_next (out): the address of the instruction being executed next clock</span>
<span id="L16" class="LineNr">16 </span><span class="String">      cycle</span>
<span id="L17" class="LineNr">17 </span><span class="String">    * pc_inc (out): the address after that of the instruction being executed</span>
<span id="L18" class="LineNr">18 </span><span class="String">      this clock cycle</span>
<span id="L19" class="LineNr">19 </span><span class="String">    </span><span class="String">&quot;&quot;&quot;</span>
<span id="L20" class="LineNr">20 </span>
<span id="L21" class="LineNr">21 </span>    <span class="Statement">def</span> <span class="Function">__init__</span><span class="lv12c">(</span>self<span class="op_lv12">,</span> width<span class="op_lv12">=</span><span class="Number">32</span><span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L22" class="LineNr">22 </span>        self<span class="op_lv0">.</span>load <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Signal<span class="lv12c">()</span>
<span id="L23" class="LineNr">23 </span>        self<span class="op_lv0">.</span>input_address <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Signal<span class="lv12c">(</span>width<span class="lv12c">)</span>
<span id="L24" class="LineNr">24 </span>        self<span class="op_lv0">.</span>pc <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Signal<span class="lv12c">(</span>width<span class="lv12c">)</span>
<span id="L25" class="LineNr">25 </span>        self<span class="op_lv0">.</span>pc_next <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Signal<span class="lv12c">(</span>width<span class="lv12c">)</span>
<span id="L26" class="LineNr">26 </span>        self<span class="op_lv0">.</span>pc_inc <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Signal<span class="lv12c">(</span>width<span class="lv12c">)</span>
<span id="L27" class="LineNr">27 </span>
<span id="L28" class="LineNr">28 </span>    <span class="Statement">def</span> <span class="Function">elaborate</span><span class="lv12c">(</span>self<span class="op_lv12">,</span> _<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L29" class="LineNr">29 </span>        m <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Module<span class="lv12c">()</span>
<span id="L30" class="LineNr">30 </span>
<span id="L31" class="LineNr">31 </span>        m<span class="op_lv0">.</span>d<span class="op_lv0">.</span>comb <span class="op_lv0">+=</span> self<span class="op_lv0">.</span>pc_inc<span class="op_lv0">.</span>eq<span class="lv12c">(</span>self<span class="op_lv12">.</span>pc <span class="op_lv12">+</span> INSTR_BYTES<span class="lv12c">)</span>
<span id="L32" class="LineNr">32 </span>        m<span class="op_lv0">.</span>d<span class="op_lv0">.</span>sync <span class="op_lv0">+=</span> self<span class="op_lv0">.</span>pc<span class="op_lv0">.</span>eq<span class="lv12c">(</span>self<span class="op_lv12">.</span>pc_next<span class="lv12c">)</span>
<span id="L33" class="LineNr">33 </span>
<span id="L34" class="LineNr">34 </span>        <span class="Statement">with</span> m<span class="op_lv0">.</span>If<span class="lv12c">(</span>self<span class="op_lv12">.</span>load<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L35" class="LineNr">35 </span>            m<span class="op_lv0">.</span>d<span class="op_lv0">.</span>comb <span class="op_lv0">+=</span> self<span class="op_lv0">.</span>pc_next<span class="op_lv0">.</span>eq<span class="lv12c">(</span>self<span class="op_lv12">.</span>input_address<span class="lv12c">)</span>
<span id="L36" class="LineNr">36 </span>        <span class="Statement">with</span> m<span class="op_lv0">.</span>Else<span class="lv12c">()</span><span class="op_lv0">:</span>
<span id="L37" class="LineNr">37 </span>            m<span class="op_lv0">.</span>d<span class="op_lv0">.</span>comb <span class="op_lv0">+=</span> self<span class="op_lv0">.</span>pc_next<span class="op_lv0">.</span>eq<span class="lv12c">(</span>self<span class="op_lv12">.</span>pc_inc<span class="lv12c">)</span>
<span id="L38" class="LineNr">38 </span>
<span id="L39" class="LineNr">39 </span>        <span class="Statement">return</span> m
</pre>
</div>
</html>

When thinking about my implementation, I now want to answer these questions:

* What is my state?
* How are the outputs computed?
* How is the state updated?

This sounds simple, but it has been clarifying. For this case:

* `pc` is my state (you'll note it is assigned synchronously, so its value
  is updated at the start of the next clock cycle).
* `pc`, `pc_inc`, and `pc_next` are the outputs:
    * the `pc` output is the current state
    * `pc_inc` is just `pc + 4`
    * `pc_next` swaps between `pc_inc` and the `input_address` based on load
* Each clock cycle, `pc` takes on the value of `pc_next`

### Mistake #2: Creating a combinatorial loop
This isn't really an additional mistake, as the incorrect program counter
implementation described above caused this. I felt this particular consequence
deserved its own subsection.

When I only had the `pc` and `pc_inc` outputs from my program counter, I
created the following combinatorial loop:

* the `pc` output was an input to the ALU
* but the `pc` output was computed from the output of the ALU

Both of these signals were in the combinatorial domain, so they were
effectively wired together in a loop.

The creation of this feedback loop resulted in my tests hanging as my
combinatorial simulations never settled. If I'd tried to synthesise my design,
the synthesis tools would have refused. If you were able to synthesise such a
design, the output would be constantly changing.

### Mistake #3: Not creating the block diagram correctly
True Fans™ of this blog might notice that the block diagram above has a
notable difference from the one shown at the end of the previous blog post:
previously I didn't mux the input of the ALU. I was wondering why JAL wasn't
working, and tried to trace it through my block diagram, like we did above. A
re-enactment:

_Computer, show my original sketch of the block diagram._
![sketch](/images/block-diagram-sktech.jpg "A screenshot of my first CPU design sketch"){.callout}

_Computer, enhance:_
![enhance](/images/enhance.jpg "Zoomed into a note on screenshot saying 'need to multiplex ALU input"){.callout}

Me:
![pikachu](/images/shocked-pikachu.png "Shocked pikachu face from Pokemon"){.callout}


The above is a bit frivolous, but I'd say the lesson here is to think actively
about your block diagram (or whatever reference you are using while
implementing your design), making sure it actually makes sense to you and does
what you want it to. This applies to software design too when viewing any
requirements or other design documentation, of course.

### Miscellaneous mistakes
I made a lot of other mistakes that aren't that interesting to cover &ndash;
most notably really messing up the unshuffling of the immediate in the JAL
instruction. But that was just a programming error without an interesting
lesson to be learnt from it.

## Running my first program!
It was a very exciting moment when I figured out the last of the mistakes I had
made in my implementation, with the help of my tests and of gtkwave.

For convenience in tests, my instruction decoding code also has code for
assembling instructions. I use it here to create a simple program with two
instructions:

* An `ADDI` instruction where `rd` and `rs1` are the same register, and the
  immediate is `1`. This means it will increment the value in `rs1`.

* A `JAL` instruction with an offset of -4, meaning it jumps back to our `ADDI`
  instruction. This creates an infinite loop where the value in a register is
  incremented each clock cycle.

The LED code is specific to my board. I'm selecting 4 bits (one for each LED)
in the register and displaying them on the board's LEDs. I pick bits in the
middle so they don't change too quickly to see (as would be the case if I
picked the LSBs) or too slow to look cool (as would be the case if I picked the
MSBs).

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span>        program <span class="op_lv0">=</span> <span class="lv12c">[</span>encoding<span class="op_lv12">.</span>IType<span class="op_lv12">.</span>encode<span class="lv11c">(</span>
<span id="L2" class="LineNr"> 2 </span>                        <span class="Number">1</span><span class="op_lv11">,</span>
<span id="L3" class="LineNr"> 3 </span>                        reg<span class="op_lv11">,</span>
<span id="L4" class="LineNr"> 4 </span>                        encoding<span class="op_lv11">.</span>IntRegImmFunct<span class="op_lv11">.</span>ADDI<span class="op_lv11">,</span>
<span id="L5" class="LineNr"> 5 </span>                        reg<span class="op_lv11">,</span>
<span id="L6" class="LineNr"> 6 </span>                        encoding<span class="op_lv11">.</span>Opcode<span class="op_lv11">.</span>OP_IMM<span class="lv11c">)</span><span class="op_lv12">,</span>
<span id="L7" class="LineNr"> 7 </span>                   <span class="Comment"># jump back to the previous instruction for infinite loop</span>
<span id="L8" class="LineNr"> 8 </span>                   encoding<span class="op_lv12">.</span>JType<span class="op_lv12">.</span>encode<span class="lv11c">(</span><span class="Number">0x1ffffc</span><span class="op_lv11">,</span> link_reg<span class="lv11c">)</span><span class="lv12c">]</span>
<span id="L9" class="LineNr"> 9 </span>
<span id="L10" class="LineNr">10 </span>        imem <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Memory<span class="lv12c">(</span>width<span class="op_lv12">=</span><span class="Number">32</span><span class="op_lv12">,</span> depth<span class="op_lv12">=</span><span class="Number">256</span><span class="op_lv12">,</span> init<span class="op_lv12">=</span>program<span class="lv12c">)</span>
<span id="L11" class="LineNr">11 </span>        imem_rp <span class="op_lv0">=</span> m<span class="op_lv0">.</span>submodules<span class="op_lv0">.</span>imem_rp <span class="op_lv0">=</span> imem<span class="op_lv0">.</span>read_port<span class="lv12c">()</span>
<span id="L12" class="LineNr">12 </span>        m<span class="op_lv0">.</span>d<span class="op_lv0">.</span>comb <span class="op_lv0">+=</span> <span class="lv12c">[</span>
<span id="L13" class="LineNr">13 </span>                imem_rp<span class="op_lv12">.</span>addr<span class="op_lv12">.</span>eq<span class="lv11c">(</span>cpu_inst<span class="op_lv11">.</span>imem_addr<span class="lv11c">)</span><span class="op_lv12">,</span>
<span id="L14" class="LineNr">14 </span>                cpu_inst<span class="op_lv12">.</span>imem_data<span class="op_lv12">.</span>eq<span class="lv11c">(</span>imem_rp<span class="op_lv11">.</span>data<span class="lv11c">)</span><span class="op_lv12">,</span>
<span id="L15" class="LineNr">15 </span>        <span class="lv12c">]</span>
<span id="L16" class="LineNr">16 </span>
<span id="L17" class="LineNr">17 </span>        colours <span class="op_lv0">=</span> <span class="lv12c">[</span><span class="String">&quot;</span><span class="String">b</span><span class="String">&quot;</span><span class="op_lv12">,</span> <span class="String">&quot;</span><span class="String">g</span><span class="String">&quot;</span><span class="op_lv12">,</span> <span class="String">&quot;</span><span class="String">o</span><span class="String">&quot;</span><span class="op_lv12">,</span> <span class="String">&quot;</span><span class="String">r</span><span class="String">&quot;</span><span class="lv12c">]</span>
<span id="L18" class="LineNr">18 </span>        leds <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Cat<span class="lv12c">(</span>platform<span class="op_lv12">.</span>request<span class="lv11c">(</span>f<span class="String">&quot;</span><span class="String">led_{c}</span><span class="String">&quot;</span><span class="lv11c">)</span> <span class="Statement">for</span> c <span class="Statement">in</span> colours<span class="lv12c">)</span>
<span id="L19" class="LineNr">19 </span>        m<span class="op_lv0">.</span>d<span class="op_lv0">.</span>sync <span class="op_lv0">+=</span> leds<span class="op_lv0">.</span>eq<span class="lv12c">(</span>cpu_inst<span class="op_lv12">.</span>debug_out<span class="lv11c">[</span><span class="Number">13</span><span class="op_lv11">:</span><span class="Number">17</span><span class="lv11c">]</span><span class="lv12c">)</span>
</pre>
</div>
</html>

And here is a poor quality gif of the LEDs! Very exciting.
![leds](/images/cpu.gif "The LEDs flashing on the FPGA dev board"){.callout}

The next stage will be to implement the rest of the RV32I instructions.
Probably I will start with the load instructions, as I think they will pose a
challenge in my current single-stage architecture. I have a plan for how to
address that. If you'd like to see future instalments of this blog series, you
can follow me on [Twitter](https://twitter.com/lochsh) or subscribe to my
[RSS feed](https://mcla.ug/blog/feeds/all.rss.xml).

## Differences and commonalities between software design and digital logic design
Now that I've completed a lot more of the design and implementation of my CPU,
I have some clearer thoughts on this topic. I thought there would be some
clear differences in kind between software design and digital logic design.
After much thought, I wonder if there are merely differences in degree.

### Concurrency
First, let's consider concurrency. This is a topic that's sometimes
misunderstood, so let's be clear: concurrency happens whenever different
parts of your system might execute at different times or out of order[^6]. A
system is concurrent if it can support having multiple tasks in progress at the
same time; this could be in parallel, or it could involve switching between the
tasks while only actually executing one at any given moment.

Arguably, the default state for software is to have no concurrency &ndash; it
often needs explicitly created (e.g. by creating a thread), or at the very
least, it needs explicitly handled (e.g. in an interrupt handler). I think any
software engineer who has worked on concurrent software would agree that
dealing with concurrency is a singular challenge that creates room for
difficult and subtle bugs. For these two reasons, software generally has
limited concurrency.

Now imagine concurrency is your default state, and that every single piece of
state is updating all at once every step of your program.

That is the default state of digital logic. While in software you generally
have to explicitly create (or at least explicitly handle) concurrency, in
hardware you have to deliberately make something sequential.

I said above that concurrency in software is challenging. If digital hardware
has more concurrency, is it more challenging to design? Perhaps! It's hard for
me to comment on this due to my lack of experience in hardware design.

Perhaps one reason that concurrency is so difficult in software is the annoying
habit of a lot of software[^8] to be dependent on a colossal amount of state.
How many possible states does a mere kilo-bit of memory have? 2^{1024} is too
big a number for me to conceptualise. And yet a kilo-bit is nothing by many
program's standards.

In hardware, state is more precious. My FPGA is only so large. I have an
ice40hx8k, which has 8000 logic cells. Each cell has one 4-input LUT and one
flip-flop: so let's say 8000 bits of state. Pathetic! Watch me create
millions of bits of pure chaos with a single call to `malloc`.

And of course, if you were designing for silicon, the size of your design would
be directly related to cost!

### Verification
So, we've considered concurrency. Another thing I wondered is whether digital
hardware has some fundamental property that makes it easier to formally verify,
or at least to demonstrate equivalence with a model. When I worked on a system
that could kill people if it malfunctioned, in our risk assessments we had to
assume 100% chance of software failure. Practically this generally meant that
software mitigation alone was not enough. I found it strange that the FPGA
component of our system was considered much more trusted. Did hardware have
some fundamental property that made it "better"?

Once again, I don't think there _is_ a fundamental difference here. After all,
software exists that has been formally verified. In general, functional
programming lends itself better to this due to the separation of state and
behaviour. It seems more likely that the difference is in the careful
management of state. The properties of digital hardware described above
encourage this, but it's not impossible to do in software.

The huge teams of verification engineers that work on silicon design might also
suggest some fundamental difference, given you might not have seen the same
applied to software. However, there _are_ software projects that are given this
level of rigour! Most famously, much of NASA's software, like software for
space shuttles[^9]. The sad truth is that most companies don't consider it
worth it to apply this rigour to their software (it's hugely expensive!). When
sufficient lives and/or money are on the line, software _can_ and _is_ written
and tested with the same level of rigour as a lot of hardware..

If you have thoughts to share on what you think the differences and
commonalities between hardware and software design are, please share them via
[email](mailto:h@mcla.ug) or in Hacker News comments if you have come from
there. It's been really interesting to ponder, and I'd be interested in
different perspectives.

[^1]: Hacker News comment, 2021
[^2]: [https://riscv.org/wp-content/uploads/2017/05/riscv-spec-v2.2.pdf](https://riscv.org/wp-content/uploads/2017/05/riscv-spec-v2.2.pdf)
[^3]: Just a note: the word "register" is pretty overloaded. You may have heard
it in the context used above (the small storage accessed directly by the CPU);
for memory-mapped IO in a microcontroller; you may have also heard "register"
used as a verb to describe saving state in hardware.
[^4]: I think generally "branch" is used to describe conditional instructions,
whereas "jump" is used to describe unconditional instructions. Certainly this
is the case in RISC-V, but I think it very much depends on the particular
architecture, and sometimes they are used interchangeably.
[^5]: Least Significant Bit
[^6]: wording from [https://docs.rust-embedded.org/book/concurrency/](https://docs.rust-embedded.org/book/concurrency/)
[^7]: Of course in analogue reality things are not happening at exactly the
same time, but our abstraction is the discrete time period of our clock.
[^8]: functional programmers, we don't need your smugness here!
[^9]: [https://www.fastcompany.com/28121/they-write-right-stuff](https://www.fastcompany.com/28121/they-write-right-stuff)
