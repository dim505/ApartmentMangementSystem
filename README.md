Please see the start of my apartment management system. (Please note it is still being developed at the moment)
 My applications are now live!! Click here for my Land lord front end  (https://amsfrontend.azurewebsites.net) OR Click here for my tenant front end (https://amstenantfrontend.azurewebsites.net) 

My projects have a React JS front end, an ASP.Net API backend, and a SQL database. There are 2 front ends. One front end is for the Tenant and the other front end is for the Land Lord.

Land Lord frontend features:
1) You can upload/edit/delete tenants, properties, receipts and pictures.

2) It is integrated with Auth0 for authentication.

3) It autosuggests addresses when filling out or updating the property form using the HERE api.

4) It also has automated task scheduling using Hangfire. Once a day it checks if there are any leases that are about to expire and it will send a text message via Twillo or an email via Azure.

5) It has a dashboard for analytics.

5A) At the top there is a series of quick facts. It outlines some quick statistics including: Total number of tenants, total number of properties, Total property taxes paid for the year, and total expenses for the year (Receipts).

5B) In the second tier of windows, there is a series of graphs that further analyze the data. The first graph analyzes your expenses occurred for each month, 2nd graph shows how many tenants you add each month, and the 3rd graph shows how many properties you add each year.

5C) Lastly, the Google Maps at the bottom displays all your properties on the map. If you click on the marker it shows the street address.

It has aspects of Bootstrap and Material UI. Please click on the GITHUB picture below to see my code or the LIVE pictures to see my apps live!

Tenant frontend features:
This will contain a dashboard that will allow the user to pay their rent, view payment history, news related to their apartment, edit their account information and contact their land lord