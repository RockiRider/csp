# CSP Toolkit

<!-- BEGIN BADGES -->
[![npm version](https://img.shields.io/npm/v/csp-toolkit)](https://www.npmjs.com/package/csp-toolkit)
[![npm downloads](https://img.shields.io/npm/dt/csp-toolkit)](https://www.npmjs.com/package/csp-toolkit)
[![npm weekly downloads](https://img.shields.io/npm/dw/csp-toolkit)](https://www.npmjs.com/package/csp-toolkit)
[![License](https://img.shields.io/npm/l/csp-toolkit)](https://github.com/RockiRider/csp/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/RockiRider/csp?style=social)](https://github.com/RockiRider/csp)
<!-- END BADGES -->

A comprehensive toolkit for working with Content Security Policy (CSP) directives in TypeScript. Provides strongly-typed CSP keys, categorized directives, and utility functions to simplify CSP creation and manipulation.

## Features

- Typed CSP Directives: Access categorized CSP directive types, including experimental, official, and navigation directives.
- Utility Functions: Easily generate CSP key-value maps and convert them into string policies.
- Extensible: Designed for flexibility and future expansion.

## Usage

```ts

import {mergePolicies, CSPPolicy, policyToString} from "csp-toolkit"

```
