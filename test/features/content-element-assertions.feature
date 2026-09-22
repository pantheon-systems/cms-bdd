Feature: Content and element assertion steps
  As a maintainer of cms-bdd
  I want the shared content and element assertion steps to pass and fail correctly
  So that consumers can trust them when writing their own scenarios

  Background:
    Given the toolbar fixture is loaded

  Scenario: See text that is present
    Then I should see "Manage"

  Scenario: Do not see text that is absent
    Then I should not see "totally-absent-text-xyz123"

  Scenario: See text matching a pattern
    Then I should see text matching "Manage"

  Scenario: Response contains expected text
    Then the response should contain "toolbar-administration"

  Scenario: Response does not contain unexpected text
    Then the response should not contain "totally-absent-text-xyz123"

  Scenario: See an element that is present
    Then I should see a "#toolbar-bar" element

  Scenario: Do not see an element that is absent
    Then I should not see a "#this-id-does-not-exist" element

  Scenario: See text within a specific element
    Then I should see "Manage" in the "#toolbar-bar" element

  Scenario: Count of matching elements
    Then I should see 1 "#toolbar-administration" elements

  Scenario: Element should be visible
    Then the "#toolbar-bar" element should be visible

  Scenario: Element should not be visible
    Then the "#this-id-does-not-exist" element should not be visible
