import React from "react";

export default function Footer() {
  return (
    <footer className="main-footer">
      <strong>
        Copyright © {new Date().getFullYear()} <a href="http://handsintechnology.com">Hands In Technology </a>
      </strong>
      All rights reserved.
    </footer>
  );
}
