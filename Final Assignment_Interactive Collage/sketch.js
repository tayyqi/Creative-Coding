//Creative Coding Final Assignment: Interactive Photo Collage

/*Inspiration and sources
British & Exotic Minerology by Nicholas Rougeux: https://www.c82.net/mineralogy/
I was intrigued by the arrangement of the different minerals that seemed rather neat as a whole but upon zooming in, I noticed that the illustrations were of 
irregular shape and did not specifically follow a grid format. The color palette was also harmonious, in addition to the intuitive mouse interactions. This 
collage is of quite a large scale, consisting of 718 illustrations by James Sowerby, an early 19th-century British naturalist and mineralogist.

Content: https://www.boredpanda.com/cat-maneuvers-explained-itsjayordan/?utm_source=google&utm_medium=organic&utm_campaign=organic
I chanced upon an article about a vet who had pinned up witty explanations of cat bahaviours on his cork board. As the illustrations in the article are all in grayscale, 
I will be sourcing for similar/new illustrations with the addition of gifs/videos to better illustrate the cat behaviours.
These explanations were originally created by Adam Ellis and can be found here: https://www.buzzfeed.com/adamellis/shocking-truths-behind-what-cat-behaviors-actually-mean?utm_term=.oc4OXODaA#.hnZWAWb4E

 */


let vid_filelist = ['files/anime_0001_legup.mp4',
                    'files/anime_0002_hidden.mp4',
                    'files/anime_0003_chatter.mp4',
                    'files/anime_0004_roll.mp4',
                    'files/anime_0005_sleepcircle.mp4',
                    'files/anime_0006_laptop.mp4',
                    'files/anime_0007_squint.mp4',
                    'files/anime_0008_bite.mp4',
                    'files/anime_0009_quiverpounce.mp4',
                    'files/anime_0010_bellyflop.mp4',
                    'files/anime_0011_stare.mp4',
                    'files/anime_0012_knead.mp4',
                    'files/anime_0013_butt.mp4',
                    'files/anime_0014_catloaf.mp4',
                    'files/anime_0015_sleepbox.mp4',
                   ]
let vid_list = [];

function preload(){
    for(let filename of vid_filelist){
        //load and push the vid into the vidlist
        vid_list.push( createVideo(filename,vidload) );
    }
    print(vid_list.length+ " videos are loaded into the list!");
}


function vidload(){
    for(let video of vid_list){
        video.hide();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

}

function draw() {
    background(230);
}

class Frame {
    constructor(x, y, behaviour, expExpert, expTruth){
        this.pos = (x,y);
        this.title = behaviour;
        this.expExpert = expExpert;
        this.expTruth = expTruth;
    }
}