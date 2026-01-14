module.exports = function (eleventyConfig) {
    // Passthrough copy for assets (CSS, images, JS)
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/admin"); // For CMS config

    eleventyConfig.addFilter("date", function (dateVal) {
        if (!dateVal) return "";
        const date = new Date(dateVal);
        return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    });

    return {
        pathPrefix: "/hopehasnoborders/",
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["njk", "md", "html"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
