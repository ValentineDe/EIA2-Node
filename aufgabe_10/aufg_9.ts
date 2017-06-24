//Aufgabe: Aufgabe 9
//Name: Valentine Deinert
//Matrikel: 254015
//Datum: 20.05.2017  

namespace Form {
    window.addEventListener("load", init);

    let f: HTMLElement;
    let flavors: string[] = ["Schokolade-Chilli", "Avocado", "Lavendel", "Basilikum", "Macha", "Schwarztee-Zitrone", "Drachenfrucht", "Rosmarin", "Pecannuss-Banane", "Sesam", "Cola-Weizen"];
    let inputsFlavor: HTMLInputElement[] = [];

    let t: HTMLElement;
    let toppings: string[] = ["Kaffeebohnen", "Blüten", "Amaranth", "Erdnussbutter", "Kakaonibs", "Kiwi-Erdbeer Sauce", "Ahoi-Brause", "Chilliflocken", "Salted Caramel", "Kürbiskerne", "Schokosirup", "Ahornsirup"];
    let inputsTopping: HTMLInputElement[] = [];

    let c: HTMLElement;
    let container: string[] = ["Waffel", "Becher", "Am Stiel"];
    let inputsContainer: HTMLInputElement[] = [];

    let fieldset: HTMLFieldSetElement;

    let order: HTMLElement;
    let check: HTMLElement;
    let orderList: HTMLElement;


    function init(): void {

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

    function zusammenstellung(): void {

        for (let i: number = 0; i < flavors.length; i++) {
            createFlavor(flavors[i]);
        }
        for (let i: number = 0; i < toppings.length; i++) {
            createTopping(toppings[i]);
        }
        for (let i: number = 0; i < container.length; i++) {
            createContainer(container[i]);
        }
    }

    ///////////Eissorte////////////////////////////////////////////////      
    function createFlavor(_flavor: string): void {

        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");

        label.innerText = _flavor;
        input.setAttribute("type", "number");
        input.setAttribute("value", "0");
        input.min = "0";
        label.id = _flavor;
        input.name = "Eissorte";
        label.appendChild(input);
        f.appendChild(label);
        inputsFlavor.push(input);
    }

    ///////////Topping////////////////////////////////////////////////     
    function createTopping(_toppings: string): void {

        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");

        label.innerText = _toppings;
        input.type = "checkbox";
        label.id = _toppings;
        input.name = "Topping";
        label.appendChild(input);
        t.appendChild(label);
        inputsTopping.push(input);
    }

    ///////////Darreichungsform////////////////////////////////////////////////     
    function createContainer(_container: string): void {

        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");

        label.innerText = _container;
        label.id = _container;
        input.name = "Behälter";
        input.type = "radio";

        label.appendChild(input);
        inputsContainer.push(input);
        c.appendChild(label);
    }

    ///////////Preissumme////////////////////////////////////////////////  

    function price(): void {
        let total: number = 0;
        for (let i: number = 0; i < inputsFlavor.length; i++) {
            total += parseInt(inputsFlavor[i].value);
        }
        for (let i: number = 0; i < inputsTopping.length; i++) {
            if (inputsTopping[i].checked)
                total += .25;
        }
        showSum(total);
    }

    function showSum(_sum: Number): void {

        orderList = document.getElementById("kreation");
        orderList.innerText = "";

        for (let i: number = 0; i < inputsFlavor.length; i++) {
            if (parseInt(inputsFlavor[i].value) > 0) {
                orderList.innerText += (parseInt(inputsFlavor[i].value)) + " Kugeln " + flavors[i] + " " + "\n";
            }
        }

        for (let i: number = 0; i < inputsTopping.length; i++) {
            if (inputsTopping[i].checked) {
                orderList.innerText += toppings[i] + "\n";
            }
        }

        for (let i: number = 0; i < inputsContainer.length; i++) {
            if (inputsContainer[i].checked) {
                orderList.innerText += container[i] + "\n";
            }
        }

        let completeSum: HTMLElement = document.getElementById("summe");
        completeSum.innerText = _sum.toString() + " €";
    }

    ///////////Bestellung überprüfen////////////////////////////////////////////////

    function checkOrder(): void {

        let warning: string[] = ["Invalid Entry: \n"];
        let name: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
        let adress: HTMLInputElement = <HTMLInputElement>document.getElementById("adress");
        let country: HTMLInputElement = <HTMLInputElement>document.getElementById("country");

        let container: number = 0;
        let kugel: number = 0;

        //persönliche Daten
        if (name.validity.valid == false)
            warning.push("Stopp! Wir kennen deinen Namen noch nicht! \n");
        if (adress.validity.valid == false)
            warning.push("Stopp! Deine Adresse fehlt noch! \n");
        if (country.validity.valid == false)
            warning.push("Stopp! Deine PLZ und Stadt fehlen noch! \n");

        //Zutaten
        for (let i: number = 0; i < inputsFlavor.length; i++) {
            if (parseInt(inputsFlavor[i].value) > 0)
                kugel += 1;
        }
        if (kugel == 0)
            warning.push("Du musst dir eine Eissorte aussuchen!\n");

        for (let i: number = 0; i < inputsContainer.length; i++) {
            if (inputsContainer[i].checked)
                container += 1;
        }
        if (container == 0)
            warning.push("Du musst dir einen Behälter aussuchen!\n");

        //unvollständig
        if (warning.length > 1) {
            for (let i: number = 0; i < warning.length; i++)
                warning.push;
            alert(warning.join(""));
        }

        //vollständig
        else {
            alert("Deine Bestellung wurde verschickt!\n");
            (<HTMLFormElement>document.getElementById("eisshop")).submit();
        }
    }
}