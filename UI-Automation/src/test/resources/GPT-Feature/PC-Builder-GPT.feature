Feature: PC Builder GPT

  Scenario: User opens the part page
   Given the user is on the home page
   When user click on "Parts"
    Then all the part should be displayed
  |Asus|
  |Gigabyte|
  |MSI     |
  |Intel|
  |AMD  |
  |Corsair|
  |G.Skill|
  |Kingston|


  Scenario: User adds a part to the cart
    Given the user is on the home page
    When user click on "Parts"
    Then all the part should be displayed
      |Asus|
      |Gigabyte|
      |MSI     |
      |Intel|
      |AMD  |
      |Corsair|
      |G.Skill|
      |Kingston|
    And  user select "Asus" and add it in cart
    And  user select "Gigabyte" and add it in cart
    And  user select "Intel" and add it in cart
    And Validate below product in cart
      |Asus|
      |Gigabyte|
      |Intel     |
