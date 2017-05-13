import {isValidPhoneNumber,formatCurrency} from "./util";


it('test isValidPhoneNumber', () => {
  expect(false);
  expect(isValidPhoneNumber("eee")).toBeFalsy();
  expect(isValidPhoneNumber("714 654 655")).toBeFalsy();
  expect(isValidPhoneNumber("714 654 6550")).toBeTruthy();
  expect(isValidPhoneNumber("(714) 654-6550")).toBeTruthy();
});


it('test formatCurrency', () => {
  console.log(formatCurrency(33));

});