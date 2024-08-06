import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("API'dan gelen veriler için ekrana kartlar basılıyor mu?", async () => {
  render(<Toppings />);

  const images = await screen.findAllByAltText("sos-resim");

  expect(images.length).toBeGreaterThan(0);
});

test("Sosların eklenip çıkarılmasının toplama etkisi", async () => {
  const user = userEvent.setup();
  render(<Toppings />);

  const total = screen.getByTestId("total");

  const toppings = await screen.findAllByRole("checkbox");

  expect(total.textContent).toBe("0");

  await user.click(toppings[0]);

  expect(total.textContent).toBe("3");

  await user.click(toppings[2]);

  expect(total.textContent).toBe("6");

  await user.click(toppings[0]);

  expect(total.textContent).toBe("3");

  await user.click(toppings[2]);

  expect(total.textContent).toBe("0");
});
