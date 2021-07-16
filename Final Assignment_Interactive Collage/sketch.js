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

/*Documentation on specific choices
1. Manual GIF using Sprite Animation
- Unable to control GIF frames in p5.js, unable to pause and play gifs at will
- Usage of videos caused a significant lag and other problems such as video reloading when looping, which resulted in the video disappearing which caused problems
    for mouse interactions
- since p5.play library was used in the course, I decided to utilise the sprite animation feature for each gif
- this was done by splitting the gifs into individual frames to build a sprite sheet
*/

class Frame {
    constructor(video, x, y, behaviour, expExpert, expTruth, anime, pauseTime, newHgt){
        this.video = video;
        this.x = x;
        this.y = y;
        this.behaviour = behaviour;
        this.expExpert = expExpert;
        this.expTruth = expTruth;
        this.anime = anime;
        this.pauseTime = pauseTime;
        this.height = newHgt;

        this.playing = false
    }

    display(){
        let frameWdh = this.video.width*this.height/this.video.height;

        if( mouseX > this.x && mouseX < this.x + frameWdh &&
            mouseY > this.y && mouseY < this.y + this.height){

                if(this.video.play() !== undefined){
                    this.video.play().then(_ => {
                        //loop started
                        //show playing loop
                        this.video.loop()

                    })
                    .catch(error => {
                        //loop prevented
                        //show paused screen
                        this.video.pause().time(this.pauseTime);
                    })
                }
                this.video.loop();
                print("looping "+ this.behaviour)
            }
        else{
            this.video.pause().time(this.pauseTime);
        }

        
        image(this.video, this.x, this.y, frameWdh, this.height);


    }

    // hover(){
        

    // }
}

///////////END OF CLASS DECLARATION///////////


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
var catsData = [];
var frames = [];    //contains all Frame class objects

function preload(){
    //load videos
    for(let filename of vid_filelist){
        //load and push the vid into the vidlist
        vid_list.push( createVideo(filename,vidLoad) );
    }
    print(vid_list.length+ " videos are loaded into the list!");

    //load cat behaviour json
    loadJSON('files/data_catBehaviours.json', function(data){
        catsData = data;
        print("catsData loaded");
      })
}

function vidLoad(){
    for(let video of vid_list){
        video.volume(0);
        // video.loop();
        video.hide();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    let headerHgt = height/5;
    let frameHgt = 150;
    let startX = width/100;
    let x = startX;
    let y = height/4 + 20;
    for(let i=0; i < vid_list.length; i++){
        let video = vid_list[i];
        print(video)
        let data = catsData[i];
        print(video.width)

        let newWdh = video.width*frameHgt/video.height;
        print(i, video.width, newWdh, video.height);
        print('next')

        behaviour = data.Behaviour;
        print(data.behaviour)
        expExpert = data.Experts;
        expTruth = data.Truth;
        anime = data.Anime;
        pauseTime = data.PauseTime;

        frames.push(new Frame(video, x, y, behaviour, expExpert, expTruth, anime, pauseTime, frameHgt));

        //new x and y values for next frame
        x = x + newWdh;
        if((i+1)%5 == 0 && i!=0){
            x = startX;
            y = y + frameHgt + 20;
        }
    }
}

function draw() {
    background(230);
    for(let i=0; i < frames.length; i++){
        let frame = frames[i];
        frame.display();
    }
}

