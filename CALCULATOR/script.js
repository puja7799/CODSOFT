/* ===============================
   Calculator Script
   Handles button clicks and display logic
================================= */

// Display input field
const inputBox = document.getElementById("inputBox");

// All calculator buttons
const buttons = document.querySelectorAll("button");

// Stores current expression
let expression = "";

// Loop through each button
buttons.forEach(button => {

    // Add click event to each button
    button.addEventListener("click", () => {

        // Get button text value
        const value = button.innerText;

        // Clear all input
        if (value === "AC") {
            expression = "";
            inputBox.value = "";
        }

        // Delete last character
        else if (value === "DEL") {
            expression = expression.slice(0, -1);
            inputBox.value = expression;
        }

        // Calculate result
        else if (value === "=") {
            try {
                // Evaluate expression
                expression = eval(expression).toString();
                inputBox.value = expression;
            } 
            catch {
                // Handle invalid expressions
                inputBox.value = "Error";
                expression = "";
            }
        }

        // For numbers and operators
        else {
            expression += value;
            inputBox.value = expression;
        }

    });
});
