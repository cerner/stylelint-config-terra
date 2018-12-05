ChangeLog
=========

1.5.0 - (December 5, 2018)
-----------------
### Changed
* Removed custom property version checking.
* Renamed custom-property-namespace-version to custom-property-namespace

1.4.0 - (November 29, 2018)
-----------------
### Added
* Added: `custom-property-no-duplicate-declaration` rule to disallow a custom property to be declared more than once with a different fallback value

1.3.0 - (October 30, 2018)
------------------
### Added
* Added: `custom-property-name` rule to enforce custom properties be suffixed with the css style property name
* Added: `custom-property-namespace-version` rule to enforce custom properties to be prefixed with a namespace and version
* Added: `custom-property-pattern` rule to enforce custom properties be written in lowercase alphanumeric characters and hyphens
* Added: `custom-property-pseudo-selectors` rule to enforce custom properties to include the ancestor pseudo selector names

1.2.0 - (August 30, 2018)
------------------
### Changed
* Bumped stylelint-order dependency to v1.0.0

1.1.0 - (August 8, 2018)
------------------
### Changed
* Added `calc`, `cursor`, and `outline` to ignored style list for browser support.

1.0.0 - (June 18, 2018)
------------------
* Initial stable release
