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
