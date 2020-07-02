
$(document).ready(function () {
    check();
    loadIMAGES();



});
var loadImage=[];
var active=[];
var html1='';
function Images(image,title) {
    this.Image=image;
    this.Title=title;



};

function setImaga( img,title) {
    return '<div class="col-6 col-md-4 text-center doc-item ">'
        +'<div class="common-doctor animated fadeInUp clearfix ae-animation-fadeInUp">'
        +'<ul class="list-inline social-lists animate">'
        +'<li>'
        +'<table>'
        +'<tr><a href="#"><i class="far fa-heart"></i></a></tr>'
        +'<tr><a href="#"><i class="fab fa-facebook-square"></i></a></tr>'
        +'<tr><a href="#"><i class="fab fa-twitter-square"></i></a></tr>'
        +'<tr><a href="#"><i class="fab fa-instagram"></i></a></tr>'
        +'</table>'
        +'</li>'
        +'</ul>'
        +'<figure>'
        +'<img style="height: auto" src="'+img+'" class="doc-img animate attachment-gallery-post-single wp-post-image" alt="doctor-2">'
        +'</figure>'
        +'<div class="text-content">'
        +'<h5>'+title+'</h5>'
        +'</div>'
        +'</div>'
        +'</div>';


}

function submit(id) {
    var row = document.getElementById('imageList');
    row.innerHTML='';
    for(var i=(6*id);i<(6*(id+1));i++){
        row.innerHTML += setImaga(loadImage[i].Image,loadImage[i].Title);
    }

}
function loadIMAGES() {
    var rootRef = firebase.database().ref().child('Garelly/');
    var count=0;

    rootRef.on('child_added', function (data) {
        var j = data.val();
        loadImage.push(new Images(j.Image, j.Title));

            document.getElementById('imageList').innerHTML += setImaga(j.Image, j.Title);




        // $('#imageList').html(setImaga(j.Image, j.Title));
        count++;

    });



};



// var count =1;
// var x=0;
// var y=1;
// for(var i in loadImage ){
//     html1 += '<button type="button" class="btn btn-secondary">'+y+'</button>';
//
// }
//
// console.log(html1);
//
// $('.btn-group').html(html1);

//
// console.log(loadImage);
// ///////
// window.onload=function (e) {
//
//     $(document).ready(function () {
//         var count =1;
//         var x=0;
//         var y=1;
//         // var buttongr=document.getElementById('btn-group');
//         // buttongr.innerHTML='';
//         console.log(loadImage);
//         // for(var i=0 ;i<loadImage.length;i++){
//         //     if(count%6==0 || count==1)
//         //     {
//         //         buttongr.innerHTML+='<button  type="button" class="btn btn-secondary" onclick="submit('+x+')">'+y+' </button>';
//         //         buttongr.innerHTML+='sadsadsa';
//         //
//         //
//         //         x++;
//         //         y++;
//         //
//         //
//         //     }
//         //     count++;
//         // }
//
//     });
//
//
// };


//
// function putData() {
//     loadIMAGES();
//     loadImage=[];
//
//     var c=loadImage;
//     for(var i=0;i<6;i++){
//
//     }
//     console.log(html1);
//
// }


////////////////////////


