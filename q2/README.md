# Generic Table Component Template

This template is designed to help you implement a generic table component that can display data from two different types of API responses using a single component. The goal is to provide a reusable and flexible solution for displaying tabular data in a frontend application.

## Target
The target of this template is to create a reusable table component that can handle and display data from multiple API responses with different structures.

## Usage Instructions

1. The app.component.html file includes a basic template for displaying customers and products:
```html
<h1>Customers</h1>
<app-table [value]='customers' [columns]="[]"></app-table>

<h1>Products</h1>
<app-table [value]='products' [columns]="[]"></app-table>
```

2. API Calls:
 
Basic versions of API calls are implemented in app.component.ts. The API URLs are:

- `/api/v1/customer`
- `/api/v1/product`

The default settings for pagination are `?page=1&perPage=10`.

3. Mocking APIs: APIs are mocked using MSW. Check src/mock/handlers.ts for details.
