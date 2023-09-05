class ResponsiveUIManager {
  colNo = 10;
  rowsNoLower = 4;
  rowsNoUpper = 10;
  gridsterBreakpoint = 641;
  mobileBreakpoint = 640;
  rowsNumberBreakpoint = 400;
  sections = [];

  constructor() {
    this.init();
  }

  init() {
    this.addMenuButtonClickEventListeners();
    this.mobileNavManagement();
    this.menuButtonManagement();
    this.navLinksManagement();

    this.sections = [...document.getElementsByClassName("content")].map(
      (section) => {
        const contentWidth = section.clientWidth;
        const colWidth = contentWidth / this.colNo;
        const rowsNumber =
          section.clientHeight > this.rowsNumberBreakpoint
            ? this.rowsNoUpper
            : this.rowsNoLower;
        const rowsHeight = section.clientHeight / rowsNumber;
        const items = [...section.getElementsByClassName("section-element")];

        if (window.innerWidth < this.gridsterBreakpoint) {
          this.positionMobileSectionElements(items, contentWidth);
        } else {
          this.positionDesktopSectionElements(items, rowsHeight, colWidth);
        }

        return { domEl: section, contentWidth, colWidth, rowsHeight, items };
      }
    );
  }

  handleResize() {
    this.mobileNavManagement();
    this.menuButtonManagement();
    this.navLinksManagement();

    this.sections.forEach((el) => {
      if (el.domEl.clientWidth !== el.contentWidth) {
        el.contentWidth = el.domEl.clientWidth;
        el.colWidth = el.contentWidth / this.colNo;

        if (window.innerWidth < this.gridsterBreakpoint) {
          this.positionMobileSectionElements(el.items, el.contentWidth);
        } else {
          this.positionDesktopSectionElements(
            el.items,
            el.rowsHeight,
            el.colWidth
          );
        }
      }
    });
  }

  mobileNavManagement() {
    if (window.innerWidth > this.mobileBreakpoint) {
      const openNavs = [
        ...document.querySelectorAll(".nav-mobile:not(.nav-mobile-hidden)"),
      ];
      openNavs.forEach((nav) => {
        nav.classList.add("nav-mobile-hidden");
      });
    }
  }

  menuButtonManagement() {
    if (window.innerWidth > this.mobileBreakpoint) {
      const menuButtons = document.querySelectorAll(
        "nav.nav .menu-button-wrapper:not(.hidden)"
      );
      [...menuButtons].forEach((button) => {
        button.classList.add("hidden");
      });
    } else {
      const menuButtons = document.querySelectorAll(
        "nav.nav .menu-button-wrapper"
      );
      [...menuButtons].forEach((button) => {
        if (button.classList.contains("hidden"))
          button.classList.remove("hidden");
      });
    }
  }

  addMenuButtonClickEventListeners() {
    const headers = [...document.querySelectorAll("header.header")];
    headers.forEach((header) => {
      const menuButtons = [
        ...header.getElementsByClassName("menu-button-wrapper"),
      ];
      menuButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const mobileNav = header.getElementsByClassName("nav-mobile")[0];
          mobileNav.classList.contains("nav-mobile-hidden")
            ? mobileNav.classList.remove("nav-mobile-hidden")
            : mobileNav.classList.add("nav-mobile-hidden");
        });
      });
    });
  }

  navLinksManagement() {
    const navLinksContainers = [
      ...document.querySelectorAll(".nav-links-container"),
    ];
    if (window.innerWidth < this.mobileBreakpoint) {
      navLinksContainers.forEach((container) => {
        container.classList.add("hidden");
      });
    } else {
      navLinksContainers.forEach((container) => {
        if (container.classList.contains("hidden"))
          container.classList.remove("hidden");
      });
    }
  }

  positionDesktopSectionElements(items, rowsHeight, colWidth) {
    items.forEach((item) => {
      item.classList.remove("section-element-mobile");
      item.style.height = "";
      item.style.top = `${item.dataset.y * rowsHeight}px`;
      item.style.left = `${item.dataset.x * colWidth}px`;
      item.style.width = `${item.dataset.cols * colWidth}px`;
    });
  }

  positionMobileSectionElements(items, contentWidth) {
    items.forEach((item) => {
      item.classList.add("section-element-mobile");
      item.style.top = "";
      item.style.left = "";
      item.style.width = "";
      item.style.height = `${
        (item.dataset.rows / item.dataset.cols) * contentWidth
      }px`;
    });
  }
}

window.addEventListener("load", () => {
  const responsiveUiManager = new ResponsiveUIManager();

  window.addEventListener("resize", () => {
    responsiveUiManager.handleResize();
  });
});

