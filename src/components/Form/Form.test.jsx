import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";
import userEvent from "@testing-library/user-event";

test("Koşulların onaylanmasına göre buton aktifliği", async () => {
  const user = userEvent.setup();

  render(<Form />);

  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  expect(checkBox).not.toBeChecked();
  expect(button).toBeDisabled();

  await user.click(checkBox);

  expect(button).toBeEnabled();

  await user.click(checkBox);

  expect(button).toBeDisabled();
});

test("Onay butonunun hover durumuna göre bildirim görünür", async () => {
  const user = userEvent.setup();

  render(<Form />);

  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const popup = screen.getByText(/size gerçekten/i);

  await user.click(checkBox);

  expect(popup).not.toBeVisible();

  fireEvent.mouseEnter(button);

  expect(popup).toBeVisible();

  fireEvent.mouseLeave(button);

  expect(popup).not.toBeVisible();
});
