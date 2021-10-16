$(function () {
  const termekTomb = [];
  let aktObjektum = {}; //deklarálok egy üres objektumot, ez kesz az aktuális objektum
  let aktSorSzama;

  adatbeolvas("jsontermekek.json", termekTomb, function () {
    megjelenit(termekTomb);
  });

  modosit(termekTomb);
  

  function adatbeolvas(fajlnev, tomb, myCallback) {
    $.ajax({
      url: fajlnev,
      success: function (result) {
        //console.log(result);
        result.lista.forEach((element) => {
          tomb.push(element); //pakolja be a tombbe a beolvasott json fileban levo lista elemeit
        });
        //console.log(tomb.length);
        //itt teljes a tomb --> itt kell meghivni az adatbetoltest v.egyeb fuggvenyt
        myCallback(tomb);
      },
    });
    //console.log(tomb.length);
    //itt mar ures a tomb
  }

  function megjelenit(tomb) {
    $("#tablazat").empty();
    let tablazat = "<table>";
    // let fejlec = "<tr>";
    // for (let item in tomb[0]) {
    //   fejlec += "<th>" + item + "</th>";
    // }
    // tablazat += fejlec + "<th>Módosítás</th><th>Törlés</th></tr>";

    tablazat += "<tr><th>Termék neve</th> <th>Leírás</th> <th>Darabszám</th> <th>Ár</th> <th>Módosítás</th><th>Törlés</th></tr>";


    tomb.forEach((element, index) => {
      tablazat += "<tr id='" + index + "'>";

      for (let key in element) {
        tablazat += "<td>" + element[key] + "</td>";
      }

      tablazat +=
        "<th><input type='button' value='Módosít' id='modosit' sorszam='" +
        index +
        "'></th><th><input type='button' value='Töröl' id='torol' sorszam='" +
        index +
        "'></th></tr>";
    });

    tablazat += "</table>";
    $("#tablazat").append(tablazat);

    formbaBetolt(tomb);
    torol(tomb);
    
  }

  function formbaBetolt(tomb) {
    /*MÓDOSÍT GOMB - rekord betöltése a formba*/

    $("table").on("click", "#modosit", function () {
      //a táblázatban található összes Módosít gombra működik
      aktSorSzama = $(this).attr("sorszam"); //a sorszám attr. alapján azonosítjuk a sort, ahol a kattintás történt  --> ez megegyezik a tömbbeli indexszel
      console.log(aktSorSzama);
      let szamlalo = 0;
      for (let key in tomb[aktSorSzama]) {
        $("form input[type=text]")
          .eq(szamlalo++)
          .val(tomb[aktSorSzama][key]);
        aktObjektum[key] = tomb[aktSorSzama][key]; //objektum "feltöltése" adatokkal
      }
    });
  }

  function modosit(tomb) {
    formbaBetolt(tomb);

    /*OK GOMB - módosítás végrehajtása*/
    $("#ok").on("click", function () {
      aktObjektum["Terméknév"] = $("#termeknev").val();
      aktObjektum["Leírás"] = $("#leiras").val();
      aktObjektum["Készlet"] = $("#keszlet").val();
      aktObjektum["Ár"] = $("#ar").val();
      //console.log(tomb);

      tomb[aktSorSzama] = aktObjektum;
      aktObjektum = {}; //obj. változó ürítése
      $("form input[type=text]").val(''); //formadatok ürítése

      megjelenit(tomb);
    });
  }



  function torol(tomb) {       
    $("table").on("click", "#torol", function () {
      //a táblázatban található összes Töröl gombra működik
      aktSorSzama = $(this).attr("sorszam"); //a sorszám attr. alapján azonosítjuk a sort, ahol a kattintás történt  --> ez megegyezik a tömbbeli indexszel
      console.log(aktSorSzama);
      tomb.splice(aktSorSzama, 1);
      console.log(tomb);

      megjelenit(tomb);
    });
  }
});
