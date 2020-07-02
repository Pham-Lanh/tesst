
function FormTicket(idFestival, nameFestival, amount, money, idd) {
    this.IdFestival = idFestival;
    this.NameFestival = nameFestival;
    this.Amount = amount;
    this.Money = money;
    this.Idd = idd;

}
function FormHotel(idFestival, nameFestival, amount, typeroom, startday, endday, idd) {
    this.IdFestival = idFestival;
    this.NameFestival = nameFestival;
    this.Amount = amount;
    this.Typeroom = typeroom;
    this.Startday = startday;
    this.Endday = endday;
    this.Idd = idd;


}
$(document).ready(function () {
    checkloginn();
    var f = JSON.parse(localStorage.Festival);
    console.log(f);

    $('#VideoFF').html('<source id="videoF" src="' + f.Video + '" type="video/mp4" />')
    $('#nameF').html(f.Name);
    $('#dateF').html('Start day : ' + f.Startday);
    $('#locationF').html('Religion :' + f.Location);
    $('#synopsis').html(f.Synopsis);
    $('#aboutF').html(f.Aboutfestival);
    $('#historyF').html(f.History);
    $('#activitiF').html(f.Activities);
    $('#mapI').attr('src', f.Mapimg);
    $('#aboutI').attr('src', f.Festivalimg);
    $('#historyI').attr('src', f.Historyimg);
    $('#activitiI').attr('src', f.Activitesimg);
    $('.pdf').attr('href', f.Pdf);

    $(document).on('click', '.addtocart', function () {
        var u = JSON.parse(localStorage.listUser);

        var type = $(this).data('type');
        var active = $(this).data('active');
        console.log(loadCart[u.IdCart].Ticket.length);

        if (type == 'Ticket') {

            for (var i in loadCart[u.IdCart].Ticket) {

                if (loadCart[u.IdCart].Ticket[i].IdFestival == f.Id && loadCart[u.IdCart].Ticket[i] != '') {
                    console.log(i);
                    var a = $('#' + type + loadCart[u.IdCart].Ticket[i].IdFestival + 'total').data('total');
                    var b = $("#ticket").val();
                    var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Ticket/' + i + '/Amount');
                    var c = parseInt(a) + parseInt(b);
                    rootRef.set(c);
                    var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Total');
                    var c = parseInt(loadCart[u.IdCart].Total) + parseInt(b);
                    rootRef.set(c);
                    window.location.reload(true);
                    return;
                }
            }
            var id;
            if (loadCart[u.IdCart].Ticket == '') {
                id = 0;

            } else {
                var count = 0;
                for (var i in loadCart[u.IdCart].Ticket) {
                    if (loadCart[u.IdCart].Ticket[i] == '') {
                        id = i;
                        count++;
                        break;
                    }

                }
                if (count == 0) {
                    id = loadCart[u.IdCart].Ticket.length;
                }
            }
            var a = $("#ticket").val();
            var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Ticket/' + id);
            var ticket = new FormTicket(f.Id, f.Name, a, '20', id);
            rootRef.set(ticket);
            var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Total');
            var c = parseInt(loadCart[u.IdCart].Total) + parseInt(a);
            rootRef.set(c);

            window.location.reload(true);

        } else if (type == 'Tour') {


            for (var i in loadCart[u.IdCart].Tour) {

                if (loadCart[u.IdCart].Tour[i].IdFestival == f.Id && loadCart[u.IdCart].Tour[i] != '') {
                    console.log(i);
                    var a = $('#' + type + loadCart[u.IdCart].Tour[i].IdFestival + 'total').data('total');
                    var b = $("#tour").val();
                    var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Tour/' + i + '/Amount');
                    var c = parseInt(a) + parseInt(b);
                    rootRef.set(c);
                    var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Total');
                    var c = parseInt(loadCart[u.IdCart].Total) + parseInt(b);
                    rootRef.set(c);

                    window.location.reload(true);
                    return;
                }
            }
            var id;
            if (loadCart[u.IdCart].Tour == '') {
                id = 0;

            } else {
                var count = 0;
                for (var i in loadCart[u.IdCart].Tour) {
                    if (loadCart[u.IdCart].Tour[i] == '') {
                        id = i;
                        count++;
                        break;
                    }

                }
                if (count == 0) {
                    id = loadCart[u.IdCart].Tour.length;
                }
            }
            var a = $("#tour").val();
            var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Tour/' + id);
            var ticket = new FormTicket(f.Id, f.Name, a, '20', id);
            rootRef.set(ticket);
            var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Total');
            var c = parseInt(loadCart[u.IdCart].Total) + parseInt(a);
            rootRef.set(c);

            window.location.reload(true);

        } else {

            for (var i in loadCart[u.IdCart].Hotel) {

                if (loadCart[u.IdCart].Hotel[i].IdFestival == f.Id && loadCart[u.IdCart].Hotel[i] != '') {

                    var a = $('#' + type + loadCart[u.IdCart].Hotel[i].IdFestival + 'total').data('total');
                    var b = $("#hotel").val();
                    var c = parseInt(a) + parseInt(b);
                    var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Hotel/' + i);
                    var typeroom = $('#exampleFormControlSelect1').children("option:selected").text();
                    var startday = $('#startdayD').val();
                    var endday = $('#enddayD').val();
                    var d = new FormHotel(f.Id, f.Name, c, typeroom, startday, endday, i);

                    rootRef.set(d);
                    var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Total');
                    var c = parseInt(loadCart[u.IdCart].Total) + parseInt(b);
                    rootRef.set(c);

                    window.location.reload(true);
                    return;
                }



            }
            var id;
            if (loadCart[u.IdCart].Hotel == '') {
                id = 0;

            } else {
                var count = 0;
                for (var i in loadCart[u.IdCart].Hotel) {
                    if (loadCart[u.IdCart].Hotel[i] == '') {
                        id = i;
                        count++;
                        break;
                    }

                }
                if (count == 0) {
                    id = loadCart[u.IdCart].Hotel.length;
                }
            }
            var a = $("#hotel").val();
            var typeroom = $('#exampleFormControlSelect1').children("option:selected").text();
            var startday = $('#startdayD').val();
            var endday = $('#enddayD').val();
            var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Hotel/' + id);
            var hotel = new FormHotel(f.Id, f.Name, a, typeroom, startday, endday, id);
            rootRef.set(hotel);
            var rootRef = firebase.database().ref().child('cart/' + u.IdCart + '/Total');
            var c = parseInt(loadCart[u.IdCart].Total) + parseInt(a);
            rootRef.set(c);

            window.location.reload(true);

        }

    });
    $('#showmodalhotel').click(function () {
        var u = JSON.parse(localStorage.listUser);

        for (var i in loadCart[u.IdCart].Hotel) {

            if (loadCart[u.IdCart].Hotel[i].IdFestival == f.Id) {
                $("#typeoption").html(loadCart[u.IdCart].Hotel[i].Typeroom);
                $("#hotel").val(loadCart[u.IdCart].Hotel[i].Amount);
                $('#startdayD').val(loadCart[u.IdCart].Hotel[i].Startday);
                $('#enddayD').val(loadCart[u.IdCart].Hotel[i].Endday);

            }



        }


    });





});
function checkloginn() {
    var a = localStorage.User;

    if (a == '') {
        var html = '<a id="showmodalhotel" class="read-more" type="button" data-toggle="modal" data-target="#squarespaceModal" href="#">Login now</a>';
        $('.aaaa').html(html);


    }


}

