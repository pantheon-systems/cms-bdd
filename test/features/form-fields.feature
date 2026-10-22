Feature: Form field steps
  As a maintainer of cms-bdd
  I want the shared form steps to find fields by label or by name attribute
  So that consumers can drive controls that have no associated label

  Background:
    Given the form fixture is loaded

  Scenario: Fill in a field by its label
    When I fill in "Title" with "Hello"
    Then the "Title" field should contain "Hello"

  Scenario: Fill in a field by its name attribute
    When I fill in "settings[note]" with "remember"
    Then the "settings[note]" field should contain "remember"

  Scenario: Choose an option in a select by its name attribute
    When I fill in "settings[max_age]" with "604800"
    Then the "settings[max_age]" field should contain "604800"
    And the "settings[max_age]" field should not contain "600"

  Scenario: Check a checkbox by its label
    When I check "Subscribe"
    Then the "Subscribe" checkbox should be checked
