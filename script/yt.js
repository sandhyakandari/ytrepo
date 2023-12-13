//AIzaSyBdt4RAMzQVbC4ZaGY8Wbfj_ePKBuUJK8Y
//AIzaSyDkajtlDp-AYBRqr44PoluxMiBMeF2B_6U
const baseUrl="https://www.googleapis.com/youtube/v3";
const APIKey="AIzaSyBdt4RAMzQVbC4ZaGY8Wbfj_ePKBuUJK8Y";
const shimmervideo=document.getElementById("shimmervideo");
const container=document.getElementById("video-container")
let video=[];

if(video.length==0){
    shimmervideo.innerHTML=``;
    for(let i=0;i<10;i++){
       shimmervideo.innerHTML+=`
       <div class="shimmerbox">
      <div class="videoinfosh">
                   <div class="videoshimmer-img">
                    <div class="videoshimmerin-desc">
                    </div>                   
                   </div>
                   <div class="videoshimmer-desc"> 
                   </div>
                  </div>
                  </div>`
}}
window.addEventListener('scroll',handleScroll=()=>{;
//console.log(window.innerHeight + document.documentElement.scrollTop);
//console.log( document.documentElement.offsetHeight);
if (
    window.innerHeight + document.documentElement.scrollTop >=
    (document.documentElement.offsetHeight-1)
) { console.log('data is fetching ');

if(searchs){
    getVideos(searchs);}
    else{
    getVideos("computer");}    
}
}); 
function searchquer(q){
    video=[];
    container.innerHTML='';
    if(video.length==0){
        shimmervideo.innerHTML=``;
        for(let i=0;i<10;i++){
           shimmervideo.innerHTML+=`
           <div class="shimmerbox">
          <div class="videoinfosh">
                       <div class="videoshimmer-img">
                        <div class="videoshimmerin-desc">
                        </div>                   
                       </div>
                       <div class="videoshimmer-desc"> 
                       </div>
                      </div>
                      </div>`
    }}
    // sessionStorage.setItem("searchstrings",q);
    console.log('search query ',q);
    getVideos(q);
}
async function getVideos(q){
    const url=`${baseUrl}/search?key=${APIKey}&q=${q}&type=videos&maxResults=10`;
    const response= await fetch(url,{
        method:"get",
    });
    const data = await response.json();
   // console.log(data);
    const videos=data.items;
    getVideoData(videos);
    //console.log(videos); 
}
async function getVideoData(videos){
    console.log(videos," all video")
    let videoData=[];
    for(let i=0;i<videos.length;i++){
        const video=videos[i];
        const videoId=video.id.videoId;
        videoData.push(await getVideosDetail(videoId));  
    }
//console.log(videoData);  
renderData(videoData);
}
async function getVideosDetail(videoId){
    const url=`${baseUrl}/videos?key=${APIKey}&part=snippet,contentDetails,statistics&id=${videoId}`;
    
    const response= await fetch(url,{
        method:"get",
    });
    const data = await response.json();
   // console.log(data);
    return data.items[0];
    //console.log(data);
}


function renderData(videos){
    console.log(videos)
    shimmervideo.innerHTML=''; 
 for(let i=0;i<videos.length;i++){
     video=videos[i];
console.log(video);
if(video){
     container.innerHTML+=`
   <div class="video-info" onclick="openVideoDeatils('${video.id}')">
                <div class="video-img">
                    <img src="${video.snippet.thumbnails.high.url}" alt="video title">
                </div>
                <div class="video-desc">
                    <div class="channel-avtar">
                        <img src="assets/img/channel.png" alt="channelavtar">
                    </div>
                    <div class="channel-desc">
                    <div class="video-title">${video.snippet.localized.title}</div>
                        <div class="channel-name">${video.snippet.channelTitle}</div>
                       <div class="viewndtime"> <span>${video.statistics.viewCount} views</span>
                        <span>1 week ago</span>
                    </div></div>
                </div>
               </div>` 
}
 }
}

function openVideoDeatils(videoId){
    sessionStorage.setItem("videoId",videoId);
    window.open("videoDetails.html");
    
}


function searchstring(){
    const searchstring=document.getElementById("searchitem").value;
    sessionStorage.setItem("searchstrings",searchstring);
    getVideos(searchstring);        
}


const searchs=sessionStorage.getItem("searchstrings");
if(searchs){
getVideos(searchs);}
else{
getVideos("computer");}
//getVideosDetail("Za_MG36rOgk");