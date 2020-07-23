    
        My projects have a React JS front end, an ASP.Net API backend,
        and a SQL database. There are 2 front ends. One front end is for the Tenant and the other front end is for the Land Lord.
    
    Land Lord front end features:  
    
        1) You can upload/edit/delete tenants, properties, receipts, news related to those properties, account information,
        and pictures.
    
    2) It is integrated with Auth0 for authentication.
    3) It auto suggests addresses when filling out or updating the property form using the HERE api.
    
        4) It also has automated task scheduling  using
        Hangfire. Once a day it checks if there are any leases that are about to expire and it will send a text message via Twillo or an email via Azure.
    
    5)  It has a dashboard for analytics.
    
        5A)
        At the top
        there are a series of quick facts. It outlines some quick statistics including: total number of tenants, total number of properties, total property taxes paid for the year, and total expenses for the
        year (Receipts).
    
    
        5B)
        In the second tier of windows, there are series of graphs that further analyze the data. The first graph analyzes your expenses occurred for each month, 2nd graph shows how many
        tenants you add each month, and the 3rd graph shows how many properties you add each year.
    
    
        5C)
        Lastly, the Google Maps at the bottom displays all your properties on the map. If you click on the marker
        it shows the street address.
    

    
        6) It also has a messenger page. It pulls all the tenants that where added and the Landlord can hold a conversation individually with each tenant without having to resort to email.
    

     ** Please note you need to be added as a tenant to a property if you want to log in as a tenant to see the relevant information **


    Tenant front end features:  
    
        This contains a dashboard that will allow the users to do the following:

    	1) Pay their rent (This shows when rent is due and how much. It is dynamically calculated based on when the lease date expired and when the tenant is added to the system) 
     2) View payment history (This shows some quick facts of how much rent they paid each month and they can see each individual transaction that has occurred) 
     3) See news related to their apartment (Landlords can push out news related their apartments such as potential outages or planned upgrades)
     4) Edit their account information (They can enter their edit their name, phone number, and add a profile picture)
     5) Contact their land lord (That info. card contains the land lords name, email and phone number. When the user tries to contact the Landlord, it will send an email to the Land Lord and the Tenant and Landlord can continue with conversation over email.)
    
        6) Lastly, it contains a chat widget that enables you to talk to the land lord in real time.
        Its a chat application. It is located in the lower right hand of the page.
    
    .

    This application is integrated with Stripe for payment processing and Auth0 for authentication. It uses the Twillo Chat API for the backend of the chat application.
    