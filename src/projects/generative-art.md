---
title: What is Generative Art Anyway?
description: If I do this right, my mom will learn something.
tags:
  - onHomepage
link: https://codesketchtober.netlify.app
image: /static/img/gen-art-intro/sea-of-shapes.png
layout: blogpost
galleryImages:
- /static/img/gen-art-intro/organic-rects.png
- /static/img/gen-art-intro/single-curve.png
- /static/img/gen-art-intro/sea-of-shapes.png
- /static/img/gen-art-intro/destroy-square.png
- /static/img/gen-art-intro/youd-never.png
- /static/img/gen-art-intro/three-colors.png
- /static/img/gen-art-intro/isometric-persp.png
- /static/img/gen-art-intro/airport.png
---

## I've been on a real generative art kick.

Generative art is actually what got me started in the programming world, but my latest kick started a few months ago, when I discovered [Raphaël de Courville](https://twitter.com/sableRaph)'s weekly Creative Code Challenges. Not content with a weekly challenge, I started a daily coding challenge for the [month of October](https://codesketchtober.netlify.app). This was going well, until I broke my leg at a bachelorette party and sort of lost steam. Luckily, the generative art community actually already *had* a monthly creative coding challenge, and theirs was in [January](https://genuary.art). So I joined that too.

Now it is February. I've created a lot of pieces I'm proud of in the last few months. But the question remains: What *are* these things? What exactly is it that I'm doing over here? 

Many people have asked me to explain, and I have tried. But I do not think I have done a very good job, or they would have stopped asking by now. And as an explainer-of-things by trade, I can't sit with that.

So this is my attempt to explain what the hell it is I'm doing.

## Generative art is art that has been created according to some instructions

It doesn't necessarily have anything to do with computers. For example, there was an artist named [Sol LeWitt](https://improvisedlife.com/2015/08/10/learning-stealing-sol-lewitt/). His most famous pieces were instructions for drawing on walls. For example, Wall Drawing 1180:

> Within a circle, draw 10,000 black straight lines and 10,000 black not straight lines. All lines are randomly spaced and equally distributed.

That's it. That's the piece. From those instructions, a museum could get hundreds of thousands of slightly different outputs, based on where the installers placed the lines (because LeWitt didn't necessarily draw these himself). They wouldn't know what it would look like until it was finished. 

Basically, LeWitt wrote instructions for humans to read and execute, and the instructions themselves were part of the art piece. You could also write instructions for *computers* to read and execute. And that's mostly what I've been doing.

![A grid with four quadrants. No computer, Not generative: Picasso. No computer, generative: Sol Lewitt. Computer, not generative: Disney/pixar. Computer, generative: We are here!](/static/img/gen-art-computer-grid.png)

## How do you give a computer instructions?

Well, you write code. And you could write a lot of different types of code, but I mostly have been working with JavaScript and a cool little library called [P5.js](https://p5js.org/). P5.js gives me a set of tools to draw things onto a canvas. For example, here are some of the functions P5.js gives me access to:

- `rect(x, y, w, h)`: This one draws a rectangle, in the place I tell it to draw the rectangle.
- `line(x1, y1, x2, y2)`: Similarly, this function draws a line from one point to another.
- `stroke(c)`: In this one, "c" is a color. I'm telling the program, "hey, when I draw things, outline them in this color". 
- `random()`: This gives me a random number between zero and 1. If I give it a list of things inside the parentheses (as in, `random(listOfThings)`), it would give me a random thing from that list. I use this *all the time*.

This is to say: P5.js is very useful.

Imagine I wanted to create a piece that drew an outlined rectangle in a random color at the top of my canvas. If I were Sol Lewitt, I might write the instructions like this:

> There are ten colored markers. Choose a color at random. At the top left corner of the canvas, draw a rectangle.

If I wanted to get really specific, I could even say, "draw a rectangle which is 6 inches wide and 4 inches tall".

To give a computer the same instructions, using p5.js, it would look like this:

```js
let colors = ["blue", "red", "green", "orange", "purple"];

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background("white");

  strokeWeight(4);
  let marker = random(colors);
  stroke(marker);
  rect(0, 0, 120, 80);
}

function mouseReleased() {
  redraw()
}
```

This means:
- First, establish that some colors exist. I'm using named colors here, but you could also define them based on hex codes (like <span style="color: #ff0066">#ff0066</span>) or RBGA values if that's more your thing.
- Then, set up your environment. Create a canvas, and tell the program it's only going to run once. Sometimes programs run many times, which can give you animations.
- Tell your program you want the canvas to have a white background.
- Tell your program you want your lines to be four pixels wide.
- Tell your program that it can pick a marker at random.
- Tell your program to draw with the marker.
- Tell your program to draw the rectangle, at point 0, 0. The width of the rectangle is 120 pixels, and height is 80 pixels.
- Tell your program that if it sees someone click the canvas, do the `draw` function again.

And after all that, we get:

<div class="responsive-wrapper bg-gray-200 relative border-gray-200 border-4">
<iframe src="https://editor.p5js.org/csb324/full/PmwrjZdLB" class="absolute inset-0 w-full h-full"></iframe>
</div>

If you click the "</>" in that preview, you can edit the code yourself. Change some numbers and see what happens.

## But this is boring

Yeah, this is a very boring rectangle. Here's [an actual piece](https://codesketchtober.netlify.app/g31) I created at the end of Genuary. It's more interesting than a rectangle, but the instructions are still pretty straightforward.

![The absence of a calendar](/static/img/gen-art-intro/negative.png)


## What I told the computer to make it draw this

- Make up some numbers. Choose how big the squares are going to be. They can be as big as one-eighth the size of the canvas and as small as one-twelfth the size of the canvas. Also, choose how much space will be between the squares (at random).
- Flip a coin. Remember if it was heads or tails.
- I've given you a list of 20 colors or so. Pick between two and five of them.
- You are drawing a **Calendar**. You are a computer and you do not know what a **Calendar** is. I will tell you what a **Calendar** is.
- Here's what a **Calendar** is: A **Calendar** is a thing with 31 **Day**s. Its starting weekday is 6. 
- Hey **Calendar**! Figure out where all your **Day**s are. You don't know what a **Day** is, because you are a computer, so I will tell you.
- Here is what a **Day** is: A **Day** is a thing with a weekday and a week number. A **Day** knows that it is part of a **Calendar**. 
- A **Day** has X and Y coordinates, based on its weekday and week number. (The X and Y coordinates are based on the made-up numbers from the first step).
- Each **Day** should know about the **Day** above it, below it, to the left of it, and to the right of it. Tell each **Day** to ask the **Calendar** who its neighbors are. It might not have a neighbor on every side, and that's okay.
- For each **Day**, decide how many lines you're going to draw. Then, draw that number of lines.
- If your coin flip from step #2 was heads, draw a wiggly line. Otherwise, draw a straight line.
- Every time you draw a line, pick one of your 2-5 colors at random.
- When you draw a line, here is what you do: Choose a random point on one edge of the **Day**. Then, look to the neighbor on that side, and choose a random point on the nearest edge of the neighbor **Day**. Draw a line between those two points. If there is no neighbor on that side, draw out to the edge of the canvas until some random point.

This is obviously more complicated than a Sol LeWitt wall drawing - and if you can believe it, this is the short version. I've glossed over a lot of steps (like the one where I say, "there is a canvas, the canvas exists", or the one where I describe in great detail what it means to be a "wiggly line"). That's because computers don't know what most words mean, and they cannot make reasonable assumptions. You have to be really specific with computers.

But the gist of it is: I give the computer instructions, the computer follows the instructions, and the computer makes images. 

## Okay, so, is this NFTs? 

This is not NFTs. NFTs are the reason generative art is having a moment right now, because NFTs are one way to *sell* digital art. However, a piece of art doesn't have to be generative to be an NFT, and selling as an NFT isn't the only way to sell generative art.

Some people are using the blockchain as an *input* to their generative art, which I do think is pretty neat (although the parts I like about it are mostly unrelated to blockchain itself). 

Imagine you got a receipt. A normal one. From the store. One of those long CVS receipts. On the receipt, imagine there was a random ID number, tying your purchase to something the store's database. 

In the program above, I had the computer choose some random numbers for me. Instead, I could have told the computer, "Take the number from this person's receipt. Do *a bunch of math* to that number, and give me the resulting numbers. Then, use those numbers in the program". (In fact, that's probably what CVS does when it prints out all those coupons - except the program is "look up what coupons this person is eligible for". Are CVS receipts generative art? Shit, dude, maybe!)

The point is, there's nothing inherently magical about the number originating from the blockchain -- It's just a unique number. I could do the same thing with your social security number. It might be more lucrative actually. Cryptocurrency is out, full-on identity theft is back in, baby! *(Editor's note: I am joking. I am a very responsible person to do business with and I do not steal identities for sport.)*

## I've lost the thread a bit here but you see what I'm getting at, right?

Anyway. That's what generative art is! It's art that you create, by telling someone or something else how to create it. Rather than hiring grad students or garden gnomes to do it, I mostly tell a computer what to do. But I leave space for the computer to make its own little decisions, by flipping coins or choosing random numbers. And as a result, the output is always unique.

## Postscript: What about all these challenges?

This part specifically confuses my mom and I want to get the answer on the record!

The art challenges I've been participating in ([#codesketchtober](https://codesketchtober.netlify.app/), which I started, and [#genuary](https://genuary.art/) which has been around for years) aren't really related to any of this. They're just a list of prompts that everyone can work on at the same time, so we can have fun looking at what we've done together.

The prompts are usually a few words, like "[Airport carpet](https://codesketchtober.netlify.app/g26)" or "[Three colors](https://codesketchtober.netlify.app/g17)". That's it - it's just an idea to get your creativity started. Like a writing prompt. It's not necessary, unless you are like me and need constant external validation to stay motivated.
