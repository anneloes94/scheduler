import React from "react";

import { render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, getByTestId, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"))
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    })
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 1. Get empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 2. Click add button
    fireEvent.click(getByAltText(appointment, "Add"))

    // 3. Change student name input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 4. Click save button
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();


    // Check whether DayListItem displays "no spots remaining"

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    //NOTE: does NOT work when other tests are run, since they change the amount of spots available
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Delete"))
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"))

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    await waitForElement(() => getByText(day, "2 spots remaining"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it.only("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Edit"))
    
    // 4. Check that the confirmation message is shown.
    expect(getByTestId(appointment, "student-name-input")).toHaveValue("Archie Cohen")

    // 5. Change student name to "Archald Nohan"
    debug(appointment)
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Archald Nohan" }
    });

    // 6. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument(); 
    
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByText(appointment, "Archald Nohan"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    ); 

    await waitForElement(() => getByText(day, "2 spots remaining"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  })
  
})