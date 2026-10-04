export const blogs = [
    {
        id: "icpc-online-preliminary-experience",
        title: "ICPC Online Preliminary Experience",
        date: "3 Oct 2026",
        summary: "",
        content: `This is a blog regarding our ICPC experience in the online preliminary round. This blog is written before the final results were published so I'm not sure about our qualification but anyways, I've mentioned some (prolly a lot) of mistakes we made while in the contest and what we could've done better. Hope this blog would be helpful for future aspiring ICPC teams.

I'll be referring to my teammates as **AB** and **KT** throughout this blog — the two people with whom we, as a team, managed to solve 5 problems in the contest.

This is the [problemset](https://drive.google.com/file/d/15oy_h8wWGBu8nWorHq4eCCTzQMHzUQwK/view?usp=sharing) in case you need to refer it. I'll mention problem descriptions in short but in case you need a detailed description refer this.

So we sat before our laptop. 10 minutes remaining before the start and I mentioned a frequent mistake I make to my team:
- Sometimes I miss out on memory overflow errors while writing code so before giving the green signal for submission make sure to consider this specific error.

Finally the contest started and there pops the first question on our screen:

> You are given x you need to make it 100 and can increase x by 1 unit. The cost of increasing it is A until it reaches 80, thereafter the cost is B.

Pretty basic problem so I started implementing it, and apparently my teammates were watching me implement it.
Now comes **mistake 1** : I usually have a habit of writing long code for relatively simple implementation demanding code. So I began writing multiple if statements and halfway through the implementation, AB felt it was too unnecessary and he got the keyboard from me and started implementing the problem in a shorter way. I had defined some macros:
\`\`\`cpp
using ll = long long;
\`\`\`
is what I use for all problems regardless of their memory limits and there's a specific condition you have to take care of when using the max() or min() method. If you're using a constant within the method you have to add LL after it for the code to compile.
And since AB had the habit of using int our first run led to our first compile error.
We fixed that part and there was a misplaced bracket somewhere in the code.
We took around 20 seconds to spot and fix it. By the time we fixed it, other teams too had started running their code so typical server load and a bit longer time until the output appeared on the screen ( around 30-40 sec ). We fixed that and another silly misplaced bracket took a good 50-60 seconds of ours.

**So what's the solution for mistake 1 we did :**
Give at least one in-person practice contest with your teammates and get to know who writes clean code or who can implement simple logic faster and assign that particular person the keyboard to the contest initially. 

And mistake 1 was due to us not practicing in-person offline contests together.

So apparently, a problem which could've been done and submitted within 2 minutes took a good 7-8 minutes.

Now as the submission was being processed by the server judge or rather overloaded server judge it took around 90 seconds to give us the verdict, so until the verdict came up we decided to read through the next problem statement and it was :

> Given an array a which we can do a cyclic shift on any number of times and we need to minimize max( |b<sub>i</sub> - b<sub>i+1</sub>| ) i from 1 to n-1 over all cyclic shifts.

Read the problem statement and I came up with the solution two minutes in. Explained it to AB and KT in short and started implementing it. 

The solution goes like: 
Find all values resulting from the absolute difference of adjacent elements considering all cyclic shifts so we get n values and we can exclude one value from the set of n values so the answer is simply the second highest of these n values.

Meanwhile, we received the AC verdict of the first problem. Was ready with the implementation for the second by then and submitted it which eventually ACed.

Now, We moved on to our third question which goes like this:

> There are n slots and m clouds on top of some of the n slots given by the array a you can move all the clouds to the left or to the right in one operation. Count the minimum number of operations such that each of the n slots is visited by a cloud at least once.

There comes **mistake number 2** and probably the one which could cost us our qualification, if it does.

I started typing the input code simultaneously thinking about different ways to approach the solution. While thinking I was somehow convinced that we would need a Boolean array to keep track of visited positions and implemented it and calculated the contiguous gaps and some silly calculations and getting the output for those. Somehow, some edge cases were missing.

A few minutes into our thinking AB came up with a solution and he mentioned it to us and started implementing it. At that time I was thinking about some approach and my brain was already occupied with multiple branches of thoughts and couldn't afford restarting those branches so I just told him to go on and implement without me visualizing his solution and gave him the middle seat and I continued thinking about my approach. I'm not sure about AB's implementation but he probably was implementing something using sets and largest contiguous difference which was partially right but missed a few edge cases. Around 20 minutes in I got the correct idea which goes like : 

Find the difference between the left position and the leftmost cloud and name it left 
Find the difference between the right position and the rightmost cloud and name it right
Now for the movement, we move to the shorter side of the two gaps (left, right) and then come back to our original position and thereafter, we move towards the longer side. In the process all the intermediate gaps would have their corresponding left and right sided boundaries covered in the process so only the remaining space of those gaps need to be accounted for. which turned out to be the size of the largest gap minus the positions within that gap which we already covered in the process 
so the answer was : 

\`\`\`cpp
left + right + max(0LL, largest-(left+right)) 
\`\`\`

We burned roughly around 40 minutes on this problem, which could've taken around 20 minutes if we hadn't immediately started coding instead of brainstorming and discussing all our approaches 

**Solution for mistake 2** : Never start coding the problem unless you're sure about the solution , what I experienced is coding might take or interfere in your thinking ultimately leading to a longer time for coming up with the solution though this might be different for different individuals.

So I explained the solution to AB and he began implementing it while I moved on to the next question which goes like : 

> There are n items, each either made of glass or iron. Glass items weigh 1 unit and iron items weigh 2 units. You have 2 bags and need to process all items from left to right in sequence, placing each item into either bag 1 or bag 2. The constraint is that the total weight above any glass item in its bag must never exceed k, otherwise it will break.

Now this problem had a surprisingly smaller time limit :  1 &le; n &le; 2000 
and it allowed O(n<sup>2</sup>) solutions. 

Meanwhile AB finished implementing the 3rd problem and KT and me had gone through the 4th problem statement and discussed about some cases : 
- case 1 : all glass goes into bag1 and all iron goes into bag2
- case 2 : some weird case which was anyways wrong so no point discussing it here also I don't remember it anymore

Because of the unusual time limit my mind was kind of leaning towards the Dynamic programming implementation so I began thinking about how would I design the transitions and states.

Meanwhile, AB came up with a solution which goes like : 
- keep adding glass to bag1 until it has k+1 glasses and whenever we encounter an iron we push it in bag2 or we push a glass in bag2 if bag1 has reached it's limit 

Me and KT had some second thoughts on this because problem allowed O(n<sup>2</sup>) solutions and AB's solution was O(n). So yeah we began writing and coming up with a bunch of sample cases which would contradict AB's solution but didn't find any. 

So we decided to implement it and AB and KT began implementing it while I read the next problem which goes like : 

> You have n people in a line. Person i initially holds token p<sub>i</sub>, where p is a permutation. You can swap tokens between any 2 people, costing c coins per swap. After all swaps if person i holds token number i then he gives you a<sub>i</sub> coins. You need to maximize the profit 

Having solved a bunch of such problems before, I knew for a fact it was a graph problem so the very first thought I had was tracking cycles. Meanwhile, we got AC on the 4th question. After some time brainstorming, I came up with the idea which was : 

Go through all the cycles and for each cycle making the entire cycle perfect would cost c * (cyclelength-1) 
profit would be sum of a<sub>i</sub> of all elements in the cycle
or we could select the top elements such that we maximize the profit

So I started the implementation and was done with it in like 10 minutes. Now comes our **mistake 4**. Not really a mistake but I would count it as one because it costed us a good 15-20 minutes finding it.

So the bug was a line in the nested for loop where I was accessing arr[i] instead of arr[j] and silly me though there was some issue in the way I implemented the cycle finding algorithm.

**Solution for bug 4** : While debugging, instead of assuming some implementation or ideation fault, apply the idea on a bunch of testcases, then check for accidental mistypes before checking anything else.

Anyways so far we solved 5 without any penalties but took a bit longer than what we should've taken.

Now comes the 6th problem which probably could've secured our regionals slot if we would've solved it.

So the problem goes like : 

> Given n points, sort the points according to their x coordinates.
> You have 2 options for each point : 
> either extend 2 lines towards the left and bottom
> or extend 2 lines towards the top and right
> Is it possible to assign some operation to all of the points such that no 2 lines intersect with each other.

Don't want to discuss much of the wrong solution we came up with but it goes like 
Sort the points according to the x axis, 
The sequential y coordinates we get, we try to create 2 ascending arrays. If possible, we output YES or NO and then checking the min and max of those 2 arrays and applying some conditional checks on those.

In between trying to brainstorm the 6th question, I visited the 7th question to get an idea if it was solvable but the first impression of the problem was that it was some complex dp with tricky transitions and here comes our last mistake ( pretty much debatable but according to me it was a mistake ). 
We all 3 kept thinking about the 6th problem. I felt completely stuck at one point but still kept on scribbling a bunch of random points on a graph and testing our solution on it. Maybe moving on to the next problem would've worked maybe it wouldn't. Anyways all 3 of us kept on working on the 6th problem. Though a debatable point, after the contest I felt I should've explored problem 7 a bit more because even though it felt tricky, it was a similar problem to one I solved in one of the past contests so maybe I could've let AB and KT work on problem 6 while I worked on problem 7.

Anyways that was our ICPC prelims experience. Hope y'all liked reading the blog and learned from some of our mistakes.`
    }
];
