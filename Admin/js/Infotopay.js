
var listinfo = [];
function purcharse(iduser, name, email, address, numberphone, numberbank, bank) {
    this.Iduser = iduser;
    this.Name = name;
    this.Email = email;
    this.Address = address;
    this.Phone = numberphone;
    this.Bank = numberbank;
    this.Typebank = bank;
};

window.onload = function () {
    loadfeedback();

};

$(document).ready(function () {
    firebase.initializeApp(config);

    $(document).on('click', '.deleteUser', function () {
        var id = $(this).data('id');
        $('#savedata1').data('save', id);


    });
    $('#savedata1').click(function () {
        var id = ($('#savedata1').data('save'));
        var rootRef = firebase.database().ref().child('Purcharse/' + id);
        rootRef.remove();
        window.location.reload(true);
    });




});
function loadfeedback() {
    var rootRef = firebase.database().ref().child('Purcharse/');

    rootRef.on('child_added', function (data, i) {
        var j = data.val();
        listinfo.push(new purcharse(j.Iduser, j.Name, j.Email, j.Address,j.Phone,j.Bank,j.Typebank));
        if (i === null) {
            i = 0;
        }
        else {
            i = parseInt(i) + 1;

        }
        document.getElementById('putdata').innerHTML += PushData(i, j.Iduser, j.Name, j.Email, j.Address,j.Phone,j.Bank,j.Typebank);



    });


}
function PushData(id, iduser, name, email, address, numberphone, numberbank, bank) {
    return '<tr>'
        + '   <td>' + id + '</td>'
        + '   <td>' + name + '</td>'
        + '   <td>' + iduser + '</td>'
        + '<td>' + email + '</td>'
        + '   <td>' + address + '</td>'
        + '   <td>' + numberphone + '</td>'
        + '   <td>' + numberbank + '</td>'
        + '   <td>' + bank + '</td>'
        + '   </tr>';

}; 