
var loadFestivaldetail=[];
function Festival(name,startday,location,synopsis,aboutfestival,history,activities,festivalimg,historyimg,activitesimg,video) {
    this.Name=name;
    this.Startday=startday;
    this.Location=location;
    this.Synopsis=synopsis;
    this.Aboutfestival=aboutfestival;
    this.History=history;
    this.Activities=activities
    this.Festivalimg=festivalimg;
    this.Historyimg=historyimg;
    this.Activitesimg=activitesimg;
    this.Video=video;

}
window.onload=function () {
loadFestival()

};





$(document).ready(function () {
    firebase.initializeApp(config);



//////////////////////////////Article
    $(document).on('click','.showFestival',function () {
        var id=$(this).data('id');

        $('#InputUsername').val(loadFestivaldetail[id].Name);
        $('#InputLocation').val(loadFestivaldetail[id].Location);
        $('#InputDay').val(loadFestivaldetail[id].Startday);
        $('#InputSynopsis').val(loadFestivaldetail[id].Synopsis);
        $('#InputAboutfestival').val(loadFestivaldetail[id].Aboutfestival);
        $('#InputHistory').val(loadFestivaldetail[id].History);
        $('#InputActivities').val(loadFestivaldetail[id].Activities);

        // $('#Festivalimg').val(loadFestivaldetail[id].Festivalimg);
        // $('#History').val(loadFestivaldetail[id].Historyimg);
        // $('#Activities').val(loadFestivaldetail[id].Activitesimg);
        // $('#Video').val(loadFestivaldetail[id].Video);


        $('#savedataFestival').data('save',id);
        $('#delete1').data('save',id);
        console.log(loadFestivaldetail);



    });

    $(document).on('click','.deleteFestival',function () {
        var id=$(this).data('id');
        $('#delete1').data('save',id);


    });
    $('#delete1').click(function () {
        var id=($('#delete1').data('save'));
        var rootRef = firebase.database().ref().child('festival/'+id);
        console.log(id);
        rootRef.remove();
        window.location.reload(true);





    });
    $('#savedataFestival').click(function () {
        var id=$('#savedataFestival').data('save');
        console.log(id);
        if($('#savedataFestival').data('active')!=''){
            if(loadFestivaldetail.length==0)
            {
                id=0;
            }else {
                id=loadFestivaldetail.length;
            }
        }

        var name=$('#InputUsername').val();
        var location=$('#InputLocation').val();
        var startday=$('#InputDay').val();
        var synopsis=$('#InputSynopsis').val();
        var aboutfestival=$('#InputAboutfestival').val();
        var history=$('#InputHistory').val();
        var activities=$('#InputActivities').val();
        var a=$('#Festivalimg').val().split('\\').pop();
        var festivalimg='../images/DetailFestival/AboutFestival/'+a;
        var b=$('#History').val().split('\\').pop();
        var historyimg='../images/DetailFestival/History/'+b;
        var c=$('#Activities').val().split('\\').pop();
        var activitesimg='../images/DetailFestival/Activities/'+c;
        var d=$('#Video').val().split('\\').pop();
        var video='../videos/Detailfestival/'+d;
        console.log(id);
        var festival= new Festival(name,startday,location,synopsis,aboutfestival,history,activities,festivalimg,historyimg,activitesimg,video);
        var rootRef = firebase.database().ref().child('festival/'+id);
        rootRef.set(festival);
        window.location.reload(true);
    });
    $('#addNewFestival').click(function () {
        $('#savedataFestival').data('active',1);

        $('#InputUsername').val('');
        $('#InputLocation').val('');
        $('#InputDay').val('');
        $('#InputSynopsis').val('');
        $('#InputAboutfestival').val('');
        $('#InputHistory').val('');
        $('#InputActivities').val('');

        $('#Festivalimg').val('');
        $('#History').val('');
        $('#Activities').val('');
        $('#Video').val('');

    });



});
////////////////////// ARTICLE    ////////////////////////////////////////////
function loadFestival() {
    var rootRef = firebase.database().ref().child('festival/');

    rootRef.on('child_added', function (data,id) {
        var j = data.val();
        if(id==null){
            id=0;
        }else {
            id=parseInt(id)+1;

        }
        loadFestivaldetail.push(new Festival(j.Name, j.Startday, j.Location,j.Synopsis,j.Aboutfestival,j.History,j.Activities,j.Festivalimg,j.Historyimg,j.Activitesimg,j.Video));
        document.getElementById('festival').innerHTML +=PushFestival(id,j.Name, j.Location, j.Startday);




    });
}
function PushFestival(id,name,location,day) {
    return '<tr>'
        + '   <td>'+id+'</td>'
        + '   <td>'+name+'</td>'
        + '   <td>'+location+'</td>'
        +'   <td>'+day+'</td>'
        +' <td><i data-toggle="modal" data-target="#squarespaceModal" class="fas fa-user-tag showFestival" data-id="' + id + '"></i></td>'
        +'   </tr>';

}
