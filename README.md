# Assignment

Version: v17.1.3

## Module Structure

- Customers

```
Create a Customer
Name*: TextField
Email*: TextField
Region*: Select
Get Region Data from this API:
https://api.first.org/data/v1/countries(Note: If facing CORS errors using this API then you can copy data in array and use it OR use this chrome extension which will allow CORS - https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?utm_source=ext_sidebar&hl=en-GB)
Country: Select
Get Country Data based on Region Selection from this API:
https://api.first.org/data/v1/countries
```

- Pins

```
Create a Pin
Title*: TextField
Image*: Drag n Drop (Single Select)
Collaborators*: Multi-Select
List of Customers
Privacy*: Radio
Options: Public, Private
List of Pins
Title
Image
Collaborators
Privacy
```

## Dependencies

- ng2-file-upload
- ngx-select-ex
- Bootstrap
- Angular Material
- Lodash (Due to version issue with angular, required for: ng2-file-upload)
- Lodash.isEqual (Due to version issue with angular, required for: ngx-select-ex)

## My 2 cents

- Since Angular 17 supports `standalone component` which are simply put 'mini modules' hence we can use them across our application.
- `customer` and `pin` component could have been combined into one single component. But since it was mentioned that these 2 should be separate components hence created that way.
- Used material table (personal preference)
- Using snackbar to show messages (which can again be converted into a standalone component)
