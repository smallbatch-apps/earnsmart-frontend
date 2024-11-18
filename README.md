> ⚠️ **WARNING:** This repository is currently under active development and not ready for public use. It has been pushed for code management purposes only. If you want to look at the code that's fine, but please don't use it.

# Earn Smart Frontend

Application is written in NextJS to connect to a Golang backend located [here](https://github.com/smallbatch-apps/earnsmart-api).

The intent is to provide a trading and investment solution for CryptoCurrency assets on a variety of chains and protocols. The goal is a “blank slate”, largely devoid of pre-defined complex business rules or third party providers. This could later be extended with additional features and providers to serve as a platform for a wide variety of financial services.

## Installation and Setup

Installation is standard for any Node application.

```
git clone
npm install
npm run dev
```

Note that for the application to work you will need to create a `.env` file in the root directory with the following:

```
NEXT_PUBLIC_API_HOST=http://localhost:8090
```

The specific features and omissions are documented in more detail in the backend readme but the keys are:

1. No fees are taken from any transactions
2. There is no blockchain connection, such as a “hot wallet” or FireBlocks integration. Transactions are internal and database-only
3. Historical graphs are mocked - this is because transactions cannot be made with fake dates, making it impossible to generate history.
4. Swaps in particular simply exchange one currency for another at the same current USD rate - there is no RFQ provider or fee processing
5. Relatively little time has been spent on optional authentication such as social login, passkeys, or 2FA support.
6. No KYC or AML are present, though visible as an example in the UI.
7. There is no unit testing present
8. User “niceties” such as extensive settings like dark mode and optional currencies are not supported.
9. Only English is currently supported and text is hard-coded rather than implemented as translation keys

These have all been omitted for one of two reasons. They are either time-consuming for features that may or not be required, or they require external services and contracts. Or in a few cases - both.

## Technical details

Application is written in NextJS with Zustand for global storage, React Hook Form, ShadCN UI for components. Fonts are from Google Fonts and icons limited to free tier from FontAwesome. Zustand contains all data and data access patterns and acts as a cache that can be refreshed using several methods.

Please read the [backend application ReadMe](https://github.com/smallbatch-apps/earnsmart-api) for more detailed information on the full stack, technical decisions, and more interesting technology choices and implications.
