Title: How to flash an LED
Slug: how-to-flash-an-led
Date: 27 March 2020
Cover: /images/asm-preview.png

Today we are going to be learning how to flash an LED on a microcontroller by
writing ARM assembly.

If you write software but are  unfamiliar with basic electronics or embedded
software development, there will be explanations of some fundamentals &ndash; I
expect you will not feel left behind :).

If you'd like to skip the fundamentals and go straight to the assembly writing,
click [here](#writingcode).

We'll be using a [1bitsy](https://1bitsy.org/){:target="_blank"}, which is an
[STM32](https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html){:target="_blank"} development
board. We'll be reading the STM32 reference manual to figure out what assembly
to write. If you want to try out the coding yourself, but don't have a 1bitsy
or anything similar, check out [this Github repo](https://github.com/lochsh/gpio-toggle-exercise){:target="_blank"}
where you can run the code on an emulator in a Docker container.

# Some basics
Let's get some basics out of the way. How _do_ you flash an LED?

## Hardware
<img src="/images/led-flash/led.svg" width="100" alt="LED circuit symbol" class=callout>
As you may know, an LED is a "light-emitting diode". LEDs are
increasingly popular in torches, bulbs and various other lighting due to their
ability to be very bright with relatively low power. What we need to know is
that they emit light when current passes through them. So: we need some
current.

<img src="/images/led-flash/ledcircuit.svg" width="100" alt="LED circuit" class=callout>
This is just a simple electronics circuit with current flowing through the LED.
We have low voltage at the bottom, and higher voltage at the top: that
difference causes current to flow, lighting up our LED. But this is no good for
us &ndash; we want to control the flow of current so that we can flash our LED on
and off.

In order to control the current in our LED, we can connect it to a GPIO pin on
our microcontroller:
<img src="/images/led-flash/ledcircuitgpio.svg" width="300" alt="LED connected to a GPIO" class=callout>

GPIO just stands for "general purpose input/output". It's a pin on a
microchip that you can configure at runtime: for example, you can say "I
want this pin to be an output, and I want to turn it on", or "I want this pin
to be an input" and then read data from it.

A microcontroller is a small computer used for embedded software &ndash; we'll learn
more about the specific microcontroller we're using later. Embedded software is
software that isn't written for a general purpose computer, but instead targets
specific hardware used in some physical device: for example, the software that
runs on an MRI scanner to control its operation, or the software in modern cars
that controls things like the anti-lock braking system.

##Software
If GPIO pins are configurable at runtime, then we need to write
some code that will tell our little computer how to configure the
GPIO. This is how that would usually look:

<img src="/images/led-flash/ledsoftwarecompile.svg" width="100%" alt="embedded software development process" class=callout>

Usually, you'd expect that code to be written in C. You need a language that
allows you control over memory the way that C does: when you have small limited
memory, as is generally the case on small embedded computers,
it's important to be able to understand how much memory is being used by
your program. Languages that rely on dynamic allocation and garbage collection
are a bad fit, partly for this reason.

[Rust](https://mcla.ug/blog/rust-a-future-for-real-time-and-safety-critical-software.html){:target="_blank"} and C++ are also used for embedded work. The C++ you'd write for embedded
would be quite different from what you might write for a desktop application
&ndash; you likely wouldn't use any of the STL containers as they all rely on
dynamic memory allocation.  Eliminating dynamic memory allocation is safer: the
risk of memory allocation failing is much higher when there isn't much memory
to begin with.  And a failure could be much more catastrophic: many embedded
systems are designed to run autonomously, without any human there to restart
them. Many control safety-critical physical systems.

Dynamic allocation is generally not needed anyway:  a desktop application might
have to dynamically allocate resources to accommodate a user opening an unknown
number of tabs in a GUI; an embedded application will know at compile time how
many motors it has to control, or how many sensors it will read from. This
allows a lot of memory to be allocated statically.

So, for the sake of example let's say that you would write your code to flash
an LED in C.  You'd probably use a hardware abstraction library (aka a HAL) to
abstract over memory addresses and such. This makes the code more portable as
well as more readable.

But today, we're going to do stuff a little differently from how you might
normally: we'll be writing all our code in assembly.

## What is assembly?
When you compile a C program, say, you compile it to machine code. Machine code
is the lowest level of software &ndash; it's the binary code that the CPU
executes.  This machine code consists of _instructions_. For example, you might
have one instruction that says "copy value 42 into register 0", and that is our
smallest unit of executable code.

Assembly is the next level of software up &ndash; it's a lot like writing human
readable machine code, where you write out each instruction in text form.  This
is very different to writing a C program which is much further abstracted,
which means compiling C to machine code is a lot more complicated. When we
write assembly today, that's exactly what our CPU is going to be executing:
there's a very close mapping to the actual machine code.

## Why write our code in assembly?
The usual reasons: for fun and learning! Writing code in assembly means really
getting to know your target hardware. Plus, we'll know exactly what code is
running on our processor.

Although this isn't something you might usually do, understanding assembly code
is a big part of many developers' jobs: reading the assembly is often the only
way to debug optimised code, and it's crucial to reverse engineering and
exploit development. It's also key to compiler development, and used for making
specific optimisations to embedded code. It's often the only way to access
specialised CPU features, and to run special instructions like DSP
instructions.

# Getting to know our hardware
Doing embedded development means really getting to know your target hardware.
So, what hardware are we using?

![hardware](/images/led-flash/hardware.png "list of hardware and documentation"){.callout}

We have an ARM development board called a 1bitsy. It has an STM32F4 on it,
which is our microcontroller unit, or MCU. This microcontroller is basically
the CPU plus about a megabyte of flash and 200 kilobytes of RAM, and what
are called peripherals: some of these are for communicating via various
protocols, and some are for general purposes usage, like the GPIOs we talked
about earlier.  The MCU has everything you need to make the CPU actually be
a useful computer.  Our STM32 contains a Cortex M4 CPU &ndash; the picture
above is of the die of the STM32, it's basically what's inside the black
plastic on the outside of the chip.  The CPU is on the top right of the die,
with RAM top left, flash bottom left, and peripherals bottom right.

I've included lists of the documentation associated with these. Today we're
exclusively going to be looking at the schematic for the board and the
reference manual for the STM32.

To program the 1bitsy, we will also need a prorgrammer board like the
[Black Magic probe](https://github.com/blacksphere/blackmagic/wiki){:target="_blank"}.

# A brief introduction to assembly

## What does assembly look like?
Before we get onto writing some code, what does ARM assembly look like?

Here is an example instruction: `mov r0, #5`. This means move the literal value
5 into register 0. But what's a register? A register is the last key concept
we're going to need to know before we write any assembly.

<img src="/images/led-flash/registers.svg" width="250" alt="registers of Cortex M4" class=callout>

Our ARM processor has a small number of very fast, very small storage
locations, and they're called registers. These are directly accessed by the
CPU, and they aren't accessible via main memory. Some are used for general
purpose storage, others have specific purposes, like the program counter
register (PC). The CPU is hardwired to execute whatever instruction is at the
memory location stored in the PC. The stack pointer is used to keep track of
the call stack.

On a separate memory bus, our STM32 also has about a thousand configuration and
status registers &ndash; also often called memory-mapped IO. These are basically
pre-defined structs that live somewhere in memory, and you read & write to them
in order to configure the hardware. In our case, we'll be writing to these to
configure a GPIO, which will be connected to our LED.

## RISC vs CISC
I think it's important context to note that the assembly we'll be writing today
is a little different than what you would likely write for your PC. Broadly,
you can divide computer architectures into complex instruction set computers
(CISC) and reduced instruction set computers (RISC).  CISC is what Intel
chips use, and it is optimised to perform actions in as few instructions as
possible &ndash; as a consequence each instruction itself can be very complex.
RISC, on the other hand, prioritises having simple instructions, and you'll
be glad to know that's what we'll be writing today.

I couldn't resist including a screenshot from Hackers, my favourite movie,
which is from 1995, a much more hopeful time in software.

![risc](/images/led-flash/risc.png "screengrab from Hackers the movie"){.callout}

Here the hacker Acid Burn is saying that RISC architecture is going to change
everything &ndash; and in many ways she's right! I don't know of any mobile phone,
Apple or Android, that doesn't use an ARM core, and mobile phones are
everywhere. Sadly, most laptops and desktops use Intel CISC processors. This
makes no difference to my life at all, but I like to pretend it matters to me
so I can feel like I'm as cool as Acid Burn.

# Let's write some code! {#writingcode}
At last...it is time to get down to business. First we need to briefly
look at the [schematic](https://github.com/1Bitsy/1bitsy-hardware/blob/51de093b188c909c3b7af41ad1a1134d68a42f0e/1bitsy/v1.0d/1bitsy_schematic.pdf){:target="_blank"}
for the 1bitsy, our development board. The schematic tells us what is on the
board, and how it is connected. We're interested in how the status LED is
connected.

Because the 1bitsy is quite simple, there is only one page to the schematic.
If we look at the top of the schematic, centre-right, we can see that there's a
status LED connected to GPIO port A, pin 8, which we'll call PA8 for short.

<img src="/images/led-flash/ledschematic.png" width="250" alt="LED in 1bitsy schematic" class=callout>

There are three things we're going to need to do:

1. Turn on the GPIOA clock
2. Set GPIOA8 to an output
3. Toggle GPIOA8

## Turning on the clock
Before we can do anything with this GPIO pin, we need to set up its clock.
Inside our chip, and inside the CPUs in our work laptops, there's a oscillator
providing a clock signal that is used to synchronise different parts of the
complicated integrated circuit that is our computer.

If we are going to use our GPIO pin, it needs to have its clock enabled,
otherwise it is effectively off, and won't respond to any reads or writes.
It defaults to being off because the peripheral consumes power when it's on.

To find out how to setup the GPIOA clock, we need to look at the STM32F415
[reference manual](https://tinyurl.com/f4-ref-man){:target="_blank"}, or ref man for short.
We want to look at the memory map, to see what the start address is for the
Reset and Clock Control (RCC) registers.

<img src="/images/led-flash/memory-map-rcc.png" width="100%" alt="STM32 memory map" class=callout>

We're going to need a bit more information in order to set the clock, but this
memory address is something we'll need in our code, so let's make a note of it
(0x40023800).

Let's go to the RCC register map next &ndash; this is how we're going to find
exactly which RCC register we need to write to in order to turn on the GPIOA
clock.

<img src="/images/led-flash/rcc-register-map.png" width="100%" alt="RCC register map" class=callout>

The first column in this table shows the address offset from the base address
we noted earlier. The numbers from 31 to 0 show the bits of the 32-bit
registers.

If we look closely, we can see the field GPIOA_ENR for enabling GPIOA's clock
&ndash; so, we want to set bit 0 in the AHB1ENR register. I realise that might
seem very obscure; I think there are two things to note: firstly, there's
actually a lot of additional documentation about this elsewhere in the ref man,
showing the different memory buses and the clock tree. It would be too dense to
show in this blog post.

Secondly, when you create a software API, a huge priority is making something
that is useable and clear to developers (I should hope it is, anyway). When
designing hardware, there are physical constraints, and the design _has_
to be cheap and simple to mass manufacture. Consequently, clarity for us chumps
cannot be a priority, and instead of a method call with helpfully named
arguments, we have dense manuals like this...

Reading this sort of documentation does get easier the more you get to know
your architecture, and the more experience you have reading similar manuals
&ndash; as with anything :)

### Actually writing code for real
Now: we're finally going to write some actual code. I am sorry I said "let's
write some code" further up. We couldn't do it until we had this information
from the ref man!

Let's copy that RCC base address into register 0. Our registers are all 32 bits
wide, but we can only copy 16 bits at a time, otherwise we'd have no room for
the rest of our instruction. So, we copy 0x00003800 into the register using the
`mov` instruction, and then copy 0x4002 into the top half, hence the `t` in
`movt` below.

Then, we want to set the 0th bit in the AHB1ENR register. First, let's copy
0x01 into r1. Then, let's store the contents of r1 in the memory address
contained in r0, offset by 0x30 using the `str` instruction.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>    <span class="op_lv0">@</span> <span class="Function">Store</span> <span class="Function">RCC</span> <span class="Function">base</span> <span class="Function">address</span> <span class="Function">in</span> <span class="Type">r0</span>
<span id="L2" class="LineNr">2 </span>    <span class="Keyword">movw</span> <span class="Type">r0</span><span class="op_lv0">,</span> <span class="Constant">#0x3800</span>
<span id="L3" class="LineNr">3 </span>    <span class="Keyword">movt</span> <span class="Type">r0</span><span class="op_lv0">,</span> <span class="Constant">#0x4002</span>
<span id="L4" class="LineNr">4 </span>
<span id="L5" class="LineNr">5 </span>    <span class="op_lv0">@</span> <span class="Function">Turn</span> <span class="Function">on</span> <span class="Function">GPIOA</span> <span class="Function">clock</span> <span class="Function">by</span> <span class="Function">setting</span> <span class="Function">bit</span> <span class="Constant">0</span> <span class="Function">in</span> <span class="Function">AHB1ENR</span> <span class="Function">register</span>
<span id="L6" class="LineNr">6 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x01</span>
<span id="L7" class="LineNr">7 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x30</span><span class="lv12c">]</span>
</pre>
</div>
</html>

With these runes, we can enable the clock!

All the `mov` instructions are about moving data into registers. The `str`
instruction moves data from registers and into memory.

You can read more detail about these instructions in the [User Guide](http://infocenter.arm.com/help/topic/com.arm.doc.dui0553b/DUI0553.pdf){:target="_blank"} for our CPU.

## Setting GPIOA8 to an output
Next on our list is configuring GPIOA8 to be an output. As before, we can look
up the base address of GPIOA registers in the ref man. It's 0x40020000. Then,
we can have a read of the GPIO registers to find out which one we need to write
to.

<img src="/images/led-flash/gpioen.png" width="100%" alt="GPIO enable register" class=callout>

It looks like we want GPIOA_MODER, and you can see above that the reset value
is 0xA8000000 for GPIOA. I understand this is because some of the GPIOA pins
are used for the debug interface of the STM32, otherwise the reset value would
be all zeroes. We want to change the two-bit field MODER8 to be 01, so we want
to set the register value to 0xA8010000.  There is no offset this time as the
mode register is the first GPIO register.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>    <span class="op_lv0">@</span> <span class="Function">Store</span> <span class="Function">start</span> <span class="Function">address</span> <span class="Function">of</span> <span class="Function">GPIOA</span> <span class="Function">registers</span>
<span id="L2" class="LineNr">2 </span>    <span class="Keyword">movw</span> <span class="Type">r0</span><span class="op_lv0">,</span> <span class="Constant">#0x0000</span>
<span id="L3" class="LineNr">3 </span>    <span class="Keyword">movt</span> <span class="Type">r0</span><span class="op_lv0">,</span> <span class="Constant">#0x4002</span>
<span id="L4" class="LineNr">4 </span>
<span id="L5" class="LineNr">5 </span>    <span class="op_lv0">@</span> <span class="Function">Use</span> <span class="Function">GPIOA_MODER</span> <span class="Function">to</span> <span class="Function">make</span> <span class="Function">GPIOA8</span> <span class="Function">an</span> <span class="Function">output</span>
<span id="L6" class="LineNr">6 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0000</span>
<span id="L7" class="LineNr">7 </span>    <span class="Keyword">movt</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0xA801</span>
<span id="L8" class="LineNr">8 </span>    <span class="Keyword">str </span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="lv12c">]</span>
</pre>
</div>
</html>

## Toggling the GPIO
<img src="/images/led-flash/gpiooutdata.png" width="100%" alt="GPIO output data register" class=callout>
If we look at the GPIO documentation, it tells us that there is an output data
register, but access to it isn't atomic. That's not a big problem for us here
as we don't have any concurrency, but maybe we will later on! We can use the
bit-set-reset register for atomic access instead. This also allows us to set
individual bits in the output data register, instead of overwriting any values
on other GPIO pins.

<img src="/images/led-flash/bsrr.png" width="100%" alt="GPIO output data register" class=callout>

The direction our LED has been wired up means it's active low, so it will turn
on when the GPIO output is cleared, and off when it is set.

So, to turn on our LED we want to set the BR8 field, and to turn it off, we
want to set the BS8 field.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>    <span class="op_lv0">@</span> <span class="Function">Set</span> <span class="Function">BR8</span> <span class="Function">field</span> <span class="Function">in</span> <span class="Function">GPIOA_BSRR</span><span class="op_lv0">,</span> <span class="Function">to</span> <span class="Function">clear</span> <span class="Function">GPIOA8</span>
<span id="L2" class="LineNr">2 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0000</span>
<span id="L3" class="LineNr">3 </span>    <span class="Keyword">movt</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0100</span>
<span id="L4" class="LineNr">4 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x18</span><span class="lv12c">]</span>
<span id="L5" class="LineNr">5 </span>
<span id="L6" class="LineNr">6 </span>    <span class="op_lv0">@</span> <span class="Function">Set</span> <span class="Function">BS8</span> <span class="Function">field</span> <span class="Function">in</span> <span class="Function">GPIOA_BSRR</span><span class="op_lv0">,</span> <span class="Function">to</span> <span class="Function">set</span> <span class="Function">GPIOA8</span>
<span id="L7" class="LineNr">7 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0100</span>
<span id="L8" class="LineNr">8 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x18</span><span class="lv12c">]</span>
</pre>
</div>
</html>

### Looping
The last code snippet will just turn the LED off and on once. To create an
infinite loop instead, we simply create a label (let's call it `.loop`) and
then use the branch instruction to go back to that label!

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="op_lv0">.</span>loop<span class="op_lv0">:</span>
<span id="L2" class="LineNr"> 2 </span>    <span class="op_lv0">@</span> <span class="Function">Set</span> <span class="Function">BR8</span> <span class="Function">field</span> <span class="Function">in</span> <span class="Function">GPIOA_BSRR</span><span class="op_lv0">,</span> <span class="Function">to</span> <span class="Function">clear</span> <span class="Function">GPIOA8</span>
<span id="L3" class="LineNr"> 3 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0000</span>
<span id="L4" class="LineNr"> 4 </span>    <span class="Keyword">movt</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0100</span>
<span id="L5" class="LineNr"> 5 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x18</span><span class="lv12c">]</span>
<span id="L6" class="LineNr"> 6 </span>
<span id="L7" class="LineNr"> 7 </span>    <span class="op_lv0">@</span> <span class="Function">Set</span> <span class="Function">BS8</span> <span class="Function">field</span> <span class="Function">in</span> <span class="Function">GPIOA_BSRR</span><span class="op_lv0">,</span> <span class="Function">to</span> <span class="Function">set</span> <span class="Function">GPIOA8</span>
<span id="L8" class="LineNr"> 8 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0100</span>
<span id="L9" class="LineNr"> 9 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x18</span><span class="lv12c">]</span>
<span id="L10" class="LineNr">10 </span>
<span id="L11" class="LineNr">11 </span>    <span class="Keyword">b</span> <span class="op_lv0">.</span>loop
</pre>
</div>
</html>

### Adding a delay
Now for something that is hopefully a lot more interesting than just shoving
values into memory addresses. We want to do this in a loop, with a delay
between turning the LED off an on!

There are a few ways you could do this delay. If precise timing was important,
the timer peripherals of the STM32 can be used. We could also just add a lot of
`nop` (no operation) over and over again -- that doesn't feel very
sophisticated, and would give us a really large binary!

We're going to do this by putting a big number in a register and decrementing
it until it hits zero. So, we're creating another loop, but this time with an
exit condition.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="op_lv0">.</span>loop<span class="op_lv0">:</span>
<span id="L2" class="LineNr"> 2 </span>    <span class="op_lv0">@</span> <span class="Function">Set</span> <span class="Function">BR8</span> <span class="Function">field</span> <span class="Function">in</span> <span class="Function">GPIOA_BSRR</span><span class="op_lv0">,</span> <span class="Function">to</span> <span class="Function">clear</span> <span class="Function">GPIOA8</span>
<span id="L3" class="LineNr"> 3 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0000</span>
<span id="L4" class="LineNr"> 4 </span>    <span class="Keyword">movt</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0100</span>
<span id="L5" class="LineNr"> 5 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x18</span><span class="lv12c">]</span>
<span id="L6" class="LineNr"> 6 </span>
<span id="L7" class="LineNr"> 7 </span>    <span class="op_lv0">@</span> <span class="Function">Delay</span>
<span id="L8" class="LineNr"> 8 </span>    <span class="Keyword">movw</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x3500</span>
<span id="L9" class="LineNr"> 9 </span>    <span class="Keyword">movt</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x000c</span>
<span id="L10" class="LineNr">10 </span><span class="op_lv0">.</span>L<span class="Constant">1</span><span class="op_lv0">:</span>
<span id="L11" class="LineNr">11 </span>    <span class="Keyword">subs</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x0001</span>
<span id="L12" class="LineNr">12 </span>    <span class="Keyword">bne</span> <span class="op_lv0">.</span>L<span class="Constant">1</span>
<span id="L13" class="LineNr">13 </span>
<span id="L14" class="LineNr">14 </span>    <span class="op_lv0">@</span> <span class="Function">Set</span> <span class="Function">BS8</span> <span class="Function">field</span> <span class="Function">in</span> <span class="Function">GPIOA_BSRR</span><span class="op_lv0">,</span> <span class="Function">to</span> <span class="Function">set</span> <span class="Function">GPIOA8</span>
<span id="L15" class="LineNr">15 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0100</span>
<span id="L16" class="LineNr">16 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x18</span><span class="lv12c">]</span>
<span id="L17" class="LineNr">17 </span>
<span id="L18" class="LineNr">18 </span>    <span class="op_lv0">@</span> <span class="Function">Delay</span>
<span id="L19" class="LineNr">19 </span>    <span class="Keyword">movw</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x3500</span>
<span id="L20" class="LineNr">20 </span>    <span class="Keyword">movt</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x000c</span>
<span id="L21" class="LineNr">21 </span><span class="op_lv0">.</span>L<span class="Constant">2</span><span class="op_lv0">:</span>
<span id="L22" class="LineNr">22 </span>    <span class="Keyword">subs</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x0001</span>
<span id="L23" class="LineNr">23 </span>    <span class="Keyword">bne</span> <span class="op_lv0">.</span>L<span class="Constant">2</span>
<span id="L24" class="LineNr">24 </span>
<span id="L25" class="LineNr">25 </span>    <span class="Keyword">b</span> <span class="op_lv0">.</span>loop
</pre>
</div>
</html>

