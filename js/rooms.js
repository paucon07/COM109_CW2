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
function submitBooking() {
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const guests = document.getElementById("guests").value;

    if (!checkin || !checkout) {
        alert("Please fill in your check-in and check-out dates.");
        return;
    }
    if (new Date(checkout) <= new Date(checkin)) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    const booking = {
        room: selectedRoomName,
        price: selectedRoomPrice,
        checkin,
        checkout,
        guests
    };

    localStorage.setItem("currentBooking", JSON.stringify(booking));
    alert(`Booking saved! ${selectedRoomName}, ${guests} guest(s), ${checkin} → ${checkout}`);
}