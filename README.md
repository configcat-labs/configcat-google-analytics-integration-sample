# Animal Sounds

This sample app accompanies the article: **A/B Testing with ConfigCat and Google Analytics.**

The app is a quiz where users listen to an animal sound and then choose the correct animal name from four options. The quiz app was built using Vue.js.

We’re running an A/B test to see if highlighting the answer will encourage users to play more.

![Selecting an option in the control variation of the quiz. The answer is not highlighted](https://github.com/user-attachments/assets/a4e8fcd1-1ca4-4ec4-9227-ea5aeb97e4e1)

Control

![Selecting an option in the variant with the answer highlighted](https://github.com/user-attachments/assets/c8c5dadb-70c8-448a-8843-c5fba08ed283)

Variant

## Build & Run

### Prerequisites

- Node v20+
- A ConfigCat account
- A Google Analytics account

Follow these steps to run this project on your computer:

1. Clone the repository:
   - Click the green "Code" button on the repository's page and copy the URL in the text field.
   - Paste and run the following in your terminal: `git clone https://github.com/configcat-labs/configcat-google-analytics-integration.git`.

2. Install the dependencies:

```sh
cd configcat-google-analytics-integration
npm install
```

3. Enter your ConfigCat SDK key in `main.js`.
4. Enter your Google Analytics Measurement ID in `index.html`.
5. Run the project:

```sh
npm run dev
```

## Learn more

Useful links to technical resources.

- [ConfigCat percentage targeting guide](https://support.google.com/analytics/answer/9212670)
- [Creating Audiences in Google Analytics](https://support.google.com/analytics/answer/9267572)
- [Google Analytics reports guide](https://support.google.com/analytics/answer/9212670)

[**ConfigCat**](https://configcat.com) also supports many other frameworks and languages. Check out the full list of supported SDKs [here](https://configcat.com/docs/sdk-reference/overview/).

You can also explore other code samples for various languages, frameworks, and topics here in the [ConfigCat labs](https://github.com/configcat-labs) on GitHub.

Keep up with ConfigCat on [X](https://x.com/configcat), [Facebook](https://www.facebook.com/configcat), [LinkedIn](https://www.linkedin.com/company/configcat/), and [GitHub](https://github.com/configcat).

## Author

[Zayyad Muhammad Sani](https://github.com/Z-MS)

## Contributions

Contributions are welcome!