The `subs` instruction here is subtracting, and the `s` suffix means that a
flag will be set in the Program Status Register if the result of the operation
is zero. The `bne` instruction means "branch if not equal (to zero)", so we'll
jump back to the start of our delay loop if that zero flag isn't set.

## Putting the pieces together
We now have everything we need to flash our LED &ndash; almost.

There's some boilerplate that needs added to our assembly file. We need to give
our a name to the entry point, let's call it `main`. 

There are two instruction encodings for ARM: ARM and Thumb. The encoding
defines how the assembly is translated to machine code. It used to be that you
needed different syntax for each of these, until ARM brought out their unified
assembly language. Line 1 below is telling the assembler (the tool that turns
the assembly into machine code) which syntax we are using.

Then, line 3 is telling the assembler that we are using the Thumb encoding for
`main`, which is the only encoding our target (the STM32F4) supports. Then line
4 is exposing the symbol `main` to the linker.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span><span class="PreProc">.syntax</span> <span class="Function">unified</span>
<span id="L2" class="LineNr">2 </span>
<span id="L3" class="LineNr">3 </span><span class="PreProc">.thumb_func</span>
<span id="L4" class="LineNr">4 </span><span class="PreProc">.global</span> <span class="Function">main</span>
<span id="L5" class="LineNr">5 </span><span class="Function">main:</span>
</pre>
</div>
</html>

