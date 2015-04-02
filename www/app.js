var MARGIN_SMALL = 4;
var MARGIN = 8;

var drawer = tabris.create("Drawer");
tabris.create("PageSelector", {
    layoutData: {left: 0, top: 0, right: 0, bottom: 0}
}).appendTo(drawer);

var page = tabris.create("Page", {
    topLevel: true,
    title: "WildAx Aurora"
});

var page2 = tabris.create("Page", {
    topLevel: true,
    title: "Another Motorhome"
});

var scrollView = tabris.create("ScrollView", {
    layoutData: {left: 0, right: 0, top: 0, bottom: 0}
}).appendTo(page);

var imageTextView = tabris.create("ImageView", {
    layoutData: {left: 0, top: 0, right: 0}
}).appendTo(scrollView);

var contentComposite = tabris.create("Composite", {
    layoutData: {left: 0, right: 0, top: ["#titleComposite", 0], height: 1000},
    background: "white"
}).appendTo(scrollView);

tabris.create("TextView", {
    layoutData: {left: MARGIN, right: MARGIN, top: MARGIN},
    text:   "Our first scamper-van.  This is definitely one of the motorhomes " +
            "we are focusing on right now!"
}).appendTo(contentComposite);

var titleComposite = tabris.create("Composite", {
    id: "titleComposite",
    background: "rgba(0,158,195,1)"
}).appendTo(scrollView);

tabris.create("TextView", {
    markupEnabled: true,
    text: "<b>Easy to get around, looks good too</b>",
    font: "16px",
    layoutData: {left: MARGIN, top: MARGIN, right: MARGIN},
    foreground: "black"
}).appendTo(titleComposite);

tabris.create("TextView", {
    layoutData: {left: MARGIN, bottom: MARGIN_SMALL, right: MARGIN},
    markupEnabled: true,
    text: "<b>WILDAX - Aurora</b>",
    font: "24px",
    foreground: "white"
}).appendTo(titleComposite);

var titleCompY = 0;
scrollView.on("change:bounds", function() {
    var bounds = scrollView.get("bounds");
    var pageWidth = bounds.width;
    var pageHeight = bounds.height;
    var imageHeight = pageWidth / 1.4; // 1.4 is the image aspect ratio
    imageTextView.set("image", {src: "images/scampervan.jpg", width: pageWidth, height: pageWidth});
    var titleCompHeight = titleComposite.get("bounds").height;
    // we need the offset of the title composite in each scroll event
    // it can only change when a change:bounds is triggered, wo thats when we assign it
    titleCompY = Math.min(imageHeight - titleCompHeight, pageHeight / 2);
    titleComposite.set("layoutData", {left: 0, top: titleCompY, right: 0, height: 64});
});

scrollView.on("scroll", function(offset) {
    imageTextView.set("transform", {translationY: offset.y * 0.4});
    if (titleCompY - offset.y < 0) {
        titleComposite.set("transform", {translationY: offset.y - titleCompY, opacity: 3});
    } else {
        titleComposite.set("transform", {translationY: 0});
    }
});

page.open();