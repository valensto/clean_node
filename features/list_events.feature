Feature: List events
  As a member
  I want to see a list of events

  Scenario: A member wants to see the published events
    Given a member
    And there are published events
    When the member visits the events page
    Then he must see all the published events

  Scenario: A member wants to see "<city>" events
    Given a member
    And there are published events in "<city>"
    When the member search for events in "<city>"
    Then he must see all the published events in "<city>"
    Examples:
      | city   |
      | Paris  |
      | London |
      | Reims  |