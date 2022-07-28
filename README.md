<img width="957" alt="utsav logo" src="https://user-images.githubusercontent.com/60435870/181472320-5f83831e-44fa-4db9-a1c5-1b3505056690.png">

## “The purpose of event management is to create a client who creates other clients.”

UTSAV is an event management company for planning events involving grand weddings, lavish anniversaries and birthdays.

## Type of Users

Vendors     : The one who wants to be the organizer and offers goods

Customers   : The one who is interested in taking the benefits of goods



## Flow of the Website

1.  Customer Point of View
```mermaid
graph 
A[Home Page] --> B((SignUP))
B-->C
A --> C((SignIn))
C --> D{Choose an Evenet}
D-->E(Wedding)
D-->F(Anniversary)
D-->G(Birthday)
E-->H(Search for Vendor)
F-->H(Search for Vendor)
G-->H(Search for Vendor)
H-->I(Choose the vendor Accordingly)
I-->J(Get in touch)
J-->K(Event Organized)
```

2.  Vendor Point of View
```mermaid
graph 
A[Home Page] --> B((SignUP))
B-->C
A --> C((SignIn))
C --> D{Fill the Details}
D-->E(Wedding)
D-->F(Anniversary)
D-->G(Birthday)
E-->H(Save Details)
F-->H(Save Details)
G-->H(Save Details)
H-->J(Get in touch)
J-->K(Event Recorded)
```
## SUMMARY

UTSAV - FULL STACK PROJECT (HTML, CSS, Javascript, NodeJS, Bootstrap, jQuery, Angular,js, SQL):
◦ It is an event planning website where we may find vendors providing various services in any region of the country, as well as a 
list of vendors and the services provided by them.

◦ Used NodeMailer in NodeJS for sending and receiving mails.

◦ Used MySQL and NodeJS for handling backend queries.
