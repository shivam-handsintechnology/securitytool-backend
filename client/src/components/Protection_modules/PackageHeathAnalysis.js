import React from 'react'

const PackageHeathAnalysis = () => {
    return (
        <div data-v-43af9ae8="" data-v-348571ee="" className="vue--layout-container">
            <div
                data-v-02a2301a=""
                data-v-348571ee=""
                className="vue--project-default__tab-pane"
                data-v-43af9ae8=""
            >
                <div
                    data-v-5272e1c8=""
                    data-v-02a2301a=""
                    className="vue--sidebar-filters vue--sidebar-filters--open"
                >
                    {" "}
                    <div data-v-5272e1c8="" className="vue--sidebar-filters__header">
                        <div
                            data-v-5272e1c8=""
                            data-snyk-test="TheSidebarFilters: handle"
                            aria-label="Toggle filtering controls"
                            tabIndex={0}
                            role="button"
                            className="vue--sidebar-filters__handle"
                            aria-expanded="true"
                        >
                            <span
                                data-v-5272e1c8=""
                                aria-hidden="true"
                                aria-label="Toggle filtering controls"
                                role="img"
                                focusable="false"
                                className="material-design-icon filter-outline-icon"
                            >
                                <svg
                                    data-v-5272e1c8=""
                                    fill="currentColor"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    className="material-design-icon__svg"
                                >
                                    <path
                                        data-v-5272e1c8=""
                                        d="M15,19.88C15.04,20.18 14.94,20.5 14.71,20.71C14.32,21.1 13.69,21.1 13.3,20.71L9.29,16.7C9.06,16.47 8.96,16.16 9,15.87V10.75L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L15,10.75V19.88M7.04,5L11,10.06V15.58L13,17.58V10.05L16.96,5H7.04Z"
                                    >
                                        {/**/}
                                    </path>
                                </svg>
                            </span>
                        </div>{" "}
                        <div
                            data-v-7aea7274=""
                            data-v-5272e1c8=""
                            className="vue--search-input vue--sidebar-filters__search"
                        >
                            <span
                                data-v-7aea7274=""
                                aria-hidden="true"
                                aria-label="Magnify icon"
                                role="img"
                                className="material-design-icon magnify-icon vue--search-input__search-icon"
                            >
                                <svg
                                    data-v-7aea7274=""
                                    fill="currentColor"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    className="material-design-icon__svg"
                                >
                                    <path
                                        data-v-7aea7274=""
                                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                    >
                                        {/**/}
                                    </path>
                                </svg>
                            </span>{" "}
                            <input
                                data-v-7aea7274=""
                                type="search"
                                placeholder="Search…"
                                aria-label="Search…"
                                id="sidebar-search-filter"
                                data-snyk-test="TheSidebarFilters: search input"
                                className="vue--search-input__field"
                            />{" "}
                            {/**/}
                        </div>{" "}
                        <div data-v-5272e1c8="" className="vue--sidebar-filters__actions">
                            <div
                                data-v-06ded3b9=""
                                data-v-b1e57370=""
                                className="vue--tooltip vue--tooltip--auto"
                                data-v-5272e1c8=""
                            >
                                <div
                                    data-v-06ded3b9=""
                                    data-snyk-test="BaseTooltip: label"
                                    className="vue--tooltip__label"
                                >
                                    <a
                                        data-v-46e4a2a7=""
                                        data-v-b1e57370=""
                                        href="/org/shivam-handsintechnology/fix/f142d36c-de24-46aa-a265-56058c4478a4"
                                        data-snyk-test="IssuesSidebarFiltersActionPR: open fix PR"
                                        className="vue--button vue--button--cta vue--button--large"
                                        data-v-06ded3b9=""
                                    >
                                        <span
                                            data-v-b1e57370=""
                                            data-v-46e4a2a7=""
                                            aria-label="Source Pull icon"
                                            role="img"
                                            className="material-design-icon source-pull-icon"
                                        >
                                            <svg
                                                data-v-b1e57370=""
                                                data-v-46e4a2a7=""
                                                fill="currentColor"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                className="material-design-icon__svg"
                                            >
                                                <path
                                                    data-v-b1e57370=""
                                                    data-v-46e4a2a7=""
                                                    d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z"
                                                >
                                                    <title data-v-b1e57370="" data-v-46e4a2a7="">
                                                        Source Pull icon
                                                    </title>
                                                </path>
                                            </svg>
                                        </span>
                                        Fix these vulnerabilities
                                    </a>
                                </div>{" "}
                                {/**/}
                            </div>
                        </div>
                    </div>{" "}
                    <div data-v-5272e1c8="" className="vue--sidebar-filters__container">
                        <div data-v-5272e1c8="" className="vue--sidebar-filters__aside">
                            {/**/}{" "}
                            <div data-v-5272e1c8="" className="vue--sidebar-filters__groups">
                                <div
                                    data-v-e2645244=""
                                    data-v-a0fd85a6=""
                                    data-v-cda5a2a6=""
                                    data-v-5272e1c8=""
                                    data-snyk-test="TheSidebarFiltersGroupType: Severity"
                                    className="vue--block-expandable vue--sidebar-filter-group-type vue--sidebar-filter-group-type-checkboxes vue--block-expandable--small vue--block-expandable--no-padding vue--block-expandable--open vue--block-expandable--minimal"
                                >
                                    <div data-v-e2645244="" className="vue--block-expandable__header">
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__container"
                                        >
                                            <div
                                                data-v-e2645244=""
                                                role="button"
                                                tabIndex={0}
                                                aria-expanded="true"
                                                className="vue--block-expandable__title"
                                            >
                                                <span
                                                    data-v-e2645244=""
                                                    aria-hidden="true"
                                                    aria-label="Expand this section"
                                                    role="img"
                                                    focusable="false"
                                                    className="material-design-icon chevron-down-icon vue--block-expandable__chevron"
                                                >
                                                    <svg
                                                        data-v-e2645244=""
                                                        fill="currentColor"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        className="material-design-icon__svg"
                                                    >
                                                        <path
                                                            data-v-e2645244=""
                                                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                        >
                                                            {/**/}
                                                        </path>
                                                    </svg>
                                                </span>{" "}
                                                <div
                                                    data-v-e2645244=""
                                                    className="vue--block-expandable__text"
                                                >
                                                    <header
                                                        data-v-a0fd85a6=""
                                                        data-v-e2645244=""
                                                        className="vue--sidebar-filter-group-type__header"
                                                    >
                                                        <h3
                                                            data-v-56a8aa57=""
                                                            data-v-a0fd85a6=""
                                                            className="vue--all-caps vue--sidebar-filter-group-type__title"
                                                            data-snyk-test="TheSidebarFiltersGroupType: title"
                                                            data-v-e2645244=""
                                                        >
                                                            Severity
                                                        </h3>
                                                    </header>
                                                </div>
                                            </div>{" "}
                                            {/**/}
                                        </div>
                                    </div>{" "}
                                    <div
                                        data-v-42d2c006=""
                                        data-v-e2645244=""
                                        className="vue--expand"
                                    >
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__content"
                                        >
                                            {" "}
                                            <div
                                                data-v-a0fd85a6=""
                                                className="vue--sidebar-filter-group-type__body"
                                            >
                                                <ul
                                                    data-v-cda5a2a6=""
                                                    className="vue--sidebar-filter-group-type-checkboxes__options"
                                                >
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Critical"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-critical-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Critical
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-critical-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-critical-input"
                                                                            aria-describedby="sidebar-filters-checkbox-critical-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: critical"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="critical"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-critical-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: critical"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            0
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="High"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-high-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            High
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-high-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-high-input"
                                                                            aria-describedby="sidebar-filters-checkbox-high-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: high"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="high"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-high-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: high"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            6
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Medium"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-medium-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Medium
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-medium-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-medium-input"
                                                                            aria-describedby="sidebar-filters-checkbox-medium-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: medium"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="medium"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-medium-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: medium"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            3
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Low"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-low-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Low
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-low-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-low-input"
                                                                            aria-describedby="sidebar-filters-checkbox-low-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: low"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="low"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-low-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: low"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            0
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    data-v-e2645244=""
                                    data-v-a0fd85a6=""
                                    data-v-f2c4dc36=""
                                    data-v-5272e1c8=""
                                    data-snyk-test="TheSidebarFiltersGroupType: Priority Score"
                                    className="vue--block-expandable vue--sidebar-filter-group-type vue--sidebar-filter-group-type-slider dimmed vue--block-expandable--small vue--block-expandable--no-padding vue--block-expandable--open vue--block-expandable--minimal"
                                >
                                    <div data-v-e2645244="" className="vue--block-expandable__header">
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__container"
                                        >
                                            <div
                                                data-v-e2645244=""
                                                role="button"
                                                tabIndex={0}
                                                aria-expanded="true"
                                                className="vue--block-expandable__title"
                                            >
                                                <span
                                                    data-v-e2645244=""
                                                    aria-hidden="true"
                                                    aria-label="Expand this section"
                                                    role="img"
                                                    focusable="false"
                                                    className="material-design-icon chevron-down-icon vue--block-expandable__chevron"
                                                >
                                                    <svg
                                                        data-v-e2645244=""
                                                        fill="currentColor"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        className="material-design-icon__svg"
                                                    >
                                                        <path
                                                            data-v-e2645244=""
                                                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                        >
                                                            {/**/}
                                                        </path>
                                                    </svg>
                                                </span>{" "}
                                                <div
                                                    data-v-e2645244=""
                                                    className="vue--block-expandable__text"
                                                >
                                                    <header
                                                        data-v-a0fd85a6=""
                                                        data-v-e2645244=""
                                                        className="vue--sidebar-filter-group-type__header"
                                                    >
                                                        <h3
                                                            data-v-56a8aa57=""
                                                            data-v-a0fd85a6=""
                                                            className="vue--all-caps vue--sidebar-filter-group-type__title"
                                                            data-snyk-test="TheSidebarFiltersGroupType: title"
                                                            id="sliderHeading"
                                                            data-v-e2645244=""
                                                        >
                                                            Priority Score
                                                        </h3>
                                                    </header>
                                                </div>
                                            </div>{" "}
                                            {/**/}
                                        </div>
                                    </div>{" "}
                                    <div
                                        data-v-42d2c006=""
                                        data-v-e2645244=""
                                        className="vue--expand"
                                    >
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__content"
                                        >
                                            {" "}
                                            <div
                                                data-v-a0fd85a6=""
                                                className="vue--sidebar-filter-group-type__body"
                                            >
                                                <div
                                                    data-v-6b6ff1c7=""
                                                    data-v-f2c4dc36=""
                                                    className="vue--prose vue--sidebar-filter-group-type-slider__intro vue--prose--small"
                                                >
                                                    Scored between 0 - 1000
                                                </div>{" "}
                                                <div
                                                    data-v-2f323710=""
                                                    data-v-26116bfc=""
                                                    data-v-f2c4dc36=""
                                                    className="vue--layout-form-element vue--range-slider vue--sidebar-filter-group-type-slider__input vue--layout-form-element--fill-width"
                                                >
                                                    {/**/}{" "}
                                                    <div
                                                        data-v-2f323710=""
                                                        className="vue--layout-form-element__field"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-26116bfc=""
                                                            className="vue--range-slider__field vue-slider vue-slider-ltr"
                                                            data-v-2f323710=""
                                                            style={{
                                                                padding: "7px 0px",
                                                                width: "auto",
                                                                height: 4
                                                            }}
                                                        >
                                                            <div className="vue-slider-rail">
                                                                <div
                                                                    className="vue-slider-process"
                                                                    style={{
                                                                        height: "100%",
                                                                        top: 0,
                                                                        left: "0%",
                                                                        width: "100%",
                                                                        transitionProperty: "width, left",
                                                                        transitionDuration: "0.5s",
                                                                        backgroundColor: "rgb(75, 69, 161)"
                                                                    }}
                                                                />
                                                                <div
                                                                    aria-valuetext={0}
                                                                    className="vue-slider-dot vue-slider-dot-hover"
                                                                    role="slider"
                                                                    aria-valuenow={0}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={1000}
                                                                    aria-orientation="horizontal"
                                                                    tabIndex={0}
                                                                    style={{
                                                                        width: 14,
                                                                        height: 14,
                                                                        transform: "translate(-50%, -50%)",
                                                                        top: "50%",
                                                                        left: "0%",
                                                                        transition: "left 0.5s ease 0s"
                                                                    }}
                                                                >
                                                                    <div className="vue-slider-dot-handle" />
                                                                    <div className="vue-slider-dot-tooltip vue-slider-dot-tooltip-top">
                                                                        <div
                                                                            className="vue-slider-dot-tooltip-inner vue-slider-dot-tooltip-inner-top"
                                                                            style={{
                                                                                backgroundColor: "rgb(75, 69, 161)",
                                                                                borderColor: "rgb(75, 69, 161)",
                                                                                padding: "8px 16px",
                                                                                fontSize: 18
                                                                            }}
                                                                        >
                                                                            <span className="vue-slider-dot-tooltip-text">
                                                                                0
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    aria-valuetext={1000}
                                                                    className="vue-slider-dot vue-slider-dot-hover"
                                                                    role="slider"
                                                                    aria-valuenow={1000}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={1000}
                                                                    aria-orientation="horizontal"
                                                                    tabIndex={0}
                                                                    style={{
                                                                        width: 14,
                                                                        height: 14,
                                                                        transform: "translate(-50%, -50%)",
                                                                        top: "50%",
                                                                        left: "100%",
                                                                        transition: "left 0.5s ease 0s"
                                                                    }}
                                                                >
                                                                    <div className="vue-slider-dot-handle" />
                                                                    <div className="vue-slider-dot-tooltip vue-slider-dot-tooltip-top">
                                                                        <div
                                                                            className="vue-slider-dot-tooltip-inner vue-slider-dot-tooltip-inner-top"
                                                                            style={{
                                                                                backgroundColor: "rgb(75, 69, 161)",
                                                                                borderColor: "rgb(75, 69, 161)",
                                                                                padding: "8px 16px",
                                                                                fontSize: 18
                                                                            }}
                                                                        >
                                                                            <span className="vue-slider-dot-tooltip-text">
                                                                                1000
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-26116bfc=""
                                                            data-v-2f323710=""
                                                            className="vue--range-slider__offscreen"
                                                        >
                                                            The slider shows a range from 0 to 1000. The value(s)
                                                            currently selected are: 0 to 1000.
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    data-v-e2645244=""
                                    data-v-a0fd85a6=""
                                    data-v-cda5a2a6=""
                                    data-v-5272e1c8=""
                                    data-snyk-test='TheSidebarFiltersGroupType: "Fixed In" Available'
                                    className="vue--block-expandable vue--sidebar-filter-group-type vue--sidebar-filter-group-type-checkboxes vue--block-expandable--small vue--block-expandable--no-padding vue--block-expandable--open vue--block-expandable--minimal"
                                >
                                    <div data-v-e2645244="" className="vue--block-expandable__header">
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__container"
                                        >
                                            <div
                                                data-v-e2645244=""
                                                role="button"
                                                tabIndex={0}
                                                aria-expanded="true"
                                                className="vue--block-expandable__title"
                                            >
                                                <span
                                                    data-v-e2645244=""
                                                    aria-hidden="true"
                                                    aria-label="Expand this section"
                                                    role="img"
                                                    focusable="false"
                                                    className="material-design-icon chevron-down-icon vue--block-expandable__chevron"
                                                >
                                                    <svg
                                                        data-v-e2645244=""
                                                        fill="currentColor"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        className="material-design-icon__svg"
                                                    >
                                                        <path
                                                            data-v-e2645244=""
                                                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                        >
                                                            {/**/}
                                                        </path>
                                                    </svg>
                                                </span>{" "}
                                                <div
                                                    data-v-e2645244=""
                                                    className="vue--block-expandable__text"
                                                >
                                                    <header
                                                        data-v-a0fd85a6=""
                                                        data-v-e2645244=""
                                                        className="vue--sidebar-filter-group-type__header"
                                                    >
                                                        <h3
                                                            data-v-56a8aa57=""
                                                            data-v-a0fd85a6=""
                                                            className="vue--all-caps vue--sidebar-filter-group-type__title"
                                                            data-snyk-test="TheSidebarFiltersGroupType: title"
                                                            data-v-e2645244=""
                                                        >
                                                            "Fixed In" Available
                                                        </h3>
                                                    </header>
                                                </div>
                                            </div>{" "}
                                            {/**/}
                                        </div>
                                    </div>{" "}
                                    <div
                                        data-v-42d2c006=""
                                        data-v-e2645244=""
                                        className="vue--expand"
                                    >
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__content"
                                        >
                                            {" "}
                                            <div
                                                data-v-a0fd85a6=""
                                                className="vue--sidebar-filter-group-type__body"
                                            >
                                                <ul
                                                    data-v-cda5a2a6=""
                                                    className="vue--sidebar-filter-group-type-checkboxes__options"
                                                >
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Yes"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-yes-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Yes
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-yes-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-yes-input"
                                                                            aria-describedby="sidebar-filters-checkbox-yes-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: yes"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="yes"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-yes-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: yes"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            9
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="No"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-no-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            No
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-no-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-no-input"
                                                                            aria-describedby="sidebar-filters-checkbox-no-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: no"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="no"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-no-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: no"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            0
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    data-v-e2645244=""
                                    data-v-a0fd85a6=""
                                    data-v-cda5a2a6=""
                                    data-v-5272e1c8=""
                                    data-snyk-test="TheSidebarFiltersGroupType: Computed fixability"
                                    className="vue--block-expandable vue--sidebar-filter-group-type vue--sidebar-filter-group-type-checkboxes vue--block-expandable--small vue--block-expandable--no-padding vue--block-expandable--open vue--block-expandable--minimal"
                                >
                                    <div data-v-e2645244="" className="vue--block-expandable__header">
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__container"
                                        >
                                            <div
                                                data-v-e2645244=""
                                                role="button"
                                                tabIndex={0}
                                                aria-expanded="true"
                                                className="vue--block-expandable__title"
                                            >
                                                <span
                                                    data-v-e2645244=""
                                                    aria-hidden="true"
                                                    aria-label="Expand this section"
                                                    role="img"
                                                    focusable="false"
                                                    className="material-design-icon chevron-down-icon vue--block-expandable__chevron"
                                                >
                                                    <svg
                                                        data-v-e2645244=""
                                                        fill="currentColor"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        className="material-design-icon__svg"
                                                    >
                                                        <path
                                                            data-v-e2645244=""
                                                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                        >
                                                            {/**/}
                                                        </path>
                                                    </svg>
                                                </span>{" "}
                                                <div
                                                    data-v-e2645244=""
                                                    className="vue--block-expandable__text"
                                                >
                                                    <header
                                                        data-v-a0fd85a6=""
                                                        data-v-e2645244=""
                                                        className="vue--sidebar-filter-group-type__header"
                                                    >
                                                        <h3
                                                            data-v-56a8aa57=""
                                                            data-v-a0fd85a6=""
                                                            className="vue--all-caps vue--sidebar-filter-group-type__title"
                                                            data-snyk-test="TheSidebarFiltersGroupType: title"
                                                            data-v-e2645244=""
                                                        >
                                                            Computed fixability
                                                        </h3>
                                                    </header>
                                                </div>
                                            </div>{" "}
                                            {/**/}
                                        </div>
                                    </div>{" "}
                                    <div
                                        data-v-42d2c006=""
                                        data-v-e2645244=""
                                        className="vue--expand"
                                    >
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__content"
                                        >
                                            {" "}
                                            <div
                                                data-v-a0fd85a6=""
                                                className="vue--sidebar-filter-group-type__body"
                                            >
                                                <ul
                                                    data-v-cda5a2a6=""
                                                    className="vue--sidebar-filter-group-type-checkboxes__options"
                                                >
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Fixable"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-fixable-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Fixable
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-fixable-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-fixable-input"
                                                                            aria-describedby="sidebar-filters-checkbox-fixable-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: fixable"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="fixable"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-fixable-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: fixable"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            5
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Partially fixable"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-partially-fixable-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Partially fixable
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-partially-fixable-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-partially-fixable-input"
                                                                            aria-describedby="sidebar-filters-checkbox-partially-fixable-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: partially-fixable"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="partially-fixable"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-partially-fixable-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: partially-fixable"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            1
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="No supported fix"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-no-supported-fix-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            No supported fix
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-no-supported-fix-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-no-supported-fix-input"
                                                                            aria-describedby="sidebar-filters-checkbox-no-supported-fix-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: no-supported-fix"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="no-supported-fix"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-no-supported-fix-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: no-supported-fix"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            3
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    data-v-e2645244=""
                                    data-v-a0fd85a6=""
                                    data-v-cda5a2a6=""
                                    data-v-5272e1c8=""
                                    data-snyk-test="TheSidebarFiltersGroupType: Exploit Maturity"
                                    className="vue--block-expandable vue--sidebar-filter-group-type vue--sidebar-filter-group-type-checkboxes vue--block-expandable--small vue--block-expandable--no-padding vue--block-expandable--open vue--block-expandable--minimal"
                                >
                                    <div data-v-e2645244="" className="vue--block-expandable__header">
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__container"
                                        >
                                            <div
                                                data-v-e2645244=""
                                                role="button"
                                                tabIndex={0}
                                                aria-expanded="true"
                                                className="vue--block-expandable__title"
                                            >
                                                <span
                                                    data-v-e2645244=""
                                                    aria-hidden="true"
                                                    aria-label="Expand this section"
                                                    role="img"
                                                    focusable="false"
                                                    className="material-design-icon chevron-down-icon vue--block-expandable__chevron"
                                                >
                                                    <svg
                                                        data-v-e2645244=""
                                                        fill="currentColor"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        className="material-design-icon__svg"
                                                    >
                                                        <path
                                                            data-v-e2645244=""
                                                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                        >
                                                            {/**/}
                                                        </path>
                                                    </svg>
                                                </span>{" "}
                                                <div
                                                    data-v-e2645244=""
                                                    className="vue--block-expandable__text"
                                                >
                                                    <header
                                                        data-v-a0fd85a6=""
                                                        data-v-e2645244=""
                                                        className="vue--sidebar-filter-group-type__header"
                                                    >
                                                        <h3
                                                            data-v-56a8aa57=""
                                                            data-v-a0fd85a6=""
                                                            className="vue--all-caps vue--sidebar-filter-group-type__title"
                                                            data-snyk-test="TheSidebarFiltersGroupType: title"
                                                            data-v-e2645244=""
                                                        >
                                                            Exploit Maturity
                                                        </h3>
                                                    </header>
                                                </div>
                                            </div>{" "}
                                            {/**/}
                                        </div>
                                    </div>{" "}
                                    <div
                                        data-v-42d2c006=""
                                        data-v-e2645244=""
                                        className="vue--expand"
                                    >
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__content"
                                        >
                                            {" "}
                                            <div
                                                data-v-a0fd85a6=""
                                                className="vue--sidebar-filter-group-type__body"
                                            >
                                                <ul
                                                    data-v-cda5a2a6=""
                                                    className="vue--sidebar-filter-group-type-checkboxes__options"
                                                >
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Mature"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-mature-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Mature
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-mature-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-mature-input"
                                                                            aria-describedby="sidebar-filters-checkbox-mature-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: mature"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="mature"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-mature-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: mature"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            0
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Proof of concept"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-mature-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Proof of concept
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-mature-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-mature-input"
                                                                            aria-describedby="sidebar-filters-checkbox-mature-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: proof-of-concept"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="proof-of-concept"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-mature-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: proof-of-concept"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            7
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="No known exploit"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-mature-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            No known exploit
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-mature-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-mature-input"
                                                                            aria-describedby="sidebar-filters-checkbox-mature-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: no-known-exploit"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="no-known-exploit"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-mature-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: no-known-exploit"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            2
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="No data"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-mature-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            No data
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-mature-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-mature-input"
                                                                            aria-describedby="sidebar-filters-checkbox-mature-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: no-data"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="no-data"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-mature-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: no-data"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            0
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    data-v-e2645244=""
                                    data-v-a0fd85a6=""
                                    data-v-cda5a2a6=""
                                    data-v-5272e1c8=""
                                    data-snyk-test="TheSidebarFiltersGroupType: Status"
                                    className="vue--block-expandable vue--sidebar-filter-group-type vue--sidebar-filter-group-type-checkboxes vue--block-expandable--small vue--block-expandable--no-padding vue--block-expandable--open vue--block-expandable--minimal"
                                >
                                    <div data-v-e2645244="" className="vue--block-expandable__header">
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__container"
                                        >
                                            <div
                                                data-v-e2645244=""
                                                role="button"
                                                tabIndex={0}
                                                aria-expanded="true"
                                                className="vue--block-expandable__title"
                                            >
                                                <span
                                                    data-v-e2645244=""
                                                    aria-hidden="true"
                                                    aria-label="Expand this section"
                                                    role="img"
                                                    focusable="false"
                                                    className="material-design-icon chevron-down-icon vue--block-expandable__chevron"
                                                >
                                                    <svg
                                                        data-v-e2645244=""
                                                        fill="currentColor"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        className="material-design-icon__svg"
                                                    >
                                                        <path
                                                            data-v-e2645244=""
                                                            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                        >
                                                            {/**/}
                                                        </path>
                                                    </svg>
                                                </span>{" "}
                                                <div
                                                    data-v-e2645244=""
                                                    className="vue--block-expandable__text"
                                                >
                                                    <header
                                                        data-v-a0fd85a6=""
                                                        data-v-e2645244=""
                                                        className="vue--sidebar-filter-group-type__header"
                                                    >
                                                        <h3
                                                            data-v-56a8aa57=""
                                                            data-v-a0fd85a6=""
                                                            className="vue--all-caps vue--sidebar-filter-group-type__title"
                                                            data-snyk-test="TheSidebarFiltersGroupType: title"
                                                            data-v-e2645244=""
                                                        >
                                                            Status
                                                        </h3>
                                                    </header>
                                                </div>
                                            </div>{" "}
                                            {/**/}
                                        </div>
                                    </div>{" "}
                                    <div
                                        data-v-42d2c006=""
                                        data-v-e2645244=""
                                        className="vue--expand"
                                    >
                                        <div
                                            data-v-e2645244=""
                                            className="vue--block-expandable__content"
                                        >
                                            {" "}
                                            <div
                                                data-v-a0fd85a6=""
                                                className="vue--sidebar-filter-group-type__body"
                                            >
                                                <ul
                                                    data-v-cda5a2a6=""
                                                    className="vue--sidebar-filter-group-type-checkboxes__options"
                                                >
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Open"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-open-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Open
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="true"
                                                                            aria-labelledby="sidebar-filters-checkbox-open-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-open-input"
                                                                            aria-describedby="sidebar-filters-checkbox-open-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: isOpen"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="isOpen"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-open-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: isOpen"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            9
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Patched"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-patched-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Patched
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-patched-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-patched-input"
                                                                            aria-describedby="sidebar-filters-checkbox-patched-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: isPatched"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="isPatched"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-patched-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: isPatched"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            0
                                                        </div>
                                                    </li>
                                                    <li
                                                        data-v-cda5a2a6=""
                                                        data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: option"
                                                        className="vue--sidebar-filter-group-type-checkboxes__option"
                                                    >
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            className="vue--sidebar-filter-group-type-checkboxes__checkbox"
                                                        >
                                                            <div
                                                                data-v-2f323710=""
                                                                data-v-c5ee8c06=""
                                                                data-v-cda5a2a6=""
                                                                className="vue--layout-form-element vue--checkbox vue--layout-form-element--none"
                                                            >
                                                                {/**/}{" "}
                                                                <div
                                                                    data-v-2f323710=""
                                                                    className="vue--layout-form-element__field"
                                                                >
                                                                    <label
                                                                        data-v-c5ee8c06=""
                                                                        data-v-2f323710=""
                                                                        title="Ignored"
                                                                        className="vue--checkbox__label"
                                                                    >
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            id="sidebar-filters-checkbox-ignored-input-label"
                                                                            className="vue--checkbox__label-text"
                                                                        >
                                                                            Ignored
                                                                        </span>{" "}
                                                                        <input
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            aria-checked="false"
                                                                            aria-labelledby="sidebar-filters-checkbox-ignored-input-label"
                                                                            type="checkbox"
                                                                            id="sidebar-filters-checkbox-ignored-input"
                                                                            aria-describedby="sidebar-filters-checkbox-ignored-count"
                                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxes: isIgnored"
                                                                            className="vue--checkbox__input"
                                                                            defaultValue="isIgnored"
                                                                        />{" "}
                                                                        <span
                                                                            data-v-c5ee8c06=""
                                                                            data-v-2f323710=""
                                                                            className="vue--checkbox__toggle"
                                                                        />
                                                                    </label>{" "}
                                                                    {/**/}
                                                                </div>
                                                            </div>
                                                        </div>{" "}
                                                        <div
                                                            data-v-cda5a2a6=""
                                                            id="sidebar-filters-checkbox-ignored-count"
                                                            data-snyk-test="TheSidebarFiltersGroupTypeCheckboxesCounter: isIgnored"
                                                            className="vue--sidebar-filter-group-type-checkboxes__counter"
                                                        >
                                                            0
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>{" "}
                            </div>
                        </div>{" "}
                        <div data-v-5272e1c8="" className="vue--sidebar-filters__body">
                            <div data-v-5272e1c8="" className="vue--sidebar-filters__additional">
                                <div
                                    data-v-074791da=""
                                    data-v-5272e1c8=""
                                    className="vue--layout-space-between"
                                >
                                    <div
                                        data-v-0219764c=""
                                        data-snyk-test="TheSidebarFiltersTotalCounter"
                                        className="vue--sidebar-filters-total-counter"
                                        data-v-074791da=""
                                    >
                                        <strong
                                            data-v-0219764c=""
                                            data-snyk-test="TheSidebarFiltersTotalCounter: viewing total"
                                        >
                                            9
                                        </strong>
                                        of
                                        <span
                                            data-v-0219764c=""
                                            data-snyk-test="TheSidebarFiltersTotalCounter: total"
                                        >
                                            9
                                        </span>
                                        issues
                                    </div>{" "}
                                    <div
                                        data-v-5272e1c8=""
                                        data-v-074791da=""
                                        className="vue--sidebar-filters__dropdowns"
                                    >
                                        {/**/}{" "}
                                        <div
                                            data-v-5272e1c8=""
                                            className="vue--sidebar-filters-sorting"
                                            data-v-074791da=""
                                        >
                                            <div
                                                data-v-392c7db0=""
                                                className="vue--sidebar-filters-dropdown vue--sidebar-filters-sorting--align-right"
                                            >
                                                <div
                                                    data-v-64b0d6bd=""
                                                    data-v-3d1624e8=""
                                                    data-v-392c7db0=""
                                                    tabIndex={-1}
                                                    className="vue--dropdown-menu vue--dropdown-menu-handle-select vue--sidebar-filters-sorting__label vue--dropdown-menu--align-left"
                                                >
                                                    <div
                                                        data-v-64b0d6bd=""
                                                        role="button"
                                                        data-snyk-text="BaseDropdownMenu: handle"
                                                        aria-haspopup="true"
                                                        tabIndex={0}
                                                        aria-expanded="false"
                                                        className="vue--dropdown-menu__handle"
                                                    >
                                                        <span
                                                            data-v-3d1624e8=""
                                                            data-v-64b0d6bd=""
                                                            className="vue--dropdown-menu-handle-select__handle"
                                                        >
                                                            <span data-v-3d1624e8="" data-v-64b0d6bd="">
                                                                Sort by
                                                            </span>{" "}
                                                            <strong data-v-3d1624e8="" data-v-64b0d6bd="">
                                                                highest priority score
                                                            </strong>{" "}
                                                            <span
                                                                data-v-3d1624e8=""
                                                                data-v-64b0d6bd=""
                                                                aria-label="Expand available list of options"
                                                                role="img"
                                                                className="material-design-icon chevron-down-icon vue--dropdown-menu-handle-select__icon"
                                                            >
                                                                <svg
                                                                    data-v-3d1624e8=""
                                                                    data-v-64b0d6bd=""
                                                                    fill="currentColor"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    className="material-design-icon__svg"
                                                                >
                                                                    <path
                                                                        data-v-3d1624e8=""
                                                                        data-v-64b0d6bd=""
                                                                        d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                                    >
                                                                        <title data-v-3d1624e8="" data-v-64b0d6bd="">
                                                                            Expand available list of options
                                                                        </title>
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </div>{" "}
                                                    <div
                                                        data-v-64b0d6bd=""
                                                        className="vue--dropdown-menu__menu"
                                                    >
                                                        {" "}
                                                        <ul
                                                            data-v-64b0d6bd=""
                                                            role="menu"
                                                            className="vue--dropdown-menu__menu--primary"
                                                        >
                                                            {" "}
                                                            <li
                                                                data-v-794526e4=""
                                                                data-v-392c7db0=""
                                                                role="menuitem"
                                                                tabIndex={-1}
                                                                className="vue--dropdown-menu-item"
                                                                data-v-64b0d6bd=""
                                                            >
                                                                <strong data-v-794526e4="">
                                                                    highest priority score
                                                                </strong>
                                                            </li>
                                                            <li
                                                                data-v-794526e4=""
                                                                data-v-392c7db0=""
                                                                role="menuitem"
                                                                tabIndex={-1}
                                                                className="vue--dropdown-menu-item"
                                                                data-v-64b0d6bd=""
                                                            >
                                                                <strong data-v-794526e4="">
                                                                    lowest priority score
                                                                </strong>
                                                            </li>
                                                            <li
                                                                data-v-794526e4=""
                                                                data-v-392c7db0=""
                                                                role="menuitem"
                                                                tabIndex={-1}
                                                                className="vue--dropdown-menu-item"
                                                                data-v-64b0d6bd=""
                                                            >
                                                                <strong data-v-794526e4="">highest severity</strong>
                                                            </li>
                                                            <li
                                                                data-v-794526e4=""
                                                                data-v-392c7db0=""
                                                                role="menuitem"
                                                                tabIndex={-1}
                                                                className="vue--dropdown-menu-item"
                                                                data-v-64b0d6bd=""
                                                            >
                                                                <strong data-v-794526e4="">lowest severity</strong>
                                                            </li>
                                                        </ul>{" "}
                                                        {/**/}{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>{" "}
                            <div
                                data-v-3645d675=""
                                data-v-092e7094=""
                                className="vue--block vue--promo vue--integration-settings-promo margin-bottom--m"
                                data-snyk-test="IntegrationSettingsPromo: backlog PR promo"
                                data-v-5272e1c8=""
                            >
                                {/**/}{" "}
                                <div
                                    data-v-092e7094=""
                                    data-v-3645d675=""
                                    className="vue--promo__content"
                                >
                                    <header
                                        data-v-092e7094=""
                                        data-v-3645d675=""
                                        className="vue--promo__header"
                                    >
                                        <span
                                            data-v-0f55f474=""
                                            data-v-092e7094=""
                                            className="vue--badge vue--promo__badge vue--badge--action vue--badge--small vue--badge--uppercase"
                                            data-v-3645d675=""
                                        >
                                            {/**/}{" "}
                                            <span data-v-0f55f474="" className="vue--badge__text">
                                                New
                                            </span>{" "}
                                            {/**/}
                                        </span>{" "}
                                        <h4
                                            data-v-8dd2f746=""
                                            data-v-092e7094=""
                                            className="vue--heading"
                                            data-v-3645d675=""
                                        >
                                            Did you know…
                                        </h4>{" "}
                                        <button
                                            data-v-092e7094=""
                                            data-v-3645d675=""
                                            type="button"
                                            data-snyk-test="BasePromo: close"
                                            className="vue--promo__close"
                                        >
                                            <span
                                                data-v-092e7094=""
                                                data-v-3645d675=""
                                                aria-label="Remove this panel"
                                                role="img"
                                                className="material-design-icon close-icon"
                                            >
                                                <svg
                                                    data-v-092e7094=""
                                                    data-v-3645d675=""
                                                    fill="currentColor"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    className="material-design-icon__svg"
                                                >
                                                    <path
                                                        data-v-092e7094=""
                                                        data-v-3645d675=""
                                                        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                                                    >
                                                        <title data-v-092e7094="" data-v-3645d675="">
                                                            Remove this panel
                                                        </title>
                                                    </path>
                                                </svg>
                                            </span>
                                        </button>
                                    </header>{" "}
                                    <div
                                        data-v-092e7094=""
                                        data-v-3645d675=""
                                        className="vue--promo__body"
                                    >
                                        <div
                                            data-v-6b6ff1c7=""
                                            data-v-092e7094=""
                                            className="vue--prose"
                                            data-v-3645d675=""
                                        >
                                            You can reduce the backlog of existing vulnerabilities at a
                                            manageable pace with
                                            <strong data-v-6b6ff1c7="">
                                                prioritized fix pull requests -
                                            </strong>{" "}
                                            <a
                                                href="/org/shivam-handsintechnology/manage/integrations/github#automatic-fix"
                                                data-snyk-test="IntegrationSettingsPromo: integration link"
                                                data-v-6b6ff1c7=""
                                            >
                                                enable for your GitHub integration.
                                            </a>
                                        </div>
                                    </div>{" "}
                                    <img
                                        data-v-092e7094=""
                                        data-v-3645d675=""
                                        src="https://res.cloudinary.com/snyk/image/upload/v1601294412/BasePromo%20backgrounds/promo-team.svg"
                                        role="presentation"
                                        className="vue--promo__image"
                                    />
                                </div>
                            </div>{" "}
                            <div
                                data-v-555417d6=""
                                data-snyk-test="Issues"
                                className="vue--issues"
                                show-backlog-pull-requests="[object Object]"
                                show-pull-requests-assignees="[object Object]"
                            >
                                <form
                                    data-v-3645d675=""
                                    data-v-09baa44d=""
                                    data-v-587357f2=""
                                    data-v-555417d6=""
                                    className="vue--block vue--card vue--issue"
                                    id="issue-SNYK-JS-MONGOOSE-5777721"
                                    data-snyk-test="Issue"
                                >
                                    <header
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__header"
                                    >
                                        <header
                                            data-v-a659e2be=""
                                            data-v-587357f2=""
                                            className="vue--issue-header vue--issue-header--high"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-a659e2be=""
                                                className="vue--issue-header__wrapper"
                                            >
                                                <div
                                                    data-v-005f3e32=""
                                                    data-v-587357f2=""
                                                    id="issue-SNYK-JS-MONGOOSE-5777721"
                                                    className="vue--issue-title"
                                                    data-v-a659e2be=""
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        data-v-e9c81bb0=""
                                                        data-v-005f3e32=""
                                                        className="vue--tooltip vue--issue-severity vue--issue-title__severity vue--tooltip--auto"
                                                        data-snyk-test="IssueTitle: high severity"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-snyk-test="BaseTooltip: label"
                                                            className="vue--tooltip__label"
                                                        >
                                                            {/**/}{" "}
                                                            <span
                                                                data-v-e9c81bb0=""
                                                                data-v-06ded3b9=""
                                                                className="vue--issue-severity__badge vue--issue-severity__badge--high"
                                                            >
                                                                H
                                                            </span>
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>{" "}
                                                    <div
                                                        data-v-005f3e32=""
                                                        className="vue--issue-title__container"
                                                    >
                                                        <h2
                                                            data-v-005f3e32=""
                                                            data-snyk-test="Issue Title"
                                                            className="vue--issue-title__title"
                                                        >
                                                            <span data-v-005f3e32="">
                                                                <span className="">mongoose</span>
                                                            </span>{" "}
                                                            <small
                                                                data-v-005f3e32=""
                                                                className="vue--issue-title__category"
                                                            >
                                                                <span data-v-005f3e32="">
                                                                    <span className="">Prototype Pollution</span>
                                                                </span>
                                                            </small>
                                                        </h2>{" "}
                                                        <div
                                                            data-v-0837c15e=""
                                                            data-v-005f3e32=""
                                                            className="vue--issue-link vue--issue-title__link"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Clipboard Check Outline icon"
                                                                        role="img"
                                                                        className="material-design-icon clipboard-check-outline-icon vue--issue-link__icon vue--issue-link__icon__check"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>{" "}
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Link Variant icon"
                                                                        role="img"
                                                                        className="material-design-icon link-variant-icon vue--issue-link__icon"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <ul
                                                    data-v-4a5a4544=""
                                                    data-v-587357f2=""
                                                    className="vue--issue-meta"
                                                    data-v-a659e2be=""
                                                >
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-type"
                                                    >
                                                        Vulnerability
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-55b69dba=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-rollup"
                                                    >
                                                        <div
                                                            data-v-64b0d6bd=""
                                                            data-v-cc531ec8=""
                                                            data-v-55b69dba=""
                                                            tabIndex={-1}
                                                            className="vue--dropdown-menu vue--dropdown-menu-handle-dotted vue--dropdown-menu--align-left vue--dropdown-menu--extra-small vue--dropdown-menu-handle-dotted--extra-small"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                role="button"
                                                                data-snyk-text="BaseDropdownMenu: handle"
                                                                aria-haspopup="true"
                                                                tabIndex={0}
                                                                aria-expanded="false"
                                                                className="vue--dropdown-menu__handle"
                                                            >
                                                                <span
                                                                    data-v-cc531ec8=""
                                                                    data-v-64b0d6bd=""
                                                                    className="vue--dropdown-menu-handle-dotted__handle"
                                                                />
                                                            </div>{" "}
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                className="vue--dropdown-menu__menu"
                                                            >
                                                                {" "}
                                                                <ul
                                                                    data-v-64b0d6bd=""
                                                                    role="menu"
                                                                    className="vue--dropdown-menu__menu--primary"
                                                                >
                                                                    {" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://cwe.mitre.org/data/definitions/1321.html"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CWE-1321</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.cve.org/CVERecord?id=CVE-2023-3696"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CVE-2023-3696</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H/E:P"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            CVSS 8.1
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://app.snyk.io/vuln/SNYK-JS-MONGOOSE-5777721"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">
                                                                                    SNYK-JS-MONGOOSE-5777721
                                                                                </span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>
                                                                </ul>{" "}
                                                                {/**/}{" "}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>{" "}
                                            <div
                                                data-v-34ece046=""
                                                data-v-587357f2=""
                                                className="vue--issue-priority-score"
                                                data-snyk-test="priorityScoreTooltip"
                                                data-v-a659e2be=""
                                            >
                                                <div
                                                    data-v-06ded3b9=""
                                                    data-v-34ece046=""
                                                    className="vue--tooltip vue--tooltip--auto"
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        aria-describedby="priorityScoreTooltip"
                                                        aria-controls="priorityScoreTooltip"
                                                        data-snyk-test="BaseTooltip: label"
                                                        className="vue--tooltip__label"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-34ece046=""
                                                            className="vue--issue-priority-score__badge"
                                                            data-v-06ded3b9=""
                                                        >
                                                            <h3
                                                                data-v-56a8aa57=""
                                                                data-v-34ece046=""
                                                                className="vue--all-caps vue--issue-priority-score__label vue--all-caps--small"
                                                                regular=""
                                                            >
                                                                Score
                                                            </h3>{" "}
                                                            <strong
                                                                data-v-34ece046=""
                                                                className="vue--issue-priority-score__score"
                                                            >
                                                                726
                                                            </strong>
                                                        </div>
                                                    </div>{" "}
                                                    {/**/}
                                                </div>
                                            </div>
                                        </header>
                                    </header>{" "}
                                    {/**/} {/**/}{" "}
                                    <div
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__body"
                                    >
                                        {" "}
                                        <div
                                            data-v-2afd4d95=""
                                            data-v-587357f2=""
                                            className="vue--issue-details-default vue--issue__details"
                                        >
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Introduced through
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            mongoose@7.2.1
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Fixed in
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            className="vue--tooltip vue--tooltip--auto"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                mongoose@5.13.20, @6.11.3, @7.3.4
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/}
                                            </ul>{" "}
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                {/**/}{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-0475afce=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Exploit maturity
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-0475afce=""
                                                            className="vue--tooltip vue--issue-details-row-exploit-maturity"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <span
                                                                    data-v-0f55f474=""
                                                                    data-v-0475afce=""
                                                                    className="vue--badge vue--issue-details-row-exploit-maturity__badge vue--badge--complementary-blue vue--badge--small vue--badge--uppercase"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    {/**/}{" "}
                                                                    <span
                                                                        data-v-0f55f474=""
                                                                        className="vue--badge__text"
                                                                    >
                                                                        Proof of Concept
                                                                    </span>{" "}
                                                                    {/**/}
                                                                </span>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/} {/**/}
                                            </ul>
                                        </div>{" "}
                                        <div
                                            data-v-f1adb224=""
                                            data-v-587357f2=""
                                            className="vue--issue-content vue--issue__content"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-67840b28=""
                                                data-v-f1adb224=""
                                                className="vue--issue-content-show-more-button"
                                            >
                                                <button data-v-67840b28="">
                                                    Show more detail
                                                    <span
                                                        data-v-67840b28=""
                                                        aria-hidden="true"
                                                        aria-label="Chevron Down icon"
                                                        role="img"
                                                        className="material-design-icon chevron-down-icon"
                                                    >
                                                        <svg
                                                            data-v-67840b28=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-67840b28=""
                                                                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                            >
                                                                {/**/}
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>{" "}
                                            {/**/}
                                        </div>{" "}
                                        <footer
                                            data-v-0bbf892e=""
                                            data-v-587357f2=""
                                            data-v-3645d675=""
                                        >
                                            <div data-v-0bbf892e="" className="vue--snyk-learn-link">
                                                <span
                                                    data-v-0bbf892e=""
                                                    aria-label="School Outline icon"
                                                    role="img"
                                                    className="material-design-icon school-outline-icon"
                                                >
                                                    <svg
                                                        data-v-0bbf892e=""
                                                        fill="currentColor"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        className="material-design-icon__svg"
                                                    >
                                                        <path
                                                            data-v-0bbf892e=""
                                                            d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z"
                                                        >
                                                            <title data-v-0bbf892e="">School Outline icon</title>
                                                        </path>
                                                    </svg>
                                                </span>{" "}
                                                <a
                                                    data-v-ce2707d6=""
                                                    data-v-0bbf892e=""
                                                    aria-describedby="describedBy9BflsMogBX"
                                                    rel="noopener noreferrer"
                                                    href="https://learn.snyk.io/lesson/prototype-pollution/?authenticate=automatic"
                                                    target="_blank"
                                                    className="vue--anchor"
                                                    data-snyk-test="SnykLearnLink: Anchor"
                                                >
                                                    Learn about this type of vulnerability
                                                    <span
                                                        data-v-ce2707d6=""
                                                        aria-label="Open an external page"
                                                        role="img"
                                                        className="material-design-icon open-in-new-icon vue--anchor__external"
                                                    >
                                                        <svg
                                                            data-v-ce2707d6=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-ce2707d6=""
                                                                d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                            >
                                                                <title data-v-ce2707d6="">
                                                                    Open an external page
                                                                </title>
                                                            </path>
                                                        </svg>
                                                    </span>
                                                    <span
                                                        data-v-ce2707d6=""
                                                        id="describedBy9BflsMogBX"
                                                        data-snyk-test="BaseAnchor screen reader description"
                                                        className="vue--anchor__offscreen"
                                                    >
                                                        Open this link in a new tab
                                                    </span>
                                                </a>
                                            </div>
                                        </footer>{" "}
                                        {/**/} {/**/} {/**/}
                                    </div>{" "}
                                    <footer
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__form-actions"
                                    >
                                        <footer
                                            data-v-4c41549e=""
                                            data-v-587357f2=""
                                            className="vue--issue-footer"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-587357f2=""
                                                className="vue--issue-info vue--issue__info"
                                                data-v-4c41549e=""
                                            >
                                                {/**/} {/**/}
                                            </div>{" "}
                                            <div
                                                data-v-453f7da2=""
                                                data-v-587357f2=""
                                                className="vue--issue-actions vue--issue__actions"
                                                data-v-4c41549e=""
                                            >
                                                <ul
                                                    data-v-453f7da2=""
                                                    className="vue--issue-actions__items"
                                                >
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-28e93f06=""
                                                            data-v-453f7da2=""
                                                            className="vue--issue-actions-ignore"
                                                        >
                                                            <div
                                                                data-v-28e93f06=""
                                                                className="v-portal"
                                                                style={{ display: "none" }}
                                                            />{" "}
                                                            <button
                                                                data-v-46e4a2a7=""
                                                                data-v-28e93f06=""
                                                                role="button"
                                                                data-snyk-test="IssueActionsIgnore: submit"
                                                                className="vue--button vue--issue-actions-ignore__button vue--button--basic vue--button--ghost vue--button--small"
                                                            >
                                                                <span
                                                                    data-v-28e93f06=""
                                                                    data-v-46e4a2a7=""
                                                                    aria-hidden="true"
                                                                    aria-label="Eye Off icon"
                                                                    role="img"
                                                                    className="material-design-icon eye-off-icon"
                                                                >
                                                                    <svg
                                                                        data-v-28e93f06=""
                                                                        data-v-46e4a2a7=""
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 24 24"
                                                                        className="material-design-icon__svg"
                                                                    >
                                                                        <path
                                                                            data-v-28e93f06=""
                                                                            data-v-46e4a2a7=""
                                                                            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
                                                                        >
                                                                            {/**/}
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </li>{" "}
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        data-snyk-test="IssueActions: Fix action"
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <a
                                                            data-v-46e4a2a7=""
                                                            data-v-492887f7=""
                                                            data-v-453f7da2=""
                                                            href="/org/shivam-handsintechnology/fix/f142d36c-de24-46aa-a265-56058c4478a4?vuln=SNYK-JS-MONGOOSE-5777721"
                                                            className="vue--button vue--button--cta vue--button--small"
                                                        >
                                                            <span
                                                                data-v-492887f7=""
                                                                data-v-46e4a2a7=""
                                                                aria-hidden="true"
                                                                aria-label="Source Pull icon"
                                                                role="img"
                                                                className="material-design-icon source-pull-icon"
                                                            >
                                                                <svg
                                                                    data-v-492887f7=""
                                                                    data-v-46e4a2a7=""
                                                                    fill="currentColor"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    className="material-design-icon__svg"
                                                                >
                                                                    <path
                                                                        data-v-492887f7=""
                                                                        data-v-46e4a2a7=""
                                                                        d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z"
                                                                    >
                                                                        {/**/}
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            Fix this vulnerability
                                                        </a>
                                                    </li>{" "}
                                                    {/**/}
                                                </ul>{" "}
                                                <div data-v-453f7da2="" className="vue-portal-target" />
                                            </div>
                                        </footer>
                                    </footer>{" "}
                                    {/**/}
                                </form>
                                <form
                                    data-v-3645d675=""
                                    data-v-09baa44d=""
                                    data-v-587357f2=""
                                    data-v-555417d6=""
                                    className="vue--block vue--card vue--issue"
                                    id="issue-SNYK-JS-SEMVER-3247795"
                                    data-snyk-test="Issue"
                                >
                                    <header
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__header"
                                    >
                                        <header
                                            data-v-a659e2be=""
                                            data-v-587357f2=""
                                            className="vue--issue-header vue--issue-header--high"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-a659e2be=""
                                                className="vue--issue-header__wrapper"
                                            >
                                                <div
                                                    data-v-005f3e32=""
                                                    data-v-587357f2=""
                                                    id="issue-SNYK-JS-SEMVER-3247795"
                                                    className="vue--issue-title vue--issue-title--compact"
                                                    data-v-a659e2be=""
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        data-v-e9c81bb0=""
                                                        data-v-005f3e32=""
                                                        className="vue--tooltip vue--issue-severity vue--issue-title__severity vue--tooltip--auto"
                                                        data-snyk-test="IssueTitle: high severity"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-snyk-test="BaseTooltip: label"
                                                            className="vue--tooltip__label"
                                                        >
                                                            {/**/}{" "}
                                                            <span
                                                                data-v-e9c81bb0=""
                                                                data-v-06ded3b9=""
                                                                className="vue--issue-severity__badge vue--issue-severity__badge--high"
                                                            >
                                                                H
                                                            </span>
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>{" "}
                                                    <div
                                                        data-v-005f3e32=""
                                                        className="vue--issue-title__container"
                                                    >
                                                        <h2
                                                            data-v-005f3e32=""
                                                            data-snyk-test="Issue Title"
                                                            className="vue--issue-title__title"
                                                        >
                                                            <span data-v-005f3e32="">
                                                                <span className="">semver</span>
                                                            </span>{" "}
                                                            <small
                                                                data-v-005f3e32=""
                                                                className="vue--issue-title__category"
                                                            >
                                                                <span data-v-005f3e32="">
                                                                    <span className="">
                                                                        Regular Expression Denial of Service (ReDoS)
                                                                    </span>
                                                                </span>
                                                            </small>
                                                        </h2>{" "}
                                                        <div
                                                            data-v-0837c15e=""
                                                            data-v-005f3e32=""
                                                            className="vue--issue-link vue--issue-title__link"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Clipboard Check Outline icon"
                                                                        role="img"
                                                                        className="material-design-icon clipboard-check-outline-icon vue--issue-link__icon vue--issue-link__icon__check"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>{" "}
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Link Variant icon"
                                                                        role="img"
                                                                        className="material-design-icon link-variant-icon vue--issue-link__icon"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <ul
                                                    data-v-4a5a4544=""
                                                    data-v-587357f2=""
                                                    className="vue--issue-meta"
                                                    data-v-a659e2be=""
                                                >
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-type"
                                                    >
                                                        Vulnerability
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-55b69dba=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-rollup"
                                                    >
                                                        <div
                                                            data-v-64b0d6bd=""
                                                            data-v-cc531ec8=""
                                                            data-v-55b69dba=""
                                                            tabIndex={-1}
                                                            className="vue--dropdown-menu vue--dropdown-menu-handle-dotted vue--dropdown-menu--align-left vue--dropdown-menu--extra-small vue--dropdown-menu-handle-dotted--extra-small"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                role="button"
                                                                data-snyk-text="BaseDropdownMenu: handle"
                                                                aria-haspopup="true"
                                                                tabIndex={0}
                                                                aria-expanded="false"
                                                                className="vue--dropdown-menu__handle"
                                                            >
                                                                <span
                                                                    data-v-cc531ec8=""
                                                                    data-v-64b0d6bd=""
                                                                    className="vue--dropdown-menu-handle-dotted__handle"
                                                                />
                                                            </div>{" "}
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                className="vue--dropdown-menu__menu"
                                                            >
                                                                {" "}
                                                                <ul
                                                                    data-v-64b0d6bd=""
                                                                    role="menu"
                                                                    className="vue--dropdown-menu__menu--primary"
                                                                >
                                                                    {" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://cwe.mitre.org/data/definitions/1333.html"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CWE-1333</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.cve.org/CVERecord?id=CVE-2022-25883"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CVE-2022-25883</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            CVSS 7.5
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://app.snyk.io/vuln/SNYK-JS-SEMVER-3247795"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">
                                                                                    SNYK-JS-SEMVER-3247795
                                                                                </span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>
                                                                </ul>{" "}
                                                                {/**/}{" "}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>{" "}
                                            <div
                                                data-v-34ece046=""
                                                data-v-587357f2=""
                                                className="vue--issue-priority-score"
                                                data-snyk-test="priorityScoreTooltip"
                                                data-v-a659e2be=""
                                            >
                                                <div
                                                    data-v-06ded3b9=""
                                                    data-v-34ece046=""
                                                    className="vue--tooltip vue--tooltip--auto"
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        aria-describedby="priorityScoreTooltip"
                                                        aria-controls="priorityScoreTooltip"
                                                        data-snyk-test="BaseTooltip: label"
                                                        className="vue--tooltip__label"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-34ece046=""
                                                            className="vue--issue-priority-score__badge"
                                                            data-v-06ded3b9=""
                                                        >
                                                            <h3
                                                                data-v-56a8aa57=""
                                                                data-v-34ece046=""
                                                                className="vue--all-caps vue--issue-priority-score__label vue--all-caps--small"
                                                                regular=""
                                                            >
                                                                Score
                                                            </h3>{" "}
                                                            <strong
                                                                data-v-34ece046=""
                                                                className="vue--issue-priority-score__score"
                                                            >
                                                                696
                                                            </strong>
                                                        </div>
                                                    </div>{" "}
                                                    {/**/}
                                                </div>
                                            </div>
                                        </header>
                                    </header>{" "}
                                    {/**/} {/**/}{" "}
                                    <div
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__body"
                                    >
                                        {" "}
                                        <div
                                            data-v-2afd4d95=""
                                            data-v-587357f2=""
                                            className="vue--issue-details-default vue--issue__details"
                                        >
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Introduced through
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            nodemon@2.0.22 and supertest@6.3.3
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Fixed in
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            className="vue--tooltip vue--tooltip--auto"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                semver@5.7.2, @6.3.1, @7.5.2
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/}
                                            </ul>{" "}
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                {/**/}{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-0475afce=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Exploit maturity
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-0475afce=""
                                                            className="vue--tooltip vue--issue-details-row-exploit-maturity"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <span
                                                                    data-v-0f55f474=""
                                                                    data-v-0475afce=""
                                                                    className="vue--badge vue--issue-details-row-exploit-maturity__badge vue--badge--complementary-blue vue--badge--small vue--badge--uppercase"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    {/**/}{" "}
                                                                    <span
                                                                        data-v-0f55f474=""
                                                                        className="vue--badge__text"
                                                                    >
                                                                        Proof of Concept
                                                                    </span>{" "}
                                                                    {/**/}
                                                                </span>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/} {/**/}
                                            </ul>
                                        </div>{" "}
                                        <div
                                            data-v-f1adb224=""
                                            data-v-587357f2=""
                                            className="vue--issue-content vue--issue__content"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-67840b28=""
                                                data-v-f1adb224=""
                                                className="vue--issue-content-show-more-button"
                                            >
                                                <button data-v-67840b28="">
                                                    Show more detail
                                                    <span
                                                        data-v-67840b28=""
                                                        aria-hidden="true"
                                                        aria-label="Chevron Down icon"
                                                        role="img"
                                                        className="material-design-icon chevron-down-icon"
                                                    >
                                                        <svg
                                                            data-v-67840b28=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-67840b28=""
                                                                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                            >
                                                                {/**/}
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>{" "}
                                            {/**/}
                                        </div>{" "}
                                        <footer
                                            data-v-0bbf892e=""
                                            data-v-587357f2=""
                                            data-v-3645d675=""
                                        >
                                            {/**/}
                                        </footer>{" "}
                                        {/**/} {/**/} {/**/}
                                    </div>{" "}
                                    <footer
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__form-actions"
                                    >
                                        <footer
                                            data-v-4c41549e=""
                                            data-v-587357f2=""
                                            className="vue--issue-footer"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-587357f2=""
                                                className="vue--issue-info vue--issue__info"
                                                data-v-4c41549e=""
                                            >
                                                {/**/} {/**/}
                                            </div>{" "}
                                            <div
                                                data-v-453f7da2=""
                                                data-v-587357f2=""
                                                className="vue--issue-actions vue--issue__actions"
                                                data-v-4c41549e=""
                                            >
                                                <ul
                                                    data-v-453f7da2=""
                                                    className="vue--issue-actions__items"
                                                >
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-28e93f06=""
                                                            data-v-453f7da2=""
                                                            className="vue--issue-actions-ignore"
                                                        >
                                                            <div
                                                                data-v-28e93f06=""
                                                                className="v-portal"
                                                                style={{ display: "none" }}
                                                            />{" "}
                                                            <button
                                                                data-v-46e4a2a7=""
                                                                data-v-28e93f06=""
                                                                role="button"
                                                                data-snyk-test="IssueActionsIgnore: submit"
                                                                className="vue--button vue--issue-actions-ignore__button vue--button--basic vue--button--ghost vue--button--small"
                                                            >
                                                                <span
                                                                    data-v-28e93f06=""
                                                                    data-v-46e4a2a7=""
                                                                    aria-hidden="true"
                                                                    aria-label="Eye Off icon"
                                                                    role="img"
                                                                    className="material-design-icon eye-off-icon"
                                                                >
                                                                    <svg
                                                                        data-v-28e93f06=""
                                                                        data-v-46e4a2a7=""
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 24 24"
                                                                        className="material-design-icon__svg"
                                                                    >
                                                                        <path
                                                                            data-v-28e93f06=""
                                                                            data-v-46e4a2a7=""
                                                                            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
                                                                        >
                                                                            {/**/}
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </li>{" "}
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        data-snyk-test="IssueActions: Fix action"
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-492887f7=""
                                                            data-v-453f7da2=""
                                                            className="vue--tooltip vue--tooltip--auto"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <a
                                                                    data-v-46e4a2a7=""
                                                                    data-v-492887f7=""
                                                                    href="/org/shivam-handsintechnology/fix/f142d36c-de24-46aa-a265-56058c4478a4?vuln=SNYK-JS-SEMVER-3247795"
                                                                    className="vue--button vue--button--cta vue--button--small"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    <span
                                                                        data-v-492887f7=""
                                                                        data-v-46e4a2a7=""
                                                                        aria-hidden="true"
                                                                        aria-label="Source Pull icon"
                                                                        role="img"
                                                                        className="material-design-icon source-pull-icon"
                                                                    >
                                                                        <svg
                                                                            data-v-492887f7=""
                                                                            data-v-46e4a2a7=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-492887f7=""
                                                                                data-v-46e4a2a7=""
                                                                                d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                    Partially fix this vulnerability
                                                                </a>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </li>{" "}
                                                    {/**/}
                                                </ul>{" "}
                                                <div data-v-453f7da2="" className="vue-portal-target" />
                                            </div>
                                        </footer>
                                    </footer>{" "}
                                    {/**/}
                                </form>
                                <form
                                    data-v-3645d675=""
                                    data-v-09baa44d=""
                                    data-v-587357f2=""
                                    data-v-555417d6=""
                                    className="vue--block vue--card vue--issue"
                                    id="issue-SNYK-JS-AXIOS-6032459"
                                    data-snyk-test="Issue"
                                >
                                    <header
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__header"
                                    >
                                        <header
                                            data-v-a659e2be=""
                                            data-v-587357f2=""
                                            className="vue--issue-header vue--issue-header--high"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-a659e2be=""
                                                className="vue--issue-header__wrapper"
                                            >
                                                <div
                                                    data-v-005f3e32=""
                                                    data-v-587357f2=""
                                                    id="issue-SNYK-JS-AXIOS-6032459"
                                                    className="vue--issue-title"
                                                    data-v-a659e2be=""
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        data-v-e9c81bb0=""
                                                        data-v-005f3e32=""
                                                        className="vue--tooltip vue--issue-severity vue--issue-title__severity vue--tooltip--auto"
                                                        data-snyk-test="IssueTitle: high severity"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-snyk-test="BaseTooltip: label"
                                                            className="vue--tooltip__label"
                                                        >
                                                            {/**/}{" "}
                                                            <span
                                                                data-v-e9c81bb0=""
                                                                data-v-06ded3b9=""
                                                                className="vue--issue-severity__badge vue--issue-severity__badge--high"
                                                            >
                                                                H
                                                            </span>
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>{" "}
                                                    <div
                                                        data-v-005f3e32=""
                                                        className="vue--issue-title__container"
                                                    >
                                                        <h2
                                                            data-v-005f3e32=""
                                                            data-snyk-test="Issue Title"
                                                            className="vue--issue-title__title"
                                                        >
                                                            <span data-v-005f3e32="">
                                                                <span className="">axios</span>
                                                            </span>{" "}
                                                            <small
                                                                data-v-005f3e32=""
                                                                className="vue--issue-title__category"
                                                            >
                                                                <span data-v-005f3e32="">
                                                                    <span className="">
                                                                        Cross-site Request Forgery (CSRF)
                                                                    </span>
                                                                </span>
                                                            </small>
                                                        </h2>{" "}
                                                        <div
                                                            data-v-0837c15e=""
                                                            data-v-005f3e32=""
                                                            className="vue--issue-link vue--issue-title__link"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Clipboard Check Outline icon"
                                                                        role="img"
                                                                        className="material-design-icon clipboard-check-outline-icon vue--issue-link__icon vue--issue-link__icon__check"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>{" "}
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Link Variant icon"
                                                                        role="img"
                                                                        className="material-design-icon link-variant-icon vue--issue-link__icon"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <ul
                                                    data-v-4a5a4544=""
                                                    data-v-587357f2=""
                                                    className="vue--issue-meta"
                                                    data-v-a659e2be=""
                                                >
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-type"
                                                    >
                                                        Vulnerability
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-55b69dba=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-rollup"
                                                    >
                                                        <div
                                                            data-v-64b0d6bd=""
                                                            data-v-cc531ec8=""
                                                            data-v-55b69dba=""
                                                            tabIndex={-1}
                                                            className="vue--dropdown-menu vue--dropdown-menu-handle-dotted vue--dropdown-menu--align-left vue--dropdown-menu--extra-small vue--dropdown-menu-handle-dotted--extra-small"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                role="button"
                                                                data-snyk-text="BaseDropdownMenu: handle"
                                                                aria-haspopup="true"
                                                                tabIndex={0}
                                                                aria-expanded="false"
                                                                className="vue--dropdown-menu__handle"
                                                            >
                                                                <span
                                                                    data-v-cc531ec8=""
                                                                    data-v-64b0d6bd=""
                                                                    className="vue--dropdown-menu-handle-dotted__handle"
                                                                />
                                                            </div>{" "}
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                className="vue--dropdown-menu__menu"
                                                            >
                                                                {" "}
                                                                <ul
                                                                    data-v-64b0d6bd=""
                                                                    role="menu"
                                                                    className="vue--dropdown-menu__menu--primary"
                                                                >
                                                                    {" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://cwe.mitre.org/data/definitions/352.html"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CWE-352</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.cve.org/CVERecord?id=CVE-2023-45857"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CVE-2023-45857</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:L/A:N/E:P"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            CVSS 7.1
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://app.snyk.io/vuln/SNYK-JS-AXIOS-6032459"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">
                                                                                    SNYK-JS-AXIOS-6032459
                                                                                </span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>
                                                                </ul>{" "}
                                                                {/**/}{" "}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>{" "}
                                            <div
                                                data-v-34ece046=""
                                                data-v-587357f2=""
                                                className="vue--issue-priority-score"
                                                data-snyk-test="priorityScoreTooltip"
                                                data-v-a659e2be=""
                                            >
                                                <div
                                                    data-v-06ded3b9=""
                                                    data-v-34ece046=""
                                                    className="vue--tooltip vue--tooltip--auto"
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        aria-describedby="priorityScoreTooltip"
                                                        aria-controls="priorityScoreTooltip"
                                                        data-snyk-test="BaseTooltip: label"
                                                        className="vue--tooltip__label"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-34ece046=""
                                                            className="vue--issue-priority-score__badge"
                                                            data-v-06ded3b9=""
                                                        >
                                                            <h3
                                                                data-v-56a8aa57=""
                                                                data-v-34ece046=""
                                                                className="vue--all-caps vue--issue-priority-score__label vue--all-caps--small"
                                                                regular=""
                                                            >
                                                                Score
                                                            </h3>{" "}
                                                            <strong
                                                                data-v-34ece046=""
                                                                className="vue--issue-priority-score__score"
                                                            >
                                                                676
                                                            </strong>
                                                        </div>
                                                    </div>{" "}
                                                    {/**/}
                                                </div>
                                            </div>
                                        </header>
                                    </header>{" "}
                                    {/**/} {/**/}{" "}
                                    <div
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__body"
                                    >
                                        {" "}
                                        <div
                                            data-v-2afd4d95=""
                                            data-v-587357f2=""
                                            className="vue--issue-details-default vue--issue__details"
                                        >
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Introduced through
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            axios@1.4.0
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Fixed in
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            axios@1.6.0
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                {/**/}
                                            </ul>{" "}
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                {/**/}{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-0475afce=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Exploit maturity
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-0475afce=""
                                                            className="vue--tooltip vue--issue-details-row-exploit-maturity"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <span
                                                                    data-v-0f55f474=""
                                                                    data-v-0475afce=""
                                                                    className="vue--badge vue--issue-details-row-exploit-maturity__badge vue--badge--complementary-blue vue--badge--small vue--badge--uppercase"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    {/**/}{" "}
                                                                    <span
                                                                        data-v-0f55f474=""
                                                                        className="vue--badge__text"
                                                                    >
                                                                        Proof of Concept
                                                                    </span>{" "}
                                                                    {/**/}
                                                                </span>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/} {/**/}
                                            </ul>
                                        </div>{" "}
                                        <div
                                            data-v-f1adb224=""
                                            data-v-587357f2=""
                                            className="vue--issue-content vue--issue__content"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-67840b28=""
                                                data-v-f1adb224=""
                                                className="vue--issue-content-show-more-button"
                                            >
                                                <button data-v-67840b28="">
                                                    Show more detail
                                                    <span
                                                        data-v-67840b28=""
                                                        aria-hidden="true"
                                                        aria-label="Chevron Down icon"
                                                        role="img"
                                                        className="material-design-icon chevron-down-icon"
                                                    >
                                                        <svg
                                                            data-v-67840b28=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-67840b28=""
                                                                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                            >
                                                                {/**/}
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>{" "}
                                            {/**/}
                                        </div>{" "}
                                        <footer
                                            data-v-0bbf892e=""
                                            data-v-587357f2=""
                                            data-v-3645d675=""
                                        >
                                            {/**/}
                                        </footer>{" "}
                                        {/**/} {/**/} {/**/}
                                    </div>{" "}
                                    <footer
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__form-actions"
                                    >
                                        <footer
                                            data-v-4c41549e=""
                                            data-v-587357f2=""
                                            className="vue--issue-footer"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-587357f2=""
                                                className="vue--issue-info vue--issue__info"
                                                data-v-4c41549e=""
                                            >
                                                {/**/} {/**/}
                                            </div>{" "}
                                            <div
                                                data-v-453f7da2=""
                                                data-v-587357f2=""
                                                className="vue--issue-actions vue--issue__actions"
                                                data-v-4c41549e=""
                                            >
                                                <ul
                                                    data-v-453f7da2=""
                                                    className="vue--issue-actions__items"
                                                >
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-28e93f06=""
                                                            data-v-453f7da2=""
                                                            className="vue--issue-actions-ignore"
                                                        >
                                                            <div
                                                                data-v-28e93f06=""
                                                                className="v-portal"
                                                                style={{ display: "none" }}
                                                            />{" "}
                                                            <button
                                                                data-v-46e4a2a7=""
                                                                data-v-28e93f06=""
                                                                role="button"
                                                                data-snyk-test="IssueActionsIgnore: submit"
                                                                className="vue--button vue--issue-actions-ignore__button vue--button--basic vue--button--ghost vue--button--small"
                                                            >
                                                                <span
                                                                    data-v-28e93f06=""
                                                                    data-v-46e4a2a7=""
                                                                    aria-hidden="true"
                                                                    aria-label="Eye Off icon"
                                                                    role="img"
                                                                    className="material-design-icon eye-off-icon"
                                                                >
                                                                    <svg
                                                                        data-v-28e93f06=""
                                                                        data-v-46e4a2a7=""
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 24 24"
                                                                        className="material-design-icon__svg"
                                                                    >
                                                                        <path
                                                                            data-v-28e93f06=""
                                                                            data-v-46e4a2a7=""
                                                                            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
                                                                        >
                                                                            {/**/}
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </li>{" "}
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        data-snyk-test="IssueActions: Fix action"
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <a
                                                            data-v-46e4a2a7=""
                                                            data-v-492887f7=""
                                                            data-v-453f7da2=""
                                                            href="/org/shivam-handsintechnology/fix/f142d36c-de24-46aa-a265-56058c4478a4?vuln=SNYK-JS-AXIOS-6032459"
                                                            className="vue--button vue--button--cta vue--button--small"
                                                        >
                                                            <span
                                                                data-v-492887f7=""
                                                                data-v-46e4a2a7=""
                                                                aria-hidden="true"
                                                                aria-label="Source Pull icon"
                                                                role="img"
                                                                className="material-design-icon source-pull-icon"
                                                            >
                                                                <svg
                                                                    data-v-492887f7=""
                                                                    data-v-46e4a2a7=""
                                                                    fill="currentColor"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    className="material-design-icon__svg"
                                                                >
                                                                    <path
                                                                        data-v-492887f7=""
                                                                        data-v-46e4a2a7=""
                                                                        d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z"
                                                                    >
                                                                        {/**/}
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            Fix this vulnerability
                                                        </a>
                                                    </li>{" "}
                                                    {/**/}
                                                </ul>{" "}
                                                <div data-v-453f7da2="" className="vue-portal-target" />
                                            </div>
                                        </footer>
                                    </footer>{" "}
                                    {/**/}
                                </form>
                                <form
                                    data-v-3645d675=""
                                    data-v-09baa44d=""
                                    data-v-587357f2=""
                                    data-v-555417d6=""
                                    className="vue--block vue--card vue--issue"
                                    id="issue-SNYK-JS-AXIOS-6144788"
                                    data-snyk-test="Issue"
                                >
                                    <header
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__header"
                                    >
                                        <header
                                            data-v-a659e2be=""
                                            data-v-587357f2=""
                                            className="vue--issue-header vue--issue-header--high"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-a659e2be=""
                                                className="vue--issue-header__wrapper"
                                            >
                                                <div
                                                    data-v-005f3e32=""
                                                    data-v-587357f2=""
                                                    id="issue-SNYK-JS-AXIOS-6144788"
                                                    className="vue--issue-title"
                                                    data-v-a659e2be=""
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        data-v-e9c81bb0=""
                                                        data-v-005f3e32=""
                                                        className="vue--tooltip vue--issue-severity vue--issue-title__severity vue--tooltip--auto"
                                                        data-snyk-test="IssueTitle: high severity"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-snyk-test="BaseTooltip: label"
                                                            className="vue--tooltip__label"
                                                        >
                                                            {/**/}{" "}
                                                            <span
                                                                data-v-e9c81bb0=""
                                                                data-v-06ded3b9=""
                                                                className="vue--issue-severity__badge vue--issue-severity__badge--high"
                                                            >
                                                                H
                                                            </span>
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>{" "}
                                                    <div
                                                        data-v-005f3e32=""
                                                        className="vue--issue-title__container"
                                                    >
                                                        <h2
                                                            data-v-005f3e32=""
                                                            data-snyk-test="Issue Title"
                                                            className="vue--issue-title__title"
                                                        >
                                                            <span data-v-005f3e32="">
                                                                <span className="">axios</span>
                                                            </span>{" "}
                                                            <small
                                                                data-v-005f3e32=""
                                                                className="vue--issue-title__category"
                                                            >
                                                                <span data-v-005f3e32="">
                                                                    <span className="">Prototype Pollution</span>
                                                                </span>
                                                            </small>
                                                        </h2>{" "}
                                                        <div
                                                            data-v-0837c15e=""
                                                            data-v-005f3e32=""
                                                            className="vue--issue-link vue--issue-title__link"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Clipboard Check Outline icon"
                                                                        role="img"
                                                                        className="material-design-icon clipboard-check-outline-icon vue--issue-link__icon vue--issue-link__icon__check"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>{" "}
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Link Variant icon"
                                                                        role="img"
                                                                        className="material-design-icon link-variant-icon vue--issue-link__icon"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <ul
                                                    data-v-4a5a4544=""
                                                    data-v-587357f2=""
                                                    className="vue--issue-meta"
                                                    data-v-a659e2be=""
                                                >
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-type"
                                                    >
                                                        Vulnerability
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item"
                                                    >
                                                        <a
                                                            data-v-ce2707d6=""
                                                            aria-describedby="describedBy5igZcdVdJa"
                                                            rel="noopener noreferrer"
                                                            href="https://cwe.mitre.org/data/definitions/1321.html"
                                                            target="_blank"
                                                            className="vue--anchor vue--issue-meta-item-cve__link"
                                                            data-snyk-test="BaseAnchor"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <span data-v-ce2707d6="">
                                                                <span className="">CWE-1321</span>
                                                            </span>
                                                            <span
                                                                data-v-ce2707d6=""
                                                                aria-label="Open an external page"
                                                                role="img"
                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                            >
                                                                <svg
                                                                    data-v-ce2707d6=""
                                                                    fill="currentColor"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    className="material-design-icon__svg"
                                                                >
                                                                    <path
                                                                        data-v-ce2707d6=""
                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                    >
                                                                        <title data-v-ce2707d6="">
                                                                            Open an external page
                                                                        </title>
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            <span
                                                                data-v-ce2707d6=""
                                                                id="describedBy5igZcdVdJa"
                                                                data-snyk-test="BaseAnchor screen reader description"
                                                                className="vue--anchor__offscreen"
                                                            >
                                                                Open this link in a new tab
                                                            </span>
                                                        </a>
                                                    </li>{" "}
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-5b40f628=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-cvss"
                                                    >
                                                        <a
                                                            data-v-ce2707d6=""
                                                            data-v-5b40f628=""
                                                            aria-describedby="describedByRMr7ARgtrY"
                                                            rel="noopener noreferrer"
                                                            href="https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                                                            target="_blank"
                                                            className="vue--anchor"
                                                            data-snyk-test="BaseAnchor"
                                                            data-v-3b87cb26=""
                                                        >
                                                            CVSS 7.5
                                                            <span
                                                                data-v-ce2707d6=""
                                                                aria-label="Open an external page"
                                                                role="img"
                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                            >
                                                                <svg
                                                                    data-v-ce2707d6=""
                                                                    fill="currentColor"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    className="material-design-icon__svg"
                                                                >
                                                                    <path
                                                                        data-v-ce2707d6=""
                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                    >
                                                                        <title data-v-ce2707d6="">
                                                                            Open an external page
                                                                        </title>
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            <span
                                                                data-v-ce2707d6=""
                                                                id="describedByRMr7ARgtrY"
                                                                data-snyk-test="BaseAnchor screen reader description"
                                                                className="vue--anchor__offscreen"
                                                            >
                                                                Open this link in a new tab
                                                            </span>
                                                        </a>{" "}
                                                        <span
                                                            data-v-0f55f474=""
                                                            data-v-5b40f628=""
                                                            data-snyk-ignore-wcag2aa="true"
                                                            className="vue--badge vue--issue-meta-item-cvss__badge vue--badge--high-severity vue--badge--extra-small vue--badge--uppercase"
                                                            data-v-3b87cb26=""
                                                        >
                                                            {/**/}{" "}
                                                            <span data-v-0f55f474="" className="vue--badge__text">
                                                                high
                                                            </span>{" "}
                                                            {/**/}
                                                        </span>
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-vuln-db"
                                                    >
                                                        <a
                                                            data-v-ce2707d6=""
                                                            aria-describedby="describedBy2C6Lb1jo88"
                                                            rel="noopener noreferrer"
                                                            href="https://app.snyk.io/vuln/SNYK-JS-AXIOS-6144788"
                                                            target="_blank"
                                                            className="vue--anchor"
                                                            data-snyk-test="BaseAnchor"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <span data-v-ce2707d6="">
                                                                <span className="">SNYK-JS-AXIOS-6144788</span>
                                                            </span>
                                                            <span
                                                                data-v-ce2707d6=""
                                                                aria-label="Open an external page"
                                                                role="img"
                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                            >
                                                                <svg
                                                                    data-v-ce2707d6=""
                                                                    fill="currentColor"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    className="material-design-icon__svg"
                                                                >
                                                                    <path
                                                                        data-v-ce2707d6=""
                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                    >
                                                                        <title data-v-ce2707d6="">
                                                                            Open an external page
                                                                        </title>
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            <span
                                                                data-v-ce2707d6=""
                                                                id="describedBy2C6Lb1jo88"
                                                                data-snyk-test="BaseAnchor screen reader description"
                                                                className="vue--anchor__offscreen"
                                                            >
                                                                Open this link in a new tab
                                                            </span>
                                                        </a>
                                                    </li>{" "}
                                                    {/**/}
                                                </ul>
                                            </div>{" "}
                                            <div
                                                data-v-34ece046=""
                                                data-v-587357f2=""
                                                className="vue--issue-priority-score"
                                                data-snyk-test="priorityScoreTooltip"
                                                data-v-a659e2be=""
                                            >
                                                <div
                                                    data-v-06ded3b9=""
                                                    data-v-34ece046=""
                                                    className="vue--tooltip vue--tooltip--auto"
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        aria-describedby="priorityScoreTooltip"
                                                        aria-controls="priorityScoreTooltip"
                                                        data-snyk-test="BaseTooltip: label"
                                                        className="vue--tooltip__label"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-34ece046=""
                                                            className="vue--issue-priority-score__badge"
                                                            data-v-06ded3b9=""
                                                        >
                                                            <h3
                                                                data-v-56a8aa57=""
                                                                data-v-34ece046=""
                                                                className="vue--all-caps vue--issue-priority-score__label vue--all-caps--small"
                                                                regular=""
                                                            >
                                                                Score
                                                            </h3>{" "}
                                                            <strong
                                                                data-v-34ece046=""
                                                                className="vue--issue-priority-score__score"
                                                            >
                                                                589
                                                            </strong>
                                                        </div>
                                                    </div>{" "}
                                                    {/**/}
                                                </div>
                                            </div>
                                        </header>
                                    </header>{" "}
                                    {/**/} {/**/}{" "}
                                    <div
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__body"
                                    >
                                        {" "}
                                        <div
                                            data-v-2afd4d95=""
                                            data-v-587357f2=""
                                            className="vue--issue-details-default vue--issue__details"
                                        >
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Introduced through
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            axios@1.4.0
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Fixed in
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            axios@1.6.4
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                {/**/}
                                            </ul>{" "}
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                {/**/}{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-0475afce=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Exploit maturity
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-0475afce=""
                                                            className="vue--tooltip vue--issue-details-row-exploit-maturity"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <span
                                                                    data-v-0f55f474=""
                                                                    data-v-0475afce=""
                                                                    className="vue--badge vue--issue-details-row-exploit-maturity__badge vue--badge--default vue--badge--small vue--badge--uppercase"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    {/**/}{" "}
                                                                    <span
                                                                        data-v-0f55f474=""
                                                                        className="vue--badge__text"
                                                                    >
                                                                        No known exploit
                                                                    </span>{" "}
                                                                    {/**/}
                                                                </span>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/} {/**/}
                                            </ul>
                                        </div>{" "}
                                        <div
                                            data-v-f1adb224=""
                                            data-v-587357f2=""
                                            className="vue--issue-content vue--issue__content"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-67840b28=""
                                                data-v-f1adb224=""
                                                className="vue--issue-content-show-more-button"
                                            >
                                                <button data-v-67840b28="">
                                                    Show more detail
                                                    <span
                                                        data-v-67840b28=""
                                                        aria-hidden="true"
                                                        aria-label="Chevron Down icon"
                                                        role="img"
                                                        className="material-design-icon chevron-down-icon"
                                                    >
                                                        <svg
                                                            data-v-67840b28=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-67840b28=""
                                                                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                            >
                                                                {/**/}
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>{" "}
                                            {/**/}
                                        </div>{" "}
                                        <footer
                                            data-v-0bbf892e=""
                                            data-v-587357f2=""
                                            data-v-3645d675=""
                                        >
                                            {/**/}
                                        </footer>{" "}
                                        {/**/} {/**/} {/**/}
                                    </div>{" "}
                                    <footer
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__form-actions"
                                    >
                                        <footer
                                            data-v-4c41549e=""
                                            data-v-587357f2=""
                                            className="vue--issue-footer"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-587357f2=""
                                                className="vue--issue-info vue--issue__info"
                                                data-v-4c41549e=""
                                            >
                                                {/**/} {/**/}
                                            </div>{" "}
                                            <div
                                                data-v-453f7da2=""
                                                data-v-587357f2=""
                                                className="vue--issue-actions vue--issue__actions"
                                                data-v-4c41549e=""
                                            >
                                                <ul
                                                    data-v-453f7da2=""
                                                    className="vue--issue-actions__items"
                                                >
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-28e93f06=""
                                                            data-v-453f7da2=""
                                                            className="vue--issue-actions-ignore"
                                                        >
                                                            <div
                                                                data-v-28e93f06=""
                                                                className="v-portal"
                                                                style={{ display: "none" }}
                                                            />{" "}
                                                            <button
                                                                data-v-46e4a2a7=""
                                                                data-v-28e93f06=""
                                                                role="button"
                                                                data-snyk-test="IssueActionsIgnore: submit"
                                                                className="vue--button vue--issue-actions-ignore__button vue--button--basic vue--button--ghost vue--button--small"
                                                            >
                                                                <span
                                                                    data-v-28e93f06=""
                                                                    data-v-46e4a2a7=""
                                                                    aria-hidden="true"
                                                                    aria-label="Eye Off icon"
                                                                    role="img"
                                                                    className="material-design-icon eye-off-icon"
                                                                >
                                                                    <svg
                                                                        data-v-28e93f06=""
                                                                        data-v-46e4a2a7=""
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 24 24"
                                                                        className="material-design-icon__svg"
                                                                    >
                                                                        <path
                                                                            data-v-28e93f06=""
                                                                            data-v-46e4a2a7=""
                                                                            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
                                                                        >
                                                                            {/**/}
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </li>{" "}
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        data-snyk-test="IssueActions: Fix action"
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <a
                                                            data-v-46e4a2a7=""
                                                            data-v-492887f7=""
                                                            data-v-453f7da2=""
                                                            href="/org/shivam-handsintechnology/fix/f142d36c-de24-46aa-a265-56058c4478a4?vuln=SNYK-JS-AXIOS-6144788"
                                                            className="vue--button vue--button--cta vue--button--small"
                                                        >
                                                            <span
                                                                data-v-492887f7=""
                                                                data-v-46e4a2a7=""
                                                                aria-hidden="true"
                                                                aria-label="Source Pull icon"
                                                                role="img"
                                                                className="material-design-icon source-pull-icon"
                                                            >
                                                                <svg
                                                                    data-v-492887f7=""
                                                                    data-v-46e4a2a7=""
                                                                    fill="currentColor"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    className="material-design-icon__svg"
                                                                >
                                                                    <path
                                                                        data-v-492887f7=""
                                                                        data-v-46e4a2a7=""
                                                                        d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z"
                                                                    >
                                                                        {/**/}
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            Fix this vulnerability
                                                        </a>
                                                    </li>{" "}
                                                    {/**/}
                                                </ul>{" "}
                                                <div data-v-453f7da2="" className="vue-portal-target" />
                                            </div>
                                        </footer>
                                    </footer>{" "}
                                    {/**/}
                                </form>
                                <form
                                    data-v-3645d675=""
                                    data-v-09baa44d=""
                                    data-v-587357f2=""
                                    data-v-555417d6=""
                                    className="vue--block vue--card vue--issue"
                                    id="issue-SNYK-JS-AXIOS-6124857"
                                    data-snyk-test="Issue"
                                >
                                    <header
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__header"
                                    >
                                        <header
                                            data-v-a659e2be=""
                                            data-v-587357f2=""
                                            className="vue--issue-header vue--issue-header--medium"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-a659e2be=""
                                                className="vue--issue-header__wrapper"
                                            >
                                                <div
                                                    data-v-005f3e32=""
                                                    data-v-587357f2=""
                                                    id="issue-SNYK-JS-AXIOS-6124857"
                                                    className="vue--issue-title vue--issue-title--compact"
                                                    data-v-a659e2be=""
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        data-v-e9c81bb0=""
                                                        data-v-005f3e32=""
                                                        className="vue--tooltip vue--issue-severity vue--issue-title__severity vue--tooltip--auto"
                                                        data-snyk-test="IssueTitle: medium severity"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-snyk-test="BaseTooltip: label"
                                                            className="vue--tooltip__label"
                                                        >
                                                            {/**/}{" "}
                                                            <span
                                                                data-v-e9c81bb0=""
                                                                data-v-06ded3b9=""
                                                                className="vue--issue-severity__badge vue--issue-severity__badge--medium"
                                                            >
                                                                M
                                                            </span>
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>{" "}
                                                    <div
                                                        data-v-005f3e32=""
                                                        className="vue--issue-title__container"
                                                    >
                                                        <h2
                                                            data-v-005f3e32=""
                                                            data-snyk-test="Issue Title"
                                                            className="vue--issue-title__title"
                                                        >
                                                            <span data-v-005f3e32="">
                                                                <span className="">axios</span>
                                                            </span>{" "}
                                                            <small
                                                                data-v-005f3e32=""
                                                                className="vue--issue-title__category"
                                                            >
                                                                <span data-v-005f3e32="">
                                                                    <span className="">
                                                                        Regular Expression Denial of Service (ReDoS)
                                                                    </span>
                                                                </span>
                                                            </small>
                                                        </h2>{" "}
                                                        <div
                                                            data-v-0837c15e=""
                                                            data-v-005f3e32=""
                                                            className="vue--issue-link vue--issue-title__link"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Clipboard Check Outline icon"
                                                                        role="img"
                                                                        className="material-design-icon clipboard-check-outline-icon vue--issue-link__icon vue--issue-link__icon__check"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>{" "}
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Link Variant icon"
                                                                        role="img"
                                                                        className="material-design-icon link-variant-icon vue--issue-link__icon"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <ul
                                                    data-v-4a5a4544=""
                                                    data-v-587357f2=""
                                                    className="vue--issue-meta"
                                                    data-v-a659e2be=""
                                                >
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-type"
                                                    >
                                                        Vulnerability
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-55b69dba=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-rollup"
                                                    >
                                                        <div
                                                            data-v-64b0d6bd=""
                                                            data-v-cc531ec8=""
                                                            data-v-55b69dba=""
                                                            tabIndex={-1}
                                                            className="vue--dropdown-menu vue--dropdown-menu-handle-dotted vue--dropdown-menu--align-left vue--dropdown-menu--extra-small vue--dropdown-menu-handle-dotted--extra-small"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                role="button"
                                                                data-snyk-text="BaseDropdownMenu: handle"
                                                                aria-haspopup="true"
                                                                tabIndex={0}
                                                                aria-expanded="false"
                                                                className="vue--dropdown-menu__handle"
                                                            >
                                                                <span
                                                                    data-v-cc531ec8=""
                                                                    data-v-64b0d6bd=""
                                                                    className="vue--dropdown-menu-handle-dotted__handle"
                                                                />
                                                            </div>{" "}
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                className="vue--dropdown-menu__menu"
                                                            >
                                                                {" "}
                                                                <ul
                                                                    data-v-64b0d6bd=""
                                                                    role="menu"
                                                                    className="vue--dropdown-menu__menu--primary"
                                                                >
                                                                    {" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://cwe.mitre.org/data/definitions/1333.html"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CWE-1333</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L/E:P"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            CVSS 5.3
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://app.snyk.io/vuln/SNYK-JS-AXIOS-6124857"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">
                                                                                    SNYK-JS-AXIOS-6124857
                                                                                </span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>
                                                                </ul>{" "}
                                                                {/**/}{" "}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>{" "}
                                            <div
                                                data-v-34ece046=""
                                                data-v-587357f2=""
                                                className="vue--issue-priority-score"
                                                data-snyk-test="priorityScoreTooltip"
                                                data-v-a659e2be=""
                                            >
                                                <div
                                                    data-v-06ded3b9=""
                                                    data-v-34ece046=""
                                                    className="vue--tooltip vue--tooltip--auto"
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        aria-describedby="priorityScoreTooltip"
                                                        aria-controls="priorityScoreTooltip"
                                                        data-snyk-test="BaseTooltip: label"
                                                        className="vue--tooltip__label"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-34ece046=""
                                                            className="vue--issue-priority-score__badge"
                                                            data-v-06ded3b9=""
                                                        >
                                                            <h3
                                                                data-v-56a8aa57=""
                                                                data-v-34ece046=""
                                                                className="vue--all-caps vue--issue-priority-score__label vue--all-caps--small"
                                                                regular=""
                                                            >
                                                                Score
                                                            </h3>{" "}
                                                            <strong
                                                                data-v-34ece046=""
                                                                className="vue--issue-priority-score__score"
                                                            >
                                                                586
                                                            </strong>
                                                        </div>
                                                    </div>{" "}
                                                    {/**/}
                                                </div>
                                            </div>
                                        </header>
                                    </header>{" "}
                                    {/**/} {/**/}{" "}
                                    <div
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__body"
                                    >
                                        {" "}
                                        <div
                                            data-v-2afd4d95=""
                                            data-v-587357f2=""
                                            className="vue--issue-details-default vue--issue__details"
                                        >
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Introduced through
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            axios@1.4.0
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Fixed in
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            axios@1.6.3
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                {/**/}
                                            </ul>{" "}
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                {/**/}{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-0475afce=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Exploit maturity
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-0475afce=""
                                                            className="vue--tooltip vue--issue-details-row-exploit-maturity"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <span
                                                                    data-v-0f55f474=""
                                                                    data-v-0475afce=""
                                                                    className="vue--badge vue--issue-details-row-exploit-maturity__badge vue--badge--complementary-blue vue--badge--small vue--badge--uppercase"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    {/**/}{" "}
                                                                    <span
                                                                        data-v-0f55f474=""
                                                                        className="vue--badge__text"
                                                                    >
                                                                        Proof of Concept
                                                                    </span>{" "}
                                                                    {/**/}
                                                                </span>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/} {/**/}
                                            </ul>
                                        </div>{" "}
                                        <div
                                            data-v-f1adb224=""
                                            data-v-587357f2=""
                                            className="vue--issue-content vue--issue__content"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-67840b28=""
                                                data-v-f1adb224=""
                                                className="vue--issue-content-show-more-button"
                                            >
                                                <button data-v-67840b28="">
                                                    Show more detail
                                                    <span
                                                        data-v-67840b28=""
                                                        aria-hidden="true"
                                                        aria-label="Chevron Down icon"
                                                        role="img"
                                                        className="material-design-icon chevron-down-icon"
                                                    >
                                                        <svg
                                                            data-v-67840b28=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-67840b28=""
                                                                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                            >
                                                                {/**/}
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>{" "}
                                            {/**/}
                                        </div>{" "}
                                        <footer
                                            data-v-0bbf892e=""
                                            data-v-587357f2=""
                                            data-v-3645d675=""
                                        >
                                            {/**/}
                                        </footer>{" "}
                                        {/**/} {/**/} {/**/}
                                    </div>{" "}
                                    <footer
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__form-actions"
                                    >
                                        <footer
                                            data-v-4c41549e=""
                                            data-v-587357f2=""
                                            className="vue--issue-footer"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-587357f2=""
                                                className="vue--issue-info vue--issue__info"
                                                data-v-4c41549e=""
                                            >
                                                {/**/} {/**/}
                                            </div>{" "}
                                            <div
                                                data-v-453f7da2=""
                                                data-v-587357f2=""
                                                className="vue--issue-actions vue--issue__actions"
                                                data-v-4c41549e=""
                                            >
                                                <ul
                                                    data-v-453f7da2=""
                                                    className="vue--issue-actions__items"
                                                >
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-28e93f06=""
                                                            data-v-453f7da2=""
                                                            className="vue--issue-actions-ignore"
                                                        >
                                                            <div
                                                                data-v-28e93f06=""
                                                                className="v-portal"
                                                                style={{ display: "none" }}
                                                            />{" "}
                                                            <button
                                                                data-v-46e4a2a7=""
                                                                data-v-28e93f06=""
                                                                role="button"
                                                                data-snyk-test="IssueActionsIgnore: submit"
                                                                className="vue--button vue--issue-actions-ignore__button vue--button--basic vue--button--ghost vue--button--small"
                                                            >
                                                                <span
                                                                    data-v-28e93f06=""
                                                                    data-v-46e4a2a7=""
                                                                    aria-hidden="true"
                                                                    aria-label="Eye Off icon"
                                                                    role="img"
                                                                    className="material-design-icon eye-off-icon"
                                                                >
                                                                    <svg
                                                                        data-v-28e93f06=""
                                                                        data-v-46e4a2a7=""
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 24 24"
                                                                        className="material-design-icon__svg"
                                                                    >
                                                                        <path
                                                                            data-v-28e93f06=""
                                                                            data-v-46e4a2a7=""
                                                                            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
                                                                        >
                                                                            {/**/}
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </li>{" "}
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        data-snyk-test="IssueActions: Fix action"
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <a
                                                            data-v-46e4a2a7=""
                                                            data-v-492887f7=""
                                                            data-v-453f7da2=""
                                                            href="/org/shivam-handsintechnology/fix/f142d36c-de24-46aa-a265-56058c4478a4?vuln=SNYK-JS-AXIOS-6124857"
                                                            className="vue--button vue--button--cta vue--button--small"
                                                        >
                                                            <span
                                                                data-v-492887f7=""
                                                                data-v-46e4a2a7=""
                                                                aria-hidden="true"
                                                                aria-label="Source Pull icon"
                                                                role="img"
                                                                className="material-design-icon source-pull-icon"
                                                            >
                                                                <svg
                                                                    data-v-492887f7=""
                                                                    data-v-46e4a2a7=""
                                                                    fill="currentColor"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    className="material-design-icon__svg"
                                                                >
                                                                    <path
                                                                        data-v-492887f7=""
                                                                        data-v-46e4a2a7=""
                                                                        d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z"
                                                                    >
                                                                        {/**/}
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            Fix this vulnerability
                                                        </a>
                                                    </li>{" "}
                                                    {/**/}
                                                </ul>{" "}
                                                <div data-v-453f7da2="" className="vue-portal-target" />
                                            </div>
                                        </footer>
                                    </footer>{" "}
                                    {/**/}
                                </form>
                                <form
                                    data-v-3645d675=""
                                    data-v-09baa44d=""
                                    data-v-587357f2=""
                                    data-v-555417d6=""
                                    className="vue--block vue--card vue--issue"
                                    id="issue-SNYK-JS-IP-6240864"
                                    data-snyk-test="Issue"
                                >
                                    <header
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__header"
                                    >
                                        <header
                                            data-v-a659e2be=""
                                            data-v-587357f2=""
                                            className="vue--issue-header vue--issue-header--high"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-a659e2be=""
                                                className="vue--issue-header__wrapper"
                                            >
                                                <div
                                                    data-v-005f3e32=""
                                                    data-v-587357f2=""
                                                    id="issue-SNYK-JS-IP-6240864"
                                                    className="vue--issue-title"
                                                    data-v-a659e2be=""
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        data-v-e9c81bb0=""
                                                        data-v-005f3e32=""
                                                        className="vue--tooltip vue--issue-severity vue--issue-title__severity vue--tooltip--auto"
                                                        data-snyk-test="IssueTitle: high severity"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-snyk-test="BaseTooltip: label"
                                                            className="vue--tooltip__label"
                                                        >
                                                            {/**/}{" "}
                                                            <span
                                                                data-v-e9c81bb0=""
                                                                data-v-06ded3b9=""
                                                                className="vue--issue-severity__badge vue--issue-severity__badge--high"
                                                            >
                                                                H
                                                            </span>
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>{" "}
                                                    <div
                                                        data-v-005f3e32=""
                                                        className="vue--issue-title__container"
                                                    >
                                                        <h2
                                                            data-v-005f3e32=""
                                                            data-snyk-test="Issue Title"
                                                            className="vue--issue-title__title"
                                                        >
                                                            <span data-v-005f3e32="">
                                                                <span className="">ip</span>
                                                            </span>{" "}
                                                            <small
                                                                data-v-005f3e32=""
                                                                className="vue--issue-title__category"
                                                            >
                                                                <span data-v-005f3e32="">
                                                                    <span className="">
                                                                        Server-side Request Forgery (SSRF)
                                                                    </span>
                                                                </span>
                                                            </small>
                                                        </h2>{" "}
                                                        <div
                                                            data-v-0837c15e=""
                                                            data-v-005f3e32=""
                                                            className="vue--issue-link vue--issue-title__link"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Clipboard Check Outline icon"
                                                                        role="img"
                                                                        className="material-design-icon clipboard-check-outline-icon vue--issue-link__icon vue--issue-link__icon__check"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>{" "}
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Link Variant icon"
                                                                        role="img"
                                                                        className="material-design-icon link-variant-icon vue--issue-link__icon"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <ul
                                                    data-v-4a5a4544=""
                                                    data-v-587357f2=""
                                                    className="vue--issue-meta"
                                                    data-v-a659e2be=""
                                                >
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-type"
                                                    >
                                                        Vulnerability
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-55b69dba=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-rollup"
                                                    >
                                                        <div
                                                            data-v-64b0d6bd=""
                                                            data-v-cc531ec8=""
                                                            data-v-55b69dba=""
                                                            tabIndex={-1}
                                                            className="vue--dropdown-menu vue--dropdown-menu-handle-dotted vue--dropdown-menu--align-left vue--dropdown-menu--extra-small vue--dropdown-menu-handle-dotted--extra-small"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                role="button"
                                                                data-snyk-text="BaseDropdownMenu: handle"
                                                                aria-haspopup="true"
                                                                tabIndex={0}
                                                                aria-expanded="false"
                                                                className="vue--dropdown-menu__handle"
                                                            >
                                                                <span
                                                                    data-v-cc531ec8=""
                                                                    data-v-64b0d6bd=""
                                                                    className="vue--dropdown-menu-handle-dotted__handle"
                                                                />
                                                            </div>{" "}
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                className="vue--dropdown-menu__menu"
                                                            >
                                                                {" "}
                                                                <ul
                                                                    data-v-64b0d6bd=""
                                                                    role="menu"
                                                                    className="vue--dropdown-menu__menu--primary"
                                                                >
                                                                    {" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://cwe.mitre.org/data/definitions/918.html"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CWE-918</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.cve.org/CVERecord?id=CVE-2023-42282"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CVE-2023-42282</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:L/E:P"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            CVSS 8.6
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://app.snyk.io/vuln/SNYK-JS-IP-6240864"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">SNYK-JS-IP-6240864</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>
                                                                </ul>{" "}
                                                                {/**/}{" "}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>{" "}
                                            <div
                                                data-v-34ece046=""
                                                data-v-587357f2=""
                                                className="vue--issue-priority-score"
                                                data-snyk-test="priorityScoreTooltip"
                                                data-v-a659e2be=""
                                            >
                                                <div
                                                    data-v-06ded3b9=""
                                                    data-v-34ece046=""
                                                    className="vue--tooltip vue--tooltip--auto"
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        aria-describedby="priorityScoreTooltip"
                                                        aria-controls="priorityScoreTooltip"
                                                        data-snyk-test="BaseTooltip: label"
                                                        className="vue--tooltip__label"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-34ece046=""
                                                            className="vue--issue-priority-score__badge"
                                                            data-v-06ded3b9=""
                                                        >
                                                            <h3
                                                                data-v-56a8aa57=""
                                                                data-v-34ece046=""
                                                                className="vue--all-caps vue--issue-priority-score__label vue--all-caps--small"
                                                                regular=""
                                                            >
                                                                Score
                                                            </h3>{" "}
                                                            <strong
                                                                data-v-34ece046=""
                                                                className="vue--issue-priority-score__score"
                                                            >
                                                                537
                                                            </strong>
                                                        </div>
                                                    </div>{" "}
                                                    {/**/}
                                                </div>
                                            </div>
                                        </header>
                                    </header>{" "}
                                    {/**/} {/**/}{" "}
                                    <div
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__body"
                                    >
                                        {" "}
                                        <div
                                            data-v-2afd4d95=""
                                            data-v-587357f2=""
                                            className="vue--issue-details-default vue--issue__details"
                                        >
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Introduced through
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            mongoose@7.2.1
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Fixed in
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            className="vue--tooltip vue--tooltip--auto"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                ip@1.1.9, @2.0.1
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/}
                                            </ul>{" "}
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                {/**/}{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-0475afce=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Exploit maturity
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-0475afce=""
                                                            className="vue--tooltip vue--issue-details-row-exploit-maturity"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <span
                                                                    data-v-0f55f474=""
                                                                    data-v-0475afce=""
                                                                    className="vue--badge vue--issue-details-row-exploit-maturity__badge vue--badge--complementary-blue vue--badge--small vue--badge--uppercase"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    {/**/}{" "}
                                                                    <span
                                                                        data-v-0f55f474=""
                                                                        className="vue--badge__text"
                                                                    >
                                                                        Proof of Concept
                                                                    </span>{" "}
                                                                    {/**/}
                                                                </span>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/} {/**/}
                                            </ul>
                                        </div>{" "}
                                        <div
                                            data-v-f1adb224=""
                                            data-v-587357f2=""
                                            className="vue--issue-content vue--issue__content"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-67840b28=""
                                                data-v-f1adb224=""
                                                className="vue--issue-content-show-more-button"
                                            >
                                                <button data-v-67840b28="">
                                                    Show more detail
                                                    <span
                                                        data-v-67840b28=""
                                                        aria-hidden="true"
                                                        aria-label="Chevron Down icon"
                                                        role="img"
                                                        className="material-design-icon chevron-down-icon"
                                                    >
                                                        <svg
                                                            data-v-67840b28=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-67840b28=""
                                                                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                            >
                                                                {/**/}
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>{" "}
                                            {/**/}
                                        </div>{" "}
                                        <footer
                                            data-v-0bbf892e=""
                                            data-v-587357f2=""
                                            data-v-3645d675=""
                                        >
                                            {/**/}
                                        </footer>{" "}
                                        {/**/} {/**/} {/**/}
                                    </div>{" "}
                                    <footer
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__form-actions"
                                    >
                                        <footer
                                            data-v-4c41549e=""
                                            data-v-587357f2=""
                                            className="vue--issue-footer"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-587357f2=""
                                                className="vue--issue-info vue--issue__info"
                                                data-v-4c41549e=""
                                            >
                                                {/**/} {/**/}
                                            </div>{" "}
                                            <div
                                                data-v-453f7da2=""
                                                data-v-587357f2=""
                                                className="vue--issue-actions vue--issue__actions"
                                                data-v-4c41549e=""
                                            >
                                                <ul
                                                    data-v-453f7da2=""
                                                    className="vue--issue-actions__items"
                                                >
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-28e93f06=""
                                                            data-v-453f7da2=""
                                                            className="vue--issue-actions-ignore"
                                                        >
                                                            <div
                                                                data-v-28e93f06=""
                                                                className="v-portal"
                                                                style={{ display: "none" }}
                                                            />{" "}
                                                            <button
                                                                data-v-46e4a2a7=""
                                                                data-v-28e93f06=""
                                                                role="button"
                                                                data-snyk-test="IssueActionsIgnore: submit"
                                                                className="vue--button vue--issue-actions-ignore__button vue--button--basic vue--button--ghost vue--button--small"
                                                            >
                                                                <span
                                                                    data-v-28e93f06=""
                                                                    data-v-46e4a2a7=""
                                                                    aria-hidden="true"
                                                                    aria-label="Eye Off icon"
                                                                    role="img"
                                                                    className="material-design-icon eye-off-icon"
                                                                >
                                                                    <svg
                                                                        data-v-28e93f06=""
                                                                        data-v-46e4a2a7=""
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 24 24"
                                                                        className="material-design-icon__svg"
                                                                    >
                                                                        <path
                                                                            data-v-28e93f06=""
                                                                            data-v-46e4a2a7=""
                                                                            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
                                                                        >
                                                                            {/**/}
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </li>{" "}
                                                    {/**/} {/**/} {/**/}
                                                </ul>{" "}
                                                <div data-v-453f7da2="" className="vue-portal-target" />
                                            </div>
                                        </footer>
                                    </footer>{" "}
                                    {/**/}
                                </form>
                                <form
                                    data-v-3645d675=""
                                    data-v-09baa44d=""
                                    data-v-587357f2=""
                                    data-v-555417d6=""
                                    className="vue--block vue--card vue--issue"
                                    id="issue-SNYK-JS-FOLLOWREDIRECTS-6444610"
                                    data-snyk-test="Issue"
                                >
                                    <header
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__header"
                                    >
                                        <header
                                            data-v-a659e2be=""
                                            data-v-587357f2=""
                                            className="vue--issue-header vue--issue-header--medium"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-a659e2be=""
                                                className="vue--issue-header__wrapper"
                                            >
                                                <div
                                                    data-v-005f3e32=""
                                                    data-v-587357f2=""
                                                    id="issue-SNYK-JS-FOLLOWREDIRECTS-6444610"
                                                    className="vue--issue-title"
                                                    data-v-a659e2be=""
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        data-v-e9c81bb0=""
                                                        data-v-005f3e32=""
                                                        className="vue--tooltip vue--issue-severity vue--issue-title__severity vue--tooltip--auto"
                                                        data-snyk-test="IssueTitle: medium severity"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-snyk-test="BaseTooltip: label"
                                                            className="vue--tooltip__label"
                                                        >
                                                            {/**/}{" "}
                                                            <span
                                                                data-v-e9c81bb0=""
                                                                data-v-06ded3b9=""
                                                                className="vue--issue-severity__badge vue--issue-severity__badge--medium"
                                                            >
                                                                M
                                                            </span>
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>{" "}
                                                    <div
                                                        data-v-005f3e32=""
                                                        className="vue--issue-title__container"
                                                    >
                                                        <h2
                                                            data-v-005f3e32=""
                                                            data-snyk-test="Issue Title"
                                                            className="vue--issue-title__title"
                                                        >
                                                            <span data-v-005f3e32="">
                                                                <span className="">follow-redirects</span>
                                                            </span>{" "}
                                                            <small
                                                                data-v-005f3e32=""
                                                                className="vue--issue-title__category"
                                                            >
                                                                <span data-v-005f3e32="">
                                                                    <span className="">Information Exposure</span>
                                                                </span>
                                                            </small>
                                                        </h2>{" "}
                                                        <div
                                                            data-v-0837c15e=""
                                                            data-v-005f3e32=""
                                                            className="vue--issue-link vue--issue-title__link"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Clipboard Check Outline icon"
                                                                        role="img"
                                                                        className="material-design-icon clipboard-check-outline-icon vue--issue-link__icon vue--issue-link__icon__check"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>{" "}
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Link Variant icon"
                                                                        role="img"
                                                                        className="material-design-icon link-variant-icon vue--issue-link__icon"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <ul
                                                    data-v-4a5a4544=""
                                                    data-v-587357f2=""
                                                    className="vue--issue-meta"
                                                    data-v-a659e2be=""
                                                >
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-type"
                                                    >
                                                        Vulnerability
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-55b69dba=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-rollup"
                                                    >
                                                        <div
                                                            data-v-64b0d6bd=""
                                                            data-v-cc531ec8=""
                                                            data-v-55b69dba=""
                                                            tabIndex={-1}
                                                            className="vue--dropdown-menu vue--dropdown-menu-handle-dotted vue--dropdown-menu--align-left vue--dropdown-menu--extra-small vue--dropdown-menu-handle-dotted--extra-small"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                role="button"
                                                                data-snyk-text="BaseDropdownMenu: handle"
                                                                aria-haspopup="true"
                                                                tabIndex={0}
                                                                aria-expanded="false"
                                                                className="vue--dropdown-menu__handle"
                                                            >
                                                                <span
                                                                    data-v-cc531ec8=""
                                                                    data-v-64b0d6bd=""
                                                                    className="vue--dropdown-menu-handle-dotted__handle"
                                                                />
                                                            </div>{" "}
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                className="vue--dropdown-menu__menu"
                                                            >
                                                                {" "}
                                                                <ul
                                                                    data-v-64b0d6bd=""
                                                                    role="menu"
                                                                    className="vue--dropdown-menu__menu--primary"
                                                                >
                                                                    {" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://cwe.mitre.org/data/definitions/200.html"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CWE-200</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.cve.org/CVERecord?id=CVE-2024-28849"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CVE-2024-28849</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N/E:P"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            CVSS 6.5
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://app.snyk.io/vuln/SNYK-JS-FOLLOWREDIRECTS-6444610"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">
                                                                                    SNYK-JS-FOLLOWREDIRECTS-6444610
                                                                                </span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>
                                                                </ul>{" "}
                                                                {/**/}{" "}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>{" "}
                                            <div
                                                data-v-34ece046=""
                                                data-v-587357f2=""
                                                className="vue--issue-priority-score"
                                                data-snyk-test="priorityScoreTooltip"
                                                data-v-a659e2be=""
                                            >
                                                <div
                                                    data-v-06ded3b9=""
                                                    data-v-34ece046=""
                                                    className="vue--tooltip vue--tooltip--auto"
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        aria-describedby="priorityScoreTooltip"
                                                        aria-controls="priorityScoreTooltip"
                                                        data-snyk-test="BaseTooltip: label"
                                                        className="vue--tooltip__label"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-34ece046=""
                                                            className="vue--issue-priority-score__badge"
                                                            data-v-06ded3b9=""
                                                        >
                                                            <h3
                                                                data-v-56a8aa57=""
                                                                data-v-34ece046=""
                                                                className="vue--all-caps vue--issue-priority-score__label vue--all-caps--small"
                                                                regular=""
                                                            >
                                                                Score
                                                            </h3>{" "}
                                                            <strong
                                                                data-v-34ece046=""
                                                                className="vue--issue-priority-score__score"
                                                            >
                                                                504
                                                            </strong>
                                                        </div>
                                                    </div>{" "}
                                                    {/**/}
                                                </div>
                                            </div>
                                        </header>
                                    </header>{" "}
                                    {/**/} {/**/}{" "}
                                    <div
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__body"
                                    >
                                        {" "}
                                        <div
                                            data-v-2afd4d95=""
                                            data-v-587357f2=""
                                            className="vue--issue-details-default vue--issue__details"
                                        >
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Introduced through
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            axios@1.4.0
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Fixed in
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            follow-redirects@1.15.6
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                {/**/}
                                            </ul>{" "}
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                {/**/}{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-0475afce=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Exploit maturity
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-0475afce=""
                                                            className="vue--tooltip vue--issue-details-row-exploit-maturity"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <span
                                                                    data-v-0f55f474=""
                                                                    data-v-0475afce=""
                                                                    className="vue--badge vue--issue-details-row-exploit-maturity__badge vue--badge--complementary-blue vue--badge--small vue--badge--uppercase"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    {/**/}{" "}
                                                                    <span
                                                                        data-v-0f55f474=""
                                                                        className="vue--badge__text"
                                                                    >
                                                                        Proof of Concept
                                                                    </span>{" "}
                                                                    {/**/}
                                                                </span>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/} {/**/}
                                            </ul>
                                        </div>{" "}
                                        <div
                                            data-v-f1adb224=""
                                            data-v-587357f2=""
                                            className="vue--issue-content vue--issue__content"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-67840b28=""
                                                data-v-f1adb224=""
                                                className="vue--issue-content-show-more-button"
                                            >
                                                <button data-v-67840b28="">
                                                    Show more detail
                                                    <span
                                                        data-v-67840b28=""
                                                        aria-hidden="true"
                                                        aria-label="Chevron Down icon"
                                                        role="img"
                                                        className="material-design-icon chevron-down-icon"
                                                    >
                                                        <svg
                                                            data-v-67840b28=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-67840b28=""
                                                                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                            >
                                                                {/**/}
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>{" "}
                                            {/**/}
                                        </div>{" "}
                                        <footer
                                            data-v-0bbf892e=""
                                            data-v-587357f2=""
                                            data-v-3645d675=""
                                        >
                                            {/**/}
                                        </footer>{" "}
                                        {/**/} {/**/} {/**/}
                                    </div>{" "}
                                    <footer
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__form-actions"
                                    >
                                        <footer
                                            data-v-4c41549e=""
                                            data-v-587357f2=""
                                            className="vue--issue-footer"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-587357f2=""
                                                className="vue--issue-info vue--issue__info"
                                                data-v-4c41549e=""
                                            >
                                                {/**/} {/**/}
                                            </div>{" "}
                                            <div
                                                data-v-453f7da2=""
                                                data-v-587357f2=""
                                                className="vue--issue-actions vue--issue__actions"
                                                data-v-4c41549e=""
                                            >
                                                <ul
                                                    data-v-453f7da2=""
                                                    className="vue--issue-actions__items"
                                                >
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-28e93f06=""
                                                            data-v-453f7da2=""
                                                            className="vue--issue-actions-ignore"
                                                        >
                                                            <div
                                                                data-v-28e93f06=""
                                                                className="v-portal"
                                                                style={{ display: "none" }}
                                                            />{" "}
                                                            <button
                                                                data-v-46e4a2a7=""
                                                                data-v-28e93f06=""
                                                                role="button"
                                                                data-snyk-test="IssueActionsIgnore: submit"
                                                                className="vue--button vue--issue-actions-ignore__button vue--button--basic vue--button--ghost vue--button--small"
                                                            >
                                                                <span
                                                                    data-v-28e93f06=""
                                                                    data-v-46e4a2a7=""
                                                                    aria-hidden="true"
                                                                    aria-label="Eye Off icon"
                                                                    role="img"
                                                                    className="material-design-icon eye-off-icon"
                                                                >
                                                                    <svg
                                                                        data-v-28e93f06=""
                                                                        data-v-46e4a2a7=""
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 24 24"
                                                                        className="material-design-icon__svg"
                                                                    >
                                                                        <path
                                                                            data-v-28e93f06=""
                                                                            data-v-46e4a2a7=""
                                                                            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
                                                                        >
                                                                            {/**/}
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </li>{" "}
                                                    {/**/} {/**/} {/**/}
                                                </ul>{" "}
                                                <div data-v-453f7da2="" className="vue-portal-target" />
                                            </div>
                                        </footer>
                                    </footer>{" "}
                                    {/**/}
                                </form>
                                <form
                                    data-v-3645d675=""
                                    data-v-09baa44d=""
                                    data-v-587357f2=""
                                    data-v-555417d6=""
                                    className="vue--block vue--card vue--issue"
                                    id="issue-SNYK-JS-FOLLOWREDIRECTS-6141137"
                                    data-snyk-test="Issue"
                                >
                                    <header
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__header"
                                    >
                                        <header
                                            data-v-a659e2be=""
                                            data-v-587357f2=""
                                            className="vue--issue-header vue--issue-header--high"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-a659e2be=""
                                                className="vue--issue-header__wrapper"
                                            >
                                                <div
                                                    data-v-005f3e32=""
                                                    data-v-587357f2=""
                                                    id="issue-SNYK-JS-FOLLOWREDIRECTS-6141137"
                                                    className="vue--issue-title"
                                                    data-v-a659e2be=""
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        data-v-e9c81bb0=""
                                                        data-v-005f3e32=""
                                                        className="vue--tooltip vue--issue-severity vue--issue-title__severity vue--tooltip--auto"
                                                        data-snyk-test="IssueTitle: high severity"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-snyk-test="BaseTooltip: label"
                                                            className="vue--tooltip__label"
                                                        >
                                                            {/**/}{" "}
                                                            <span
                                                                data-v-e9c81bb0=""
                                                                data-v-06ded3b9=""
                                                                className="vue--issue-severity__badge vue--issue-severity__badge--high"
                                                            >
                                                                H
                                                            </span>
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>{" "}
                                                    <div
                                                        data-v-005f3e32=""
                                                        className="vue--issue-title__container"
                                                    >
                                                        <h2
                                                            data-v-005f3e32=""
                                                            data-snyk-test="Issue Title"
                                                            className="vue--issue-title__title"
                                                        >
                                                            <span data-v-005f3e32="">
                                                                <span className="">follow-redirects</span>
                                                            </span>{" "}
                                                            <small
                                                                data-v-005f3e32=""
                                                                className="vue--issue-title__category"
                                                            >
                                                                <span data-v-005f3e32="">
                                                                    <span className="">
                                                                        Improper Input Validation
                                                                    </span>
                                                                </span>
                                                            </small>
                                                        </h2>{" "}
                                                        <div
                                                            data-v-0837c15e=""
                                                            data-v-005f3e32=""
                                                            className="vue--issue-link vue--issue-title__link"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Clipboard Check Outline icon"
                                                                        role="img"
                                                                        className="material-design-icon clipboard-check-outline-icon vue--issue-link__icon vue--issue-link__icon__check"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>{" "}
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Link Variant icon"
                                                                        role="img"
                                                                        className="material-design-icon link-variant-icon vue--issue-link__icon"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <ul
                                                    data-v-4a5a4544=""
                                                    data-v-587357f2=""
                                                    className="vue--issue-meta"
                                                    data-v-a659e2be=""
                                                >
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-type"
                                                    >
                                                        Vulnerability
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-55b69dba=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-rollup"
                                                    >
                                                        <div
                                                            data-v-64b0d6bd=""
                                                            data-v-cc531ec8=""
                                                            data-v-55b69dba=""
                                                            tabIndex={-1}
                                                            className="vue--dropdown-menu vue--dropdown-menu-handle-dotted vue--dropdown-menu--align-left vue--dropdown-menu--extra-small vue--dropdown-menu-handle-dotted--extra-small"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                role="button"
                                                                data-snyk-text="BaseDropdownMenu: handle"
                                                                aria-haspopup="true"
                                                                tabIndex={0}
                                                                aria-expanded="false"
                                                                className="vue--dropdown-menu__handle"
                                                            >
                                                                <span
                                                                    data-v-cc531ec8=""
                                                                    data-v-64b0d6bd=""
                                                                    className="vue--dropdown-menu-handle-dotted__handle"
                                                                />
                                                            </div>{" "}
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                className="vue--dropdown-menu__menu"
                                                            >
                                                                {" "}
                                                                <ul
                                                                    data-v-64b0d6bd=""
                                                                    role="menu"
                                                                    className="vue--dropdown-menu__menu--primary"
                                                                >
                                                                    {" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://cwe.mitre.org/data/definitions/20.html"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CWE-20</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.cve.org/CVERecord?id=CVE-2023-26159"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CVE-2023-26159</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L/E:P"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            CVSS 7.3
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://app.snyk.io/vuln/SNYK-JS-FOLLOWREDIRECTS-6141137"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">
                                                                                    SNYK-JS-FOLLOWREDIRECTS-6141137
                                                                                </span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>
                                                                </ul>{" "}
                                                                {/**/}{" "}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>{" "}
                                            <div
                                                data-v-34ece046=""
                                                data-v-587357f2=""
                                                className="vue--issue-priority-score"
                                                data-snyk-test="priorityScoreTooltip"
                                                data-v-a659e2be=""
                                            >
                                                <div
                                                    data-v-06ded3b9=""
                                                    data-v-34ece046=""
                                                    className="vue--tooltip vue--tooltip--auto"
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        aria-describedby="priorityScoreTooltip"
                                                        aria-controls="priorityScoreTooltip"
                                                        data-snyk-test="BaseTooltip: label"
                                                        className="vue--tooltip__label"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-34ece046=""
                                                            className="vue--issue-priority-score__badge"
                                                            data-v-06ded3b9=""
                                                        >
                                                            <h3
                                                                data-v-56a8aa57=""
                                                                data-v-34ece046=""
                                                                className="vue--all-caps vue--issue-priority-score__label vue--all-caps--small"
                                                                regular=""
                                                            >
                                                                Score
                                                            </h3>{" "}
                                                            <strong
                                                                data-v-34ece046=""
                                                                className="vue--issue-priority-score__score"
                                                            >
                                                                472
                                                            </strong>
                                                        </div>
                                                    </div>{" "}
                                                    {/**/}
                                                </div>
                                            </div>
                                        </header>
                                    </header>{" "}
                                    {/**/} {/**/}{" "}
                                    <div
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__body"
                                    >
                                        {" "}
                                        <div
                                            data-v-2afd4d95=""
                                            data-v-587357f2=""
                                            className="vue--issue-details-default vue--issue__details"
                                        >
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Introduced through
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            axios@1.4.0
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Fixed in
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            follow-redirects@1.15.4
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                {/**/}
                                            </ul>{" "}
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                {/**/}{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-0475afce=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Exploit maturity
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-0475afce=""
                                                            className="vue--tooltip vue--issue-details-row-exploit-maturity"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <span
                                                                    data-v-0f55f474=""
                                                                    data-v-0475afce=""
                                                                    className="vue--badge vue--issue-details-row-exploit-maturity__badge vue--badge--complementary-blue vue--badge--small vue--badge--uppercase"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    {/**/}{" "}
                                                                    <span
                                                                        data-v-0f55f474=""
                                                                        className="vue--badge__text"
                                                                    >
                                                                        Proof of Concept
                                                                    </span>{" "}
                                                                    {/**/}
                                                                </span>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/} {/**/}
                                            </ul>
                                        </div>{" "}
                                        <div
                                            data-v-f1adb224=""
                                            data-v-587357f2=""
                                            className="vue--issue-content vue--issue__content"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-67840b28=""
                                                data-v-f1adb224=""
                                                className="vue--issue-content-show-more-button"
                                            >
                                                <button data-v-67840b28="">
                                                    Show more detail
                                                    <span
                                                        data-v-67840b28=""
                                                        aria-hidden="true"
                                                        aria-label="Chevron Down icon"
                                                        role="img"
                                                        className="material-design-icon chevron-down-icon"
                                                    >
                                                        <svg
                                                            data-v-67840b28=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-67840b28=""
                                                                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                            >
                                                                {/**/}
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>{" "}
                                            {/**/}
                                        </div>{" "}
                                        <footer
                                            data-v-0bbf892e=""
                                            data-v-587357f2=""
                                            data-v-3645d675=""
                                        >
                                            {/**/}
                                        </footer>{" "}
                                        {/**/} {/**/} {/**/}
                                    </div>{" "}
                                    <footer
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__form-actions"
                                    >
                                        <footer
                                            data-v-4c41549e=""
                                            data-v-587357f2=""
                                            className="vue--issue-footer"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-587357f2=""
                                                className="vue--issue-info vue--issue__info"
                                                data-v-4c41549e=""
                                            >
                                                {/**/} {/**/}
                                            </div>{" "}
                                            <div
                                                data-v-453f7da2=""
                                                data-v-587357f2=""
                                                className="vue--issue-actions vue--issue__actions"
                                                data-v-4c41549e=""
                                            >
                                                <ul
                                                    data-v-453f7da2=""
                                                    className="vue--issue-actions__items"
                                                >
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-28e93f06=""
                                                            data-v-453f7da2=""
                                                            className="vue--issue-actions-ignore"
                                                        >
                                                            <div
                                                                data-v-28e93f06=""
                                                                className="v-portal"
                                                                style={{ display: "none" }}
                                                            />{" "}
                                                            <button
                                                                data-v-46e4a2a7=""
                                                                data-v-28e93f06=""
                                                                role="button"
                                                                data-snyk-test="IssueActionsIgnore: submit"
                                                                className="vue--button vue--issue-actions-ignore__button vue--button--basic vue--button--ghost vue--button--small"
                                                            >
                                                                <span
                                                                    data-v-28e93f06=""
                                                                    data-v-46e4a2a7=""
                                                                    aria-hidden="true"
                                                                    aria-label="Eye Off icon"
                                                                    role="img"
                                                                    className="material-design-icon eye-off-icon"
                                                                >
                                                                    <svg
                                                                        data-v-28e93f06=""
                                                                        data-v-46e4a2a7=""
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 24 24"
                                                                        className="material-design-icon__svg"
                                                                    >
                                                                        <path
                                                                            data-v-28e93f06=""
                                                                            data-v-46e4a2a7=""
                                                                            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
                                                                        >
                                                                            {/**/}
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </li>{" "}
                                                    {/**/} {/**/} {/**/}
                                                </ul>{" "}
                                                <div data-v-453f7da2="" className="vue-portal-target" />
                                            </div>
                                        </footer>
                                    </footer>{" "}
                                    {/**/}
                                </form>
                                <form
                                    data-v-3645d675=""
                                    data-v-09baa44d=""
                                    data-v-587357f2=""
                                    data-v-555417d6=""
                                    className="vue--block vue--card vue--issue"
                                    id="issue-SNYK-JS-MONGODB-5871303"
                                    data-snyk-test="Issue"
                                >
                                    <header
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__header"
                                    >
                                        <header
                                            data-v-a659e2be=""
                                            data-v-587357f2=""
                                            className="vue--issue-header vue--issue-header--medium"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-a659e2be=""
                                                className="vue--issue-header__wrapper"
                                            >
                                                <div
                                                    data-v-005f3e32=""
                                                    data-v-587357f2=""
                                                    id="issue-SNYK-JS-MONGODB-5871303"
                                                    className="vue--issue-title"
                                                    data-v-a659e2be=""
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        data-v-e9c81bb0=""
                                                        data-v-005f3e32=""
                                                        className="vue--tooltip vue--issue-severity vue--issue-title__severity vue--tooltip--auto"
                                                        data-snyk-test="IssueTitle: medium severity"
                                                    >
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-snyk-test="BaseTooltip: label"
                                                            className="vue--tooltip__label"
                                                        >
                                                            {/**/}{" "}
                                                            <span
                                                                data-v-e9c81bb0=""
                                                                data-v-06ded3b9=""
                                                                className="vue--issue-severity__badge vue--issue-severity__badge--medium"
                                                            >
                                                                M
                                                            </span>
                                                        </div>{" "}
                                                        {/**/}
                                                    </div>{" "}
                                                    <div
                                                        data-v-005f3e32=""
                                                        className="vue--issue-title__container"
                                                    >
                                                        <h2
                                                            data-v-005f3e32=""
                                                            data-snyk-test="Issue Title"
                                                            className="vue--issue-title__title"
                                                        >
                                                            <span data-v-005f3e32="">
                                                                <span className="">mongodb</span>
                                                            </span>{" "}
                                                            <small
                                                                data-v-005f3e32=""
                                                                className="vue--issue-title__category"
                                                            >
                                                                <span data-v-005f3e32="">
                                                                    <span className="">Information Exposure</span>
                                                                </span>
                                                            </small>
                                                        </h2>{" "}
                                                        <div
                                                            data-v-0837c15e=""
                                                            data-v-005f3e32=""
                                                            className="vue--issue-link vue--issue-title__link"
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Clipboard Check Outline icon"
                                                                        role="img"
                                                                        className="material-design-icon clipboard-check-outline-icon vue--issue-link__icon vue--issue-link__icon__check"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>{" "}
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-v-0837c15e=""
                                                                className="vue--tooltip vue--tooltip--auto"
                                                            >
                                                                <div
                                                                    data-v-06ded3b9=""
                                                                    data-snyk-test="BaseTooltip: label"
                                                                    className="vue--tooltip__label"
                                                                >
                                                                    <span
                                                                        data-v-0837c15e=""
                                                                        data-v-06ded3b9=""
                                                                        aria-hidden="true"
                                                                        aria-label="Link Variant icon"
                                                                        role="img"
                                                                        className="material-design-icon link-variant-icon vue--issue-link__icon"
                                                                    >
                                                                        <svg
                                                                            data-v-0837c15e=""
                                                                            data-v-06ded3b9=""
                                                                            fill="currentColor"
                                                                            width={24}
                                                                            height={24}
                                                                            viewBox="0 0 24 24"
                                                                            className="material-design-icon__svg"
                                                                        >
                                                                            <path
                                                                                data-v-0837c15e=""
                                                                                data-v-06ded3b9=""
                                                                                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                                                                            >
                                                                                {/**/}
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </div>{" "}
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <ul
                                                    data-v-4a5a4544=""
                                                    data-v-587357f2=""
                                                    className="vue--issue-meta"
                                                    data-v-a659e2be=""
                                                >
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-type"
                                                    >
                                                        Vulnerability
                                                    </li>{" "}
                                                    <li
                                                        data-v-3b87cb26=""
                                                        data-v-55b69dba=""
                                                        data-v-4a5a4544=""
                                                        className="vue--issue-meta-item vue--issue-meta-item-rollup"
                                                    >
                                                        <div
                                                            data-v-64b0d6bd=""
                                                            data-v-cc531ec8=""
                                                            data-v-55b69dba=""
                                                            tabIndex={-1}
                                                            className="vue--dropdown-menu vue--dropdown-menu-handle-dotted vue--dropdown-menu--align-left vue--dropdown-menu--extra-small vue--dropdown-menu-handle-dotted--extra-small"
                                                            data-v-3b87cb26=""
                                                        >
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                role="button"
                                                                data-snyk-text="BaseDropdownMenu: handle"
                                                                aria-haspopup="true"
                                                                tabIndex={0}
                                                                aria-expanded="false"
                                                                className="vue--dropdown-menu__handle"
                                                            >
                                                                <span
                                                                    data-v-cc531ec8=""
                                                                    data-v-64b0d6bd=""
                                                                    className="vue--dropdown-menu-handle-dotted__handle"
                                                                />
                                                            </div>{" "}
                                                            <div
                                                                data-v-64b0d6bd=""
                                                                className="vue--dropdown-menu__menu"
                                                            >
                                                                {" "}
                                                                <ul
                                                                    data-v-64b0d6bd=""
                                                                    role="menu"
                                                                    className="vue--dropdown-menu__menu--primary"
                                                                >
                                                                    {" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://cwe.mitre.org/data/definitions/200.html"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CWE-200</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.cve.org/CVERecord?id=CVE-2021-32050"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">CVE-2021-32050</span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:N/A:N"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            CVSS 4.2
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>{" "}
                                                                    <li
                                                                        data-v-3871f022=""
                                                                        data-v-55b69dba=""
                                                                        role="menuitem"
                                                                        className="vue--dropdown-menu-link"
                                                                        data-v-64b0d6bd=""
                                                                    >
                                                                        <a
                                                                            data-v-ce2707d6=""
                                                                            data-v-3871f022=""
                                                                            href="https://app.snyk.io/vuln/SNYK-JS-MONGODB-5871303"
                                                                            className="vue--anchor vue--dropdown-menu-link__link"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span data-v-55b69dba="" data-v-ce2707d6="">
                                                                                <span className="">
                                                                                    SNYK-JS-MONGODB-5871303
                                                                                </span>
                                                                            </span>
                                                                            <span
                                                                                data-v-ce2707d6=""
                                                                                aria-label="Open an external page"
                                                                                role="img"
                                                                                className="material-design-icon open-in-new-icon vue--anchor__external"
                                                                            >
                                                                                <svg
                                                                                    data-v-ce2707d6=""
                                                                                    fill="currentColor"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    viewBox="0 0 24 24"
                                                                                    className="material-design-icon__svg"
                                                                                >
                                                                                    <path
                                                                                        data-v-ce2707d6=""
                                                                                        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                                                                                    >
                                                                                        <title data-v-ce2707d6="">
                                                                                            Open an external page
                                                                                        </title>
                                                                                    </path>
                                                                                </svg>
                                                                            </span>
                                                                            {/**/}
                                                                        </a>
                                                                    </li>
                                                                </ul>{" "}
                                                                {/**/}{" "}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>{" "}
                                            <div
                                                data-v-34ece046=""
                                                data-v-587357f2=""
                                                className="vue--issue-priority-score"
                                                data-snyk-test="priorityScoreTooltip"
                                                data-v-a659e2be=""
                                            >
                                                <div
                                                    data-v-06ded3b9=""
                                                    data-v-34ece046=""
                                                    className="vue--tooltip vue--tooltip--auto"
                                                >
                                                    <div
                                                        data-v-06ded3b9=""
                                                        aria-describedby="priorityScoreTooltip"
                                                        aria-controls="priorityScoreTooltip"
                                                        data-snyk-test="BaseTooltip: label"
                                                        className="vue--tooltip__label"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-34ece046=""
                                                            className="vue--issue-priority-score__badge"
                                                            data-v-06ded3b9=""
                                                        >
                                                            <h3
                                                                data-v-56a8aa57=""
                                                                data-v-34ece046=""
                                                                className="vue--all-caps vue--issue-priority-score__label vue--all-caps--small"
                                                                regular=""
                                                            >
                                                                Score
                                                            </h3>{" "}
                                                            <strong
                                                                data-v-34ece046=""
                                                                className="vue--issue-priority-score__score"
                                                            >
                                                                424
                                                            </strong>
                                                        </div>
                                                    </div>{" "}
                                                    {/**/}
                                                </div>
                                            </div>
                                        </header>
                                    </header>{" "}
                                    {/**/} {/**/}{" "}
                                    <div
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__body"
                                    >
                                        {" "}
                                        <div
                                            data-v-2afd4d95=""
                                            data-v-587357f2=""
                                            className="vue--issue-details-default vue--issue__details"
                                        >
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Introduced through
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <span data-v-20085cd7="" description="" auto="true">
                                                            mongoose@7.2.1
                                                        </span>
                                                    </div>
                                                </li>{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Fixed in
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            className="vue--tooltip vue--tooltip--auto"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                mongodb@3.6.10, @4.17.0, @5.8.0
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/}
                                            </ul>{" "}
                                            <ul
                                                data-v-34af13b2=""
                                                data-v-2afd4d95=""
                                                className="vue--issue-details-items vue--issue-details-default__items"
                                            >
                                                {/**/}{" "}
                                                <li
                                                    data-v-20085cd7=""
                                                    data-v-0475afce=""
                                                    data-v-2afd4d95=""
                                                    className="vue--issue-details-items-item"
                                                    data-v-34af13b2=""
                                                >
                                                    <div
                                                        data-v-20085cd7=""
                                                        className="vue--issue-details-items-item__key"
                                                    >
                                                        Exploit maturity
                                                    </div>{" "}
                                                    <div
                                                        data-v-20085cd7=""
                                                        data-snyk-test="IssueDetailsItemsItem: value"
                                                        className="vue--issue-details-items-item__value"
                                                    >
                                                        {" "}
                                                        <div
                                                            data-v-06ded3b9=""
                                                            data-v-0475afce=""
                                                            className="vue--tooltip vue--issue-details-row-exploit-maturity"
                                                            data-v-20085cd7=""
                                                        >
                                                            <div
                                                                data-v-06ded3b9=""
                                                                data-snyk-test="BaseTooltip: label"
                                                                className="vue--tooltip__label"
                                                            >
                                                                <span
                                                                    data-v-0f55f474=""
                                                                    data-v-0475afce=""
                                                                    className="vue--badge vue--issue-details-row-exploit-maturity__badge vue--badge--default vue--badge--small vue--badge--uppercase"
                                                                    data-v-06ded3b9=""
                                                                >
                                                                    {/**/}{" "}
                                                                    <span
                                                                        data-v-0f55f474=""
                                                                        className="vue--badge__text"
                                                                    >
                                                                        No known exploit
                                                                    </span>{" "}
                                                                    {/**/}
                                                                </span>
                                                            </div>{" "}
                                                            {/**/}
                                                        </div>
                                                    </div>
                                                </li>{" "}
                                                {/**/} {/**/}
                                            </ul>
                                        </div>{" "}
                                        <div
                                            data-v-f1adb224=""
                                            data-v-587357f2=""
                                            className="vue--issue-content vue--issue__content"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-67840b28=""
                                                data-v-f1adb224=""
                                                className="vue--issue-content-show-more-button"
                                            >
                                                <button data-v-67840b28="">
                                                    Show more detail
                                                    <span
                                                        data-v-67840b28=""
                                                        aria-hidden="true"
                                                        aria-label="Chevron Down icon"
                                                        role="img"
                                                        className="material-design-icon chevron-down-icon"
                                                    >
                                                        <svg
                                                            data-v-67840b28=""
                                                            fill="currentColor"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            className="material-design-icon__svg"
                                                        >
                                                            <path
                                                                data-v-67840b28=""
                                                                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                                                            >
                                                                {/**/}
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>{" "}
                                            {/**/}
                                        </div>{" "}
                                        <footer
                                            data-v-0bbf892e=""
                                            data-v-587357f2=""
                                            data-v-3645d675=""
                                        >
                                            {/**/}
                                        </footer>{" "}
                                        {/**/} {/**/} {/**/}
                                    </div>{" "}
                                    <footer
                                        data-v-09baa44d=""
                                        data-v-3645d675=""
                                        className="vue--card__form-actions"
                                    >
                                        <footer
                                            data-v-4c41549e=""
                                            data-v-587357f2=""
                                            className="vue--issue-footer"
                                            data-v-3645d675=""
                                        >
                                            <div
                                                data-v-587357f2=""
                                                className="vue--issue-info vue--issue__info"
                                                data-v-4c41549e=""
                                            >
                                                {/**/} {/**/}
                                            </div>{" "}
                                            <div
                                                data-v-453f7da2=""
                                                data-v-587357f2=""
                                                className="vue--issue-actions vue--issue__actions"
                                                data-v-4c41549e=""
                                            >
                                                <ul
                                                    data-v-453f7da2=""
                                                    className="vue--issue-actions__items"
                                                >
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <div
                                                            data-v-28e93f06=""
                                                            data-v-453f7da2=""
                                                            className="vue--issue-actions-ignore"
                                                        >
                                                            <div
                                                                data-v-28e93f06=""
                                                                className="v-portal"
                                                                style={{ display: "none" }}
                                                            />{" "}
                                                            <button
                                                                data-v-46e4a2a7=""
                                                                data-v-28e93f06=""
                                                                role="button"
                                                                data-snyk-test="IssueActionsIgnore: submit"
                                                                className="vue--button vue--issue-actions-ignore__button vue--button--basic vue--button--ghost vue--button--small"
                                                            >
                                                                <span
                                                                    data-v-28e93f06=""
                                                                    data-v-46e4a2a7=""
                                                                    aria-hidden="true"
                                                                    aria-label="Eye Off icon"
                                                                    role="img"
                                                                    className="material-design-icon eye-off-icon"
                                                                >
                                                                    <svg
                                                                        data-v-28e93f06=""
                                                                        data-v-46e4a2a7=""
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 24 24"
                                                                        className="material-design-icon__svg"
                                                                    >
                                                                        <path
                                                                            data-v-28e93f06=""
                                                                            data-v-46e4a2a7=""
                                                                            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
                                                                        >
                                                                            {/**/}
                                                                        </path>
                                                                    </svg>
                                                                </span>
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    </li>{" "}
                                                    {/**/}{" "}
                                                    <li
                                                        data-v-453f7da2=""
                                                        data-snyk-test="IssueActions: Fix action"
                                                        className="vue--issue-actions__item"
                                                    >
                                                        <a
                                                            data-v-46e4a2a7=""
                                                            data-v-492887f7=""
                                                            data-v-453f7da2=""
                                                            href="/org/shivam-handsintechnology/fix/f142d36c-de24-46aa-a265-56058c4478a4?vuln=SNYK-JS-MONGODB-5871303"
                                                            className="vue--button vue--button--cta vue--button--small"
                                                        >
                                                            <span
                                                                data-v-492887f7=""
                                                                data-v-46e4a2a7=""
                                                                aria-hidden="true"
                                                                aria-label="Source Pull icon"
                                                                role="img"
                                                                className="material-design-icon source-pull-icon"
                                                            >
                                                                <svg
                                                                    data-v-492887f7=""
                                                                    data-v-46e4a2a7=""
                                                                    fill="currentColor"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    className="material-design-icon__svg"
                                                                >
                                                                    <path
                                                                        data-v-492887f7=""
                                                                        data-v-46e4a2a7=""
                                                                        d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z"
                                                                    >
                                                                        {/**/}
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            Fix this vulnerability
                                                        </a>
                                                    </li>{" "}
                                                    {/**/}
                                                </ul>{" "}
                                                <div data-v-453f7da2="" className="vue-portal-target" />
                                            </div>
                                        </footer>
                                    </footer>{" "}
                                    {/**/}
                                </form>{" "}
                                {/**/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default PackageHeathAnalysis