Lastly, we need to make sure our program is what runs when our microcontroller
powers on.  The reset vector is the location the CPU will go to find
the first instruction it will execute after being reset.

What we’re doing below is putting the address of `main` into the reset vector
so that when our board turns on, it will go to that address and start running
our code to flash the LED.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span><span class="PreProc">.section</span> <span class="op_lv0">.</span>vector_table<span class="op_lv0">.</span>reset_vector
<span id="L2" class="LineNr">2 </span><span class="PreProc">.word</span> <span class="Function">main</span>
</pre>
</div>
</html>

We now have our final asm file:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="PreProc">.syntax</span> <span class="Function">unified</span>
<span id="L2" class="LineNr"> 2 </span>
<span id="L3" class="LineNr"> 3 </span><span class="PreProc">.thumb_func</span>
<span id="L4" class="LineNr"> 4 </span><span class="PreProc">.global</span> <span class="Function">main</span>
<span id="L5" class="LineNr"> 5 </span><span class="Function">main:</span>
<span id="L6" class="LineNr"> 6 </span>    <span class="op_lv0">@</span> <span class="Function">Store</span> <span class="Function">RCC</span> <span class="Function">base</span> <span class="Function">address</span> <span class="Function">in</span> <span class="Type">r0</span>
<span id="L7" class="LineNr"> 7 </span>    <span class="Keyword">movw</span> <span class="Type">r0</span><span class="op_lv0">,</span> <span class="Constant">#0x3800</span>
<span id="L8" class="LineNr"> 8 </span>    <span class="Keyword">movt</span> <span class="Type">r0</span><span class="op_lv0">,</span> <span class="Constant">#0x4002</span>
<span id="L9" class="LineNr"> 9 </span>
<span id="L10" class="LineNr">10 </span>    <span class="op_lv0">@</span> <span class="Function">Turn</span> <span class="Function">on</span> <span class="Function">GPIOA</span> <span class="Function">clock</span> <span class="Function">by</span> <span class="Function">setting</span> <span class="Function">bit</span> <span class="Constant">0</span> <span class="Function">in</span> <span class="Function">AHB1ENR</span> <span class="Function">register</span>
<span id="L11" class="LineNr">11 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x01</span>
<span id="L12" class="LineNr">12 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x30</span><span class="lv12c">]</span>
<span id="L13" class="LineNr">13 </span>
<span id="L14" class="LineNr">14 </span>    <span class="op_lv0">@</span> <span class="Function">Store</span> <span class="Function">start</span> <span class="Function">address</span> <span class="Function">of</span> <span class="Function">GPIOA</span> <span class="Function">registers</span>
<span id="L15" class="LineNr">15 </span>    <span class="Keyword">movw</span> <span class="Type">r0</span><span class="op_lv0">,</span> <span class="Constant">#0x0000</span>
<span id="L16" class="LineNr">16 </span>    <span class="Keyword">movt</span> <span class="Type">r0</span><span class="op_lv0">,</span> <span class="Constant">#0x4002</span>
<span id="L17" class="LineNr">17 </span>
<span id="L18" class="LineNr">18 </span>    <span class="op_lv0">@</span> <span class="Function">Use</span> <span class="Function">GPIOA_MODER</span> <span class="Function">to</span> <span class="Function">make</span> <span class="Function">GPIOA8</span> <span class="Function">an</span> <span class="Function">output</span>
<span id="L19" class="LineNr">19 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0000</span>
<span id="L20" class="LineNr">20 </span>    <span class="Keyword">movt</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0xA801</span>
<span id="L21" class="LineNr">21 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="lv12c">]</span>
<span id="L22" class="LineNr">22 </span>
<span id="L23" class="LineNr">23 </span><span class="op_lv0">.</span>loop<span class="op_lv0">:</span>
<span id="L24" class="LineNr">24 </span>    <span class="op_lv0">@</span> <span class="Function">Set</span> <span class="Function">BR8</span> <span class="Function">field</span> <span class="Function">in</span> <span class="Function">GPIOA_BSRR</span><span class="op_lv0">,</span> <span class="Function">to</span> <span class="Function">clear</span> <span class="Function">GPIOA8</span>
<span id="L25" class="LineNr">25 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0000</span>
<span id="L26" class="LineNr">26 </span>    <span class="Keyword">movt</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0100</span>
<span id="L27" class="LineNr">27 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x18</span><span class="lv12c">]</span>
<span id="L28" class="LineNr">28 </span>
<span id="L29" class="LineNr">29 </span>    <span class="op_lv0">@</span> <span class="Function">Delay</span>
<span id="L30" class="LineNr">30 </span>    <span class="Keyword">movw</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x3500</span>
<span id="L31" class="LineNr">31 </span>    <span class="Keyword">movt</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x000c</span>
<span id="L32" class="LineNr">32 </span><span class="op_lv0">.</span>L<span class="Constant">1</span><span class="op_lv0">:</span>
<span id="L33" class="LineNr">33 </span>    <span class="Keyword">subs</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x0001</span>
<span id="L34" class="LineNr">34 </span>    <span class="Keyword">bne</span> <span class="op_lv0">.</span>L<span class="Constant">1</span>
<span id="L35" class="LineNr">35 </span>
<span id="L36" class="LineNr">36 </span>    <span class="op_lv0">@</span> <span class="Function">Set</span> <span class="Function">BS8</span> <span class="Function">field</span> <span class="Function">in</span> <span class="Function">GPIOA_BSRR</span><span class="op_lv0">,</span> <span class="Function">to</span> <span class="Function">set</span> <span class="Function">GPIOA8</span>
<span id="L37" class="LineNr">37 </span>    <span class="Keyword">movw</span> <span class="Type">r1</span><span class="op_lv0">,</span> <span class="Constant">#0x0100</span>
<span id="L38" class="LineNr">38 </span>    <span class="Keyword">str</span>  <span class="Type">r1</span><span class="op_lv0">,</span> <span class="lv12c">[</span><span class="Type">r0</span><span class="op_lv12">,</span> <span class="Constant">#0x18</span><span class="lv12c">]</span>
<span id="L39" class="LineNr">39 </span>
<span id="L40" class="LineNr">40 </span>    <span class="op_lv0">@</span> <span class="Function">Delay</span>
<span id="L41" class="LineNr">41 </span>    <span class="Keyword">movw</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x3500</span>
<span id="L42" class="LineNr">42 </span>    <span class="Keyword">movt</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x000c</span>
<span id="L43" class="LineNr">43 </span><span class="op_lv0">.</span>L<span class="Constant">2</span><span class="op_lv0">:</span>
<span id="L44" class="LineNr">44 </span>    <span class="Keyword">subs</span> <span class="Type">r2</span><span class="op_lv0">,</span> <span class="Constant">#0x0001</span>
<span id="L45" class="LineNr">45 </span>    <span class="Keyword">bne</span> <span class="op_lv0">.</span>L<span class="Constant">2</span>
<span id="L46" class="LineNr">46 </span>
<span id="L47" class="LineNr">47 </span>    <span class="Keyword">b</span> <span class="op_lv0">.</span>loop
<span id="L48" class="LineNr">48 </span>
<span id="L49" class="LineNr">49 </span><span class="PreProc">.section</span> <span class="op_lv0">.</span>vector_table<span class="op_lv0">.</span>reset_vector
<span id="L50" class="LineNr">50 </span><span class="PreProc">.word</span> <span class="Function">main</span>
</pre>
</div>
</html>

# Building our code and flashing our target
We use an _assembler_ to turn our assembly into an object file, e.g.

`arm-none-eabi-as -mcpu=cortex-m4 toggle.s -c -o output/toggle.o`

Then we use a linker to make an executable. We need a custom linker script to
tell the linker where RAM and flash start on our target. Here's what I used:
<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="Keyword">ENTRY</span><span class="lv12c">(</span>main<span class="lv12c">)</span>
<span id="L2" class="LineNr"> 2 </span>
<span id="L3" class="LineNr"> 3 </span><span class="PreProc">MEMORY</span> <span class="lv12c">{</span>
<span id="L4" class="LineNr"> 4 </span>    FLASH   <span class="op_lv12">:</span> <span class="Identifier">ORIGIN</span> <span class="op_lv12">=</span> <span class="Number">0x08000000</span><span class="op_lv12">,</span> <span class="Identifier">LENGTH</span> <span class="op_lv12">=</span> <span class="Number">128</span><span class="PreProc">K</span>
<span id="L5" class="LineNr"> 5 </span>    RAM     <span class="op_lv12">:</span> <span class="Identifier">ORIGIN</span> <span class="op_lv12">=</span> <span class="Number">0x20000000</span><span class="op_lv12">,</span> <span class="Identifier">LENGTH</span> <span class="op_lv12">=</span> <span class="Number">128</span><span class="PreProc">K</span>
<span id="L6" class="LineNr"> 6 </span><span class="lv12c">}</span>
<span id="L7" class="LineNr"> 7 </span>
<span id="L8" class="LineNr"> 8 </span><span class="PreProc">SECTIONS</span> <span class="lv12c">{</span>
<span id="L9" class="LineNr"> 9 </span>    <span class="Comment">/\* Vector table is first thing in flash \*/</span>
<span id="L10" class="LineNr">10 </span>    <span class="op_lv12">.</span>vector_table <span class="Identifier">ORIGIN</span><span class="lv11c">(</span>FLASH<span class="lv11c">)</span> <span class="op_lv12">:</span>
<span id="L11" class="LineNr">11 </span>    <span class="lv11c">{</span>
<span id="L12" class="LineNr">12 </span>        <span class="Comment">/\* Initial stack pointer \*/</span>
<span id="L13" class="LineNr">13 </span>        <span class="Type">LONG</span><span class="lv10c">(</span><span class="Identifier">ORIGIN</span><span class="lv9c">(</span>RAM<span class="lv9c">)</span> <span class="op_lv10">+</span> <span class="Identifier">LENGTH</span><span class="lv9c">(</span>RAM<span class="lv9c">)</span><span class="lv10c">)</span><span class="op_lv11">;</span>
<span id="L14" class="LineNr">14 </span>
<span id="L15" class="LineNr">15 </span>        <span class="Comment">/\* Rest of vector table \*/</span>
<span id="L16" class="LineNr">16 </span>        <span class="Keyword">KEEP</span><span class="lv10c">(</span><span class="op_lv10">\*</span><span class="lv9c">(</span><span class="op_lv9">.</span>vector_table<span class="lv9c">)</span><span class="lv10c">)</span><span class="op_lv11">;</span>
<span id="L17" class="LineNr">17 </span>    <span class="lv11c">}</span> <span class="op_lv12">&gt;</span> FLASH
<span id="L18" class="LineNr">18 </span>
<span id="L19" class="LineNr">19 </span>    <span class="Comment">/\* text section contains executable code \*/</span>
<span id="L20" class="LineNr">20 </span>    <span class="op_lv12">.</span>text <span class="Identifier">ADDR</span><span class="lv11c">(</span><span class="op_lv11">.</span>vector_table<span class="lv11c">)</span> <span class="op_lv12">+</span> <span class="Identifier">SIZEOF</span><span class="lv11c">(</span><span class="op_lv11">.</span>vector_table<span class="lv11c">)</span> <span class="op_lv12">:</span>
<span id="L21" class="LineNr">21 </span>    <span class="lv11c">{</span>
<span id="L22" class="LineNr">22 </span>        <span class="op_lv11">\*</span><span class="lv10c">(</span><span class="op_lv10">.</span>text <span class="op_lv10">.</span>text<span class="op_lv10">.\*</span><span class="lv10c">)</span><span class="op_lv11">;</span>
<span id="L23" class="LineNr">23 </span>    <span class="lv11c">}</span> <span class="op_lv12">&gt;</span> FLASH
<span id="L24" class="LineNr">24 </span><span class="lv12c">}</span>
</pre>
</div>
</html>

Then we can call the linker:
`arm-none-eabi-ld -T link.ld output/toggle.o -o output/toggle`

I'm using a [Black Magic probe](https://github.com/blacksphere/blackmagic/wiki){:target="_blank"}
to flash my 1bitsy. I can talk to the probe over gdb:

```bash
gdb-multiarch -n --batch 					\
    -ex 'tar ext /dev/serial/by-id/example' \
    -ex 'mon tpwr en'						\
    -ex 'mon swdp_scan'						\
    -ex 'att 1' 							\
    -ex 'load' 								\
    -ex 'start' 							\
    -ex 'detach' 							\
    output/toggle
```

Voila:
<img src="/images/led-flash/blinky.gif" width="300" alt="A gif of the LED flashing" class=callout>

# Resources
* You can check out my 
[GPIO toggling exercise](https://github.com/lochsh/gpio-toggle-exercise){:target="_blank"}
which talks you through the assembly here in a little more detail, and provides
a Dockerfile for emulating the target chip. I'll have a (shorter) blog post
about the emulation soon.

* Azeria Labs have an [excellent guide](https://azeria-labs.com/writing-arm-assembly-part-1/){:target="_blank"} to ARM assembly that goes into more
detail than I have, though assumes a bit more knowledge about computer
architecture.

* The [Cortex M4 User Guide](http://infocenter.arm.com/help/topic/com.arm.doc.dui0553b/DUI0553.pdf){:target="_blank"} is a good technical reference for the assembly written here
