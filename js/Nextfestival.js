
$(document).ready(function () {
    loadNextfestival();
    $(document).on('click','.readF',function () {
        var id=$(this).data('id');
        localStorage.Festival=JSON.stringify(loadFestivaldetail[id]);

    });

});
function loadNextfestival() {

    var rootRef = firebase.database().ref().child('festival/');

    rootRef.on('child_added', function (data,id) {
        var a= new Date();
        var month = a.getMonth()+1;
        var day = a.getDate();
        var w=day+'-'+month;
        var j = data.val();
        if(id==null){
            id=0;
        }else {
            id=parseInt(id)+1;

        }
        if(parseDate(j.Startday) > parseDate(w)){
            document.getElementById('ShownextF').innerHTML +=ShowNextFestival(id,j.Name,j.Startday,j.Synopsis,j.Festivalimg,j.Location);
            loadFestivaldetail.push(new Festival(id,j.Name, j.Startday, j.Location,j.Mapimg,j.Synopsis,j.Aboutfestival,j.History,j.Activities,j.Festivalimg,j.Historyimg,j.Activitesimg,j.Video));

        }



    });

}
function parseDate(str) {
    console.log(str);
    var mdy = str.split('-');
    return new Date( mdy[1], mdy[0]);
}
function ShowNextFestival(id,name,startday,synopsis,img,religion) {
    return  '<div class="row mb-2">'
        +'<div class="col-md-12">'
        +'<div class="card ">'
        +'<div class="card-body">'
        +'<div class="row">'
        +'<div class="col-md-4">'
        +'<img class="imgNF" src="'+img+'">'
        +'</div>'
        +'<div class="col-md-8">'
        +'<div class="news-title">'
        +'<a href="#"><h5 class="candal">'+name+'</h5></a>'
    +'</div>'
        +'<div class="news-content">'
        +'<h5>Religion: '+religion+'</h5>'
        +'</div>'
    +'<div class="news-content">'
        +'<h6>Start Day: '+startday+'</h6>'
    +'</div>'
    +'<div class="news-content">'
        +'<p>'+synopsis+'</p>'
    +'</div>'
    +'<div class="news-buttons">'
        +'<a href="DetailFestival.html" data-id="'+id+'" class="btn btn-primary readF">Read More</a>'
    +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>';


};


