# Marketo Form notes

## Here's a high level overview of the Marketo forms flow:

1. Component mounts with an empty form and has the marketo id of the form it should load

2. The `useMarketoFormAPI()` hook loads the marketo script file if it's not loaded then initializes the MarketoCore class and sets several pieces of state.

3. The `MarketoCore` constructor runs through setting up a lot of it's required values and then runs the `init` method which contains a bulk of the form loading logic.

4. `init`: runs the `MktoForms2.loadForm` which injects the form, then initializes the `MarketoFormCleanup` and `FormErrors` utility classes. It also runs `prefillForm`, `handleReusableCheckboxes`, and `onValidate` methods which pre-fill the form, set up the checkboxes, and set if the form can be submitted.

5. Finally, it changes the default submit behavior depending on if a url or callback are provided.

Depending on which form is being loaded, the `init` method performs additional actions, such as prepping the additional form required by the Tosca form.

The `prefillForm` method uses the DTO pattern provided by Sanford Whiteman to perform secure data transfer between client side and Marketo.

A lot of methods that didn't require a strong reference to `this` on the class object were moved to the `utils` file.

The `MarketoData` file contains a lot of logic for setting cookies and retrieving data.

## Considerations

I've ported over the `mktoI18n` object and saved it into a global variable. It was used previously for translation, but that was for Wordpress.

## TODOS

| filename    | line# | note                                                             |
| ----------- | ----- | ---------------------------------------------------------------- |
| MarketoForm | 7     | bug that exists when using the back button to return to the page |
