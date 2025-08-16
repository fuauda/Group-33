## Use Case Diagram

```mermaid
usecaseDiagram
    actor Citizen
    actor Volunteer
    actor NGO
    actor Admin

    Citizen --> (Register)
    Citizen --> (Login)
    Citizen --> (Request Support)
    Citizen --> (View Volunteer/NGO List)

    Volunteer --> (Register)
    Volunteer --> (Login)
    Volunteer --> (View Requests)
    Volunteer --> (Offer Help)
    Volunteer --> (Update Profile)

    NGO --> (Register)
    NGO --> (Login)
    NGO --> (Post Initiative)
    NGO --> (Manage Volunteers)
    NGO --> (Track Impact)

    Admin --> (Verify NGO)
    Admin --> (Manage Users)
    Admin --> (Generate Reports)

    (Login) .> (Register) : <<include>>
    (Request Support) .> (View Volunteer/NGO List) : <<extend>>
    (Manage Volunteers) .> (View Requests) : <<include>>
    (Generate Reports) .> (Track Impact) : <<include>>
