const tocLinks = document.querySelectorAll<HTMLAnchorElement>(".toc-li a");
const headings = document.querySelectorAll<HTMLElement>(
    "#_top, article h1, article h2, article h3, article h4",
);
const tocMap = new Map<Element, HTMLElement>();

// Map TOC links to their corresponding headings
for (const link of tocLinks) {
    const id = link.href.split("#")[1];
    const heading = document.getElementById(id);
    if (heading) tocMap.set(heading, link as HTMLElement);
}

function checkVisibility(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight,
    );
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function isScrolledIntoView(child, parent) {
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    // Check if the child's top edge is below the parent's bottom edge,
    // or if the child's bottom edge is above the parent's top edge.
    const isOutside =
        childRect.top >= parentRect.bottom || childRect.bottom <= parentRect.top;

    // If it's not outside, it's scrolled into view.
    return !isOutside;
}

const tocBox = document.querySelector(".toc-card ol");

const observer = new IntersectionObserver(
    () => {
        let visible: HTMLElement | null = null;

        for (const heading of headings) {
            // check if this specific heading is visible on the screen
            const isVisible = checkVisibility(heading);

            const link = tocMap.get(heading);

            if (!isVisible) {
                continue;
            }

            if (link) {
                link.classList.add("active");
                if (!isScrolledIntoView(link, tocBox) && window.innerWidth > 1380)
                    link.scrollIntoView({ block: "nearest" });
            }

            if (!visible) {
                visible = heading;
            }

            break;
        }

        if (visible) {
            for (const key of tocMap.keys()) {
                if (key !== visible) {
                    const link = tocMap.get(key);
                    if (link) link.classList.remove("active");
                }
            }
        }
    },
    { threshold: 0, root: null, rootMargin: "0px" },
);

// Observe all headings
for (const heading of headings) {
    observer.observe(heading);
}
