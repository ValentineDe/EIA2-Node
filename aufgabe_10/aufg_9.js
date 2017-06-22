//Aufgabe: Aufgabe 9
//Name: Valentine Deinert
//Matrikel: 254015
//Datum: 20.05.2017  
var Form;
(function (Form) {
    window.addEventListener("load", init);
    let f;
    let flavors = ["Schokolade-Chilli", "Avocado", "Lavendel", "Basilikum", "Macha", "Schwarztee-Zitrone", "Drachenfrucht", "Rosmarin", "Pecannuss-Banane", "Sesam", "Cola-Weizen"];
    let inputsFlavor = [];
    let t;
    let toppings = ["Kaffeebohnen", "Blüten", "Amaranth", "Erdnussbutter", "Kakaonibs", "Kiwi-Erdbeer Sauce", "Ahoi-Brause", "Chilliflocken", "Salted Caramel", "Kürbiskerne", "Schokosirup", "Ahornsirup"];
    let inputsTopping = [];
    let c;
    let container = ["Waffel", "Becher", "Am Stiel"];
    let inputsContainer = [];
    let fieldset;
    let order;
    let check;
    let orderList;
    function init() {
        f = document.getElementById("flavors");
        t = document.getElementById("toppings");
        c = document.getElementById("container");
        order = document.getElementById("order");
        check = document.getElementById("send");
        zusammenstellung();
        f.addEventListener("change", price);
        t.addEventListener("change", price);
        c.addEventListener("change", price);
        check.addEventListener("click", checkOrder);
    }
    function zusammenstellung() {
        for (let i = 0; i < flavors.length; i++) {
            createFlavor(flavors[i]);
        }
        for (let i = 0; i < toppings.length; i++) {
            createTopping(toppings[i]);
        }
        for (let i = 0; i < container.length; i++) {
            createContainer(container[i]);
        }
    }
    ///////////Eissorte////////////////////////////////////////////////      
    function createFlavor(_flavor) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.innerText = _flavor;
        input.setAttribute("type", "number");
        input.setAttribute("value", "0");
        input.min = "0";
        label.id = _flavor;
        label.appendChild(input);
        f.appendChild(label);
        inputsFlavor.push(input);
    }
    ///////////Topping////////////////////////////////////////////////     
    function createTopping(_toppings) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.innerText = _toppings;
        input.type = "checkbox";
        label.id = _toppings;
        label.appendChild(input);
        t.appendChild(label);
        inputsTopping.push(input);
    }
    ///////////Darreichungsform////////////////////////////////////////////////     
    function createContainer(_container) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.innerText = _container;
        label.id = _container;
        input.name = "container";
        input.type = "radio";
        label.appendChild(input);
        inputsContainer.push(input);
        c.appendChild(label);
    }
    ///////////Preissumme////////////////////////////////////////////////  
    function price() {
        let total = 0;
        for (let i = 0; i < inputsFlavor.length; i++) {
            total += parseInt(inputsFlavor[i].value);
        }
        for (let i = 0; i < inputsTopping.length; i++) {
            if (inputsTopping[i].checked)
                total += .25;
        }
        showSum(total);
    }
    function showSum(_sum) {
        orderList = document.getElementById("kreation");
        orderList.innerText = "";
        for (let i = 0; i < inputsFlavor.length; i++) {
            if (parseInt(inputsFlavor[i].value) > 0) {
                orderList.innerText += (parseInt(inputsFlavor[i].value)) + " Kugeln " + flavors[i] + " " + "\n";
            }
        }
        for (let i = 0; i < inputsTopping.length; i++) {
            if (inputsTopping[i].checked) {
                orderList.innerText += toppings[i] + "\n";
            }
        }
        for (let i = 0; i < inputsContainer.length; i++) {
            if (inputsContainer[i].checked) {
                orderList.innerText += container[i] + "\n";
            }
        }
        let completeSum = document.getElementById("summe");
        completeSum.innerText = _sum.toString() + " €";
    }
    ///////////Bestellung überprüfen////////////////////////////////////////////////
    function checkOrder() {
        let warning = ["Invalid Entry: \n"];
        let name = document.getElementById("name");
        let adress = document.getElementById("adress");
        let country = document.getElementById("country");
        let container = 0;
        let kugel = 0;
        //persönliche Daten
        if (name.validity.valid == false)
            warning.push("Stopp! Wir kennen deinen Namen noch nicht! \n");
        if (adress.validity.valid == false)
            warning.push("Stopp! Deine Adresse fehlt noch! \n");
        if (country.validity.valid == false)
            warning.push("Stopp! Deine PLZ und Stadt fehlen noch! \n");
        //Zutaten
        for (let i = 0; i < inputsFlavor.length; i++) {
            if (parseInt(inputsFlavor[i].value) > 0)
                kugel += 1;
        }
        if (kugel == 0)
            warning.push("Du musst dir eine Eissorte aussuchen!\n");
        for (let i = 0; i < inputsContainer.length; i++) {
            if (inputsContainer[i].checked)
                container += 1;
        }
        if (container == 0)
            warning.push("Du musst dir einen Behälter aussuchen!\n");
        //unvollständig
        if (warning.length > 1) {
            for (let i = 0; i < warning.length; i++)
                warning.push;
            alert(warning.join(""));
        }
        else {
            alert("Deine Bestellung wurde verschickt!\n");
            document.getElementById("eisshop").submit();
        }
    }
})(Form || (Form = {}));
//# sourceMappingURL=aufg_9.js.map