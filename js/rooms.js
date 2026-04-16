let selectedRoomDiv = null;
let selectedRoomName = "";
let selectedRoomPrice = 0;

function selectRoom(element, name, price) {

    // remove previous highlight
    if (selectedRoomDiv) {
        selectedRoomDiv.classList.remove("selected");
    }

    // set new highlight
    element.classList.add("selected");

    selectedRoomDiv = element;
    selectedRoomName = name;
    selectedRoomPrice = price;

    document.getElementById("selectedRoom").innerText =
        `Selected: ${name} (£${price}/night)`;
}

function showForm() {
    if (!selectedRoomName) {
        alert("Please select a room first!");
        return;
    }

    document.getElementById("bookingForm").style.display = "block";

    document.getElementById("bookingForm").scrollIntoView({
        behavior: "smooth"
    });
}